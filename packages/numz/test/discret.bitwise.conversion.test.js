import { describe, expect, it } from "vitest";
import {
  base2base,
  bin2oct,
  bin2dec,
  bin2hex,
  oct2bin,
  oct2dec,
  oct2hex,
  dec2bin,
  dec2oct,
  dec2hex,
  hex2bin,
  hex2oct,
  hex2dec,
} from "numz/discret";

describe("base2base", () => {
  it("converts between common bases", () => {
    expect(base2base("1010", 2, 10)).toBe("10");
    expect(base2base("1010", 2, 8)).toBe("12");
    expect(base2base("1010", 2, 16)).toBe("a");

    expect(base2base("12", 8, 2)).toBe("1010");
    expect(base2base("12", 8, 10)).toBe("10");
    expect(base2base("12", 8, 16)).toBe("a");

    expect(base2base("10", 10, 2)).toBe("1010");
    expect(base2base("10", 10, 8)).toBe("12");
    expect(base2base("10", 10, 16)).toBe("a");

    expect(base2base("a", 16, 2)).toBe("1010");
    expect(base2base("a", 16, 8)).toBe("12");
    expect(base2base("a", 16, 10)).toBe("10");
  });

  it("supports bases from 2 to 36", () => {
    expect(base2base("10", 2, 36)).toBe("2");
    expect(base2base("z", 36, 10)).toBe("35");
    expect(base2base("35", 10, 36)).toBe("z");
  });

  it("is case-insensitive for input digits", () => {
    expect(base2base("A", 16, 10)).toBe("10");
    expect(base2base("a", 16, 10)).toBe("10");
    expect(base2base("FF", 16, 10)).toBe("255");
  });

  it("returns lowercase output", () => {
    expect(base2base("FF", 16, 16)).toBe("ff");
    expect(base2base("Z", 36, 36)).toBe("z");
  });

  it("handles zero", () => {
    expect(base2base("0", 2, 10)).toBe("0");
    expect(base2base("0", 10, 2)).toBe("0");
    expect(base2base("0", 16, 8)).toBe("0");
  });

  it("handles large values within Number's safe integer range", () => {
    expect(base2base("111111111111111111111", 2, 10)).toBe(
      String(parseInt("111111111111111111111", 2)),
    );

    expect(base2base("ffffffff", 16, 10)).toBe("4294967295");
  });

  it("throws for invalid bases", () => {
    expect(() => base2base("10", 1, 10)).toThrow(
      "Base must be between 2 and 36",
    );

    expect(() => base2base("10", 37, 10)).toThrow(
      "Base must be between 2 and 36",
    );

    expect(() => base2base("10", 10, 1)).toThrow(
      "Base must be between 2 and 36",
    );

    expect(() => base2base("10", 10, 37)).toThrow(
      "Base must be between 2 and 36",
    );
  });

  it("throws for invalid values", () => {
    expect(() => base2base("2", 2, 10)).toThrow(
      "Invalid value for the given base",
    );

    expect(() => base2base("8", 8, 10)).toThrow(
      "Invalid value for the given base",
    );

    expect(() => base2base("g", 16, 10)).toThrow(
      "Invalid value for the given base",
    );
  });
});

describe("binary conversions", () => {
  it("converts binary to octal", () => {
    expect(bin2oct("1010")).toBe("12");
    expect(bin2oct("11111111")).toBe("377");
  });

  it("converts binary to decimal", () => {
    expect(bin2dec("1010")).toBe("10");
    expect(bin2dec("11111111")).toBe("255");
  });

  it("converts binary to hexadecimal", () => {
    expect(bin2hex("1010")).toBe("a");
    expect(bin2hex("11111111")).toBe("ff");
  });
});

describe("octal conversions", () => {
  it("converts octal to binary", () => {
    expect(oct2bin("12")).toBe("1010");
    expect(oct2bin("377")).toBe("11111111");
  });

  it("converts octal to decimal", () => {
    expect(oct2dec("12")).toBe("10");
    expect(oct2dec("377")).toBe("255");
  });

  it("converts octal to hexadecimal", () => {
    expect(oct2hex("12")).toBe("a");
    expect(oct2hex("377")).toBe("ff");
  });
});

describe("decimal conversions", () => {
  it("converts decimal to binary", () => {
    expect(dec2bin("10")).toBe("1010");
    expect(dec2bin("255")).toBe("11111111");
  });

  it("converts decimal to octal", () => {
    expect(dec2oct("10")).toBe("12");
    expect(dec2oct("255")).toBe("377");
  });

  it("converts decimal to hexadecimal", () => {
    expect(dec2hex("10")).toBe("a");
    expect(dec2hex("255")).toBe("ff");
  });
});

describe("hexadecimal conversions", () => {
  it("converts hexadecimal to binary", () => {
    expect(hex2bin("a")).toBe("1010");
    expect(hex2bin("ff")).toBe("11111111");
  });

  it("converts hexadecimal to octal", () => {
    expect(hex2oct("a")).toBe("12");
    expect(hex2oct("ff")).toBe("377");
  });

  it("converts hexadecimal to decimal", () => {
    expect(hex2dec("a")).toBe("10");
    expect(hex2dec("ff")).toBe("255");
  });
});

describe("mapfun conversions", () => {
  it("maps binary conversion over an array", () => {
    expect(bin2dec(["1010", "1111", "11111111"])).toEqual([
      "10",
      "15",
      "255",
    ]);
  });

  it("maps decimal conversion over an array", () => {
    expect(dec2bin(["10", "15", "255"])).toEqual([
      "1010",
      "1111",
      "11111111",
    ]);
  });

  it("maps hexadecimal conversion over an array", () => {
    expect(hex2dec(["a", "f", "ff"])).toEqual([
      "10",
      "15",
      "255",
    ]);
  });

  it("maps octal conversion over an array", () => {
    expect(oct2bin(["10", "12", "377"])).toEqual([
      "1000",
      "1010",
      "11111111",
    ]);
  });
});