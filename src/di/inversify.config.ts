import { Container, interfaces } from "inversify";

import { GenerateService } from "@services/generate.service";
import { InitializeService } from "@services/initialize.service";
import { ModifyService } from "@services/modify.service";

import { ICommand } from "@commands/command.interface";
import { GenerateCommand } from "@commands/generate.command";
import { InitCommand } from "@commands/init.command";

import { IAction } from "@actions/action.interface";
import { GenerateComponentAction } from "@actions/generate-component.action";
import { GenerateStoreAction } from "@actions/generate-store.action";
import { InitStoreAction } from "@actions/init-store.action";

import {
	ITemplateProvider,
	TemplateProvider,
} from "../providers/template.provider";
import { TemplateEngine } from "../template-engine/template-engine";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { ComponentWriter } from "../writers/component.writer";
import { StoreWriter } from "../writers/store.writer";
import { ACTION_KEYS } from "./keys";
import {
	ActionsProviderToken,
	GenerateCommandName,
	GenerateServiceToken,
	IActionToken,
	ICommandToken,
	IComponentWriterToken,
	IStoreWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
	InitCommandName,
	InitializeServiceToken,
	ModifyServiceToken,
} from "./tokens";

const DIContainer = new Container();

// Actions
DIContainer.bind<IAction>(IActionToken)
	.to(GenerateComponentAction)
	.whenTargetNamed(ACTION_KEYS.GENERATE_COMPONENT);
DIContainer.bind<IAction>(IActionToken)
	.to(GenerateStoreAction)
	.whenTargetNamed(ACTION_KEYS.GENERATE_STORE);
DIContainer.bind<IAction>(IActionToken)
	.to(InitStoreAction)
	.whenTargetNamed(ACTION_KEYS.INIT_STORE);

DIContainer.bind<interfaces.Provider<IAction>>(
	ActionsProviderToken
).toProvider<IAction>(context => {
	return (actionName: string) =>
		context.container.getNamed(IActionToken, actionName);
});

// Commands
DIContainer.bind<ICommand>(ICommandToken)
	.to(GenerateCommand)
	.whenTargetNamed(GenerateCommandName);
DIContainer.bind<ICommand>(ICommandToken)
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
