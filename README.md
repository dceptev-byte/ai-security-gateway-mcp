# ai-security-gateway-mcp

A local MCP server that detects and masks Personally Identifiable Information (PII) in prompts before they reach any LLM.

## What it does

- Runs entirely on your machine — no data sent to any cloud service
- Detects 8 PII types: email, phone, credit card, Aadhaar, PAN, IP address, passport, and bank account numbers
- Supports three anonymization modes: Mask, Redact, and Replace
- Exposes MCP tools usable natively inside Claude Desktop, Cursor, and Windsurf

## Installation

> Coming in v2.4 — will be installable via:
> ```bash
> npm install -g ai-security-gateway-mcp
> ```

## Getting Started

> Coming in v2.4 — configuration instructions for Claude Desktop, Cursor, and Windsurf will be added here.

## Development

```bash
npm install
npm run build   # compile TypeScript → dist/
npm run dev     # run via tsx (no compile step)
npm start       # run compiled output
```
