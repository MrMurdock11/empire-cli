import { CommanderStatic } from "commander";

/**
 * Command interface.
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
	/**
	 * Registers command in the application.
	 *
	 * @param {CommanderStatic} app Commander instance.
	 * @memberof ICommand
	 */
	register(app: CommanderStatic): void;
}
