# AI Security Gateway — MCP Server

> Local PII detection and masking for Claude Desktop, Cursor, and Windsurf.
> Your prompts are scanned on your machine before reaching any LLM.

## What it does

Automatically detects and masks sensitive data in your prompts:

- 📧 Email addresses
- 📱 Phone numbers (India-friendly)
- 💳 Credit card numbers
- 🪪 Aadhaar numbers
- 📋 PAN cards
- 🌐 IP addresses
- 🛂 Passport numbers
- 🏦 Bank account numbers

## How it works

Once installed, Claude Desktop (and Cursor/Windsurf) automatically has access to a `scan_prompt` tool. You can ask Claude to scan any prompt before sending it, or Claude will proactively suggest scanning when it detects potentially sensitive content.

## Installation

### Option 1 — Run directly with npx (no install needed)

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ai-security-gateway": {
      "command": "npx",
      "args": ["-y", "ai-security-gateway-mcp"]
    }
  }
}
```

### Option 2 — Install globally

```bash
npm install -g ai-security-gateway-mcp
```

Then add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ai-security-gateway": {
      "command": "ai-security-gateway-mcp"
    }
  }
}
```

## Config file locations

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

## Usage

After restarting Claude Desktop, try:

```
Scan this prompt for PII before I send it: [your text here]
```
```
Use REPLACE mode to anonymize: [your text here]
```
```
Is this safe to send to an LLM? [your text here]
```

## Anonymization modes

| Mode | Behaviour | Example |
|---|---|---|
| `MASK` | Partially hides values | `j***@g***.com` |
| `REDACT` | Removes values entirely | *(empty)* |
| `REPLACE` | Substitutes typed tokens | `[EMAIL]`, `[AADHAAR]` |

## Works with

- Claude Desktop (macOS and Windows)
- Cursor
- Windsurf
- Any MCP-compatible client

## Privacy

All detection runs locally on your machine.
No data is sent to any server or cloud service.

## Development

```bash
npm install
npm run build   # compile TypeScript → dist/
npm run dev     # run via tsx (no compile step)
npm start       # run compiled output
```

## Related

- Web app (v1): https://github.com/dceptev-byte/ai_security_gateway
