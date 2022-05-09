import { Container, interfaces } from "inversify";

import { IReactService } from "@services/interfaces/react.service.interface";
import { IReduxService } from "@services/interfaces/redux.service.interface";
import { ModifyService } from "@services/modify.service";
import { ReactService } from "@services/react.service";
import { ReduxService } from "@services/redux.service";

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
	IActionToken,
	ICommandToken,
	IComponentWriterToken,
	IReactServiceToken,
	IReduxServiceToken,
	IStoreWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
	InitCommandName,
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
DIContainer.bind<IReactService>(IReactServiceToken).to(ReactService);
DIContainer.bind<IReduxService>(IReduxServiceToken).to(ReduxService);
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
