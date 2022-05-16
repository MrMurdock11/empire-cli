import { CommanderStatic } from "commander";

export const getCommanderMock = jest.fn(
	(schematic: string, name: string, path?: string) => {
		return {
			command: jest.fn(() => {
				return {
					alias: jest.fn(() => {
						return {
							option: jest.fn(() => {
								return {
									description: jest.fn(() => {
										return {
											action: jest.fn(cb =>
												cb(
													schematic,
													name,
													{ path },
													{
														name: jest.fn(
															() => "generate"
														),
													}
												)
											),
										};
									}),
								};
							}),
						};
					}),
				};
			}),
		} as unknown as CommanderStatic;
	}
);
