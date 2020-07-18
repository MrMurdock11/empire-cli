import fs from "fs";
import { injectable } from "inversify";
import { Utils } from "../shared/Utils";
import { Component } from "../modules/Component";
import { FileSystemError } from "../shared/errors/FileSystemError";

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
		const destinationPath = Utils.determineDestinationPath(component.name);

		if (fs.existsSync(destinationPath)) {
			throw new FileSystemError("Создаваемый компонет уже существует.");
		}
		
		fs.mkdirSync(destinationPath);

		fs.writeFileSync(`${destinationPath}/index.ts`, component.bridgeFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.tsx`, component.containerFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.view.tsx`, component.presentationFileContent);
		fs.writeFileSync(`${destinationPath}/${component.name}.style.css`, component.styleFileContent);
	}
}