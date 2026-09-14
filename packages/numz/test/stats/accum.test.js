import { describe, expect, it } from "vitest";

import {
  accum_sum,
  accum_product,
  accum_max,
  accum_min,
} from "numz/stats";

describe("accum_sum", () => {
  it("computes cumulative sums", () => {
    expect(accum_sum([1, 2, 3, 4])).toEqual([1, 3, 6, 10]);
  });

  it("handles an empty array", () => {
    expect(accum_sum([])).toEqual([]);
  });

  it("handles negative numbers", () => {
    expect(accum_sum([-1, 2, -3, 4])).toEqual([
      -1,
      1,
      -2,
      2,
    ]);
  });

  it("handles decimals", () => {
    expect(accum_sum([0.5, 1.5, 2])).toEqual([0.5, 2, 4]);
  });

  it("handles a single value", () => {
    expect(accum_sum([5])).toEqual([5]);
  });

  it("does not mutate the input", () => {
    const input = [1, 2, 3];
    accum_sum(input);

    expect(input).toEqual([1, 2, 3]);
  });
});

describe("accum_product", () => {
  it("computes cumulative products", () => {
    expect(accum_product([1, 2, 3, 4])).toEqual([
      1,
      2,
      6,
      24,
    ]);
  });

  it("handles an empty array", () => {
    expect(accum_product([])).toEqual([]);
  });

  it("handles zero", () => {
    expect(accum_product([2, 3, 0, 4])).toEqual([
      2,
      6,
      0,
      0,
    ]);
  });

  it("handles negative numbers", () => {
    expect(accum_product([-2, 3, -2])).toEqual([
      -2,
      -6,
      12,
    ]);
  });

  it("handles decimals", () => {
    expect(accum_product([0.5, 2, 4])).toEqual([
      0.5,
      1,
      4,
    ]);
  });

  it("handles a single value", () => {
    expect(accum_product([5])).toEqual([5]);
  });

  it("does not mutate the input", () => {
    const input = [2, 3, 4];
    accum_product(input);

    expect(input).toEqual([2, 3, 4]);
  });
});

describe("accum_max", () => {
  it("computes cumulative maximums", () => {
    expect(accum_max([1, 3, 2, 5, 4])).toEqual([
      1,
      3,
      3,
      5,
      5,
    ]);
  });

  it("handles an empty array", () => {
    expect(accum_max([])).toEqual([]);
  });

  it("handles negative numbers", () => {
    expect(accum_max([-5, -2, -8, -1])).toEqual([
      -5,
      -2,
      -2,
      -1,
    ]);
  });

  it("handles values already in descending order", () => {
    expect(accum_max([5, 4, 3, 2, 1])).toEqual([
      5,
      5,
      5,
      5,
      5,
    ]);
  });

  it("handles a single value", () => {
    expect(accum_max([7])).toEqual([7]);
  });

  it("does not mutate the input", () => {
    const input = [1, 5, 3];
    accum_max(input);

    expect(input).toEqual([1, 5, 3]);
  });
});

describe("accum_min", () => {
  it("computes cumulative minimums", () => {
    expect(accum_min([5, 3, 4, 1, 2])).toEqual([
      5,
      3,
      3,
      1,
      1,
    ]);
  });

  it("handles an empty array", () => {
    expect(accum_min([])).toEqual([]);
  });

  it("handles negative numbers", () => {
    expect(accum_min([-1, -3, -2, -5])).toEqual([
      -1,
      -3,
      -3,
      -5,
    ]);
  });

  it("handles values already in ascending order", () => {
    expect(accum_min([1, 2, 3, 4, 5])).toEqual([
      1,
      1,
      1,
      1,
      1,
    ]);
  });

  it("handles a single value", () => {
    expect(accum_min([7])).toEqual([7]);
  });

  it("does not mutate the input", () => {
    const input = [5, 2, 4];
    accum_min(input);

    expect(input).toEqual([5, 2, 4]);
  });
});