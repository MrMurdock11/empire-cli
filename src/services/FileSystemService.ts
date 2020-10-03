import fs from "fs";
import { injectable } from "inversify";
import { Utils } from "../shared/Utils";
import { Component } from "../modules/Component";
import { Store } from "../modules/Store";
import { FileSystemError } from "../shared/errors/FileSystemError";
import { IFileSystemService } from "./IFileSystemService";

/**
 * Служба для работы с файловой системой.
 *
 * @export
 * @class FileSystemService
 */
@injectable()
export class FileSystemService implements IFileSystemService {
	/**
	 * Записывает компонент в файловую систему.
	 *
	 * @param {Component} component Компонент.
	 * @memberof FileSystemService
	 */
	public writeComponent(component: Component): void {
		const destinationPath = Utils.determineDestinationPath(component.name);

		if (fs.existsSync(destinationPath)) {
			throw new FileSystemError("Создаваемый компонет уже существует.");
		}
		
		fs.mkdirSync(destinationPath);

		fs.writeFileSync(`${destinationPath}/index.ts`, component.bridgeFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.tsx`, component.containerFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.view.tsx`, component.presentationFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.style.css`, component.styleFileContent);
	}

	public writeStore(store: Store): void {
		const {validName} = store;
		const destinationPath = `${process.cwd()}/${validName}`;

		if (fs.existsSync(destinationPath)) {
			throw new FileSystemError("Создавамое хранилище уже существует.");
		}
		
		fs.mkdirSync(destinationPath);

		fs.writeFileSync(`${destinationPath}/${validName}.keys.ts`, store.keysFileContent);
		fs.writeFileSync(`${destinationPath}/${validName}.actions.ts`, store.actionsFileContent);
		fs.writeFileSync(`${destinationPath}/${validName}.actions.type.ts`, store.actionsTypeFileContent);
		fs.writeFileSync(`${destinationPath}/${validName}.reducer.ts`, store.reducersFileContent);
		fs.writeFileSync(`${destinationPath}/${validName}.reducer.test.ts`, store.reducersTestFileContent);
		fs.writeFileSync(`${destinationPath}/${validName}.state.ts`, store.stateFileContent);
	}
}