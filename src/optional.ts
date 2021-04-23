import { exceptionout, Output, Provider } from "./exceptionout";

export type Optional<Result> = Result | undefined;

export const optional = <Result>(provider: Provider<Result>): Output<Provider<Result>, Optional<Result>> =>
    exceptionout(
        provider,
        (r) => r,
        () => undefined,
    );
