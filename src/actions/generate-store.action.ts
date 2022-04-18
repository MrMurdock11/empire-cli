import { inject, injectable } from "inversify";

import { GenerateServiceToken } from "@di/tokens";

import { GenerateService } from "@services/generate.service";

import { IAction } from "./action.interface";

@injectable()
export class GenerateStoreAction implements IAction {
	@inject(GenerateServiceToken)
	private readonly _generateService: GenerateService;

	public execute(inputs: TInputCollection): void {
		const name = inputs.find(input => input.name === "name").value;

		this._generateService.store(name);
	}
}
