/**
 * Ошибка файловой системы.
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
