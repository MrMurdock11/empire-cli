import { CommanderStatic } from "commander";
import { ICommand } from "./command.interface";
import { inject, injectable } from "inversify";
import { GenerateService } from "@services/generate.service";
import { GenerateServiceToken } from "@di/types/service.token";
import { EmpireCollection } from "../schematics/empire.collection";

@injectable()
export class GenerateCommand implements ICommand {
	@inject(GenerateServiceToken)
	private readonly _generateService: GenerateService;

	register(app: CommanderStatic): void {
		app.command("generate <schematic> <name> [path]")
			.alias("g")
			.description(
				"Generates and/or modifies files based on a schematic."
			)
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(schematic: string, name: string, path?: string): void {
		const key = EmpireCollection.find(schematic);
		switch (key) {
			case "component": {
				this._generateService.component({
					schematic: key,
					name,
					path,
				});

				break;
			}
			case "store":
				this._generateService.store({
					schematic: key,
					name,
				});
				break;
			default:
				throw new Error("Indicated a unsupported schematic.");
		}
	}
}
