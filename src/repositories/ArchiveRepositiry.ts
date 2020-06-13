import fs from "fs";
import AdmZip from "adm-zip";
import { injectable } from "inversify";
import { ReduxAccessType } from "../types/ReduxAccessType";

/**
 * Архив.
 *
 * @export
 * @class ArchiveRepository
 */
@injectable()
export class ArchiveRepository {
	/**
	 * Путь до архива.
	 *
	 * @private
	 * @type {string}
	 * @memberof ArchiveService
	 */
	private readonly archivePath: string = `${__dirname}/../archive/templates.zip`;

	/**
	 * Объект для работы с архивом.
	 *
	 * @private
	 * @type {AdmZip}
	 * @memberof ArchiveService
	 */
	private readonly admZip: AdmZip;

	constructor() {
		this.admZip = new AdmZip(fs.readFileSync(this.archivePath));
	}

	/**
	 * Получает шаблон содержимого файла моста.
	 *
	 * @memberof ArchiveRepository
	 */
	public getBridgeFileContentTemplate = (): string => {
		return this.getContentTemplateByFileName("index.txt");
	}

	/**
	 * Получает шаблон содержимого файла контейнера.
	 *
	 * @param {ReduxAccessType} accessType Тип доступа компонента к хранилищу.
	 * @memberof ArchiveRepository
	 */
	public getContainerFileContentTemplate = (accessType: ReduxAccessType): string => {
		return this.getContentTemplateByFileName(`container-${accessType}.txt`);
	}

	/**
	 * Получает шаблон содержимого презентационного файла.
	 *
	 * @memberof ArchiveRepository
	 */
	public getPresentationFileContentTemplate = (): string => {
		return this.getContentTemplateByFileName("view.txt");
	}

	/**
	 * Получает шаблон содержимого файла стилей.
	 *
	 * @memberof ArchiveRepository
	 */
	public getStyleFileContentTemplate = (): string => {
		return this.getContentTemplateByFileName("style.txt");
	}

	/**
	 * Получает шаблон содержимого файла по имени файла в архиве.
	 *
	 * @private
	 * @param {string} fileName Наименование файла.
	 * @returns {string} Содержимое из файла.
	 * @memberof ArchiveService
	 */
	private getContentTemplateByFileName(fileName: string): string {
		const entries = this.admZip.getEntries();
		const entry = entries.find(entry => entry.entryName.match(fileName));

		if (!entry) {
			throw new Error("Файл с таким именем отсутствует в архиве.");
		}

		return this.admZip.readAsText(entry);
	}
}
