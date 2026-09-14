import { describe, expect, it } from "vitest";

import {
  percentile,
  q1,
  median,
  q3,
  iqr,
} from "numz/stats";

describe("percentile", () => {
  it("computes the 0th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 0)).toBe(1);
  });

  it("computes the 100th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 100)).toBe(5);
  });

  it("computes the 50th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
  });

  it("interpolates between values", () => {
    expect(percentile([1, 2, 3, 4], 25)).toBeCloseTo(1.75);
    expect(percentile([1, 2, 3, 4], 75)).toBeCloseTo(3.25);
  });

  it("handles an unsorted array", () => {
    expect(percentile([5, 1, 4, 2, 3], 50)).toBe(3);
  });

  it("handles a single value", () => {
    expect(percentile([42], 0)).toBe(42);
    expect(percentile([42], 50)).toBe(42);
    expect(percentile([42], 100)).toBe(42);
  });

  it("handles duplicate values", () => {
    expect(percentile([1, 2, 2, 2, 5], 50)).toBe(2);
  });

  it("handles decimal values", () => {
    expect(
      percentile([0.5, 1.5, 2.5, 3.5], 50),
    ).toBeCloseTo(2);
  });

  it("returns NaN for an empty array", () => {
    expect(percentile([], 50)).toBeNaN();
  });

  it("computes the 25th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 25)).toBe(2);
  });

  it("computes the 75th percentile", () => {
    expect(percentile([1, 2, 3, 4, 5], 75)).toBe(4);
  });
});

describe("q1", () => {
  it("computes the first quartile", () => {
    expect(q1([1, 2, 3, 4, 5])).toBe(2);
  });

  it("uses percentile 25", () => {
    expect(q1([1, 2, 3, 4])).toBeCloseTo(1.75);
  });

  it("returns NaN for an empty array", () => {
    expect(q1([])).toBeNaN();
  });
});

describe("median", () => {
  it("computes the median of an odd-sized dataset", () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
  });

  it("computes the median of an even-sized dataset", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("handles an unsorted array", () => {
    expect(median([5, 1, 4, 2, 3])).toBe(3);
  });

  it("returns NaN for an empty array", () => {
    expect(median([])).toBeNaN();
  });
});

describe("q3", () => {
  it("computes the third quartile", () => {
    expect(q3([1, 2, 3, 4, 5])).toBe(4);
  });

  it("uses percentile 75", () => {
    expect(q3([1, 2, 3, 4])).toBeCloseTo(3.25);
  });

  it("returns NaN for an empty array", () => {
    expect(q3([])).toBeNaN();
  });
});

describe("iqr", () => {
  it("computes the interquartile range", () => {
    expect(iqr([1, 2, 3, 4, 5])).toBe(2);
  });

  it("computes the IQR for an even-sized dataset", () => {
    expect(iqr([1, 2, 3, 4])).toBeCloseTo(1.5);
  });

  it("handles an unsorted array", () => {
    expect(iqr([5, 1, 4, 2, 3])).toBe(2);
  });

  it("returns NaN for an empty array", () => {
    expect(iqr([])).toBeNaN();
  });

  it("is not affected by extreme outliers outside Q1 and Q3", () => {
    expect(iqr([1, 2, 3, 4, 5, 100])).toBeCloseTo(2.5);
  });
});