import { describe, expect, it } from "vitest";
import {
  bitmasks,
  subsets_by_mask,
  gray_code,
  hamming_weight,
} from "numz/discret";

describe("bitmasks", () => {
  it("generates all bitmasks", () => {
    expect(bitmasks(0)).toEqual([[]]);

    expect(bitmasks(1)).toEqual([
      [0],
      [1],
    ]);

    expect(bitmasks(2)).toEqual([
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
  });

  it("generates exactly 2^n masks", () => {
    expect(bitmasks(3)).toHaveLength(8);
    expect(bitmasks(4)).toHaveLength(16);
    expect(bitmasks(5)).toHaveLength(32);
  });

  it("generates masks containing only 0 and 1", () => {
    for (const mask of bitmasks(5)) {
      expect(mask).toHaveLength(5);

      for (const bit of mask) {
        expect([0, 1]).toContain(bit);
      }
    }
  });

  it("generates every possible mask exactly once", () => {
    const masks = bitmasks(3).map((mask) => mask.join(""));
    expect(new Set(masks).size).toBe(8);
  });
});

describe("subsets_by_mask", () => {
  it("generates all subsets", () => {
    expect(subsets_by_mask([])).toEqual([
      [],
    ]);

    expect(subsets_by_mask([1])).toEqual([
      [],
      [1],
    ]);

    expect(subsets_by_mask([1, 2])).toEqual([
      [],
      [1],
      [2],
      [1, 2],
    ]);
  });

  it("generates exactly 2^n subsets", () => {
    expect(subsets_by_mask([1, 2, 3])).toHaveLength(8);
    expect(subsets_by_mask([1, 2, 3, 4])).toHaveLength(16);
  });

  it("preserves the original array values", () => {
    const arr = ["a", "b", "c"];

    expect(subsets_by_mask(arr)).toEqual([
      [],
      ["a"],
      ["b"],
      ["a", "b"],
      ["c"],
      ["a", "c"],
      ["b", "c"],
      ["a", "b", "c"],
    ]);
  });

  it("does not mutate the input array", () => {
    const arr = [1, 2, 3];
    const original = [...arr];

    subsets_by_mask(arr);

    expect(arr).toEqual(original);
  });

  it("works with arbitrary values", () => {
    const a = { id: 1 };
    const b = { id: 2 };

    expect(subsets_by_mask([a, b])).toEqual([
      [],
      [a],
      [b],
      [a, b],
    ]);
  });
});

describe("gray_code", () => {
  it("generates the base case", () => {
    expect(gray_code(0)).toEqual([0]);
  });

  it("generates 1-bit Gray code", () => {
    expect(gray_code(1)).toEqual([
      0,
      1,
    ]);
  });

  it("generates 2-bit Gray code", () => {
    expect(gray_code(2)).toEqual([
      0,
      1,
      3,
      2,
    ]);
  });

  it("generates 3-bit Gray code", () => {
    expect(gray_code(3)).toEqual([
      0,
      1,
      3,
      2,
      6,
      7,
      5,
      4,
    ]);
  });

  it("generates exactly 2^n values", () => {
    expect(gray_code(4)).toHaveLength(16);
    expect(gray_code(5)).toHaveLength(32);
  });

  it("contains every value from 0 to 2^n - 1 exactly once", () => {
    for (let n = 0; n <= 6; n++) {
      const result = gray_code(n);

      expect(new Set(result).size).toBe(2 ** n);
      expect(result.toSorted((a, b) => a - b)).toEqual(
        Array.from({ length: 2 ** n }, (_, i) => i),
      );
    }
  });

  it("consecutive values differ by exactly one bit", () => {
    for (let n = 1; n <= 6; n++) {
      const result = gray_code(n);

      for (let i = 1; i < result.length; i++) {
        const difference = result[i - 1] ^ result[i];

        expect(hamming_weight(difference)).toBe(1);
      }
    }
  });
});

describe("hamming_weight", () => {
  it("returns zero for zero", () => {
    expect(hamming_weight(0)).toBe(0);
  });

  it("counts set bits", () => {
    expect(hamming_weight(1)).toBe(1);
    expect(hamming_weight(2)).toBe(1);
    expect(hamming_weight(3)).toBe(2);
    expect(hamming_weight(7)).toBe(3);
    expect(hamming_weight(15)).toBe(4);
    expect(hamming_weight(255)).toBe(8);
  });

  it("works for powers of two", () => {
    for (let i = 0; i < 20; i++) {
      expect(hamming_weight(1 << i)).toBe(1);
    }
  });

  it("works for numbers with alternating bits", () => {
    expect(hamming_weight(0b10101010)).toBe(4);
    expect(hamming_weight(0b01010101)).toBe(4);
  });

  it("matches the binary representation", () => {
    for (let n = 0; n < 1000; n++) {
      const expected = n
        .toString(2)
        .split("")
        .filter((bit) => bit === "1").length;

      expect(hamming_weight(n)).toBe(expected);
    }
  });
});