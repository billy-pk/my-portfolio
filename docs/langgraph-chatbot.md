---
sidebar_position: 6
hide_table_of_contents: true
title: LangGraph Chatbot — Search-Augmented Conversational AI
---

# LangGraph Chatbot — Search-Augmented Conversational AI

**Stack:** Python, LangGraph, LangChain, GPT-4o mini, Tavily Search, Streamlit

**GitHub:** [github.com/billy-pk/langchain-streamlit-chatbot](https://github.com/billy-pk/langchain-streamlit-chatbot)

## Problem

A plain LLM chatbot is limited to its training data and can't answer questions about current events or fast-changing information without external retrieval.

## Approach

Built a LangGraph-orchestrated conversational chatbot with integrated Tavily web search, giving GPT-4o mini real-time information retrieval within the conversation flow, deployed behind a Streamlit web UI. Rather than a single prompt-and-response call, the conversation runs as a compiled `StateGraph`: an assistant node reasons over the message state and conditionally routes to a tool node (`tools_condition`) whenever a query needs live web data, looping back to the assistant with the tool result before replying.

## Key Features

- LangGraph `StateGraph` with conditional edges — the assistant node decides per-turn whether to answer directly or route to a `ToolNode` wrapping Tavily search, rather than always calling the search tool
- `MemorySaver` checkpointing — conversation state persists per thread (`thread_id`) inside the graph itself, not just in Streamlit's UI session state
- GPT-4o mini bound to the Tavily tool via LangChain's `bind_tools`, so the model decides when a search is actually needed
- LangSmith tracing integration for inspecting graph execution and tool-call decisions during development
- Streamlit chat interface for interactive use
