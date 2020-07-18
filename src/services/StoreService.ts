import "reflect-metadata";
import { Store } from "../modules/store";
import { injectable, inject } from "inversify";
import { ArchiveRepository } from "../repositories/ArchiveRepository";

@injectable()
export class StoreService {
	private readonly repository: ArchiveRepository;

	constructor(@inject(ArchiveRepository) repository: ArchiveRepository) {
		this.repository = repository;
	}

	public createStore(): Store {
		return new Store("");
	}
}
