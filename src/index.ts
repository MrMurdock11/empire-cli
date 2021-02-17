#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import application from "commander";
import { TYPE } from "./di/types/command.types";
import DIContainer from "./di/inversify.config";
import { ICommand } from "./commands/command.interface";

const bootstrap = () => {
	const PACKAGE_JSON = require(`${__dirname}/../package.json`);
	const VERSION = PACKAGE_JSON.version;
	const AUTHOR = PACKAGE_JSON.author;
	const HOMEPAGE = PACKAGE_JSON.homepage;

	const command = DIContainer.get<ICommand>(TYPE.ICommand);

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

	application
		.command("generate component <name>")
		.alias("gc")
		.option("-C, --no-css-module", "Generate component without css-module.")
		.option("-r, --redux", "Generate component for connect to redux store.")
		.action(command.execute);

	application
		.command("generate store <name>")
		.alias("gs")
		.action(() => void 0);

	if (!process.argv.slice(2).length) {
		application.outputHelp();
	}

	application.parse(process.argv);
};

bootstrap();
