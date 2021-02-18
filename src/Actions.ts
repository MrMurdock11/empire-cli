import chalk from "chalk";
// import _ from "lodash";
import "reflect-metadata";
import { Utils } from "./shared/Utils";
import DIContainer from "./di/inversify.config";
import { useDirTree } from "./shared/DirTree";
import { FileSystemService } from "./services/file-system.service";
import { GenerateComponentOptions } from "./options/generate-component.options";
import { IComponentService } from "./services/interfaces/component-service.interface";
import { IStoreService } from "./services/interfaces/store-service.interface";

// const componentService = DIContainer.get<IComponentService>(
// 	containerTypes.COMPONENT_SERVICE
// );
// const storeService = DIContainer.get<IStoreService>(
// 	containerTypes.STORE_SERVICE
// );
// const fileSystemService = DIContainer.get<FileSystemService>(
// 	containerTypes.FILE_SYSTEM_SERVICE
// );

/**
 * Выводит в консоль сообщение об ошибке.
 *
 * @param {Error} error Объект с информацией об ошибке.
 */
const logError = (error: Error): void => {
	if (error instanceof Error) {
		console.log(chalk.red(error.stack));
	}
};

/**
 * Создает компонент.
 *
 * @returns {Promise<void>}
 */
// TODO: Не передавать CommandOptions дальше метода действия.
async function createComponentAndWriteFileSystem(
	name: string,
	options: GenerateComponentOptions
): Promise<void> {
	try {
		// const component = await componentService.create(name, options);
		// fileSystemService.writeComponent(component);
		// console.log(
		// 	chalk.bold.cyan(`\nDirectory structure [${component.name}]:\n`)
		// );
		// console.log(useDirTree(Utils.determineDestinationPath(component.name)));
	} catch (exception) {
		logError(exception);
	}
}

// async function createStoreAndWriteFileSystem(
// 	originalStoreName: string
// ): Promise<void> {
// 	try {
// 		const store = await storeService.create(originalStoreName);
// 		fileSystemService.writeStore(store);

// 		console.log(
// 			chalk.bold.cyan(`\nDirectory structure [${store.validName}]:\n`)
// 		);
// 		console.log(
// 			useDirTree(Utils.determineDestinationPath(store.validName))
// 		);
// 	} catch (exception) {
// 		logError(exception);
// 	}
// }
