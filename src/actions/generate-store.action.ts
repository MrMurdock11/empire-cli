import { inject, injectable } from "inversify";

import { ReduxCoreServiceToken } from "@di/tokens";

import { ReduxService } from "@services/interfaces/redux.service.interface";

import { IAction } from "./action.interface";

/**
 * Generate store action class {@link IAction}.
 *
 * @export
 * @class GenerateStoreAction
 * @implements {IAction}
 */
@injectable()
export class GenerateStoreAction implements IAction {
	/**
	 * Creates an instance of GenerateStoreAction.
	 *
	 * @param {ReduxService} reduxService The redux service used for create/modify redux components.
	 * @memberof GenerateStoreAction
	 */
	constructor(
		@inject(ReduxCoreServiceToken)
		private readonly reduxService: ReduxService
	) {}

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;

		this.reduxService.generateStoreItem(name);
	}
}
