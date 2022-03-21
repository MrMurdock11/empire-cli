import { CommanderStatic } from "commander";
import { ICommand } from "./command.interface";
import { injectable } from "inversify";
import { GenerateService } from "services/generate.service";

@injectable()
export class GenerateCommand implements ICommand {
	private readonly _generateService: GenerateService;

	register(app: CommanderStatic): void {
		app.command("generate <schematic> <name> [path]")
			.alias("g")
			.description(
				"Generates a React component based on 👑 Empire rules."
			)
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(name: string, path?: string): void {
		this._generateService.generateComponent({
			schematic: "component",
			name,
			path,
		});
	}
}
