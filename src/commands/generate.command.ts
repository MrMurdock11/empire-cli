import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";

import { ActionsProviderToken } from "@di/tokens";

import { IAction } from "@actions/action.interface";

import { ICommand } from "./command.interface";

/**
 * Generate command class {@link ICommand}.
 *
 * @export
 * @class GenerateCommand
 * @implements {ICommand}
 */
@injectable()
export class GenerateCommand implements ICommand {
	/**
	 * Command type.
	 *
	 * @private
	 * @memberof GenerateCommand
	 */
	private static readonly COMMAND_TYPE = "generate";

	/**
	 * Creates an instance of GenerateCommand.
	 *
	 * @param {(actionName: string) => IAction} actionsProvider Actions provider used to find the required action instance.
	 * @memberof GenerateCommand
	 */
	constructor(
		@inject(ActionsProviderToken)
		private readonly actionsProvider: (actionName: string) => IAction
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

		const action = this.actionsProvider(
			`${GenerateCommand.COMMAND_TYPE}:${schematic}`
		);
		action.execute(inputs);
	}
}
