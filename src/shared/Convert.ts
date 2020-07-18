import { Utils } from "./Utils";

/**
 * Класс для конвертации строк.
 *
 * @export
 * @class Convert
 */
export class Convert {
	/**
	 * Конвертирует исходную простую строку в формат `Pascal Case`.
	 *
	 * @static
	 * @param {string} str Исходная строка.
	 * @memberof Convert
	 */
	public static toPascalCase = (str: string): string => {
		str = Convert.removeUnsupportedCharacters(str);
		str = Utils.deleteMatches(str, /(^[_\-\.]+)|([_\-\.]+$)/gm);

		const regexpForDelimiter = /[_\-\.]/gm;
		const hasDelimiter = regexpForDelimiter.test(str);

		if (!hasDelimiter) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		const words = str.split(regexpForDelimiter);
		const capitalizeWords = words.map(Convert.toCapitalize);
		const pascalCaseStr = capitalizeWords.join("");

		return pascalCaseStr;
	};

	/**
	 * Конвертирует исходную простую строку в формат `SnakeCase`.
	 *
	 * @static
	 * @memberof Convert
	 */
	public static toSnakeCase = (str: string): string => {
		str = Convert.removeUnsupportedCharacters(str);
		str = Utils.deleteMatches(str, /(^[_\-\.]+)|([_\-\.]+$)/gm);
		str = str.toLowerCase();

		const regexpForDelimiter = /[_\-\.]/gm;
		const hasDelimiter = regexpForDelimiter.test(str);

		if (!hasDelimiter) {
			return str.toLowerCase();
		}

		const words = str.split(regexpForDelimiter);
		const snakeCaseStr = words.join("_");

		return snakeCaseStr;
	}

	/**
	 * Удаление из исходной строки всех неподдерживаемых символов.
	 *
	 * @private
	 * @static
	 * @param {string} str Исходная строка.
	 * @memberof Convert
	 */
	private static removeUnsupportedCharacters = (str: string): string => {
		const regexp = /[^_\-\.a-zA-Z]/gm;
		const hasUnsupportedSymbols = regexp.test(str);

		if (hasUnsupportedSymbols) {
			str = str.replace(regexp, "");
		}

		return str;
	}

	/**
	 * Конвертирует исходную строку в строку с заглавной буквы.
	 *
	 * @private
	 * @static
	 * @param {string} str Исходная строка.
	 * @memberof Convert
	 */
	private static toCapitalize = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
	}
}
