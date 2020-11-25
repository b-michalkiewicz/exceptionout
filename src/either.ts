import { exceptionout, TypeGuard } from "./exceptionout";

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

export function either<Left, Right>(f: () => Right, e: (e: unknown) => Left, typeGuard?: TypeGuard<Right>): Promise<Either<Left, Right>>;
export function either<Left, Right>(f: Promise<Right>, e: (e: unknown) => Left, typeGuard?: TypeGuard<Right>): Promise<Either<Left, Right>>;
export function either<Left, Right>(
    f: (() => Right) | Promise<Right>,
    errorMapper: (e: unknown) => Left,
    typeGuard?: TypeGuard<Right>,
): Promise<Either<Left, Right>> | Either<Left, Right> {
    return exceptionout<Right, Either<Left, Right>>(
        f,
        (v) => Right.of(v),
        (e) => Left.of(errorMapper(e)),
        typeGuard,
    );
}
