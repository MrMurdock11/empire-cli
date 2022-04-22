import { inject, injectable } from "inversify";

import { InitializeServiceToken } from "@di/tokens";

import { InitializeService } from "@services/initialize.service";

import { IAction } from "./action.interface";

@injectable()
export class InitStoreAction implements IAction {
	@inject(InitializeServiceToken)
	private readonly _service: InitializeService;

	execute(): void {
		this._service.store();
	}
}
