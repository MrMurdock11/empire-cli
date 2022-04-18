import { InitializeServiceToken } from "@di/tokens/services.token";
import { InitializeService } from "@services/initialize.service";
import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";
import { ICommand } from "./command.interface";

@injectable()
export class InitCommand implements ICommand {
	@inject(InitializeServiceToken)
	private readonly _service: InitializeService;

	register(app: CommanderStatic): void {
		app.command("init <module-name>")
			.alias("in")
			.description("Initializes module based on module name.")
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(moduleName: string): void {
		this._service.store(moduleName);
	}
}
