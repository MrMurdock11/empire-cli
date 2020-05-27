import fs from "fs";

type InitializationType = "project" | "store";

const initializeStore = (): void => {
	const destinationPath = process.cwd();
	const storePath = `${destinationPath}/store`;

	if (fs.existsSync(storePath)) {
		console.log("Возможно структура уже создана.");
		return void 0;
	}

	fs.mkdirSync(storePath);

	const content = fs.readFileSync(`${__dirname}/../templates/redux-store/root.txt`).toString();
	fs.writeFileSync(`${storePath}/index.ts`, content);
}

export const init = (type: InitializationType): void => {
	switch(type) {
		case "store":
			initializeStore();
			break;
		default:
			console.log("Неверное наименование проекта для инициализации.");
	}
}