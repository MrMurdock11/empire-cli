import { Store } from "../domains/store";
import fse from "fs-extra";
import { injectable } from "inversify";
import { join } from "path";

@injectable()
export class StoreWriter {
	writer(store: Store): void {
		const {
			name,
			path,
			state,
			keys,
			actionsType,
			actions,
			reducer,
			reducerSpec,
		} = store;
		const storePath = join(path, name);

		const isExists = fse.existsSync(storePath);
		if (isExists) {
			throw new Error("The store you're creating already exists.");
		}

		const storeItems = new Map([
			[`${storePath}/${name}.state.ts`, state],
			[`${storePath}/${name}.keys.ts`, keys],
			[`${storePath}/${name}.actions.type.ts`, actionsType],
			[`${storePath}/${name}.actions.ts`, actions],
			[`${storePath}/${name}.reducer.ts`, reducer],
			[`${storePath}/${name}.reducer.spec.ts`, reducerSpec],
		]);

		fse.mkdirSync(storePath);

		storeItems.forEach((content, path) => fse.writeFileSync(path, content));
	}
}
