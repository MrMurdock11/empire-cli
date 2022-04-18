import boxen from "boxen";
import { green } from "chalk";
import app from "commander";
import { readFileSync } from "fs";
import { join } from "path";
import "reflect-metadata";
import { getBanner } from "ui/banner";
import { EMOJIS } from "ui/emojis";

import { ApplicationLoader } from "./application.loader";

const bootstrap = () => {
	const packageJsonContent = readFileSync(
		join(__dirname, "../package.json")
	).toString();
	const { version } = JSON.parse(packageJsonContent);

	app.version(
		boxen(
			`${getBanner()}\n${EMOJIS.FOOTPRINTS} ${green(
				`version: ${version}`
			)}`,
			{
				borderColor: "green",
				borderStyle: "round",
				padding: 1,
			}
		),
		"-v, --version",
		"Output the current version."
	)
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	ApplicationLoader.load(app);

	if (!process.argv.slice(2).length) {
		app.outputHelp();
	}

	app.parse(process.argv);
};

bootstrap();
