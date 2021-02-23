import fs from "fs";
import { injectable } from "inversify";
import { Component } from "../models/сomponent.model";
import { Store } from "../models/store.model";
import { FileSystemError } from "../shared/errors/file-system.error";
import { IFileSystemService } from "./interfaces/file-system-service.interface";

/**
 * Служба для работы с файловой системой.
 *
 * @export
 * @class FileSystemService
 */
@injectable()
export class FileSystemService implements IFileSystemService {
	constructor(private directory: string) {}

	/**
	 * Записывает компонент в файловую систему.
	 *
	 * @param {Component} component Компонент.
	 * @memberof FileSystemService
	 */
	public writeComponent(component: Component): void {
		const { name, bridge, container, presentation, styles } = component;
		const preparedDirectory = this.prepareDirectoryForComponent();
		const directory = `${preparedDirectory}/${component.name}`;

		if (fs.existsSync(directory)) {
			throw new FileSystemError("Создаваемый компонент уже существует.");
		}

		const dictionary = new Map([
			[`${directory}/index.ts`, bridge],
			[`${directory}/${name}.tsx`, container],
			[`${directory}/${name}.view.tsx`, presentation],
			[`${directory}/${name}.style.css`, styles],
		]);

		fs.mkdirSync(directory);

		dictionary.forEach((path, content) => fs.writeFileSync(path, content));
	}

	public writeStore(store: Store): void {
		const {
			name,
			keys,
			actions,
			actionTypes,
			reducer,
			reducerTest,
			state,
		} = store;
		const directory = `${this.directory}/${name}`;

		if (fs.existsSync(directory)) {
			throw new FileSystemError("Создавамое хранилище уже существует.");
		}

		const dictionary = new Map([
			[`${directory}/${name}.keys.ts`, keys],
			[`${directory}/${name}.actions.ts`, actions],
			[`${directory}/${name}.actions.type.ts`, actionTypes],
			[`${directory}/${name}.reducer.ts`, reducer],
			[`${directory}/${name}.reducer.test.ts`, reducerTest],
			[`${directory}/${name}.state.ts`, state],
		]);

		fs.mkdirSync(directory);

		dictionary.forEach((path, content) => fs.writeFileSync(path, content));

		this.appendToRootReducer(name);
	}

	private appendToRootReducer(name: string): void {
		const reducerName = name.charAt(0).toLowerCase() + name.slice(1);

		if (!fs.existsSync(`${this.directory}/index.ts`)) {
			console.log("Не найден корневой reducer.");
		}

		let root = fs.readFileSync(`${this.directory}/index.ts`).toString();

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

		fs.writeFileSync(`${this.directory}/index.ts`, root);
	}

	private prepareDirectoryForComponent(): string {
		const isComponentFolder = fs
			.readdirSync(this.directory)
			.some(it => /\.(j|t)sx$/gm.test(it));

		if (!isComponentFolder) {
			return `${this.directory}`;
		}

		if (!fs.existsSync("childs")) {
			fs.mkdirSync("childs");
		}

		return `${this.directory}/childs`;
	}
}
