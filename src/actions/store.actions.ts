import DIContainer from "../di/inversify.config";
import { TYPES } from "../di/types/service.types";
import { IStoreService } from "../services/interfaces/store-service.interface";

const storeService = DIContainer.get<IStoreService>(TYPES.IStoreService);

export function generateStore(name: string) {
	try {
		storeService.generate(name);

		console.log("Store Done!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
}
