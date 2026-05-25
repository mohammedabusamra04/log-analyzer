# 📊 Log Analyzer

A CLI tool that parses server log files and produces useful insights — even when the logs are messy.

## Requirements

- Node.js v18+

## Installation

```bash
npm install
```

## Usage

### Analyze a log file
```bash
node index.js --file path/to/your.log
```

### Generate test data
```bash
node scripts/generate-logs.js 5000
```
This generates a `test.log` file with 5000 lines in the project root.

### Run on generated test data
```bash
node scripts/generate-logs.js 1000
node index.js --file test.log
```

## Output

The tool reports:
- ✅ Total lines parsed vs malformed
- 📋 Status code distribution
- 🔧 HTTP method breakdown
- 🔥 Top 10 most requested endpoints
- 🐢 Top 10 slowest endpoints
- 📉 Error rate & average response time

## Handles

- Multiple timestamp formats (ISO, slash, epoch, human-readable)
- Response times in `ms`, `s`, or plain numbers
- JSON-formatted log lines
- Missing or invalid status codes
- Malformed/partial lines — counted but never crash the tool