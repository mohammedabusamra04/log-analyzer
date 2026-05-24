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

  const topEndpoints = Object.entries(endpointCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([path, count]) => ({ path, count }));


const methods = {};
entries.forEach((e) => {
  if (!e.method) return;
  methods[e.method] = (methods[e.method] || 0) + 1;
});

const errors = entries.filter((e) => e.status >= 400).length;
const errorRate = ((errors / entries.length) * 100).toFixed(2);

  const validTimes = entries
    .map((e) => e.responseTime)
    .filter((t) => t !== null);
  const avgResponseTime = (
    validTimes.reduce((a, b) => a + b, 0) / validTimes.length
  ).toFixed(2);

  return {
    total,
    parsed: entries.length,
    malformedCount: malformed.length,
    statusCodes,
    topEndpoints,
    slowest,
    methods,
    errorRate,
    avgResponseTime,
  };
}

module.exports = { analyze };
