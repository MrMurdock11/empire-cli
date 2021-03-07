import chalk from "chalk";
import dirtree, { DirectoryTree } from "directory-tree";

// индикатор старта
const START_INDICATOR = chalk.red("►");
// разделитель
const DELIMITER = chalk.red("•");
// указатель на дочерний узел
const POINTER = "├─";
// указатель на последний дочерний узел
const END_POINTER = "└─";

type ColorizeType = "name" | "metadata";

/**
 * Раскрашивает текст на основе типа.
 *
 * @param {string} value Текст для раскрашивания.
 * @param {ColorizeType} type Тип текст для раскрашивания.
 * @returns {string} Раскрашеный текст.
 */
const colorize = (value: string, type: ColorizeType): string => {
	switch(type) {
		case "name":
			return chalk.bold.cyan(value);
		case "metadata":
			return chalk.magenta.bold(value);
	}
}

/**
 * Формирование отображения корневой папки.
 *
 * @param {string} name Наименование корневого узла.
 * @param {string} type Тип корневого узла.
 * @returns {string} Сформированный для отображения корневого узел.
 */
const folder = (name: string, type: string): string => {
	return `${START_INDICATOR} ${colorize(name, "name")} \
${DELIMITER} ${colorize(`[${type}]`, "metadata")}`;
}

/**
 * Формирование отображения файла.
 *
 * @param {DirectoryTree} node Отображаемый узел.
 * @param {boolean} isLast Значение, показывающее, что узел является последним в списке.
 * @returns {string} Сформированный файл.
 */
const file = (node: DirectoryTree, isLast: boolean): string => {
	const {name, type, size} = node;

	return `  ${isLast ? END_POINTER : POINTER} ${colorize(name, "name")} \
${DELIMITER} ${colorize(`[${type}]`, "metadata")} \
${DELIMITER} ${colorize(`${size} byte`, "metadata")}\n`;
}

/**
 * Формирует отображение дерева директорий.
 *
 * @param {string} path Путь до места построяния дерева.
 * @returns {string} Сформированное дерево.
 */
export const useDirTree = (path: string): string => {
	const {name, type, children} = dirtree(path);
	
	if (!children) {
		throw new Error("Директория пуста.");
	}

	const lastIndex = children.length - 1;

	return (
		`${folder(name, type)}
		\r${children.map((it, i) => file(it, i === lastIndex)).join("")}`
	);
}
