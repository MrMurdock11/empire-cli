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
	 * @param {string} text Исходная строка.
	 * @memberof Convert
	 */
	public static toPascalCase = (text: string): string => {
		const hasUnsupportedSymbols = /[^_\-\.a-zA-Z]/gm.test(text);
		const hasDelimiter = /[_\-\.]/gm.test(text);

		if (hasUnsupportedSymbols) {
			text = text.replace(/[^_\-\.a-zA-Z]/gm, "");
		}

		if (!hasDelimiter) {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}

		let words = text.split(/[_\-\.]/gm);

		words = words.map(Convert.toCapitalize);
		return words.join("");
	};

	/**
	 * Конвертирует исходную строку в строку с заглавной буквы.
	 *
	 * @private
	 * @static
	 * @param {string} text Исходная строка.
	 * @memberof Convert
	 */
	private static toCapitalize = (text: string): string => {
		return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
	}
}
