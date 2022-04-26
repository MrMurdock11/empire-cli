import { inject, injectable } from "inversify";

import { GenerateServiceToken } from "@di/tokens";

import { GenerateService } from "@services/generate.service";

import { IAction } from "./action.interface";

/**
 * Generate component action class.
 *
 * @export
 * @class GenerateComponentAction
 * @implements {IAction}
 */
@injectable()
export class GenerateComponentAction implements IAction {
	/**
	 * Generate service.
	 *
	 * @private
	 * @type {GenerateService}
	 * @memberof GenerateComponentAction
	 */
	@inject(GenerateServiceToken)
	private readonly _generateService: GenerateService;

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;
		const path = inputs.find(input => input.name === "path").value;

		this._generateService.component(name, path);
	}
}
