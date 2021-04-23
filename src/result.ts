import { exceptionout, formatError, Output, Provider, TypeGuard } from "./exceptionout";

export type Result<Input> = Error | Input;

export function isError(result: Result<unknown>): result is Error {
    return result instanceof Error;
}

export function isSuccess<Input>(result: Result<Input>): result is Input {
    return !isError(result);
}

export const result = <Input>(provider: Provider<Input>, typeGuard?: TypeGuard<Input>): Output<Provider<Input>, Result<Input>> =>
    exceptionout(provider, (i): Result<Input> => i, formatError, typeGuard);
