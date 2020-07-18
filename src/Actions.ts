import chalk from "chalk";
import "reflect-metadata";
import { Utils } from "./shared/Utils";
import DIContainer from "./DIContainer";
import { useDirTree } from "./shared/DirTree";
import { ComponentService } from "./services/ComponentService";
import { FileSystemService } from "./services/FileSystemService";
import { ComponentCommandOptions } from "./options/ComponentCommandOptions";

const componentService = DIContainer.resolve<ComponentService>(ComponentService);
const fileSystemService = DIContainer.resolve<FileSystemService>(FileSystemService);

/**
 * Выводит в консоль сообщение об ошибке.
 *
 * @param {Error} exception Объект с информацией об ошибке.
 */
const logError = (exception: Error): void => {
	if (exception instanceof Error) {
		console.log(chalk.red(exception.stack));
	}
}

/**
 * Создает компонент.
 *
 * @returns {Promise<void>}
 */
// TODO: Не передавать CommandOptions дальше метода действия.
async function createComponentAndWriteFileSystem(originComponentName: string, options: ComponentCommandOptions): Promise<void> {
	try {
		const component = await componentService.create(originComponentName, options);
		fileSystemService.writeComponent(component);

		console.log(chalk.bold.cyan(`\nDirectory structure [${component.validName}]:\n`));
		console.log(useDirTree(Utils.determineDestinationPath(component.validName)));
	} catch (exception) {
		logError(exception);
	}
}

async function createStoreAndWriteFileSystem(originalStoreName: string): Promise<void> {
	try {

	} catch(exception) {
		logError(exception);
	}
}

export { createComponentAndWriteFileSystem };
