import fs from "fs";
import { Convert } from "../common/convert";
import chalk from "chalk";

export class Store {
	public static create = (name: string): void => {
		let destPath = process.cwd();
		
		name = Convert.toPascalCase(name);
		
		if (!fs.existsSync(`${destPath}/${name}`)) {
			fs.mkdirSync(`${destPath}/${name}`);
			destPath += `/${name}`;
		} else {
			console.log(chalk.bold.red("ERROR: Уже существует."));
			return void 0;
		}

		Store.createKeys(destPath, name);
		Store.createActions(destPath, name);
		Store.createActionsType(destPath, name);
		Store.createReducers(destPath, name);
		Store.createReducersTest(destPath, name);
		Store.createState(destPath, name);
	}

	public static createKeys = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.keys.ts`, (
`export enum Keys {
	YOUR_KEY = "YOUR_KEY",
}\r\n`
		));
	}

	public static createActions = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.actions.ts`, (
`import { Keys } from "./${name}.keys";

export const yourAction = () => {
	return {
		type: Keys.YOUR_KEY,
	} as const;
}\r\n`
		));
	}

	public static createActionsType = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.actions.type.ts`, (
`import * as ActionsFC from "./${name}.actions";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof ActionsFC>>;\r\n`
		));
	}

	public static createReducers = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.reducer.ts`, (
`import { Keys } from "./${name}.keys";
import { Actions } from "./${name}.actions.type";
import { initState, State } from "./${name}.state";

export const ${name.charAt(0).toLowerCase() + name.slice(1)} = (state = initState, action: Actions): State => {
	switch(action.type) {
		case Keys.YOUR_KEY:
			return {...state};
		default:
			return state;
	}
}\r\n`
		));
	}

	public static createReducersTest = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.reducer.test.ts`, (
`describe("${name}Reducer", () => {
	it("firstTest", () => expect(true).toBeTruthy());
});`
		));
	}

	public static createState = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.state.ts`, (
`export type State = {
	id: string;
};

export const initState: State = {
	id: "000-000-000",
};\r\n`
		));
	}
}
