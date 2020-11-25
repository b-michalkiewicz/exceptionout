import { exceptionout } from "./exceptionout";

export type Optional<Input> = Input | undefined;

export function optional<Input>(f: () => Input): Optional<Input>;
export function optional<Input>(f: Promise<Input>): Promise<Optional<Input>>;
export function optional<Input>(f: Promise<Input> | (() => Input)): Promise<Optional<Input>> | Optional<Input> {
    return exceptionout(
        f,
        (v) => v,
        () => undefined,
    );
}
