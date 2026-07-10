# Security Prompt Scanner

A lightweight browser extension that warns when text inputs may contain security-sensitive content or suspicious prompt patterns.

The extension runs on webpages, watches text fields, and highlights inputs when it detects possible risks such as exposed secrets, prompt injection attempts, SQL injection payloads, or XSS patterns.

## Features

- Detects possible API keys and secrets
- Detects password-like text exposure
- Detects common prompt injection and jailbreak phrases
- Detects basic SQL injection patterns
- Detects basic XSS patterns
- Highlights risky input fields with a red outline
- Shows a small warning box with detected issue messages

## Project Structure

```text
.
├── manifest.json   # Chrome extension manifest
├── scanner.js      # Text scanning rules
├── content.js      # Hooks scanner into page inputs
└── styles.css      # Warning UI styles
```

## Installation

1. Open Chrome or Edge.
2. Go to `chrome://extensions/` or `edge://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select this project folder.

The extension will then run on webpages matched by the manifest.

## How It Works

`scanner.js` checks input text against a small set of regular expressions. `content.js` listens for input changes on:

- `textarea`
- `input[type="text"]`
- `[contenteditable="true"]`

When a match is found, the field gets a red outline and a warning box appears in the bottom-right corner of the page.

## Example Detections

The scanner currently looks for patterns like:

- `sk-...` style API keys
- `AIza...` style Google API keys
- `password=...`
- `ignore previous instructions`
- `OR 1=1`
- `<script>`
- `javascript:`

## Limitations

This extension uses simple pattern matching, so it can produce false positives or miss more advanced attacks. It should be treated as a helpful local warning layer, not a complete security product.

## Development

After editing the files, reload the extension from the browser extensions page and refresh the webpage you want to test.

No build step is required.

