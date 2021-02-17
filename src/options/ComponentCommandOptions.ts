// опции команды.
export type ComponentCommandOptions = {
	name: string;
	// значение показывающее, что компонента создается для приложения с redux.
	redux: boolean;
	// значение показывающее, что компонет создается для работы через css module.
	cssModule: boolean;
};
