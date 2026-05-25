const fs = require("fs");
const path = require("path");

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const PATHS = [
  "/api/users",
  "/api/login",
  "/api/logout",
  "/api/products",
  "/api/orders",
  "/api/users/12",
  "/api/products/5",
  "/health",
  "/api/admin",
];
const STATUS_CODES = [200, 200, 200, 201, 301, 400, 401, 403, 404, 500, 502];
const IPS = [
  "192.168.1.42",
  "10.0.0.7",
  "172.16.0.1",
  "192.168.1.100",
  "10.0.0.55",
];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateTimestamp(type) {
    const date = new Date(Date.now() - randomInt(0, 86400000));
    switch (type) {
      case 0: // ISO
        return date.toISOString().replace(".000", "").replace(".000Z", "Z");
      case 1: // 2024/03/15 14:23:01
        return date.toISOString().slice(0, 10).replace(/-/g, "/") +
          " " + date.toISOString().slice(11, 19);
      case 2: // 15-Mar-2024 14:23:01
        return date.toLocaleDateString("en-GB", {
          day: "2-digit", month: "short", year: "numeric"
        }).replace(/ /g, "-") + " " + date.toISOString().slice(11, 19);
      case 3: // Unix epoch
        return Math.floor(date.getTime() / 1000).toString();
    }
  }

  function generateResponseTime(type) {
    const ms = randomInt(10, 3000);
    switch (type) {
      case 0: return `${ms}ms`;
      case 1: return `${(ms / 1000).toFixed(3)}s`;
      case 2: return `${ms}`;
    }
  }
  
  function generateStandardLine() {
    const timestamp = generateTimestamp(randomInt(0, 3));
    const ip = randomItem(IPS);
    const method = randomItem(METHODS);
    const path = randomItem(PATHS);
    const status = randomItem(STATUS_CODES);
    const responseTime = generateResponseTime(randomInt(0, 2));
    return `${timestamp} ${ip} ${method} ${path} ${status} ${responseTime}`;
  }

  function generateJSONLine() {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      ip: randomItem(IPS),
      method: randomItem(METHODS),
      path: randomItem(PATHS),
      status: randomItem(STATUS_CODES),
      responseTime: randomInt(10, 3000),
    });
  }
  
  function generateMalformedLine() {
    const malformed = [
      "BROKEN LINE $$$ ###",
      "at java.lang.Thread.run(Thread.java:748)",
      "",
      "   ",
      "GET /api/users",
      "2024-03-15 INCOMPLETE",
    ];
    return randomItem(malformed);
  }