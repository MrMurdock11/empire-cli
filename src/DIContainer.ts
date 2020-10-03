import { Container } from "inversify";
import { ComponentService } from "./services/ComponentService";
import { FileSystemService } from "./services/FileSystemService";
import { ArchiveProvider } from "./providers/ArchiveProvider";
import { StoreService } from "./services/StoreService";
import { IArchiveProvider } from "./providers/IArchiveProvider";
import { IComponentService } from "./services/IComponentService";
import { containerTypes } from "./ContainerTypes";
import { IStoreService } from "./services/IStoreService";
import { IFileSystemService } from "./services/IFileSystemService";

const DIContainer = new Container();

// Services
DIContainer.bind<IComponentService>(containerTypes.COMPONENT_SERVICE).to(ComponentService);
DIContainer.bind<IStoreService>(containerTypes.STORE_SERVICE).to(StoreService);
DIContainer.bind<IFileSystemService>(containerTypes.FILE_SYSTEM_SERVICE).to(FileSystemService);

// Providers
DIContainer.bind<IArchiveProvider>(containerTypes.ARCHIVE_PROVIDER).to(ArchiveProvider);

export default DIContainer;
