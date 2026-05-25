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