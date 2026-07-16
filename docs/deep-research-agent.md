---
sidebar_position: 5
title: DeepResearchAgent — Autonomous Multi-Agent Research System
---

# DeepResearchAgent — Autonomous Multi-Agent Research System

**Stack:** Python, OpenAI Agents SDK, Gemini 2.5 Flash, GPT-4o, Tavily Search API, Pydantic, SQLite (session persistence), uv

**GitHub:** [github.com/billy-pk/DeepResearchAgent](https://github.com/billy-pk/DeepResearchAgent)

## Problem

Deep research on a topic — gathering sources, synthesizing findings, tracking citations — is slow and easy to do sloppily by hand. A single LLM call also tends to hallucinate sources or skip proper attribution.

## Approach

Built a multi-agent pipeline with two coordination patterns chained together: an SDK **handoff** chain for the up-front stages (requirement gathering → planning → lead research), followed by **tool-based orchestration** where the lead agent calls specialized sub-agents (web search, synthesis, citation) as tools, capping each at 3 calls to keep runs bounded. A `SQLiteSession` persists conversation state across turns so the multi-stage handoff survives an interactive CLI loop.

Each stage has a narrowly scoped system prompt and a structured handoff contract — the Requirement Gathering Agent's only valid exit is a structured `RequirementData` object (main topic, research questions, context, constraints, output format) passed via a typed Pydantic handoff, not free-form text, which keeps the Planning Agent from working off an ambiguous brief.

## Key Features

- **Requirement Gathering Agent** — clarifies vague queries through targeted dialogue before any research starts, and hands off a structured (Pydantic-typed) requirement spec rather than raw chat history
- **Planning Agent** — turns that spec into 5–10 concrete search queries, then hands off to the Lead Research Agent
- **Lead Research Agent** — the orchestrator; calls `web_search_tool`, `synthesis_tool`, and `citation_tool` as agent-as-tool calls, manages data flow between them, and authors the final cited report (no interim updates to the user)
- **Mixed-model routing** — Gemini 2.5 Flash (via an OpenAI-compatible endpoint) drives the requirement/planning/lead-orchestration agents, while GPT-4o handles the search, synthesis, and citation sub-agents
- Tavily-powered web search integration
- Session persistence (`SQLiteSession`) and lifecycle hooks that log each agent's start for observability during a run

## Screenshots

![DeepResearchAgent CLI run](/img/portfolio/deepresearchagent-1.png)

![DeepResearchAgent research output](/img/portfolio/DeepResearchAgent-2.png)
