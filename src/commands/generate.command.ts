import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";

import { ActionsProviderToken } from "@di/tokens";

import { IAction } from "@actions/action.interface";

import { ICommand } from "./command.interface";

@injectable()
export class GenerateCommand implements ICommand {
	private readonly _command = "generate";

	constructor(
		@inject(ActionsProviderToken)
		private readonly _actionsProvider: (actionName: string) => IAction
	) {}

	register(app: CommanderStatic): void {
		app.command("generate <schematic> <name> [path]")
			.alias("g")
			.description(
				"Generates and/or modifies files based on a schematic."
			)
			.action(this.actionPreset.bind(this));
	}

	private actionPreset(
		schematic: TSchematicName,
		name: string,
		path?: string
	): void {
		const inputs: TInputCollection = [];

		inputs.push(
			{ name: "name", value: name },
			{ name: "path", value: path }
		);

		const action = this._actionsProvider(`${this._command}:${schematic}`);
		action.execute(inputs);
	}
}
