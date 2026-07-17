---
sidebar_position: 1
hide_table_of_contents: true
title: AI Employee — Autonomous Personal & Business Assistant
---

# AI Employee — Autonomous Personal & Business Assistant

**Stack:** Python, uv, cron, Obsidian (vault as system-of-record), Claude Code (reasoning engine), Odoo 19 + Postgres 15 (Docker), Gmail API, Twitter/X API (Tweepy), pandas, watchdog, pytest

**GitHub:** [github.com/billy-pk/ai-employee-gold](https://github.com/billy-pk/ai-employee-gold)

## Problem

Routine business operations — email triage, expense tracking, invoicing, social posting, weekly reporting — consume disproportionate time for a solo operator, but full automation risks unsupervised mistakes (wrong replies sent, incorrect invoices, bad posts).

## Approach

Built a local-first, autonomous agent system that monitors Gmail and filesystem inputs and drives a multi-stage **Perception → Reasoning → Human-Approval → Action** pipeline. Every outbound action — emails, tweets, invoices — is queued for human review before it executes, removing the risk of unsupervised side effects while still automating the drafting and analysis work.

Rather than a database or a custom UI, the system's entire state — action items, drafts, pending approvals, audit logs, business goals — lives in an **Obsidian vault** of plain markdown files. Standalone Python scripts (scheduled by cron) act as watchers/processors that read and write into that vault, and **Claude Code** is invoked as the reasoning engine: it reads items sitting in `Needs_Action/`, reasons over them, and writes plans/drafts into `Pending_Approval/` for the user to review directly in Obsidian.

## Key Features

- Obsidian vault as the system-of-record — no external database beyond Odoo's own Postgres — with folders (`Needs_Action/`, `Pending_Approval/`, `Done/`, `Quarantine/`) doubling as both the AI's working memory and the human's review UI
- Claude Code CLI invoked headlessly as the reasoning/planning engine that turns raw inputs (emails, CSVs, files) into structured plans and drafts
- Bank statement parsing (pandas) with automatic subscription detection and large-transaction flagging, feeding a weekly auto-generated business intelligence briefing
- Odoo (Docker, self-hosted) integration for automated invoice creation and accounting sync
- Twitter/X integration (Tweepy) for approval-gated social posting
- Self-healing watchdog with auto-restart on failure, plus 90-day audit logging
- Validated by 251 passing automated tests

## Screenshot

![AI Employee dashboard](/img/portfolio/ai-employee-dashboard.png)
*System status dashboard — watchers, MCP integrations, and audit logging at a glance.*
