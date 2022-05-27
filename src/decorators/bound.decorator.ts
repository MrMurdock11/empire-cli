import { isFunction } from "lodash";

export const Bound = (
	_,
	key: string | symbol,
	descriptor: PropertyDescriptor
) => {
	let method = descriptor.value;
	if (!isFunction(method)) {
		throw new TypeError("@Bound decorator can only be used on methods.");
	}

	return {
		configurable: true,
		get() {
			const boundFn = method.bind(this);
			Object.defineProperty(this, key, {
				configurable: true,
				get() {
					return boundFn;
				},
			});
			return boundFn;
		},
	};
};
