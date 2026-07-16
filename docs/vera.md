---
sidebar_position: 4
title: VERA — Voice-Enabled Reservation Assistant
---

# VERA — Voice-Enabled Reservation Assistant

**Stack:** FastAPI, SQLAlchemy + Alembic, Twilio, OpenAI Whisper, GPT-4o-mini, Google Cloud Text-to-Speech, PostgreSQL, React

**GitHub:** [github.com/billy-pk/voice-reservation-assistant](https://github.com/billy-pk/voice-reservation-assistant)

## Problem

Phone remains the primary booking channel for many service businesses, but staffing a phone line around the clock is expensive, and most "voice bot" solutions feel robotic and break down in real conversation.

## Approach

Built an end-to-end voice AI agent that answers phone calls via Twilio, transcribes speech with Whisper, reasons over the conversation with GPT-4o-mini, and responds with natural speech via Google TTS — enabling fully voice-driven appointment booking for callers, with no app or web UI needed on the customer side. A separate React admin dashboard gives staff visibility into reservations, conversation logs, and analytics for bookings made through the voice agent.

## Key Features

- Twilio telephony integration for real inbound/outbound phone calls
- Whisper-based speech-to-text transcription
- GPT-4o-mini conversational reasoning for booking logic
- Google Cloud Text-to-Speech for natural-sounding responses
- PostgreSQL-backed reservation storage (SQLAlchemy + Alembic migrations) with spec-driven development structure
- React admin dashboard for staff — reservations, conversation logs, and analytics

## Screenshots

![VERA admin dashboard](/img/portfolio/vera-dashboard-1.png)

![VERA admin dashboard](/img/portfolio/veradashboard-2.png)

![VERA admin dashboard](/img/portfolio/vera-dashboard-3.png)
