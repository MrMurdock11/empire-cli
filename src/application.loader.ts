import DIContainer from "@di/inversify.config";
import { CommandToken } from "@di/types/command.token";
import { CommanderStatic } from "commander";
import { forEach } from "lodash";
import { ICommand } from "./commands/command.interface";

export class ApplicationLoader {
	static load(app: CommanderStatic): void {
		const commands = DIContainer.getAll<ICommand>(CommandToken);

		forEach(commands, command => command.register(app));
	}
}
