import { inject, injectable } from "inversify";

import { IReactServiceToken } from "@di/tokens";

import { IReactService } from "@services/interfaces/react.service.interface";

import { IAction } from "./action.interface";

/**
 * Generate component action class {@link IAction}.
 *
 * @export
 * @class GenerateComponentAction
 * @implements {IAction}
 */
@injectable()
export class GenerateComponentAction implements IAction {
	/**
	 * Creates an instance of GenerateComponentAction.
	 *
	 * @param {IReactService} reactService The react service used for create/modify react components.
	 * @memberof GenerateComponentAction
	 */
	constructor(
		@inject(IReactServiceToken)
		private readonly reactService: IReactService
	) {}

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;
		const path = inputs.find(input => input.name === "path").value;

		this.reactService.generateComponent(name, path);
	}
}
