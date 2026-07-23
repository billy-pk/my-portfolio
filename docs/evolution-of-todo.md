---
sidebar_position: 4
hide_table_of_contents: true
title: Evolution of Todo — Progressive Full-Stack → Cloud-Native Architecture
---

# Evolution of Todo — Progressive Full-Stack → Cloud-Native Architecture

**Stack:** Next.js, FastAPI, SQLModel, OpenAI Agents SDK, MCP, Kubernetes, Helm, DAPR, Kafka

**GitHub:**
- [phase 3 — AI chatbot](https://github.com/billy-pk/evolution-of-todo-ai-chatbot)
- [phase 4 — Kubernetes](https://github.com/billy-pk/evolution-of-todo-phase4-k8s)
- [phase 5 — cloud-native / event-driven](https://github.com/billy-pk/evolution-of-todo-phase5-cloud)

## Problem

Most portfolio projects show a single finished app — they don't show *how* an engineer's architectural thinking scales as requirements grow. I wanted a single project that could demonstrate that progression honestly, from the simplest possible implementation to a production-grade distributed system.

## Approach

Designed and built a 5-phase task-management system, each phase a deliberate architectural step up from the last: a stdlib CLI, a full-stack web app, a natural-language agent-driven interface, a Kubernetes deployment, and finally an event-driven cloud-native platform.

## Key Features

- **Phase 3:** Conversational task manager (no REST forms) using the OpenAI Agents SDK and a custom MCP tool server, backed by JWT-authenticated (EdDSA/JWKS), multi-tenant FastAPI + SQLModel services
- **Phase 4:** Containerized and deployed to Kubernetes (Minikube and Oracle Cloud) with Helm charts and health probes, validating pod-restart recovery in under 10 seconds
- **Phase 5:** Re-architected around DAPR pub/sub and Kafka/Redpanda event streaming with three-layer idempotency protection, real-time WebSocket broadcasting, and an event-sourced audit trail

## Screenshots

![Main page](/img/portfolio/ai-todo-app-main-page.png)

![Sign-in page](/img/portfolio/ai-todo-app-signin.png)

![Tasks view](/img/portfolio/ai-todo-app-tasks.png)
