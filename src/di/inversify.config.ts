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

import {
	ITemplateProvider,
	TemplateProvider,
} from "../providers/template.provider";
import { TemplateEngine } from "../template-engine/template-engine";
import { ITemplateEngine } from "../template-engine/template-engine.interface";
import { ComponentWriter } from "../writers/component.writer";
import { StoreWriter } from "../writers/store.writer";
import {
	GenerateActionsToken,
	GenerateCommandName,
	GenerateServiceToken,
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
DIContainer.bind<IAction>(GenerateActionsToken)
	.to(GenerateComponentAction)
	.whenTargetNamed("generate:component");
DIContainer.bind<IAction>(GenerateActionsToken)
	.to(GenerateStoreAction)
	.whenTargetNamed("generate:store");

DIContainer.bind<interfaces.Factory<IAction>>("Factory<IAction>").toFactory(
	context => {
		return (actionName: string) => {
			console.log(actionName);
			return context.container.getNamed(GenerateActionsToken, actionName);
		};
	}
);

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
