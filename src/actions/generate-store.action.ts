import { inject, injectable } from "inversify";

import { GenerateServiceToken } from "@di/tokens";

import { GenerateService } from "@services/generate.service";

import { IAction } from "./action.interface";

/**
 * Generate store action class.
 *
 * @export
 * @class GenerateStoreAction
 * @implements {IAction}
 */
@injectable()
export class GenerateStoreAction implements IAction {
	/**
	 * Generate service.
	 *
	 * @private
	 * @type {GenerateService}
	 * @memberof GenerateStoreAction
	 */
	@inject(GenerateServiceToken)
	private readonly _generateService: GenerateService;

	/** @inheritdoc */
	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;

		this._generateService.store(name);
	}
}
