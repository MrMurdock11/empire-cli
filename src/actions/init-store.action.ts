import { inject, injectable } from "inversify";

import { InitializeServiceToken } from "@di/tokens";

import { InitializationService } from "@services/initialization.service";

import { IAction } from "./action.interface";

/**
 * Initialization store action class.
 *
 * @export
 * @class InitStoreAction
 * @implements {IAction}
 */
@injectable()
export class InitStoreAction implements IAction {
	/**
	 * Initialization service.
	 *
	 * @private
	 * @type {InitializationService}
	 * @memberof InitStoreAction
	 */
	@inject(InitializeServiceToken)
	private readonly _service: InitializationService;

	/** @inheritdoc */
	execute(): void {
		this._service.store();
	}
}
