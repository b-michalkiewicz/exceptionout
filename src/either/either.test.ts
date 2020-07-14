import { getEither, Left, Right } from "./either";

describe("either", () => {
  describe("getEither function", () => {
    it("works with promises", async (done) => {
      expect(await getEither(Promise.resolve(1), () => undefined)).toEqual(Right.of(1));
      expect(await getEither(Promise.reject(), () => false)).toEqual(Left.of(false));
      expect(
        await getEither(
          Promise.resolve(1),
          (e) => e,
          (o: unknown): o is number => true
        )
      ).toEqual(Right.of(1));

      expect(
        await getEither(
          Promise.resolve(1),
          (e) => e,
          (o: unknown): o is number => false
        )
      ).toEqual(Left.of(new Error("Type guard validation failed")));
      expect(await getEither(Promise.reject({}), (e) => e)).toEqual(Left.of({}));
      expect(await getEither(Promise.reject({}), () => new Error("Specific error"))).toEqual(Left.of(new Error("Specific error")));
      done();
    });

    it("works with providers", () => {
      expect(
        getEither(
          () => 1,
          (e) => e
        )
      ).toEqual(Right.of(1));
      expect(
        getEither(
          () => {
            throw new Error("Specific error");
          },
          (e) => e
        )
      ).toEqual(Left.of(new Error("Specific error")));
    });
  });
});
