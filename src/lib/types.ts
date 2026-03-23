export type PIIType =
  | "EMAIL"
  | "PHONE"
  | "CREDIT_CARD"
  | "AADHAAR"
  | "PAN"
  | "IP_ADDRESS"
  | "PASSPORT"
  | "BANK_ACCOUNT";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type AnonymizationMode = "MASK" | "REDACT" | "REPLACE";

export interface Finding {
  type: PIIType;
  value: string;
  start: number;
  end: number;
  confidence: number;
}

export interface ScanResult {
  riskLevel: RiskLevel;
  findings: Finding[];
  maskedText: string;
  originalLength: number;
}
