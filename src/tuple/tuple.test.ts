import { getTuple } from "./tuple";

describe("tuple", () => {
  describe("getTuple function", () => {
    it("works with promises", async (done) => {
      expect(await getTuple(Promise.resolve(1))).toEqual([undefined, 1]);
      expect(await getTuple(Promise.resolve(1), (o: unknown): o is number => false)).toEqual([new Error("Type guard validation failed")]);
      expect(await getTuple(Promise.reject())).toEqual([new Error("Unknown error")]);
      expect(await getTuple(Promise.reject({}))).toEqual([new Error("Unknown error")]);
      expect(await getTuple(Promise.reject({ message: "Specific error" }))).toEqual([new Error("Specific error")]);
      expect(await getTuple(Promise.reject(new Error()))).toEqual([new Error()]);
      expect(await getTuple(Promise.reject(new Error("Specific error")))).toEqual([new Error("Specific error")]);
      done();
    });

    it("works with providers", () => {
      expect(getTuple(() => 1)).toEqual([undefined, 1]);
      expect(
        getTuple(() => {
          throw new Error("");
        })
      ).toEqual([new Error("")]);
    });
  });
});
