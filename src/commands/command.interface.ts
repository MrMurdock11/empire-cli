import { CommanderStatic } from "commander";

export interface ICommand {
	register(app: CommanderStatic): void;
}
