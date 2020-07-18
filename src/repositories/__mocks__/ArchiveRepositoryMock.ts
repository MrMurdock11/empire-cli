import { IArchiveRepository } from "../IArchiveRepository";
import { ReduxAccessType } from "../../types/ReduxAccessType";

export class ArchiveRepositoryMock implements IArchiveRepository {
	getBridgeFileContentTemplate(): string {
		throw new Error("Method not implemented.");
	}
	getContainerFileContentTemplate(accessType: ReduxAccessType): string {
		throw new Error("Method not implemented.");
	}
	getPresentationFileContentTemplate(): string {
		throw new Error("Method not implemented.");
	}
	getStyleFileContentTemplate(): string {
		throw new Error("Method not implemented.");
	}
	getKeysFileContentTemplate(): string {
		throw new Error("Method not implemented.");
	}

}
