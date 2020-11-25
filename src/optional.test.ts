import { optional } from "./optional";

describe("optional function", () => {
    it("works with promises", async (done) => {
        expect(await optional(Promise.resolve(42))).toEqual(42);
        expect(await optional(Promise.reject())).toBeUndefined();
        done();
    });

    it("works with providers", () => {
        expect(optional(() => 42)).toEqual(42);
        expect(
            optional(() => {
                throw new Error("");
            }),
        ).toBeUndefined();
    });
});
