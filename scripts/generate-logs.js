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

