# Baseline Policy (Non-Negotiable)

This repository is the **Cloudflare Worker Baseline Framework**.

It exists to provide a stable, production-grade foundation for all Cloudflare Worker projects.

## Allowed changes
- CI/CD hardening and improvements
- Security headers and security posture
- Observability (logging, metrics, tracing)
- Rate limiting and abuse controls
- Tooling upgrades (Wrangler, Node)
- Generic utilities that benefit ALL projects

## Not allowed
- Product or business features
- Application-specific routes
- Payment flows or money logic
- Casino or game rules
- UI or frontend code
- Experiments or spikes

## Workflow
- All feature work happens in repositories created using **Use this template**
- This baseline must remain environment-agnostic and reusable
- Changes here should benefit every downstream project

