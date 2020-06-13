import fs from "fs";
import inquirer from "inquirer";
import { Convert } from "./Convert";
import { ReduxAccessType } from "../types/ReduxAccessType";

type PropmtAnswers = {
	types: string;
}

export namespace Utils {
	/**
	 * 
	 *
	 * @param {string} str
	 * @param {RegExp} regexp
	 * @returns {string}
	 */
	export const trim = (str: string, regexp: RegExp): string => {
		return str.replace(regexp, "");
	}

	/**
	 * Определяет папку назначения.
	 *
	 * @param {string} originalComponentName Оригинальное наименование компонента.
	 * @returns {string} Папка назначения.
	 */
	export const determineDestinationPath = (originalComponentName: string): string => {
		const cwd = process.cwd();
		const componentNamePascalCase = Convert.toPascalCase(originalComponentName);
		const isComponentFolder = fs.readdirSync(cwd).some(it => /\.(j|t)sx$/gm.test(it));

		if (!isComponentFolder) {
			return `${cwd}/${componentNamePascalCase}`;
		}

		if (!fs.existsSync("childs")) {
			fs.mkdirSync("childs");
		}

		return `${cwd}/childs/${componentNamePascalCase}`;
	}

	/**
	 * Определяет тип доступа компонента к хранилищу.
	 *
	 * @param {boolean} useRedux Значение показывающее, что компонент собирается для работы с redux.
	 * @returns {Promise<ReduxAccessType>} Ожидает тип доступа компонента к хранилищу.
	 */
	export const determineAccessType = async (useRedux: boolean): Promise<ReduxAccessType> => {
		if (!useRedux) {
			return "none";
		}

		const answers = await inquirer.prompt<PropmtAnswers>([
			{
				type: "checkbox",
				message: "Select access types you need:",
				name: "types",
				choices: [
					{ name: "State", value: "state" },
					{ name: "Dispatch", value: "dispatch" },
				]
			}
		]);

		if (answers.types.length === 0) {
			return "none";
		} else if (answers.types.length === 2) {
			return "both";
		} else if (answers.types[0] === "state") {
			return "state";
		} else {
			return "dispatch";
		}
	}
}
