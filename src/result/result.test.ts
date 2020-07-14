import { getResult } from "./result";

describe("result", () => {
  describe("getResult function", () => {
    it("works with promises", async (done) => {
      expect(await getResult(Promise.resolve(1))).toEqual(1);
      expect(await getResult(Promise.resolve(1), (o: unknown): o is number => false)).toEqual(new Error("Type guard validation failed"));
      expect(await getResult(Promise.reject())).toEqual(new Error("Unknown error"));
      expect(await getResult(Promise.reject({}))).toEqual(new Error("Unknown error"));
      expect(await getResult(Promise.reject({ message: "Specific error" }))).toEqual(new Error("Specific error"));
      expect(await getResult(Promise.reject(new Error()))).toEqual(new Error());
      expect(await getResult(Promise.reject(new Error("Specific error")))).toEqual(new Error("Specific error"));
      done();
    });

    it("works with providers", () => {
      expect(getResult(() => 1)).toEqual(1);
      expect(
        getResult(() => {
          throw new Error("");
        })
      ).toEqual(new Error(""));
    });
  });
});
