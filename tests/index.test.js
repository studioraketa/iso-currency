import Currency from "../src/index";

describe("currencyName", () => {
  test("returns the correct name", () => {
    expect(Currency.currencyName("USD")).toBe("US Dollar");
  });

  test("throws an error for wrong currency code", () => {
    expect(() => Currency.currencyName("US")).toThrow(
      'A currency with code "US" not found.',
    );
  });
});

describe("toMinor", () => {
  test("converts an amount to minor currency units for a given currency", () => {
    expect(Currency.toMinor(2.3, "EUR")).toBe(230);
  });

  test("throws an error for wrong currency code", () => {
    expect(() => Currency.toMinor(2.3, "EU")).toThrow(
      'A currency with code "EU" not found.',
    );
  });
});

describe("toMajor", () => {
  test("converts an amount to major currency units for a given currency", () => {
    expect(Currency.toMajor(230, "EUR")).toBe(2.3);
  });

  test("throws an error for wrong currency code", () => {
    expect(() => Currency.toMajor(2.3, "EU")).toThrow(
      'A currency with code "EU" not found.',
    );
  });
});

describe("all", () => {
  test("Returns a list of objects sorted by name", () => {
    const list = Currency.all();

    expect(list).toContainEqual({
      code: "XUA",
      name: "ADB Unit of Account",
    });

    expect(list.length).toBe(179);
  });
});
