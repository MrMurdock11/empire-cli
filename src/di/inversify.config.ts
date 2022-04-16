import { Container } from "inversify";
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
	ModifyServiceToken,
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
import { IComponentWriterToken, IStoreWriterToken } from "./types/writer.token";
import { ComponentWriter } from "../writers/component.writer";
import { StoreWriter } from "../writers/store.writer";
import { InitCommand } from "@commands/init.command";
import { InitializeService } from "@services/initialize.service";
import { ModifyService } from "@services/modify.service";

const DIContainer = new Container();

// Commands
DIContainer.bind<ICommand>(CommandToken)
	.to(GenerateCommand)
	.whenTargetNamed(GenerateCommandName);
DIContainer.bind<ICommand>(CommandToken)
	.to(InitCommand)
	.whenTargetNamed(InitCommandName);

// Services
DIContainer.bind(GenerateServiceToken).to(GenerateService);
DIContainer.bind(InitializeServiceToken).to(InitializeService);
DIContainer.bind(ModifyServiceToken).to(ModifyService);

// Providers
DIContainer.bind<ITemplateProvider>(ITemplateProviderToken).to(
	TemplateProvider
);

// Writers
DIContainer.bind(IComponentWriterToken).to(ComponentWriter);
DIContainer.bind(IStoreWriterToken).to(StoreWriter);

// General
DIContainer.bind<ITemplateEngine>(ITemplateEngineToken).to(TemplateEngine);

export default DIContainer;
