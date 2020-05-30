export const trim = (str: string, regexp: RegExp): string => {
	return str.replace(regexp, "");
}
