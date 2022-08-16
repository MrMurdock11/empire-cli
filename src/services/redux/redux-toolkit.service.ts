import { inject, injectable } from "inversify";
import { isEmpty } from "lodash";

import { InstallerServiceToken, InteractionServiceToken } from "@di/tokens";

import { InstallerService, ReduxTarget } from "@services/installer.service";
import { InteractiveService } from "@services/interactive.service";

import { ReduxService } from "../interfaces/redux.service.interface";

@injectable()
export class ReduxToolkitService implements ReduxService {
	initStore(): void {
		throw new Error("Method not implemented.");
	}

	generateStoreItem(name: string): void {
		throw new Error("Method not implemented.");
	}
}
