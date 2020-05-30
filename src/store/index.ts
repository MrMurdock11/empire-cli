import fs from "fs";
import { Convert } from "../common/convert";
import chalk from "chalk";
import { useDirTree } from "../common/dirtree";

const appendToRootReducer = (name: string): void => {
	const cwd = process.cwd();
	const reducerName = name.charAt(0).toLowerCase() + name.slice(1);

	if (!fs.existsSync(`${cwd}/index.ts`)) {
		console.log("Ненайден корневой reducer.");
	}

	let root = fs.readFileSync(`${cwd}/index.ts`).toString();

	let referencePoint = 0;
	let appendIndex = 0;

	// append import

	referencePoint = root.lastIndexOf("import");
	appendIndex = root.indexOf(";", referencePoint);
	
	root = root.slice(0, appendIndex + 1) + `\nimport { ${reducerName} } from "./${name}/${name}.reducer";` + root.slice(appendIndex + 1);

	// append reducer

	referencePoint = root.indexOf("combineReducers({");
	appendIndex = root.indexOf("});", referencePoint);

	root = root.slice(0, appendIndex) + `\t${reducerName},\n` + root.slice(appendIndex);

	fs.writeFileSync(`${cwd}/index.ts`, root);
}

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

		appendToRootReducer(name);
		
		console.log(useDirTree(destPath));
	}

	private static createKeys = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.keys.ts`, (
`export enum Keys {
	// YOUR_KEY = "YOUR_KEY",
}\r\n`
		));
	}

	private static createActions = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.actions.ts`, (
`import { Keys } from "./${name}.keys";

/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const yourAction = () => {
	return {
		// type: Keys.YOUR_KEY,
	} as const;
}\r\n`
		));
	}

	private static createActionsType = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.actions.type.ts`, (
`import * as ActionsFC from "./${name}.actions";

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof ActionsFC>>;\r\n`
		));
	}

	private static createReducers = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.reducer.ts`, (
`import { Keys } from "./${name}.keys";
import { Actions } from "./${name}.actions.type";
import { initState, State } from "./${name}.state";

export const ${name.charAt(0).toLowerCase() + name.slice(1)} = (state = initState, action: Actions): State => {
	switch(action.type) {
		// case Keys.YOUR_KEY:
		// 	return {...state};
		default:
			return state;
	}
}\r\n`
		));
	}

	private static createReducersTest = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.reducer.test.ts`, (
`describe("${name}Reducer", () => {
	it("firstTest", () => expect(true).toBeTruthy());
});`
		));
	}

	private static createState = (path: string, name: string): void => {
		fs.writeFileSync(`${path}/${name}.state.ts`, (
`export type State = {
	// add your properties
};

export const initState: State = {
	// add your properties
};\r\n`
		));
	}
}
