export type Tuple<R, E extends Error = Error> = [E?, R?];

export function getTuple<T>(f: () => T, typeGuard?: (o: unknown) => o is T): Tuple<T>;
export function getTuple<T>(f: Promise<T>, typeGuard?: (o: unknown) => o is T): Promise<Tuple<T>>;
export function getTuple<T>(f: (() => T) | Promise<T>, typeGuard?: (o: unknown) => o is T): Promise<Tuple<T>> | Tuple<T> {
  const useTypeGuard = (result: T): Tuple<T> =>
    typeGuard && !typeGuard(result) ? [new Error("Type guard validation failed")] : [undefined, result];

  if (typeof f !== "function") return f.then(useTypeGuard).catch(mapError);

  try {
    return useTypeGuard(f());
  } catch (error) {
    return mapError(error);
  }
}

function mapError(error: any): Tuple<never> {
  return error instanceof Error ? [error] : [new Error(error?.message || "Unknown error")];
}
