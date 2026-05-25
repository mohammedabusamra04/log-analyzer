const chalk = require("chalk");

function report(analysis) {
  const {
    total,
    parsed,
    malformedCount,
    statusCodes,
    topEndpoints,
    slowest,
    methods,
    errorRate,
    avgResponseTime,
  } = analysis;

  console.log("\n" + chalk.bold.blue("═══════════════════════════════════════"));
  console.log(chalk.bold.blue("          📊 LOG ANALYZER REPORT        "));
  console.log(chalk.bold.blue("═══════════════════════════════════════\n"));

  