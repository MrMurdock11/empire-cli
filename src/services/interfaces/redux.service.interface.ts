export interface ReduxService {
	initStore(): void;

	generateStoreItem(name: string): void;
}
