import fs from "fs";
import AdmZip from "adm-zip";
import { injectable } from "inversify";

/**
 * Сервис для работы с архивом.
 *
 * @export
 * @class ArchiveService
 */
@injectable()
export class ArchiveService {
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
	 * Получает текст из файла.
	 *
	 * @param {string} fileName Наименование файла.
	 * @returns {string} Текст из файла.
	 * @memberof ArchiveService
	 */
	public getTextByFileName(fileName: string): string {
		const entries = this.admZip.getEntries();
		const entry = entries.find(entry => entry.entryName.match(`${fileName}.txt`));

		if (!entry) {
			throw new Error("Файл с таким именем отсутствует в архиве.");
		}

		return this.admZip.readAsText(entry);
	}
}
