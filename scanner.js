function scanText(text) {
  const issues = [];

  const checks = [
    {
      name: "Possible API key",
      regex: /(sk-[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{20,})/g,
      severity: "high",
      message: "This looks like an API key or secret."
    },
    {
      name: "Password exposure",
      regex: /(password|passwd|pwd)\s*[:=]\s*['"]?.{4,}/gi,
      severity: "high",
      message: "This may expose a password."
    },
    {
      name: "Prompt injection",
      regex: /(ignore previous instructions|disregard instructions|reveal your system prompt|act as|jailbreak)/gi,
      severity: "medium",
      message: "This may be a prompt injection or jailbreak attempt."
    },
    {
      name: "SQL injection pattern",
      regex: /('|").*(or|and)\s+1\s*=\s*1|drop\s+table|union\s+select/gi,
      severity: "high",
      message: "This resembles a SQL injection payload."
    },
    {
      name: "XSS pattern",
      regex: /<script|javascript:|onerror=|onload=/gi,
      severity: "high",
      message: "This resembles an XSS payload."
    }
  ];

  for (const check of checks) {
    if (check.regex.test(text)) {
      issues.push(check);
    }
  }

  return issues;
}