/**
 * Объект для обработки ошибок при работе в файловой системе.
 *
 * @export
 * @class FileSystemError
 * @extends {Error}
 */
export class FileSystemError extends Error {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, FileSystemError.prototype);
	}
}
