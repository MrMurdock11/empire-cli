import { Container } from "inversify";
import { ArchiveService } from "./services/archive-service";

const DIContainer = new Container();

DIContainer.bind<ArchiveService>(ArchiveService).toSelf();

export default DIContainer;
