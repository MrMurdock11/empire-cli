import { join } from "path";
import { readFileSync, writeFileSync } from "fs-extra";
import { injectable } from "inversify";
import { upperFirst } from "lodash";

@injectable()
export class ModifyService {
	public addStoreReducerToRootReducer(
		projectRootPath: string,
		storeItemName: string
	) {
		const rootReducerFilePath = join(projectRootPath, "store", "index.ts");
		let rootReducerContent = readFileSync(rootReducerFilePath).toString();
		let referencePoint = 0;
		let appendIndex = 0;

		referencePoint = rootReducerContent.lastIndexOf("import");
		appendIndex = rootReducerContent.indexOf(";", referencePoint);

		rootReducerContent =
			rootReducerContent.slice(0, appendIndex + 1) +
			`\nimport { ${storeItemName}Reducer } from "./${upperFirst(
				storeItemName
			)}/${upperFirst(storeItemName)}.reducer";` +
			rootReducerContent.slice(appendIndex + 1);

		referencePoint = rootReducerContent.indexOf("combineReducers({");
		appendIndex = rootReducerContent.indexOf("});", referencePoint);

		const isFirstReducer = /combineReducers\({}\)/g.test(
			rootReducerContent
		);
		rootReducerContent =
			rootReducerContent.slice(0, appendIndex) +
			`${isFirstReducer ? "\n" : ""}\t${storeItemName}Reducer,\n` +
			rootReducerContent.slice(appendIndex);

		writeFileSync(rootReducerFilePath, rootReducerContent);
	}
}
