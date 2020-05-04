export class Utils {
	public static trim(str: string, regexp: RegExp): string {
		return str.replace(regexp, "");
	}	
}
