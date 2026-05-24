function analyze(results) {
    const { entries, malformed, total } = results;
  
    
    const statusCodes = {};
    entries.forEach((e) => {
      const code = e.status ? String(e.status) : "unknown";
      statusCodes[code] = (statusCodes[code] || 0) + 1;
    });
  
    const endpointCount = {};
  entries.forEach((e) => {
    if (!e.path) return;
    endpointCount[e.path] = (endpointCount[e.path] || 0) + 1;
  });

  
  const slowest = [...entries]
    .filter((e) => e.responseTime !== null)
    .sort((a, b) => b.responseTime - a.responseTime)
    .slice(0, 10)
    .map((e) => ({
      path: e.path,
      method: e.method,
      responseTime: e.responseTime,
    }));
