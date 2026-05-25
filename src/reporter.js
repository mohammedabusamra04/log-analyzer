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

  
  console.log(chalk.bold.yellow("📌 General Stats:"));
  console.log(`  Total Lines   : ${chalk.white(total)}`);
  console.log(`  Parsed        : ${chalk.green(parsed)}`);
  console.log(`  Malformed     : ${chalk.red(malformedCount)}`);
  console.log(`  Error Rate    : ${chalk.red(errorRate + "%")}`);
  console.log(`  Avg Response  : ${chalk.cyan(avgResponseTime + "ms")}\n`);

  
  console.log(chalk.bold.yellow("🔧 HTTP Methods:"));
  Object.entries(methods).forEach(([method, count]) => {
    console.log(`  ${chalk.cyan(method.padEnd(10))} ${count}`);
  });
  console.log();

  
  console.log(chalk.bold.yellow("📋 Status Codes:"));
  Object.entries(statusCodes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([code, count]) => {
      const color =
        code.startsWith("2")
          ? chalk.green
          : code.startsWith("4")
          ? chalk.yellow
          : code.startsWith("5")
          ? chalk.red
          : chalk.white;
      console.log(`  ${color(code.padEnd(10))} ${count}`);
    });
  console.log();