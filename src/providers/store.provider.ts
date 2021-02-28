import AdmZip from "adm-zip";
import fs from "fs";
import { injectable } from "inversify";
import _ from "lodash";
import { StoreTemplate } from "../models/store-template.model";
import { IStoreProvider } from "./interfaces/store.provider.interface";

@injectable()
export class StoreProvider implements IStoreProvider {
	private readonly archivePath = `${__dirname}/../archive/templates.zip`;
	private readonly admZip: AdmZip;

	constructor() {
		this.admZip = new AdmZip(fs.readFileSync(this.archivePath));
	}

	getTemplates(): StoreTemplate {
		const template = new StoreTemplate();
		const paths = [
			"store/keys.txt",
			`store/actions.txt`,
			"store/action-types.txt",
			"store/reducer.txt",
			"store/reducer-test.txt",
			"store/state.txt",
		];
		const [
			keys,
			actions,
			actionTypes,
			reducer,
			reducerTest,
			state,
		] = _.map(paths, path =>
			this.admZip.readAsText(this.admZip.getEntry(path))
		);

		template.keys = keys;
		template.actions = actions;
		template.actionTypes = actionTypes;
		template.reducer = reducer;
		template.reducerTest = reducerTest;
		template.state = state;

		return template;
	}

	public getRootTemplate(): string {
		return this.admZip.readAsText(this.admZip.getEntry("store/root.txt"));
	}
}
