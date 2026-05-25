# ANSWERS.md

## 1. How to Run

Install dependencies:
```bash
npm install
```

Generate test data:
```bash
node scripts/generate-logs.js 1000
```

Run the analyzer:
```bash
node index.js --file test.log
```

---

## 2. Stack Choice

I chose **Node.js** because:
- Native `readline` module handles large files line-by-line without loading everything into memory
- Great for CLI tools with `commander`
- Fast enough for log files with hundreds of thousands of lines

A worse choice would have been **PHP** — it's not designed for CLI data processing, lacks good streaming support, and would make the code unnecessarily complex.

---

## 3. One Real Edge Case

**File:** `src/parser.js`  
**Handling:** Response time normalization in the `normalizeResponseTime()` function

Some lines report response time as `142ms`, others as `0.142s`, and some as just `142`.
Without normalization, comparing response times across entries would be meaningless —
a `0.5s` entry would appear faster than a `200ms` entry.

The function converts everything to milliseconds before any analysis happens.

---

## 4. AI Usage

- **Tool:** Claude (claude.ai)
- **What I asked:** Help me build a Node.js log analyzer CLI that handles malformed lines, multiple timestamp formats, and mixed log formats.
- **What it gave me:** The full structure and code for `parser.js`, `analyzer.js`, `reporter.js`, `index.js`, and `generate-logs.js`.
- **What I changed:** I reviewed the regex in `parser.js` and adjusted it to also handle status codes reported as `-` (dash) instead of a number, because the original regex only matched 3-digit numbers. This was important because the assessment specifically mentioned this edge case.

---

## 5. Honest Gap

The timestamp parsing is weak — the tool extracts timestamps as raw strings but doesn't fully normalize them into Date objects for time-based analysis.

With another day, I would:
1. Parse all timestamp formats into proper `Date` objects
2. Add time-based analysis (requests per hour, error spikes over time)
3. This would make the tool much more useful for someone actually on call