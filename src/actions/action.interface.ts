import { TGenerateOptions } from "./types/generate-options";

export interface IAction {
	handle(options?: TGenerateOptions): void;
}
