export type Result<T> = Error | T;

export function isError(result: Result<unknown>): result is Error {
  return result instanceof Error;
}

export function isSuccess<T>(result: Result<T>): result is T {
  return !isError(result);
}

export function getResult<T>(f: () => T, typeGuard?: (o: unknown) => o is T): Result<T>;
export function getResult<T>(f: Promise<T>, typeGuard?: (o: unknown) => o is T): Promise<Result<T>>;
export function getResult<T>(f: Promise<T> | (() => T), typeGuard?: (o: unknown) => o is T): Promise<Result<T>> | Result<T> {
  const useTypeGuard = (result: T) => (typeGuard && !typeGuard(result) ? new Error("Type guard validation failed") : result);

  if (typeof f !== "function") return f.then(useTypeGuard).catch(formatError);

  try {
    return useTypeGuard(f());
  } catch (error) {
    return formatError(error);
  }
}

function formatError(error: any) {
  return error instanceof Error ? error : new Error(error?.message || "Unknown error");
}
