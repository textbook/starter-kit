export type Deferred<T> = {
	promise: Promise<T>;
	resolve: (value: T) => void;
	reject: (value: T) => void;
}

export type Tick = () => Promise<void>;

export const defer: <T>() => Deferred<T> = <T>() => {
	const deferred: Partial<Deferred<T>> = {};
	deferred.promise = new Promise<T>((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred as Deferred<T>;
};

export const tick: Tick = () => new Promise((resolve) => setTimeout(resolve));
