import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";

import { ActionsProviderToken } from "@di/tokens";

import { IAction } from "@actions/action.interface";

import { ICommand } from "./command.interface";

/**
 * Generate command class.
 *
 * @export
 * @class GenerateCommand
 * @implements {ICommand}
 */
@injectable()
export class GenerateCommand implements ICommand {
	/**
	 * Command name.
	 *
	 * @private
	 * @memberof GenerateCommand
	 */
	private readonly _command = "generate";

	/**
	 * Creates an instance of GenerateCommand.
	 *
	 * @param {(actionName: string) => IAction} _actionsProvider Actions provider.
	 * @memberof GenerateCommand
	 */
	constructor(
		@inject(ActionsProviderToken)
		private readonly _actionsProvider: (actionName: string) => IAction
	) {}

	/** @inheritdoc */
	register(app: CommanderStatic): void {
		// TODO: Move [path] argument to options.
		app.command("generate <schematic> <name> [path]")
			.alias("g")
			.description(
				"Generates and/or modifies files based on a schematic."
			)
			.action(this.actionPreset.bind(this));
	}

	/**
	 * Prepares inputs for an action instance.
	 *
	 * @private
	 * @param {TSchematicName} schematic Schematic name.
	 * @param {string} name Name.
	 * @param {string} [path] Path to the place of generation.
	 * @memberof GenerateCommand
	 */
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
