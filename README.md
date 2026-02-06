# Cloudflare Worker Baseline Framework

Production-grade Cloudflare Workers baseline with:

- Staging and production environments
- Cloudflare KV persistence
- Edge rate limiting
- Health and observability endpoints
- CI/CD via GitHub Actions
- Deterministic, auditable deployments

## Purpose

This repository serves two roles:

1. **Personal baseline framework** used to start all new Cloudflare Worker projects.
2. **Portfolio example** demonstrating real-world infrastructure, deployment discipline, and edge architecture.

This is not a tutorial, demo, or experiment. It is a hardened starting point.

## Architecture

- Runtime: Cloudflare Workers
- Storage: Cloudflare KV
- CI/CD: GitHub Actions
- Tooling: Wrangler v4, Node 20

## Endpoints

- `GET /health`  
  Returns service status, environment, version, commit SHA, and uptime.

- `GET /kv-test`  
  Verifies KV persistence. Staging and production are isolated.

## Usage

Use this repository as a **template** or fork it to start new projects.

Infrastructure improvements are made here and inherited by downstream projects.

