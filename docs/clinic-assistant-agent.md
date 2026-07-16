---
sidebar_position: 2
title: Clinic Assistant Agent — AI Receptionist for Healthcare Scheduling
---

# Clinic Assistant Agent — AI Receptionist for Healthcare Scheduling

**Stack:** FastAPI, SQLAlchemy (async) + Alembic, PostgreSQL 16 + pgvector, OpenAI Agents SDK, React 19 + Vite + TailwindCSS + React Query, Meta WhatsApp Cloud API, WebSockets, APScheduler, Docker Compose

**GitHub:** Private repo — code available on request

## Problem

Small clinics can't staff a 24/7 receptionist, but patients expect to book, reschedule, or ask questions at any hour, across whichever channel (phone, WhatsApp, web) is convenient for them.

## Approach

Built a 24/7 AI clinic receptionist handling appointment booking, rescheduling, and Q&A over WhatsApp and a web chat widget, unified through a single channel-agnostic conversation engine so the same agent logic serves every channel. Every inbound message — regardless of channel — flows through one service-layer pipeline: dedup → resolve/create patient → resolve/create conversation → persist message → emergency check → agent invocation → persist reply → channel-specific dispatch.

The AI layer sits behind a provider abstraction (`AgentProvider`) rather than calling the OpenAI Agents SDK directly, so swapping in another LLM provider is a config change, not a rewrite — and a deterministic `StubAgentProvider` lets the full test suite run without ever calling a real LLM. Emergency detection deliberately bypasses the LLM entirely: it's a pre-processing keyword match that fires before the agent is invoked, so a medical emergency is never gated on model behavior — it's deterministic and auditable.

## Key Features

- Agentic tool-calling (OpenAI Agents SDK) — the AI calls backend tools (check availability, book/reschedule/cancel, FAQ/KB search, request human handoff) against the service layer rather than hallucinating appointment details; tool calls never touch the DB directly from the AI layer
- RAG pipeline over pgvector: documents are parsed → chunked (500–1000 tokens, sentence/paragraph-aware) → embedded (OpenAI embeddings) → stored in `document_chunks`, then retrieved by cosine similarity (top-K=5) and injected into the agent's context as "Retrieved Knowledge"
- Deterministic, LLM-independent emergency-keyword detection that creates an alert, sends a fixed (non-generated) safety response, notifies staff, and skips normal AI handling for that message
- Human handoff system — staff can take over a conversation manually, and the agent can also trigger handoff itself (low confidence, explicit request, unsupported request) via a dedicated tool call; while handed off, inbound messages are still logged but the AI is never invoked
- Real-time WebSocket web chat with session persistence (client-held session token) and an in-memory, per-session offline message queue that replays on reconnect
- Timezone-aware scheduling; automated reminder (every 10 min) and auto no-show (every 60 min) jobs via APScheduler
- React admin dashboard for staff oversight — appointments, doctors, patients, conversations, knowledge base, and audit logs

## Screenshots

![Clinic Assistant admin dashboard](/img/portfolio/clinic-admin-dashboard.png)
*Admin dashboard — appointments, active doctors, and open alerts at a glance.*

![Clinic Assistant patient chat widget](/img/portfolio/clinic-patient-chat.png)
*Patient-facing web chat widget for booking, hours, and doctor lookup.*
