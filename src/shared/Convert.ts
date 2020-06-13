import { Utils } from "./Utils";

/**
 * Класс для конвертации строк.
 *
 * @export
 * @class Convert
 */
export class Convert {
	/**
	 * Конвертирует исходную строку в строку в стиле `Camel Case`.
	 *
	 * @static
	 * @param {string} str Исходная строка.
	 * @memberof Convert
	 */
	public static toPascalCase = (str: string): string => {
		str = Utils.trim(str, /(^[_\-\.]+)|([_\-\.]+$)/gm);

		const regexpForDelimiter = /[_\-\.]/gm;
		const hasDelimiter = regexpForDelimiter.test(str);
		
		Convert.removeUnsupportedSymbols(str);

		if (!hasDelimiter) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		let words = str.split(regexpForDelimiter);

		words = words.map(Convert.toCapitalize);
		return words.join("");
	};

	public static toSnakeCase = (str: string): string => {
		str = Utils.trim(str, /(^[_\-\.]+)|([_\-\.]+$)/gm);
		str = str.toLowerCase();

		const regexpForDelimiter = /[_\-\.]/gm;
		const hasDelimiter = regexpForDelimiter.test(str);
		
		Convert.removeUnsupportedSymbols(str);

		return str.split(regexpForDelimiter).join("_");
	}

	/**
	 * Удаление из исходной строки всех неподдерживаемых символов.
	 *
	 * @private
	 * @static
	 * @param {string} str Исходная строка.
	 * @memberof Convert
	 */
	private static removeUnsupportedSymbols = (str: string): string => {
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
