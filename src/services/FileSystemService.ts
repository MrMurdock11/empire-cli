import fs from "fs";
import { injectable } from "inversify";
import { Utils } from "../shared/Utils";
import { Component } from "../modules/Component";

/**
 * Служба для работы с файловой системой.
 *
 * @export
 * @class FileSystemService
 */
@injectable()
export class FileSystemService {
	/**
	 * Записывает компонент в файловую систему.
	 *
	 * @param {Component} component Компонент.
	 * @memberof FileSystemService
	 */
	public writeComponent(component: Component): void {
		const {
			name,
			bridgeFileContent,
			containerFileContent,
			presentationFileContent,
			styleFileContent,
		} = component;
		const destinationPath = Utils.determineDestinationPath(name);

		if (fs.existsSync(destinationPath)) {
			throw new Error("Создаваемый компонет уже существует.");
		}
		
		fs.mkdirSync(destinationPath);

		fs.writeFileSync(`${destinationPath}/index.ts`, bridgeFileContent);
		fs.writeFileSync(`${destinationPath}/${name}.tsx`, containerFileContent);
		fs.writeFileSync(`${destinationPath}/${name}.view.tsx`, presentationFileContent);
		fs.writeFileSync(`${destinationPath}/${name}.style.css`, styleFileContent);
	}
}