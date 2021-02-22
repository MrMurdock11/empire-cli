// async function createStoreAndWriteFileSystem(
// 	originalStoreName: string
// ): Promise<void> {
// 	try {
// 		const store = await storeService.create(originalStoreName);
// 		fileSystemService.writeStore(store);

// 		console.log(
// 			chalk.bold.cyan(`\nDirectory structure [${store.validName}]:\n`)
// 		);
// 		console.log(
// 			useDirTree(Utils.determineDestinationPath(store.validName))
// 		);
// 	} catch (exception) {
// 		logError(exception);
// 	}
// }
