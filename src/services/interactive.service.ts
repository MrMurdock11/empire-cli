import { prompt } from "inquirer";
import { injectable } from "inversify";

export interface InteractiveService {
	confirm(name: string, message: string): Promise<boolean>;
}

@injectable()
export class InteractiveServiceImpl implements InteractiveService {
	async confirm(name: string, message: string): Promise<boolean> {
		const result = await prompt<{ [x in string]: boolean }>({
			type: "confirm",
			name,
			message,
			default: true,
		});

		return result[name];
	}
}
