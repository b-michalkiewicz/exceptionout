import { exceptionout, formatError, TypeGuard } from "../exceptionout";

export type Result<Input> = Error | Input;

export function isError(result: Result<unknown>): result is Error {
    return result instanceof Error;
}

export function isSuccess<Input>(result: Result<Input>): result is Input {
    return !isError(result);
}

export function result<Input>(f: () => Input, typeGuard?: TypeGuard<Input>): Result<Input>;
export function result<Input>(f: Promise<Input>, typeGuard?: TypeGuard<Input>): Promise<Result<Input>>;
export function result<Input>(f: Promise<Input> | (() => Input), typeGuard?: TypeGuard<Input>): Promise<Result<Input>> | Result<Input> {
    return exceptionout<Input, Result<Input>>(f, (i) => i, formatError, typeGuard);
}
