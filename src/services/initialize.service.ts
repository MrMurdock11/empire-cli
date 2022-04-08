import { injectable } from "inversify";
import findRoot from "find-root";
import fse from "fs-extra";
import { join } from "path";
import { path } from "app-root-path";

@injectable()
export class InitializeService {
	store(moduleName: string): void {
		try {
			const targetPath = findRoot(process.cwd());
			const destinationStorePath = join(targetPath, "store");

			const isStoreDirExists = fse.existsSync(destinationStorePath);
			if (isStoreDirExists) {
				throw new Error("store exists.");
			}

			fse.mkdir(destinationStorePath);

			const rootStoreContent = `import { combineReducers } from "redux";

export const rootReducer = combineReducers({});

export type AppState = ReturnType<typeof rootReducer>;`;

			fse.writeFileSync(
				`${destinationStorePath}/index.ts`,
				rootStoreContent
			);
		} catch (error) {
			console.error(error.message);
		}
	}
}
