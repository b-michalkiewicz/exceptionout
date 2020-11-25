import { tuple } from "./tuple";

describe("tuple function", () => {
    it("works with promises", async (done) => {
        expect(await tuple(Promise.resolve(1))).toEqual([undefined, 1]);
        expect(await tuple(Promise.resolve(1), (o: unknown): o is number => false)).toEqual([new Error("Type guard validation failed")]);
        expect(await tuple(Promise.reject())).toEqual([new Error("Unknown error")]);
        expect(await tuple(Promise.reject({}))).toEqual([new Error("Unknown error")]);
        expect(await tuple(Promise.reject({ message: "Specific error" }))).toEqual([new Error("Specific error")]);
        expect(await tuple(Promise.reject(new Error()))).toEqual([new Error()]);
        expect(await tuple(Promise.reject(new Error("Specific error")))).toEqual([new Error("Specific error")]);
        done();
    });

    it("works with providers", () => {
        expect(tuple(() => 1)).toEqual([undefined, 1]);
        expect(
            tuple(() => {
                throw new Error("");
            }),
        ).toEqual([new Error("")]);
    });
});
