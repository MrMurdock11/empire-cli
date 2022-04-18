export interface IAction {
	execute(inputs: TInputCollection, options?: TOptionCollection): void;
}
