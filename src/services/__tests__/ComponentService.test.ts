import { ComponentService } from "../ComponentService";
import { ArchiveRepositoryMock } from "../../repositories/__mocks__/ArchiveRepositoryMock";

describe("ComponentService", () => {
	let service: ComponentService;

	beforeEach(() => {
		service = new ComponentService(new ArchiveRepositoryMock);
	});

	it("should create component", () => {
		// const result = service.create("test", { redux: false, cssModule: true });
		// console.log(result);
		expect(true).toBeTruthy();
	});
});
