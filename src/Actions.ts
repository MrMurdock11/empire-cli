import chalk from "chalk";
import "reflect-metadata";
import { Utils } from "./shared/Utils";
// import "reflect-metadata";
import DIContainer from "./DIContainer";
import { useDirTree } from "./shared/DirTree";
import { FileSystemService } from "./services/FileSystemService";
import { ComponentCommandOptions } from "./options/ComponentCommandOptions";
import { IComponentService } from "./services/IComponentService";
import { IStoreService } from "./services/IStoreService";
import { containerTypes } from "./ContainerTypes";

const componentService = DIContainer.get<IComponentService>(containerTypes.COMPONENT_SERVICE);
const storeService = DIContainer.get<IStoreService>(containerTypes.STORE_SERVICE);
const fileSystemService = DIContainer.get<FileSystemService>(containerTypes.FILE_SYSTEM_SERVICE);

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
		const store = await storeService.create(originalStoreName);
		fileSystemService.writeStore(store);
		
		console.log(chalk.bold.cyan(`\nDirectory structure [${store.validName}]:\n`));
		console.log(useDirTree(Utils.determineDestinationPath(store.validName)));
	} catch(exception) {
		logError(exception);
	}
}

export { createComponentAndWriteFileSystem, createStoreAndWriteFileSystem };
