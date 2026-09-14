import { describe, expect, it } from "vitest";

import {
  sma,
  ema,
  wma,
} from "numz/stats";

describe("sma", () => {
  it("computes a simple moving average", () => {
    expect(sma([1, 2, 3, 4, 5], 3)).toEqual([2, 3, 4]);
  });

  it("computes a window of size 1", () => {
    expect(sma([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });

  it("computes a window equal to the input length", () => {
    expect(sma([1, 2, 3, 4], 4)).toEqual([2.5]);
  });

  it("handles decimal values", () => {
    expect(sma([0.5, 1.5, 2.5], 2)).toEqual([1, 2]);
  });

  it("handles negative values", () => {
    expect(sma([-2, 0, 2, 4], 2)).toEqual([-1, 1, 3]);
  });

  it("returns an empty array when the window is larger than the input", () => {
    expect(sma([1, 2], 3)).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(sma([], 3)).toEqual([]);
  });
});

describe("ema", () => {
  it("computes an exponential moving average", () => {
    expect(ema([1, 2, 3, 4], 0.5)).toEqual([
      1,
      1.5,
      2.25,
      3.125,
    ]);
  });

  it("starts with the first value", () => {
    expect(ema([10, 20, 30], 0.5)[0]).toBe(10);
  });

  it("handles alpha=1", () => {
    expect(ema([1, 2, 3, 4], 1)).toEqual([1, 2, 3, 4]);
  });

  it("handles alpha=0", () => {
    expect(ema([1, 2, 3, 4], 0)).toEqual([1, 1, 1, 1]);
  });

  it("handles a single value", () => {
    expect(ema([42], 0.5)).toEqual([42]);
  });

  it("handles negative values", () => {
    expect(ema([-10, 0, 10], 0.5)).toEqual([
      -10,
      -5,
      2.5,
    ]);
  });

  it("handles decimal alpha", () => {
    expect(ema([10, 20, 30], 0.25)).toEqual([
      10,
      12.5,
      16.875,
    ]);
  });

  it("returns an empty array for an empty input", () => {
    expect(ema([], 0.5)).toEqual([]);
  });
});

describe("wma", () => {
  it("computes a weighted moving average", () => {
    expect(
      wma([1, 2, 3, 4, 5], [1, 2, 3]),
    ).toEqual([
      14 / 6,
      20 / 6,
      26 / 6,
    ]);
  });

  it("computes a weighted average with equal weights", () => {
    expect(
      wma([1, 2, 3, 4], [1, 1]),
    ).toEqual([1.5, 2.5, 3.5]);
  });

  it("handles a single weight", () => {
    expect(
      wma([1, 2, 3], [5]),
    ).toEqual([1, 2, 3]);
  });

  it("handles decimal weights", () => {
    expect(
      wma([10, 20, 30], [0.25, 0.75]),
    ).toEqual([17.5, 27.5]);
  });

  it("handles negative values", () => {
    expect(
      wma([-2, 0, 2], [1, 1]),
    ).toEqual([-1, 1]);
  });

  it("returns an empty array when the window is larger than the input", () => {
    expect(
      wma([1, 2], [1, 2, 3]),
    ).toEqual([]);
  });

  it("returns an empty array for an empty input", () => {
    expect(
      wma([], [1, 2]),
    ).toEqual([]);
  });
});