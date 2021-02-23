#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import application, { Option } from "commander";
import { generateComponent } from "./actions/component.actions";
import { generateStore } from "./actions/store.actions";

const bootstrap = () => {
	const PACKAGE_JSON = require(`${__dirname}/../package.json`);
	const VERSION = PACKAGE_JSON.version;
	const AUTHOR = PACKAGE_JSON.author;
	const HOMEPAGE = PACKAGE_JSON.homepage;

	application
		.version(VERSION, "-v, --version", "Output the current version.")
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	application.command("show-off").action(() => {
		const SIGN = figlet.textSync("Empire", { font: "ANSI Shadow" });

		console.log(chalk.bold.blue(SIGN));
		console.log(`${chalk.bold.green("Author")}:\t ${chalk.cyan(AUTHOR)}`);
		console.log(`${chalk.bold.green("GitHub")}:\t ${chalk.cyan(HOMEPAGE)}`);
	});

	const option = new Option(
		"-r, --redux <type>",
		"Generate component for connect to redux store."
	);

	application
		.command("component <name>")
		.alias("c")
		.option("-C, --no-css-module", "Generate component without css-module.")
		.addOption(option.choices(["state", "dispatch", "both"]))
		.action(generateComponent);

	application.command("store <name>").alias("s").action(generateStore);

	if (!process.argv.slice(2).length) {
		application.outputHelp();
	}

	application.parse(process.argv);
};

bootstrap();
