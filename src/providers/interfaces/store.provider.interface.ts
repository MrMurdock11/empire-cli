import { StoreTemplate } from "../../models/store-template.model";

export interface IStoreProvider {
	getTemplates(): StoreTemplate;
}
