export type Provider<Result = unknown> = Promise<Result> | (() => Result);
export type TypeGuard<T> = (o: unknown) => o is T;
export type Output<P extends Provider, Wrapper> = P extends Promise<unknown> ? Promise<Wrapper> : P extends () => unknown ? Wrapper : unknown;

export function exceptionout<Result, Wrapper>(
    provider: Provider<Result>,
    resultMapper: (i: Result) => Wrapper,
    errorMapper: (e?: unknown) => Wrapper,
    typeGuard?: TypeGuard<Result>,
): Output<Provider<Result>, Wrapper> {
    const useTypeGuard = (result: Result) => {
        if (typeGuard && !typeGuard(result)) throw new Error("Type guard validation failed");
        return result;
    };

    if (typeof provider !== "function") return provider.then(useTypeGuard).then(resultMapper).catch(errorMapper);

    try {
        return resultMapper(useTypeGuard(provider()));
    } catch (error) {
        return errorMapper(error);
    }
}

function hasMessage(o?: any): o is { message: string } {
    return o && "message" in o && typeof o.message === "string";
}

export function formatError(error?: unknown): Error {
    if (error instanceof Error) return error;
    if (hasMessage(error)) return new Error(error.message);

    return new Error("Unknown error");
}
