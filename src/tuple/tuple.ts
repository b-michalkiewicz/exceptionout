import { exceptionout, formatError, TypeGuard } from "../exceptionout";

export type Tuple<R, E extends Error = Error> = [E?, R?];

export function tuple<Input>(f: () => Input, typeGuard?: TypeGuard<Input>): Tuple<Input>;
export function tuple<Input>(f: Promise<Input>, typeGuard?: TypeGuard<Input>): Promise<Tuple<Input>>;
export function tuple<Input>(f: (() => Input) | Promise<Input>, typeGuard?: TypeGuard<Input>): Promise<Tuple<Input>> | Tuple<Input> {
    return exceptionout<Input, Tuple<Input>>(
        f,
        (i) => [undefined, i],
        (e) => [formatError(e)],
        typeGuard,
    );
}
