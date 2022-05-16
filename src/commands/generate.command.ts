import { Command, CommanderStatic } from "commander";
import { inject, injectable } from "inversify";
import { normalize } from "path";

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
		app.command("generate <schematic> <name>")
			.alias("g")
			.option(
				"-p, --path <path>",
				"the path where an entity is generated"
			)
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
		options: { path: string },
		command: Command
	): void {
		const inputs: TInputCollection = [];

		inputs.push(
			{ name: "name", value: name },
			{ name: "path", value: options.path && normalize(options.path) }
		);

		const action = this.actionsProvider(`${command.name()}:${schematic}`);
		action.execute(inputs);
	}
}
