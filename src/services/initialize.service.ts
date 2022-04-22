import findRoot from "find-root";
import { existsSync, mkdirSync, writeFileSync } from "fs-extra";
import { injectable } from "inversify";
import { join } from "path";

import { STORE } from "../configuration/defaults";

@injectable()
export class InitializeService {
	store(): void {
		try {
			const targetPath = findRoot(process.cwd());
			const destinationStorePath = join(targetPath, "store");

			const isStoreDirExists = existsSync(destinationStorePath);
			if (isStoreDirExists) {
				throw new Error("store exists.");
			}

			mkdirSync(destinationStorePath);

			writeFileSync(
				`${destinationStorePath}/index.ts`,
				STORE.ROOT_REDUCER
			);
		} catch (error) {
			console.error(error.message);
		}
	}
}
