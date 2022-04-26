/**
 * Action interface.
 *
 * @export
 * @interface IAction
 */
export interface IAction {
	/**
	 * Executes action.
	 *
	 * @param {TInputCollection} inputs Inputs.
	 * @param {TOptionCollection} [options] Options.
	 * @memberof IAction
	 */
	execute(inputs: TInputCollection, options?: TOptionCollection): void;
}
