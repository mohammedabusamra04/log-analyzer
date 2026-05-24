const fs = require("fs");
const readline = require("readline");


const timestampPatterns = [
  
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?)/,
  // 2024/03/15 14:23:01
  /^(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})/,
  // 15-Mar-2024 14:23:01
  /^(\d{2}-[A-Za-z]{3}-\d{4} \d{2}:\d{2}:\d{2})/,
  // Unix epoch
  /^(\d{10})\s/,
];

function normalizeResponseTime(raw) {
    if (!raw) 
        return null;
    if (raw.endsWith("ms"))
         return parseFloat(raw);
    if (raw.endsWith("s"))
         return parseFloat(raw) * 1000;
        
    return parseFloat(raw);
  }
  