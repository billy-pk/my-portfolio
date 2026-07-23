---
sidebar_position: 3
hide_table_of_contents: true
title: AI Sales Agent — Multi-Agent Sales Assistant for Service Businesses
---

# AI Sales Agent — Multi-Agent Sales Assistant for Service Businesses

**Stack:** Python 3.13, FastAPI, OpenAI Agents SDK, PostgreSQL + SQLModel + Alembic, WebSockets, ReportLab, Telegram Bot API, Docker Compose

**GitHub:** Private repo — code available on request

## Problem

Service-based businesses (the reference use case here is a photo booth rental company) lose leads to slow response times: a customer inquiry comes in, and qualifying it, pricing it, and turning it into a proposal all take a human who isn't always available.

## Approach

Built an LLM-powered, multi-agent sales assistant that reads a customer inquiry, qualifies the lead, calculates pricing, recommends add-ons, generates and sends a PDF proposal, notifies the team, and escalates to a human when needed — all behind a channel-agnostic adapter architecture so the same agent logic runs over any channel.

The original brief called for monitoring Facebook Marketplace/Messenger, but automating those via browser drivers violates Meta's Terms of Service, so that surface was intentionally left out. Instead, the project leans on an **Adapter Pattern**: a first-party Web Chat channel (over WebSocket) is the live, publicly demonstrable surface, and a `MockFacebookAdapter` serves as a deterministic test harness proving the same agent logic generalizes to other channels — a compliant Messenger Platform/Graph API integration could be dropped in later without touching agent logic.

Orchestration runs on the OpenAI Agents SDK behind an `LLMProvider` abstraction, so the underlying model is a config choice rather than a hard-coded dependency — OpenAI is the implemented default, with Claude and Gemini pluggable behind the same interface. A `FakeProvider` replays scripted tool calls and text turns, making the entire agent test suite deterministic and network-free.

## Key Features

- Conditional multi-agent handoff — a Sales Agent orchestrator hands off to dedicated Qualification, Pricing, Proposal, and Escalation agents rather than running one mega-prompt, keeping each agent's instructions small and independently testable
- Conversational qualification — collects event date, type, location, guest count, package, and delivery details
- Rule-based pricing computed in a `PricingService` from a plain config table (package + delivery + add-ons + extra hours) — quotes are exact and reproducible, never inferred by the model
- Upselling (360 booth, props, guest book, instant prints, extra hours, custom branding) and PDF proposal generation/delivery via ReportLab
- Telegram team notifications on qualified leads, proposals, escalations, and ready-to-book status
- Human escalation on low model confidence, discount requests, dissatisfaction, or custom requests, independent of any explicit handoff the model chooses
- Full persistence of every lead, message, proposal, and notification via SQLModel + Alembic
- TDD throughout, ~98% coverage on services/agents (gated at 80% in CI), plus a standalone `scripts/agent_eval.py` regression harness run against the real orchestrator

## Demo

![AI Sales Agent web chat conversation ending in a sent proposal](/img/portfolio/ai-sales-agent-demo.gif)
*A customer inquiry is qualified, priced, and turned into a PDF proposal — end to end, in one conversation.*
