import { either, Left, Right } from "./either";

describe("either function", () => {
    it("works with promises", async (done) => {
        expect(await either(Promise.resolve(1), () => undefined)).toEqual(Right.of(1));
        expect(await either(Promise.reject(), () => false)).toEqual(Left.of(false));
        expect(
            await either(
                Promise.resolve(1),
                (e) => e,
                (o: unknown): o is number => true,
            ),
        ).toEqual(Right.of(1));

        expect(
            await either(
                Promise.resolve(1),
                (e) => e,
                (o: unknown): o is number => false,
            ),
        ).toEqual(Left.of(new Error("Type guard validation failed")));
        expect(await either(Promise.reject({}), (e) => e)).toEqual(Left.of({}));
        expect(await either(Promise.reject({}), () => new Error("Specific error"))).toEqual(Left.of(new Error("Specific error")));
        done();
    });

    it("works with providers", () => {
        expect(
            either(
                () => 1,
                (e) => e,
            ),
        ).toEqual(Right.of(1));
        expect(
            either(
                () => {
                    throw new Error("Specific error");
                },
                (e) => e,
            ),
        ).toEqual(Left.of(new Error("Specific error")));
    });
});
