import DIContainer from "../di/inversify.config";
import { TYPES } from "../di/types/service.types";
import { IStoreService } from "../services/interfaces/store-service.interface";

const storeService = DIContainer.get<IStoreService>(TYPES.IStoreService);

export const generateStore = (name: string): void => {
	try {
		storeService.generate(name);

		console.log("Store - DONE!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
};

export const initStore = (): void => {
	try {
		storeService.init();

		console.log("Init store - DONE!");
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			process.exit(1);
		}
	}
};
