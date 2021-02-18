enum ReduxType {
	STATE = "state",
	DISPATCH = "dispatch",
	BOTH = "both",
}

export type GenerateComponentOptions = {
	redux?: ReduxType;
	cssModule: boolean;
};
