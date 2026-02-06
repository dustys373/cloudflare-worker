const startedAt = Date.now();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // /health endpoint
    if (url.pathname === "/health") {
      const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);

      return new Response(
        JSON.stringify({
          status: "ok",
          service: env.APP_NAME,
          env: env.ENV,
          uptime_seconds: uptimeSeconds,
          timestamp: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    // /kv-test endpoint (verifies KV read + write)
    if (url.pathname === "/kv-test") {
      const key = "counter";

      const currentRaw = await env.APP_KV.get(key);
      const current = currentRaw ? Number(currentRaw) : 0;
      const next = current + 1;

      await env.APP_KV.put(key, String(next));

      return new Response(
        JSON.stringify({ counter: next }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          }
        }
      );
    }

    // fallback
    return new Response("Not Found", { status: 404 });
  }
};

