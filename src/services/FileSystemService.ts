import fs from "fs";
import { injectable } from "inversify";
import { Utils } from "../shared/Utils";
import { Component } from "../modules/Component";
import { Store } from "../modules/Store";
import { FileSystemError } from "../shared/errors/FileSystemError";
import { IFileSystemService } from "./interfaces/IFileSystemService";

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
		const {
			name,
			bridgeFileContent,
			containerFileContent,
			presentationFileContent,
			styleFileContent,
		} = component;
		const destinationPath = Utils.determineDestinationPath(name);

		if (fs.existsSync(destinationPath)) {
			throw new FileSystemError("Создаваемый компонент уже существует.");
		}

		fs.mkdirSync(destinationPath);

		fs.writeFileSync(`${destinationPath}/index.ts`, bridgeFileContent);
		fs.writeFileSync(
			`${destinationPath}/${name}.tsx`,
			containerFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${name}.view.tsx`,
			presentationFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${name}.style.css`,
			styleFileContent
		);
	}

	public writeStore(store: Store): void {
		const { validName } = store;
		const destinationPath = `${process.cwd()}/${validName}`;

		if (fs.existsSync(destinationPath)) {
			throw new FileSystemError("Создавамое хранилище уже существует.");
		}

		fs.mkdirSync(destinationPath);

		fs.writeFileSync(
			`${destinationPath}/${validName}.keys.ts`,
			store.keysFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${validName}.actions.ts`,
			store.actionsFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${validName}.actions.type.ts`,
			store.actionsTypeFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${validName}.reducer.ts`,
			store.reducersFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${validName}.reducer.test.ts`,
			store.reducersTestFileContent
		);
		fs.writeFileSync(
			`${destinationPath}/${validName}.state.ts`,
			store.stateFileContent
		);

		this.appendToRootReducer(store.validName);
	}

	private appendToRootReducer(name: string): void {
		const cwd = process.cwd();
		const reducerName = name.charAt(0).toLowerCase() + name.slice(1);

		if (!fs.existsSync(`${cwd}/index.ts`)) {
			console.log("Ненайден корневой reducer.");
		}

		let root = fs.readFileSync(`${cwd}/index.ts`).toString();

		let referencePoint = 0;
		let appendIndex = 0;

		referencePoint = root.lastIndexOf("import");
		appendIndex = root.indexOf(";", referencePoint);

		root =
			root.slice(0, appendIndex + 1) +
			`\nimport { ${reducerName} } from "./${name}/${name}.reducer";` +
			root.slice(appendIndex + 1);

		referencePoint = root.indexOf("combineReducers({");
		appendIndex = root.indexOf("});", referencePoint);

		root =
			root.slice(0, appendIndex) +
			`\t${reducerName},\n` +
			root.slice(appendIndex);

		fs.writeFileSync(`${cwd}/index.ts`, root);
	}
}
