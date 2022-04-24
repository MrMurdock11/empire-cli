import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";

import { ActionsProviderToken } from "@di/tokens";

import { IAction } from "@actions/action.interface";

import { ICommand } from "./command.interface";

@injectable()
export class InitCommand implements ICommand {
	private readonly _command = "init";

	constructor(
		@inject(ActionsProviderToken)
		private readonly _actionsProvider: (actionName: string) => IAction
	) {}

	register(app: CommanderStatic): void {
		app.command("init [module-name]")
			.alias("in")
			.description("Initializes a module.")
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(moduleName?: string): void {
		// TODO: Remove forced initialization of moduleName when adding other module than "store".
		moduleName = "store";
		const inputs: TInputCollection = [];

		const action = this._actionsProvider(`${this._command}:${moduleName}`);
		action.execute(inputs);
	}
}
