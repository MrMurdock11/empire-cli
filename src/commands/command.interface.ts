export interface ICommand {
	execute<TPayload>(payload: TPayload): void;
}
