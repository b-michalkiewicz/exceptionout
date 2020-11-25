export type TypeGuard<T> = (o: unknown) => o is T;

export function exceptionout<Input, Output>(
    f: Promise<Input> | (() => Input),
    valueMapper: (i: Input) => Output,
    errorMapper: (e?: unknown) => Output,
    typeGuard?: TypeGuard<Input>,
): Promise<Output> | Output {
    const useTypeGuard = (result: Input) => {
        if (typeGuard && !typeGuard(result)) throw new Error("Type guard validation failed");
        return result;
    };

    if (typeof f !== "function") return f.then(useTypeGuard).then(valueMapper).catch(errorMapper);

    try {
        return valueMapper(useTypeGuard(f()));
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
