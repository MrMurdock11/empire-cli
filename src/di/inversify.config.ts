import { Container } from "inversify";
import { ComponentService } from "../services/component.service";
import { FileSystemService } from "../services/file-system.service";
import { StoreService } from "../services/store.service";
import { IComponentService } from "../services/interfaces/component-service.interface";
import { IStoreService } from "../services/interfaces/store-service.interface";
import { IFileSystemService } from "../services/interfaces/file-system-service.interface";
import { TYPES as SERVICE_TYPES } from "./types/service.types";
import { TYPES as PROVIDER_TYPES } from "./types/provider.types";
import { IComponentProvider } from "../providers/interfaces/component.provider.interface";
import { ComponentProvider } from "../providers/component.provider";
import { IStoreProvider } from "../providers/interfaces/store.provider.interface";
import { StoreProvider } from "../providers/store.provider";

const DIContainer = new Container();

// Services
DIContainer.bind<IComponentService>(SERVICE_TYPES.IComponentService).to(
	ComponentService
);
DIContainer.bind<IStoreService>(SERVICE_TYPES.IStoreService).to(StoreService);
DIContainer.bind<IFileSystemService>(
	SERVICE_TYPES.IFileSystemService
).toConstantValue(new FileSystemService(process.cwd()));

// Providers
DIContainer.bind<IComponentProvider>(PROVIDER_TYPES.IComponentProvider).to(
	ComponentProvider
);
DIContainer.bind<IStoreProvider>(PROVIDER_TYPES.IStoreProvider).to(
	StoreProvider
);

// Commands

export default DIContainer;
