import Configstore from "configstore";
import { readFileSync } from "fs-extra";

export interface ConfigProvider {
	getSourceDirName(): string;
}

export class ConfigProviderImpl implements ConfigProvider {
	private readonly config: Configstore;

	constructor() {
		const configFile = JSON.parse(readFileSync("./empirerc").toString());
		this.config = new Configstore("", configFile);
	}

	getSourceDirName(): string {
		return this.config.get("sourceDir");
	}
}
