import { injectable } from "inversify";
import findRoot from "find-root";
import fse from "fs-extra";
import { join } from "path";
import { STORE } from "../configuration/defaults";

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

			fse.writeFileSync(
				`${destinationStorePath}/index.ts`,
				STORE.ROOT_REDUCER
			);
		} catch (error) {
			console.error(error.message);
		}
	}
}
