import { result } from "./result";

describe("result function", () => {
    it("works with promises", async (done) => {
        expect(await result(Promise.resolve(1))).toEqual(1);
        expect(await result(Promise.resolve(1), (o: unknown): o is number => false)).toEqual(new Error("Type guard validation failed"));
        expect(await result(Promise.reject())).toEqual(new Error("Unknown error"));
        expect(await result(Promise.reject({}))).toEqual(new Error("Unknown error"));
        expect(await result(Promise.reject({ message: "Specific error" }))).toEqual(new Error("Specific error"));
        expect(await result(Promise.reject(new Error()))).toEqual(new Error());
        expect(await result(Promise.reject(new Error("Specific error")))).toEqual(new Error("Specific error"));
        done();
    });

    it("works with providers", () => {
        expect(result(() => 1)).toEqual(1);
        expect(
            result(() => {
                throw new Error("");
            }),
        ).toEqual(new Error(""));
    });
});
