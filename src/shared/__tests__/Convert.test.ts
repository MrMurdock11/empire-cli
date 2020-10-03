import { Convert } from "../Convert";

describe("Convert", () => {
	it("should convert from default format string to pascal case format", () => {
		expect("Test").toBe(Convert.toPascalCase("test"));

		expect(Convert.toPascalCase("test.test")).toBe("TestTest");
		expect(Convert.toPascalCase("test_test")).toBe("TestTest");
		expect(Convert.toPascalCase("test-test")).toBe("TestTest");

		expect(Convert.toPascalCase("..test.test..")).toBe("TestTest");
		expect(Convert.toPascalCase("__test_test__")).toBe("TestTest");
		expect(Convert.toPascalCase("--test-test--")).toBe("TestTest");
		expect(Convert.toPascalCase("**test-test**")).toBe("TestTest");
	});

	it("should convert from default format string to snake case format", () => {
		expect("test").toBe(Convert.toSnakeCase("test"));

		expect(Convert.toSnakeCase("test.test")).toBe("test_test");
		expect(Convert.toSnakeCase("test_test")).toBe("test_test");
		expect(Convert.toSnakeCase("test-test")).toBe("test_test");

		expect(Convert.toSnakeCase("..test.test..")).toBe("test_test");
		expect(Convert.toSnakeCase("__test_test__")).toBe("test_test");
		expect(Convert.toSnakeCase("--test-test--")).toBe("test_test");
		expect(Convert.toSnakeCase("**test-test**")).toBe("test_test");
	});
});
