import { Component } from "../../models/сomponent.model";

export interface IFileSystemService {
	writeComponent(component: Component): void;
}
