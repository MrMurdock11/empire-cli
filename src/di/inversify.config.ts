import { Container } from "inversify";
import { ComponentService } from "../services/component.service";
import { FileSystemService } from "../services/file-system.service";
import { ArchiveProvider } from "../providers/ArchiveProvider";
import { StoreService } from "../services/store.service";
import { IArchiveProvider } from "../providers/IArchiveProvider";
import { IComponentService } from "../services/interfaces/component-service.interface";
import { IStoreService } from "../services/interfaces/store-service.interface";
import { IFileSystemService } from "../services/interfaces/file-system-service.interface";
import { TYPES as SERVICE_TYPE } from "./types/service.types";
import { TYPES as PROVIDER_TYPE } from "./types/provider.types";
import { TYPES as COMMAND_TYPE } from "./types/command.types";

const DIContainer = new Container();

// Services
DIContainer.bind<IComponentService>(SERVICE_TYPE.IComponentService).to(
	ComponentService
);
DIContainer.bind<IStoreService>(SERVICE_TYPE.IStoreService).to(StoreService);
DIContainer.bind<IFileSystemService>(SERVICE_TYPE.IFileSystemService).to(
	FileSystemService
);

// Providers
DIContainer.bind<IArchiveProvider>(PROVIDER_TYPE.IArchiveProvider).to(
	ArchiveProvider
);

// Commands

export default DIContainer;
