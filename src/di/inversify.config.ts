import { Container } from "inversify";
import { FileSystemService } from "../services/file-system.service";
import { StoreService } from "../services/store.service";
import { IStoreService } from "../services/interfaces/store-service.interface";
import { IFileSystemService } from "../services/interfaces/file-system-service.interface";
import { TYPES as SERVICE_TYPES } from "./types/service.types";
import { TYPES as PROVIDER_TYPES } from "./types/provider.types";
import { IStoreProvider } from "../providers/interfaces/store.provider.interface";
import { StoreProvider } from "../providers/store.provider";
import {
	CommandToken,
	GenerateCommandName,
	InitCommandName,
} from "./types/command.token";
import { ICommand } from "@commands/command.interface";
import { GenerateCommand } from "@commands/generate.command";
import {
	GenerateServiceToken,
	InitializeServiceToken,
} from "./types/service.token";
import { GenerateService } from "@services/generate.service";
import {
	ITemplateProvider,
	TemplateProvider,
} from "../providers/template.provider";
import { ITemplateProviderToken } from "./types/provider.token";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { ITemplateEngineToken } from "./types/general.token";
import { TemplateEngine } from "../template-engine/template-engine";
import { IComponentWriterToken } from "./types/writer.token";
import { ComponentWriter } from "../writers/component.writer";
import { InitCommand } from "@commands/init.command";
import { InitializeService } from "@services/initialize.service";

const DIContainer = new Container();

// Commands
DIContainer.bind<ICommand>(CommandToken)
	.to(GenerateCommand)
	.whenTargetNamed(GenerateCommandName);
DIContainer.bind<ICommand>(CommandToken)
	.to(InitCommand)
	.whenTargetNamed(InitCommandName);

// Services
DIContainer.bind<IStoreService>(SERVICE_TYPES.IStoreService).to(StoreService);
DIContainer.bind<IFileSystemService>(
	SERVICE_TYPES.IFileSystemService
).toConstantValue(new FileSystemService(process.cwd()));
DIContainer.bind(GenerateServiceToken).to(GenerateService);
DIContainer.bind(InitializeServiceToken).to(InitializeService);

// Providers
DIContainer.bind<IStoreProvider>(PROVIDER_TYPES.IStoreProvider).to(
	StoreProvider
);
DIContainer.bind<ITemplateProvider>(ITemplateProviderToken).to(
	TemplateProvider
);

// Writers
DIContainer.bind(IComponentWriterToken).to(ComponentWriter);

// General
DIContainer.bind<ITemplateEngine>(ITemplateEngineToken).to(TemplateEngine);

export default DIContainer;
