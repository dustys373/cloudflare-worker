const startedAt = Date.now();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);

      const body = {
        status: "ok",
        service: env.APP_NAME ?? "my-worker",
        env: env.ENV ?? "unknown",
        version: env.VERSION ?? "dev",
        commit: env.GIT_SHA ?? "local",
        uptime_seconds: uptimeSeconds,
        timestamp: new Date().toISOString()
      };

      return new Response(JSON.stringify(body, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "X-Service-Env": body.env,
          "X-Service-Version": body.version
        }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

