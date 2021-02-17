import { Container } from "inversify";
import { ComponentService } from "../services/ComponentService";
import { FileSystemService } from "../services/FileSystemService";
import { ArchiveProvider } from "../providers/ArchiveProvider";
import { StoreService } from "../services/StoreService";
import { IArchiveProvider } from "../providers/IArchiveProvider";
import { IComponentService } from "../services/interfaces/component-service.interface";
import { IStoreService } from "../services/interfaces/IStoreService";
import { IFileSystemService } from "../services/interfaces/IFileSystemService";
import { ICommand } from "../commands/command.interface";
import { TYPES as SERVICE_TYPE } from "./types/service.types";
import { TYPE as PROVIDER_TYPE } from "./types/provider.types";
import { TYPE as COMMAND_TYPE } from "./types/command.types";
import { GenerateComponentCommand } from "../commands/generate-component.command";

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
DIContainer.bind<ICommand>(COMMAND_TYPE.ICommand).to(GenerateComponentCommand);

export default DIContainer;
