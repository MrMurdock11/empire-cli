import { inject, injectable } from "inversify";

import { IReduxServiceToken } from "@di/tokens";

import { IReduxService } from "@services/interfaces/redux.service.interface";

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
	 * @param {IReduxService} reduxService The redux service used for create/modify redux components.
	 * @memberof InitStoreAction
	 */
	constructor(
		@inject(IReduxServiceToken)
		private readonly reduxService: IReduxService
	) {}

	/** @inheritdoc */
	execute(): void {
		this.reduxService.initStore();
	}
}
