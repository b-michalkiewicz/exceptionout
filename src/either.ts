import { exceptionout, Output, Provider, TypeGuard } from "./exceptionout";

export class Left<Error> {
    public static of<T>(value: T): Left<T> {
        return new Left(value);
    }

    private constructor(private readonly _value: Error) {}

    get value(): Error {
        return this._value;
    }

    map(): Left<Error> {
        return this;
    }

    mapLeft<T>(mapper: (error: Error) => T): Either<T, never> {
        return Left.of(mapper(this.value));
    }

    mapRight(): Either<Error, never> {
        return this;
    }

    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }
}

export class Right<Value> {
    public static of<T>(value: T): Right<T> {
        return new Right(value);
    }

    private constructor(private readonly _value: Value) {}

    get value(): Value {
        return this._value;
    }

    map<T>(mapper: (value: Value) => T): Right<T> {
        return Right.of(mapper(this.value));
    }

    mapLeft(): Either<never, Value> {
        return this;
    }

    mapRight<T>(mapper: (value: Value) => T): Either<never, T> {
        return Right.of(mapper(this.value));
    }

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }
}

export type Either<Error, Value> = Left<Error> | Right<Value>;
export const isEither = (o: unknown): o is Either<unknown, unknown> => o instanceof Left || o instanceof Right;

export const either = <Left, Right>(
    provider: Provider<Right>,
    errorMapper: (e: unknown) => Left,
    typeGuard?: TypeGuard<Right>,
): Output<Provider<Right>, Either<Left, Right>> =>
    exceptionout(
        provider,
        (r) => Right.of(r),
        (l): Either<Left, Right> => Left.of(errorMapper(l)),
        typeGuard,
    );
