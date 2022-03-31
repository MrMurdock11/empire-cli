import { Component } from "../domains/component";
import fs from "fs";
import { injectable } from "inversify";
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

	/** @inheritdoc */
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
		const path = `${this.directory}/${name}`;

		if (fs.existsSync(path)) {
			throw new FileSystemError("Создаваемое хранилище уже существует.");
		}

		const storeItems = new Map([
			[`${path}/${name}.keys.ts`, keys],
			[`${path}/${name}.actions.ts`, actions],
			[`${path}/${name}.actions.type.ts`, actionTypes],
			[`${path}/${name}.reducer.ts`, reducer],
			[`${path}/${name}.reducer.test.ts`, reducerTest],
			[`${path}/${name}.state.ts`, state],
		]);

		fs.mkdirSync(path);

		storeItems.forEach((content, path) => fs.writeFileSync(path, content));

		this.appendStoreReducerToRootReducer(name);
	}

	/** @inheritdoc */
	public writeRootStore(rootTemplate: string): void {
		const directory = `${this.directory}/store`;
		const path = `${this.directory}/store/index.ts`;

		if (fs.existsSync(path)) {
			throw new FileSystemError("Хранилище уже проинициализировано.");
		}

		fs.mkdirSync(directory);
		fs.writeFileSync(path, rootTemplate);
	}

	/**
	 * Добавляет редуктор хранилища в корневой редуктор.
	 *
	 * @private
	 * @param {string} name Наименование хранилища.
	 * @memberof FileSystemService
	 */
	private appendStoreReducerToRootReducer(name: string): void {
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
}
