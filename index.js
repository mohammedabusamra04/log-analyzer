const { program } = require("commander");
const path = require("path");
const { parseFile } = require("./src/parser");
const { analyze } = require("./src/analyzer");
const { report } = require("./src/reporter");

program
  .name("log-analyzer")
  .description("Analyzes server log files and produces useful output")
  .version("1.0.0");

program
  .requiredOption("-f, --file <path>", "Path to the log file")
  .action(async (options) => {
    const filePath = path.resolve(options.file);

    console.log(`\nAnalyzing: ${filePath}\n`);

    try {
      const results = await parseFile(filePath);
      const analysis = analyze(results);
      report(analysis);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

program.parse();