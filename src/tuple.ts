import { exceptionout, formatError, Output, Provider, TypeGuard } from "./exceptionout";

export type Tuple<Result, E extends Error = Error> = [E?, Result?];

export const tuple = <Result>(provider: Provider<Result>, typeGuard?: TypeGuard<Result>): Output<Provider<Result>, Tuple<Result>> =>
    exceptionout(
        provider,
        (i) => [undefined, i],
        (e): Tuple<Result> => [formatError(e)],
        typeGuard,
    );
