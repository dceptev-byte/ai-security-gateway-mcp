import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { detectPII, maskPII, scoreRisk } from "./lib/pii-detector.js";
import type { AnonymizationMode } from "./lib/types.js";

const server = new McpServer({
  name: "ai-security-gateway",
  version: "2.0.0",
});

server.registerTool(
  "scan_prompt",
  {
    description:
      "Scans text for PII (personally identifiable information) before sending to an LLM. " +
      "Detects emails, phone numbers, credit cards, Aadhaar numbers, PAN cards, IP addresses, " +
      "passports, and bank accounts. Returns risk level, findings, and anonymized text. " +
      "Always run this before sending sensitive prompts to any LLM.",
    inputSchema: {
      text: z.string().describe("The prompt text to scan for PII"),
      mode: z
        .enum(["MASK", "REDACT", "REPLACE"])
        .default("MASK")
        .describe(
          "How to handle detected PII: MASK partially hides values, " +
            "REDACT removes them entirely, REPLACE substitutes typed tokens like [EMAIL]"
        ),
    },
  },
  async ({ text, mode }) => {
    const findings = detectPII(text);
    const anonymizedText = maskPII(text, findings, mode as AnonymizationMode);
    const riskLevel = scoreRisk(findings);

    let responseText: string;

    if (findings.length === 0) {
      responseText = "✅ No PII detected. Risk level: LOW. Safe to send.";
    } else {
      const findingLines = findings
        .map(
          (f) =>
            `- ${f.type}: ${f.value} (confidence: ${Math.round(f.confidence * 100)}%)`
        )
        .join("\n");

      responseText =
        `🚨 PII detected — Risk level: ${riskLevel}\n` +
        `Found ${findings.length} item(s):\n` +
        `${findingLines}\n\n` +
        `Anonymized text (${mode} mode):\n` +
        `${anonymizedText}\n\n` +
        `Recommendation: Use the anonymized version above instead of the original.`;
    }

    return {
      content: [{ type: "text" as const, text: responseText }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("AI Security Gateway MCP server running");
