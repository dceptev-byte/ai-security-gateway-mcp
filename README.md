# ai-security-gateway-mcp

A local MCP server that detects and masks Personally Identifiable Information (PII) in prompts before they reach any LLM.

## What it does

- Runs entirely on your machine — no data sent to any cloud service
- Detects 8 PII types: email, phone, credit card, Aadhaar, PAN, IP address, passport, and bank account numbers
- Supports three anonymization modes: Mask, Redact, and Replace
- Exposes MCP tools usable natively inside Claude Desktop, Cursor, and Windsurf

## Claude Desktop Integration

**1. Build the server:**
```bash
npm install
npm run build
```

**2. Find your Claude Desktop config file:**

- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**3. Add this to the config** (replace the path with your actual absolute path to `dist/index.js`):
```json
{
  "mcpServers": {
    "ai-security-gateway": {
      "command": "node",
      "args": ["C:\\Claude\\ai-security-gateway-mcp\\dist\\index.js"]
    }
  }
}
```

> On Windows, use double backslashes `\\` in the path.

**4. Fully quit and restart Claude Desktop.** Look for the plug icon (🔌) at the bottom of the chat input — this confirms the MCP server is connected.

## Test prompts

**HIGH risk — 4+ findings:**
```
Please scan this before I send it: Hi my name is Rahul Sharma, email: rahul.sharma@gmail.com, Aadhaar: 2345 6789 0123, PAN: ABCDE1234F, phone: +91 98765 43210
```

**LOW risk — no PII:**
```
Please scan this: What is the capital of France?
```

**REPLACE mode:**
```
Scan this in REPLACE mode: My credit card is 4532 1234 5678 9012 and my email is test@example.com
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| No plug icon after restart | Claude Desktop wasn't fully quit — check system tray and kill from there |
| Path not found error | Verify path uses double backslashes `\\` on Windows; re-run `npm run build` |
| Tool not listed | Check `%APPDATA%\Claude\logs\` (Windows) or `~/Library/Logs/Claude/` (macOS) for MCP errors |

## Development

```bash
npm install
npm run build   # compile TypeScript → dist/
npm run dev     # run via tsx (no compile step)
npm start       # run compiled output
```

## MCP Tools

### `scan_prompt`

Scans text for PII before sending to an LLM.

**Inputs:**
- `text` (string) — the prompt to scan
- `mode` (`MASK` | `REDACT` | `REPLACE`, default `MASK`) — how to anonymize detected PII

**Output:** Risk level, list of findings with confidence scores, and the anonymized version of the text.
