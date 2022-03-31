import { CommanderStatic } from "commander";
import { ICommand } from "./command.interface";
import { inject, injectable } from "inversify";
import { GenerateService } from "@services/generate.service";
import { GenerateServiceToken } from "@di/types/service.token";

@injectable()
export class GenerateCommand implements ICommand {
	@inject(GenerateServiceToken)
	private readonly _generateService: GenerateService;

	register(app: CommanderStatic): void {
		app.command("generate <schematic> <name> [path]")
			.alias("g")
			.description(
				"Generates a React component based on 👑 Empire rules."
			)
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(schematic: string, name: string, path?: string): void {
		this._generateService.generateComponent({
			schematic: "component",
			name,
			path,
		});
	}
}
