import application, { Option } from "commander";
import path from "path";
import fs from "fs";
import { generateComponent } from "./actions/component.actions";
import { generateStore, initStore } from "./actions/store.actions";

const bootstrap = () => {
	const packageJsonContent = fs
		.readFileSync(path.join(__dirname, "package.json"))
		.toString();
	const { version } = JSON.parse(packageJsonContent);

	application
		.version(version, "-v, --version", "Output the current version.")
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

	application
		.command("component <name>")
		.alias("c")
		.option("-C, --no-css-module", "Generate component without css-module.")
		.action(generateComponent);

	application.command("store <name>").alias("s").action(generateStore);

	application.command("new store").alias("ns").action(initStore);

	if (!process.argv.slice(2).length) {
		application.outputHelp();
	}

	application.parse(process.argv);
};

bootstrap();
