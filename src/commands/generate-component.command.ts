import { inject, injectable } from "inversify";
import { TYPES } from "../di/types/service.types";
import { IComponentService } from "../services/interfaces/component-service.interface";
import { ICommand } from "./command.interface";

type GenerateCommandPayload = {
	schematic: string;
	name: string;
	options: any;
};

@injectable()
export class GenerateComponentCommand implements ICommand {
	constructor(
		@inject(TYPES.IComponentService) private service: IComponentService
	) {}

	public execute(): void {
		this.service.generate("", {} as any);
	}
}
