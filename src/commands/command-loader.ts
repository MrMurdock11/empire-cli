import DIContainer from "@di/inversify.config";
import { CommandToken } from "@di/types/command.token";
import { CommanderStatic } from "commander";
import { injectable, multiInject } from "inversify";
import { forEach } from "lodash";
import { ICommand } from "./command.interface";

export class CommandLoader {
	static load(app: CommanderStatic): void {
		const commands = DIContainer.getAll<ICommand>(CommandToken);

		forEach(commands, (command) => command.register(app));
	}
}
