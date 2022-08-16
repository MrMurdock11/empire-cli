import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";

import { InstallerServiceToken, InteractionServiceToken } from "@di/tokens";

import { InstallerService, ReduxTarget } from "@services/installer.service";
import { InteractiveService } from "@services/interactive.service";

@injectable()
export class BaseReduxService {
	@inject(InteractionServiceToken)
	private interactive: InteractiveService;

	@inject(InstallerServiceToken)
	private installer: InstallerService;

	async checkAndResolveDeps(target: ReduxTarget): Promise<void> {
		const deps = this.installer.getAllowedDeps(target);
		const notInstalledDeps = this.installer.checkNotExists(deps);

		if (isEmpty(notInstalledDeps)) {
			return void 0;
		}

		const agreed = await this.interactive.confirm("foo", "foo?");
		if (!agreed) {
			throw new Error("what the fuck!");
		}

		this.installer.installDeps(notInstalledDeps);
	}
}
