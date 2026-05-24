function analyze(results) {
    const { entries, malformed, total } = results;
  
    
    const statusCodes = {};
    entries.forEach((e) => {
      const code = e.status ? String(e.status) : "unknown";
      statusCodes[code] = (statusCodes[code] || 0) + 1;
    });
  