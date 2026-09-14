import { describe, expect, it } from "vitest";

import {
  mean,
  geo_mean,
  rms,
  weighted_mean,
  harmonic_mean,
  power_mean,
  trimmed_mean,
  winsorized_mean,
  midrange,
  midhinge,
  iq_mean,
  contraharmonic_mean,
} from "numz/stats";

describe("mean", () => {
  it("computes the arithmetic mean", () => {
    expect(mean(1, 2, 3, 4, 5)).toBe(3);
  });

  it("handles a single value", () => {
    expect(mean(5)).toBe(5);
  });

  it("handles negative values", () => {
    expect(mean(-2, 4, 6)).toBeCloseTo(8 / 3);
  });

  it("handles decimals", () => {
    expect(mean(0.5, 1.5, 2)).toBeCloseTo(4 / 3);
  });
});

describe("geo_mean", () => {
  it("computes the geometric mean", () => {
    expect(geo_mean(1, 2, 4)).toBeCloseTo(2);
  });

  it("computes the geometric mean of equal values", () => {
    expect(geo_mean(5, 5, 5)).toBeCloseTo(5);
  });

  it("handles zero", () => {
    expect(geo_mean(0, 2, 4)).toBe(0);
  });
});

describe("rms", () => {
  it("computes the root mean square", () => {
    expect(rms(3, 4)).toBeCloseTo(Math.sqrt(12.5));
  });

  it("computes RMS for equal values", () => {
    expect(rms(5, 5, 5)).toBeCloseTo(5);
  });

  it("handles negative values", () => {
    expect(rms(-3, 4)).toBeCloseTo(Math.sqrt(12.5));
  });

  it("handles a single value", () => {
    expect(rms(5)).toBeCloseTo(5);
  });
});

describe("weighted_mean", () => {
  it("computes the weighted mean", () => {
    expect(weighted_mean([1, 2, 3], [1, 1, 1])).toBe(2);
  });

  it("handles different weights", () => {
    expect(weighted_mean([10, 20, 30], [1, 2, 3])).toBeCloseTo(70 / 3);
  });

  it("handles zero weights", () => {
    expect(weighted_mean([10, 20, 30], [0, 1, 0])).toBe(20);
  });
});

describe("harmonic_mean", () => {
  it("computes the harmonic mean", () => {
    expect(harmonic_mean(1, 2, 4)).toBeCloseTo(12 / 7);
  });

  it("computes the harmonic mean of equal values", () => {
    expect(harmonic_mean(5, 5, 5)).toBeCloseTo(5);
  });

  it("handles a single value", () => {
    expect(harmonic_mean(8)).toBe(8);
  });
});

describe("power_mean", () => {
  it("computes the quadratic mean", () => {
    expect(power_mean([3, 4], 2)).toBeCloseTo(Math.sqrt(12.5));
  });

  it("computes the arithmetic mean when p is 1", () => {
    expect(power_mean([1, 2, 3, 4], 1)).toBe(2.5);
  });

//   it("computes the cubic mean", () => {
//     expect(power_mean([1, 2, 3], 3)).toBeCloseTo(36 ** (1 / 3));
//   });
  it("computes the cubic mean", () => {
    expect(power_mean([1, 2, 3], 3)).toBeCloseTo(12 ** (1 / 3));
   });
});

describe("trimmed_mean", () => {
  it("removes k values from both ends", () => {
    expect(trimmed_mean([1, 2, 3, 4, 100], 1)).toBe(3);
  });

  it("handles an already sorted array", () => {
    expect(trimmed_mean([1, 2, 3, 4, 5], 1)).toBe(3);
  });

  it("does not mutate the input", () => {
    const values = [5, 1, 4, 2, 3];

    trimmed_mean(values, 1);

    expect(values).toEqual([5, 1, 4, 2, 3]);
  });
});

describe("winsorized_mean", () => {
//   it("limits extreme values", () => {
//     expect(winsorized_mean([1, 2, 3, 4, 100], 1)).toBeCloseTo(4.2);
//   });
  it("limits extreme values", () => {
    expect(winsorized_mean([1, 2, 3, 4, 100], 1)).toBe(3);
    });

  it("handles sorted input", () => {
    expect(winsorized_mean([1, 2, 3, 4, 5], 1)).toBe(3);
  });

  it("does not mutate the input", () => {
    const values = [5, 1, 4, 2, 3];

    winsorized_mean(values, 1);

    expect(values).toEqual([5, 1, 4, 2, 3]);
  });
});

describe("midrange", () => {
  it("computes the midpoint between minimum and maximum", () => {
    expect(midrange([1, 2, 3, 4, 5])).toBe(3);
  });

  it("handles negative values", () => {
    expect(midrange([-10, 0, 4])).toBe(-3);
  });

  it("handles a single value", () => {
    expect(midrange([7])).toBe(7);
  });
});

describe("midhinge", () => {
  it("computes the average of Q1 and Q3", () => {
    expect(midhinge(1, 2, 3, 4, 5)).toBe(3);
  });

  it("handles an even-sized dataset", () => {
    expect(midhinge(1, 2, 3, 4)).toBe(2);
  });

  it("does not mutate the input", () => {
    const values = [5, 1, 4, 2, 3];

    midhinge(...values);

    expect(values).toEqual([5, 1, 4, 2, 3]);
  });
});

describe("iq_mean", () => {
  it("computes the interquartile mean", () => {
    expect(iq_mean(1, 2, 3, 4, 5)).toBe(3);
  });

  it("handles a symmetric dataset", () => {
    expect(iq_mean(1, 2, 3, 4, 5, 6, 7)).toBe(3.5);
  });

  it("handles a dataset with outliers", () => {
    expect(iq_mean(1, 2, 3, 4, 5, 100)).toBe(3);
  });
});

describe("contraharmonic_mean", () => {
  it("computes the contraharmonic mean", () => {
    expect(contraharmonic_mean(1, 2, 3)).toBe(14 / 6);
  });

  it("computes the contraharmonic mean of equal values", () => {
    expect(contraharmonic_mean(5, 5, 5)).toBe(5);
  });

  it("handles a single value", () => {
    expect(contraharmonic_mean(8)).toBe(8);
  });
});