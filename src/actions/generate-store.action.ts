import { inject, injectable } from "inversify";

import { IReduxServiceToken } from "@di/tokens";

import { IReduxService } from "@services/interfaces/redux.service.interface";

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
	 * @param {IReduxService} reduxService The redux service used for create/modify redux components.
	 * @memberof GenerateStoreAction
	 */
	constructor(
		@inject(IReduxServiceToken)
		private readonly reduxService: IReduxService
	) {}

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;

		this.reduxService.generateStoreItem(name);
	}
}
