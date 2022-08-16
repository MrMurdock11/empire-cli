import { inject, injectable } from "inversify";

import { ReduxCoreServiceToken } from "@di/tokens";

import { ReduxService } from "@services/interfaces/redux.service.interface";

import { IAction } from "./action.interface";

/**
 * Initialization store action class {@link IAction}.
 *
 * @export
 * @class InitStoreAction
 * @implements {IAction}
 */
@injectable()
export class InitStoreAction implements IAction {
	/**
	 * Creates an instance of InitStoreAction.
	 *
	 * @param {ReduxService} reduxService The redux service used for create/modify redux components.
	 * @memberof InitStoreAction
	 */
	constructor(
		@inject(ReduxCoreServiceToken)
		private readonly reduxService: ReduxService
	) {}

	/** @inheritdoc */
	execute(): void {
		this.reduxService.initStore();
	}
}
