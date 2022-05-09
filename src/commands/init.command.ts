import { CommanderStatic } from "commander";
import { inject, injectable } from "inversify";

import { ActionsProviderToken } from "@di/tokens";

import { IAction } from "@actions/action.interface";

import { ICommand } from "./command.interface";

/**
 * Initialization command class {@link ICommand}.
 *
 * @export
 * @class InitCommand
 * @implements {ICommand}
 */
@injectable()
export class InitCommand implements ICommand {
	/**
	 * Command name.
	 *
	 * @private
	 * @memberof InitCommand
	 */
	private static readonly COMMAND_TYPE = "init";

	/**
	 * Creates an instance of InitCommand.
	 *
	 * @param {(actionName: string) => IAction} actionsProvider Actions provider used to find the required action instance.
	 * @memberof InitCommand
	 */
	constructor(
		@inject(ActionsProviderToken)
		private readonly actionsProvider: (actionName: string) => IAction
	) {}

	/** @inheritdoc */
	register(app: CommanderStatic): void {
		app.command("init [module-name]")
			.alias("in")
			.description("Initializes a module.")
			.action(this.actionPreset.bind(this));
	}

	/**
	 * Prepares inputs for an action instance.
	 *
	 * @private
	 * @param {string} [moduleName] Module name.
	 * @memberof InitCommand
	 */
	private actionPreset(moduleName?: string): void {
		// TODO: Remove forced initialization of moduleName when adding other module than "store".
		moduleName = "store";
		const inputs: TInputCollection = [];

		const action = this.actionsProvider(
			`${InitCommand.COMMAND_TYPE}:${moduleName}`
		);
		action.execute(inputs);
	}
}
