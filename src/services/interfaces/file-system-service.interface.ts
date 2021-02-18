import { Component } from "../../modules/Component";

export interface IFileSystemService {
	writeComponent(component: Component): void;
}
