import { execSync } from "child_process";
import { injectable } from "inversify";
import { filter, join, map } from "lodash";
import ora from "ora";

import { InteractiveService } from "./interactive.service";

export type ReduxTarget = "core" | "toolkit";
type DependencyInfo = {
	name: string;
	version: string;
	target: ReduxTarget;
};
const ALLOWED_DEPENDENCIES: DependencyInfo[] = [
	{
		name: "redux",
		version: "4.2.0",
		target: "core",
	},
	{
		name: "react-redux",
		version: "8.0.2",
		target: "core",
	},
	{
		name: "@reduxjs/toolkit",
		version: "1.8.2",
		target: "toolkit",
	},
];

export interface InstallerService {
	getAllowedDeps(target: ReduxTarget): DependencyInfo[];
	checkNotExists(deps: DependencyInfo[]): DependencyInfo[];
	installDeps(deps: DependencyInfo[]): void;
}

@injectable()
export class InstallerServiceImpl implements InstallerService {
	getAllowedDeps(target: ReduxTarget): DependencyInfo[] {
		return filter(ALLOWED_DEPENDENCIES, { target });
	}

	checkNotExists(deps: DependencyInfo[]): DependencyInfo[] {
		return deps;
	}

	installDeps(deps: DependencyInfo[]): void {
		const installationArgs = join(
			map(deps, dep => `${dep.name}@${dep.version}`),
			" "
		);

		console.log(`npm i ${installationArgs}`);
		// execSync(`npm i ${installationArgs}`);
	}
}
