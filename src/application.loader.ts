import { CommanderStatic } from "commander";
import { forEach } from "lodash";

import DIContainer from "@di/inversify.config";
import { ICommandToken } from "@di/tokens/commands.token";

import { ICommand } from "./commands/command.interface";

export class ApplicationLoader {
	static load(app: CommanderStatic): void {
		const commands = DIContainer.getAll<ICommand>(ICommandToken);

		forEach(commands, command => command.register(app));
	}
}
