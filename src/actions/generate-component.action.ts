import { inject, injectable } from "inversify";

import { IReactServiceToken } from "@di/tokens";

import { ReactService } from "@services/interfaces/react.service.interface";

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
	 * @param {ReactService} reactService The react service used for create/modify react components.
	 * @memberof GenerateComponentAction
	 */
	constructor(
		@inject(IReactServiceToken)
		private readonly reactService: ReactService
	) {}

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;
		const path = inputs.find(input => input.name === "path").value;

		this.reactService.generateComponent(name, path);
	}
}
