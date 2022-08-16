import findRoot from "find-root";
import { normalize } from "path";
import { cwd } from "process";

import { ConfigProvider } from "../providers/config.provider";

export interface ResolvePathService {
	sourcePath(): string;
}

export class ResolvePathServiceImpl implements ResolvePathService {
	private readonly config: ConfigProvider;

	sourcePath(): string {
		const rootPath = this.rootPath();

		return normalize(`${rootPath}/${this.config.getSourceDirName()}`);
	}

	rootPath(): string {
		return findRoot(cwd());
	}
}
