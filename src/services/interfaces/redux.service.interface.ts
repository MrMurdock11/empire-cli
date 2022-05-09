export interface IReduxService {
	initStore(): void;

	generateStoreItem(name: string): void;
}

