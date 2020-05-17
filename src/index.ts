#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import prog from "commander";
import fs from "fs";
import { Component } from "./component/director";
import { Store } from "./store";

const PACKAGE = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString());
const VERSION: string = PACKAGE.version;
const AUTHOR: string = PACKAGE.author;
const HOMEPAGE: string = PACKAGE.homepage;

clear();

prog.version(VERSION);

prog.command("about")
	.action(() => {
		console.log(chalk.bold.blue(figlet.textSync("Empire", { font: "ANSI Shadow" })));
		console.log(`${chalk.bold.green("Version")}: ${chalk.cyan(VERSION)}`);
		console.log(`${chalk.bold.green("Author")}:\t ${chalk.cyan(AUTHOR)}`);
		console.log(`${chalk.bold.green("GitHub")}:\t ${chalk.cyan(HOMEPAGE)}`);
	})

prog.command("component <name>")
	.alias("c")
	.option("-C, --no-css-module", "Create component with css module.")
	.option("-r, --redux", "Create component for connect to redux store.")
	.action(Component.create);

prog.command("store <name>")
	.alias("s")
	.action(Store.create);

prog.parse(process.argv);
