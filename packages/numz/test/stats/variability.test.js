import { describe, expect, it } from "vitest";

import {
  variance,
  std,
  sample_variance,
  sample_std,
  weighted_variance,
  weighted_std,
  rolling_variance,
  rolling_std,
} from "numz/stats";

describe("variance", () => {
  it("computes the population variance", () => {
    expect(variance(1, 2, 3, 4, 5)).toBe(2);
  });

  it("returns zero for equal values", () => {
    expect(variance(5, 5, 5, 5)).toBe(0);
  });

  it("handles a single value", () => {
    expect(variance(7)).toBe(0);
  });

  it("handles negative values", () => {
    expect(variance(-2, 0, 2)).toBeCloseTo(8 / 3);
  });

  it("handles decimal values", () => {
    expect(variance(0.5, 1.5, 2.5)).toBeCloseTo(2 / 3);
  });

  it("returns NaN for an empty input", () => {
    expect(variance()).toBeNaN();
  });
});

describe("std", () => {
  it("computes the population standard deviation", () => {
    expect(std(1, 2, 3, 4, 5)).toBeCloseTo(Math.sqrt(2));
  });

  it("returns zero for equal values", () => {
    expect(std(5, 5, 5)).toBe(0);
  });

  it("handles a single value", () => {
    expect(std(10)).toBe(0);
  });

  it("returns NaN for an empty input", () => {
    expect(std()).toBeNaN();
  });
});

describe("sample_variance", () => {
  it("computes the sample variance", () => {
    expect(sample_variance(1, 2, 3, 4, 5)).toBe(2.5);
  });

  it("returns zero for equal values", () => {
    expect(sample_variance(5, 5, 5)).toBe(0);
  });

  it("handles two values", () => {
    expect(sample_variance(1, 3)).toBe(2);
  });

  it("returns NaN for a single value", () => {
    expect(sample_variance(5)).toBeNaN();
  });

  it("returns NaN for an empty input", () => {
    expect(sample_variance()).toBeNaN();
  });

  it("handles negative values", () => {
    expect(sample_variance(-2, 0, 2)).toBe(4);
  });
});

describe("sample_std", () => {
  it("computes the sample standard deviation", () => {
    expect(sample_std(1, 2, 3, 4, 5)).toBeCloseTo(Math.sqrt(2.5));
  });

  it("returns zero for equal values", () => {
    expect(sample_std(5, 5, 5)).toBe(0);
  });

  it("returns NaN for a single value", () => {
    expect(sample_std(5)).toBeNaN();
  });

  it("returns NaN for an empty input", () => {
    expect(sample_std()).toBeNaN();
  });
});

describe("weighted_variance", () => {
  it("computes the weighted variance", () => {
    expect(
      weighted_variance(
        [1, 2, 3],
        [1, 1, 1],
      ),
    ).toBeCloseTo(2 / 3);
  });

  it("handles unequal weights", () => {
    expect(
      weighted_variance(
        [1, 2, 3],
        [1, 2, 1],
      ),
    ).toBeCloseTo(0.5);
  });

  it("returns zero when all values are equal", () => {
    expect(
      weighted_variance(
        [5, 5, 5],
        [1, 2, 3],
      ),
    ).toBe(0);
  });

  it("handles zero weights", () => {
    expect(
      weighted_variance(
        [10, 20, 30],
        [0, 1, 0],
      ),
    ).toBe(0);
  });

  it("returns NaN for empty input", () => {
    expect(weighted_variance([], [])).toBeNaN();
  });

  it("returns NaN when lengths differ", () => {
    expect(
      weighted_variance(
        [1, 2, 3],
        [1, 1],
      ),
    ).toBeNaN();
  });
});

describe("weighted_std", () => {
  it("computes the weighted standard deviation", () => {
    expect(
      weighted_std(
        [1, 2, 3],
        [1, 1, 1],
      ),
    ).toBeCloseTo(Math.sqrt(2 / 3));
  });

  it("returns zero when all values are equal", () => {
    expect(
      weighted_std(
        [5, 5, 5],
        [1, 2, 3],
      ),
    ).toBe(0);
  });

  it("returns NaN for invalid input", () => {
    expect(
      weighted_std(
        [1, 2],
        [1],
      ),
    ).toBeNaN();
  });
});

describe("rolling_variance", () => {
  it("computes rolling sample variance", () => {
    expect(
      rolling_variance([1, 2, 3, 4, 5], 3),
    ).toEqual([1, 1, 1]);
  });

  it("computes a single window", () => {
    expect(
      rolling_variance([1, 2, 3], 3),
    ).toEqual([1]);
  });

  it("handles window size of two", () => {
    expect(
      rolling_variance([1, 3, 5], 2),
    ).toEqual([2, 2]);
  });

  it("returns an empty array when the window is larger than the input", () => {
    expect(
      rolling_variance([1, 2], 3),
    ).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(
      rolling_variance([], 3),
    ).toEqual([]);
  });

  it("returns an empty array for window size zero", () => {
    expect(
      rolling_variance([1, 2, 3], 0),
    ).toEqual([]);
  });

  it("returns an empty array for a negative window size", () => {
    expect(
      rolling_variance([1, 2, 3], -1),
    ).toEqual([]);
  });

  it("handles constant values", () => {
    expect(
      rolling_variance([5, 5, 5, 5], 2),
    ).toEqual([0, 0, 0]);
  });
});

describe("rolling_std", () => {
  it("computes rolling sample standard deviation", () => {
    expect(
      rolling_std([1, 2, 3, 4, 5], 3),
    ).toEqual([1, 1, 1]);
  });

  it("computes a single window", () => {
    expect(
      rolling_std([1, 2, 3], 3),
    ).toEqual([1]);
  });

  it("handles window size of two", () => {
    expect(
      rolling_std([1, 3, 5], 2),
    ).toEqual([Math.sqrt(2), Math.sqrt(2)]);
  });

  it("returns an empty array when the window is larger than the input", () => {
    expect(
      rolling_std([1, 2], 3),
    ).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(
      rolling_std([], 3),
    ).toEqual([]);
  });

  it("handles constant values", () => {
    expect(
      rolling_std([5, 5, 5, 5], 2),
    ).toEqual([0, 0, 0]);
  });
});