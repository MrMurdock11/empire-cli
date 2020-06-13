import { Container } from "inversify";
import { ComponentService } from "./services/ComponentService";
import { FileSystemService } from "./services/FileSystemService";
import { ArchiveRepository } from "./Repositories/ArchiveRepositiry";

const DIContainer = new Container();

// Services
DIContainer.bind<ComponentService>(ComponentService).toSelf();
DIContainer.bind<FileSystemService>(FileSystemService).toSelf();

// Repositories
DIContainer.bind<ArchiveRepository>(ArchiveRepository).toSelf();

export default DIContainer;
