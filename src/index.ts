import application, { Option } from "commander";
import path from "path";
import { generateComponent } from "./actions/component.actions";
import { generateStore, initStore } from "./actions/store.actions";

const bootstrap = () => {
	const { version } = require(path.join(__dirname, "package.json"));

	application
		.version(version, "-v, --version", "Output the current version.")
		.usage("<command> [options]")
		.helpOption("-h, --help", "Output usage information.");

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

	application.command("new store").alias("ns").action(initStore);

	if (!process.argv.slice(2).length) {
		application.outputHelp();
	}

	application.parse(process.argv);
};

bootstrap();
