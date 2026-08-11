---
sidebar_position: 8
hide_table_of_contents: true
title: WooAssist AI — AI Customer-Support Agent for WooCommerce
---

# WooAssist AI — AI Customer-Support Agent for WooCommerce

**Stack:** Python 3.13, FastAPI, OpenAI Agents SDK, PostgreSQL + pgvector, SQLModel + Alembic, Pydantic, React 19 + TypeScript + Vite + Tailwind, PHP 8 (WordPress plugin), Docker Compose, `uv`

**GitHub:** Private repo — code available on request

## Problem

WooCommerce store owners field the same repetitive product, order-status, and policy questions over and over, and a generic LLM chatbot bolted onto a storefront is a liability: it will happily invent a price, disclose someone else's order, or answer from nothing when it doesn't actually know the store's return policy.

## Approach

Built an AI customer-support agent that sits in front of a WooCommerce store's own data instead of the model's imagination. The interesting engineering problem isn't "have an LLM answer questions" — it's where the boundary sits between the model and everything that has to be correct.

```
Customer -> Chat Widget -> FastAPI -> AI Agent -> Tools -> Services -> Repositories / Providers -> Postgres / WooCommerce
                                          |                    |
                                   picks tools,          deterministic Python:
                                   explains results      pricing, verification,
                                                          comparison, ranking
```

The agent may only call registered **Tools**. Tools call **Application Services**, which hold the business logic as ordinary, unit-tested Python — pricing, order verification, comparison, and ranking are computed, never narrated by the model. Services reach the outside world through **Provider** interfaces, so the same code runs against fixture data in tests and a live WooCommerce store via one config change, and no SQL exists outside the Repository layer.

Order lookups are gated on server-side verification of order number *and* billing email — the model cannot bypass this, the check happens below the tool boundary, and a failed check returns one generic message so the endpoint can't be used to probe which orders exist. Policy answers (shipping, returns, warranty) are grounded in the store's own published knowledge base, chunked and embedded into pgvector with a similarity floor, so an off-topic question retrieves nothing rather than the least-bad paragraph.

## Key Features

- Tool-calling AI agent (OpenAI Agents SDK) restricted to a fixed set of typed, validated Tools — no direct database or API access, no business rule ever lives in a prompt
- Product search, filtering, comparison, and recommendation against the live store catalogue, with pricing computed in Python
- Order-status lookup with server-side order-number + billing-email verification, independent of anything the model claims
- RAG-based policy Q&A over the store's knowledge base with a similarity floor, so off-topic questions get "I don't know" instead of a hallucinated answer
- Conversation state persisted in Postgres with inactivity timeouts, so the widget survives a page reload without an ever-growing prompt
- Standalone React chat widget plus a deliberately thin WordPress plugin whose entire job is storing a backend URL and enqueueing two asset files
- Tested against a real WordPress + WooCommerce store (via `wp-env`) as well as a fully offline mock-provider stack, behind one shared Provider interface

## Demo

![WooAssist AI chat widget answering a product question against a live WooCommerce store](/img/portfolio/woocommerce-ai-support-demo.png)
*The widget answering a live product query — prices and stock pulled straight from a running WooCommerce store, not invented by the model.*
