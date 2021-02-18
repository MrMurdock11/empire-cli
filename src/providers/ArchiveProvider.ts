import fs from "fs";
import AdmZip from "adm-zip";
import { injectable } from "inversify";
import { ReduxAccessType } from "../types/ReduxAccessType";
import { IArchiveProvider } from "./IArchiveProvider";
import { ReduxType } from "../services/interfaces/component-service.interface";

/**
 * Архив.
 *
 * @export
 * @class ArchiveRepository
 */
@injectable()
export class ArchiveProvider implements IArchiveProvider {
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

	//#region Component

	/**
	 * @inheritdoc
	 */
	public getBridgeTemplate(): string {
		return this.getContentTemplateByFileName("component/index.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getContainerTemplate(accessType: ReduxType): string {
		return this.getContentTemplateByFileName(
			`component/container-${accessType}.txt`
		);
	}

	/**
	 * @inheritdoc
	 */
	public getPresentationTemplate(): string {
		return this.getContentTemplateByFileName("component/view.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getStylesTemplate(): string {
		return this.getContentTemplateByFileName("component/style.txt");
	}

	// TODO: Перенести сборку шаблона компонента в один метод. Необходимо вернуть ComponentTemplate где уже инициировать все поля с шаблонами.
	// TODO: В момент создания экземпляра компонента, нужно использовать шаблон компонента.
	public getComponentTemplate(): void {
		return void 0;
	}

	//#endregion

	//#region Store

	/**
	 * @inheritdoc
	 */
	public getKeysFileContentTemplate(): string {
		return this.getContentTemplateByFileName("store/keys.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getActionsContentTemplate(): string {
		return this.getContentTemplateByFileName("/store/actions.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getActionsTypeContentTemplate(): string {
		return this.getContentTemplateByFileName("/store/actions.type.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getReducersContentTemplate(): string {
		return this.getContentTemplateByFileName("/store/reducers.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getReducersTestContentTemplate(): string {
		return this.getContentTemplateByFileName("/store/reducers.test.txt");
	}

	/**
	 * @inheritdoc
	 */
	public getStateContentTemplate(): string {
		return this.getContentTemplateByFileName("/store/state.txt");
	}

	//#endregion

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
