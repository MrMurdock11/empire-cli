import { Container, interfaces } from "inversify";

import {
	InstallerService,
	InstallerServiceImpl,
} from "@services/installer.service";
import {
	InteractiveService,
	InteractiveServiceImpl,
} from "@services/interactive.service";
import { ReactService } from "@services/interfaces/react.service.interface";
import { ReduxService } from "@services/interfaces/redux.service.interface";
import { ModifyService } from "@services/modify.service";
import { ReactServiceImpl } from "@services/react.service";
import { ReduxCoreService } from "@services/redux/redux-core.service";
import { ReduxToolkitService } from "@services/redux/redux-toolkit.service";

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
	IStoreWriterToken,
	ITemplateEngineToken,
	ITemplateProviderToken,
	InitCommandName,
	InstallerServiceToken,
	InteractionServiceToken,
	ModifyServiceToken,
	ReduxCoreServiceToken,
	ReduxToolkitServiceToken,
} from "./tokens";

const container = new Container();

// Actions
container
	.bind<IAction>(IActionToken)
	.to(GenerateComponentAction)
	.whenTargetNamed(ACTION_KEYS.GENERATE_COMPONENT);
container
	.bind<IAction>(IActionToken)
	.to(GenerateStoreAction)
	.whenTargetNamed(ACTION_KEYS.GENERATE_STORE);
container
	.bind<IAction>(IActionToken)
	.to(InitStoreAction)
	.whenTargetNamed(ACTION_KEYS.INIT_STORE);

container
	.bind<interfaces.Provider<IAction>>(ActionsProviderToken)
	.toProvider<IAction>(context => {
		return (actionName: string) =>
			context.container.getNamed(IActionToken, actionName);
	});

// Commands
container
	.bind<ICommand>(ICommandToken)
	.to(GenerateCommand)
	.whenTargetNamed(GenerateCommandName);
container
	.bind<ICommand>(ICommandToken)
	.to(InitCommand)
	.whenTargetNamed(InitCommandName);

// Services
container.bind<ReactService>(IReactServiceToken).to(ReactServiceImpl);
container.bind<ReduxService>(ReduxCoreServiceToken).to(ReduxCoreService);
container.bind<ReduxService>(ReduxToolkitServiceToken).to(ReduxToolkitService);
container
	.bind<InstallerService>(InstallerServiceToken)
	.to(InstallerServiceImpl);
container
	.bind<InteractiveService>(InteractionServiceToken)
	.to(InteractiveServiceImpl);
container.bind(ModifyServiceToken).to(ModifyService);

// Providers
container.bind<ITemplateProvider>(ITemplateProviderToken).to(TemplateProvider);

// Writers
container.bind(IComponentWriterToken).to(ComponentWriter);
container.bind(IStoreWriterToken).to(StoreWriter);

// General
container.bind<ITemplateEngine>(ITemplateEngineToken).to(TemplateEngine);

export default container;
