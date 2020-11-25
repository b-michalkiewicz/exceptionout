export interface Either<Left, Right> {
    isLeft(): boolean;
    isRight(): boolean;
    mapLeft<T>(f: (l: Left) => T): Either<T, Right>;
    mapRight<T>(f: (r: Right) => T): Either<Left, T>;
}

export class Left<L> implements Either<L, never> {
    public static of<T>(value: T): Left<T> {
        return new Left(value);
    }

    private constructor(private readonly value: L) {}

    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }

    mapLeft<T>(f: (l: L) => T): Either<T, never> {
        return Left.of(f(this.value));
    }

    mapRight(): Either<L, never> {
        return this;
    }
}

export class Right<R> implements Either<never, R> {
    public static of<T>(value: T): Right<T> {
        return new Right(value);
    }

    private constructor(private readonly value: R) {}

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }

    mapLeft(): Either<never, R> {
        return this;
    }

    mapRight<T>(f: (r: R) => T): Either<never, T> {
        return Right.of(f(this.value));
    }
}

export function getEither<L, R>(f: () => R, e: <E extends Error>(e: E) => L, t?: (o: unknown) => o is R): Promise<Either<L, R>>;
export function getEither<L, R>(f: Promise<R>, e: <E extends Error>(e: E) => L, t?: (o: unknown) => o is R): Promise<Either<L, R>>;
export function getEither<Left, Right>(
    f: (() => Right) | Promise<Right>,
    errorMapper: <E extends Error>(e: E) => Left,
    typeGuard?: (o: unknown) => o is Right,
): Promise<Either<Left, Right>> | Either<Left, Right> {
    const useTypeGuard = (result: Right) =>
        typeGuard && !typeGuard(result) ? formatLeft(errorMapper(new Error("Type guard validation failed"))) : Right.of(result);
    const formatLeft = (error: any) => Left.of(errorMapper(error));

    if (typeof f !== "function") return f.then(useTypeGuard).catch(formatLeft);

    try {
        return useTypeGuard(f());
    } catch (error) {
        return formatLeft(error);
    }
}
