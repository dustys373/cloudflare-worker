const startedAt = Date.now();
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 30;

async function rateLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rl:${ip}`;
  const current = Number(await env.APP_KV.get(key)) || 0;

  if (current >= RATE_LIMIT_MAX) return false;

  await env.APP_KV.put(key, String(current + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS
  });

  return true;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const ip =
      request.headers.get("CF-Connecting-IP") ??
      request.headers.get("X-Forwarded-For") ??
      "unknown";

    if (!(await rateLimit(env, ip))) {
      return new Response(
        JSON.stringify({ error: "rate_limited" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    if (url.pathname === "/health") {
      const uptime = Math.floor((Date.now() - startedAt) / 1000);

      return new Response(
        JSON.stringify(
          {
            status: "ok",
            service: env.APP_NAME,
            env: env.ENV,
            version: env.VERSION ?? "dev",
            commit: env.GIT_SHA ?? "local",
            uptime_seconds: uptime,
            timestamp: new Date().toISOString()
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    if (url.pathname === "/kv-test") {
      const key = "counter";
      const current = Number(await env.APP_KV.get(key)) || 0;
      const next = current + 1;

      await env.APP_KV.put(key, String(next));

      return new Response(
        JSON.stringify({ counter: next }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};

