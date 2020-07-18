import { Container } from "inversify";
import { ComponentService } from "./services/ComponentService";
import { FileSystemService } from "./services/FileSystemService";
import { ArchiveRepository } from "./repositories/ArchiveRepository";
import { StoreService } from "./services/StoreService";
import { IArchiveRepository } from "./repositories/IArchiveRepository";
import { IComponentService } from "./services/IComponentService";
import { CONTAINER_TYPES } from "./ContainerTypes";

const DIContainer = new Container();

// Services
DIContainer.bind<IComponentService>(CONTAINER_TYPES.ComponentService).to(ComponentService);
DIContainer.bind<StoreService>(StoreService).toSelf();
DIContainer.bind<FileSystemService>(FileSystemService).toSelf();

// Repositories
DIContainer.bind<IArchiveRepository>(ArchiveRepository).toSelf();

export default DIContainer;
