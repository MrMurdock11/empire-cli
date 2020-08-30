import { IArchiveProvider } from "../IArchiveProvider";
import { ReduxAccessType } from "../../types/ReduxAccessType";

export class ArchiveProviderMock implements IArchiveProvider {
    getActionsContentTemplate(): string {
        throw new Error("Method not implemented.");
    }
    getActionsTypeContentTemplate(): string {
        throw new Error("Method not implemented.");
    }
    getReducersContentTemplate(): string {
        throw new Error("Method not implemented.");
    }
    getReducersTestContentTemplate(): string {
        throw new Error("Method not implemented.");
    }
    getStateContentTemplate(): string {
        throw new Error("Method not implemented.");
    }
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
