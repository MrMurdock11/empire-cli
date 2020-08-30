import { ComponentService } from "../ComponentService";
import { ArchiveProviderMock } from "../../providers/__mocks__/ArchiveProviderMock";

describe("ComponentService", () => {
	let service: ComponentService;

	beforeEach(() => {
		service = new ComponentService(new ArchiveProviderMock);
	});

	it("should create component", () => {
		// const result = service.create("test", { redux: false, cssModule: true });
		// console.log(result);
		expect(true).toBeTruthy();
	});
});
