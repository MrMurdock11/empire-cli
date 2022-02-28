import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";
import { injectable } from "inversify";
import { map } from "lodash";
import { StoreTemplate } from "../models/store-template.model";
import { IStoreProvider } from "./interfaces/store.provider.interface";

/**
 * Поставщик шаблонов для хранилища.
 *
 * @export
 * @class StoreProvider
 * @implements {IStoreProvider}
 */
@injectable()
export class StoreProvider implements IStoreProvider {
	/**
	 * Путь к архиву с шаблонами.
	 *
	 * @private
	 * @memberof StoreProvider
	 */
	private readonly archivePath = path.join(
		__dirname,
		"/archive/templates.zip"
	);

	/**
	 * Архиватор.
	 *
	 * @private
	 * @type {AdmZip}
	 * @memberof StoreProvider
	 */
	private readonly zipper: AdmZip;

	constructor() {
		this.zipper = new AdmZip(fs.readFileSync(this.archivePath));
	}

	/** @inheritdoc */
	public getTemplates(): StoreTemplate {
		const template = new StoreTemplate();
		const paths = [
			"store/keys.txt",
			`store/actions.txt`,
			"store/action-types.txt",
			"store/reducer.txt",
			"store/reducer-test.txt",
			"store/state.txt",
		];
		const [keys, actions, actionTypes, reducer, reducerTest, state] = map(
			paths,
			(path) => this.zipper.readAsText(this.zipper.getEntry(path))
		);

		template.keys = keys;
		template.actions = actions;
		template.actionTypes = actionTypes;
		template.reducer = reducer;
		template.reducerTest = reducerTest;
		template.state = state;

		return template;
	}

	/** @inheritdoc */
	public getRootTemplate(): string {
		return this.zipper.readAsText(this.zipper.getEntry("store/root.txt"));
	}
}
