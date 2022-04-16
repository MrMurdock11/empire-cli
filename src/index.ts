import "reflect-metadata";
import app from "commander";
import path from "path";
import fs from "fs";
import { ApplicationLoader } from "./application.loader";

const bootstrap = () => {
	const packageJsonContent = fs
		.readFileSync(path.join(__dirname, "../package.json"))
		.toString();
	const { version } = JSON.parse(packageJsonContent);

	app.version(version, "-v, --version", "Output the current version.")
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	ApplicationLoader.load(app);

	if (!process.argv.slice(2).length) {
		app.outputHelp();
	}

	app.parse(process.argv);
};

bootstrap();
