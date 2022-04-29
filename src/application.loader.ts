import { CommanderStatic } from "commander";
import { forEach } from "lodash";

import DIContainer from "@di/inversify.config";
import { ICommandToken } from "@di/tokens/commands.token";

import { ICommand } from "./commands/command.interface";

/**
 * Application loader class.
 *
 * @export
 * @class ApplicationLoader
 */
export class ApplicationLoader {
	/**
	 * Loads and registers commands in the application.
	 *
	 * @static
	 * @param {CommanderStatic} app Commander instance.
	 * @memberof ApplicationLoader
	 */
	static load(app: CommanderStatic): void {
		const commands = DIContainer.getAll<ICommand>(ICommandToken);

		forEach(commands, command => command.register(app));
	}
}

