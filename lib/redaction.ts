// Aggressive redaction utilities for contracts

export type RedactionSpan = {
  start: number;
  end: number;
  label: string;
  hash: string; // non-reversible hash of removed content for auditing (not returned to client)
};

function simpleHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

const patterns: Array<{ label: string; regex: RegExp }> = [
  { label: 'EMAIL', regex: /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,24}/g },
  { label: 'PHONE', regex: /\b\+?\d{1,3}?[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}\b/g },
  { label: 'AMOUNT', regex: /\b(?:USD\s*)?\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g },
  { label: 'TAX_ID', regex: /\b(?:TIN|EIN|VAT|GST)[:\s-]*\d[\d-]{6,}\b/gi },
  { label: 'ACCOUNT', regex: /\b(?:IBAN|SWIFT|IFSC|ACCOUNT|ACCT)[:\s-]*[A-Z0-9-]{6,}\b/gi },
  { label: 'ADDRESS', regex: /\b\d{1,5}\s+[A-Za-z0-9'.\-\s]+\b/g },
  { label: 'DATE', regex: /\b(?:\d{1,2}[\/-])?\d{1,2}[\/-]\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{2,4}\b/gi },
  { label: 'NAME', regex: /\b[A-Z][a-z]{1,}([\s-][A-Z][a-z]{1,})+\b/g },
  { label: 'COMPANY', regex: /\b[A-Z][A-Za-z0-9&'\-. ]+(?:,?\s+(?:Inc\.|LLC|Ltd\.|Corp\.|GmbH|PLC|SAS|BV))\b/g },
  { label: 'SIGNATURE', regex: /\bSigned\s+by[:\s].+$/gmi },
];

export function redactAggressive(text: string): { redacted: string; redactionMap: RedactionSpan[] } {
  const redactionMap: RedactionSpan[] = [];
  let redacted = text;

  // Apply every pattern; build redaction map
  for (const { label, regex } of patterns) {
    redacted = redacted.replace(regex, (match, _off, idx) => {
      // compute index from original via difference is complex; approximate by searching in current slice
      const hash = simpleHash(match);
      redactionMap.push({ start: -1, end: -1, label, hash });
      return `[REDACTED:${label}]`;
    });
  }

  return { redacted, redactionMap };
}


