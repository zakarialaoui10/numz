import { describe, expect, it } from "vitest";

import {
  factorial,
  double_factorial,
  falling,
  rising,
} from "numz/discret";

describe("factorial", () => {
  it("computes factorials", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
    expect(factorial(10)).toBe(3628800);
  });

  it("throws for negative numbers", () => {
    expect(() => factorial(-1)).toThrow(TypeError);
  });

  it("throws for non-integers", () => {
    expect(() => factorial(2.5)).toThrow(TypeError);
  });
});

describe("double_factorial", () => {
  it("computes double factorials", () => {
    expect(double_factorial(0)).toBe(1);
    expect(double_factorial(1)).toBe(1);
    expect(double_factorial(2)).toBe(2);
    expect(double_factorial(3)).toBe(3);
    expect(double_factorial(4)).toBe(8);
    expect(double_factorial(5)).toBe(15);
    expect(double_factorial(6)).toBe(48);
    expect(double_factorial(7)).toBe(105);
  });

  it("throws for negative numbers", () => {
    expect(() => double_factorial(-1)).toThrow(TypeError);
  });

  it("throws for non-integers", () => {
    expect(() => double_factorial(2.5)).toThrow(TypeError);
  });
});

describe("falling", () => {
  it("computes falling factorials", () => {
    expect(falling(5, 0)).toBe(1);
    expect(falling(5, 1)).toBe(5);
    expect(falling(5, 2)).toBe(20);
    expect(falling(5, 3)).toBe(60);
    expect(falling(5, 4)).toBe(120);
    expect(falling(5, 5)).toBe(120);
  });

  it("handles k greater than n", () => {
    expect(falling(3, 5)).toBe(0);
  });

  it("returns 0 for negative k", () => {
    expect(falling(5, -1)).toBe(0);
  });

  it("supports negative n", () => {
    expect(falling(-3, 0)).toBe(1);
    expect(falling(-3, 1)).toBe(-3);
    expect(falling(-3, 2)).toBe(12);
    expect(falling(-3, 3)).toBe(-60);
  });

  it("throws for non-integer n", () => {
    expect(() => falling(2.5, 2)).toThrow(TypeError);
  });

  it("throws for non-integer k", () => {
    expect(() => falling(5, 2.5)).toThrow(TypeError);
  });
});

describe("rising", () => {
  it("computes rising factorials", () => {
    expect(rising(5, 0)).toBe(1);
    expect(rising(5, 1)).toBe(5);
    expect(rising(5, 2)).toBe(30);
    expect(rising(5, 3)).toBe(210);
    expect(rising(5, 4)).toBe(1680);
  });

  it("supports negative n", () => {
    expect(rising(-3, 0)).toBe(1);
    expect(rising(-3, 1)).toBe(-3);
    expect(rising(-3, 2)).toBe(6);
    expect(rising(-3, 3)).toBe(-6);
    expect(rising(-3, 4)).toBe(0);
  });

  it("returns 0 for negative k", () => {
    expect(rising(5, -1)).toBe(0);
  });

  it("throws for non-integer n", () => {
    expect(() => rising(2.5, 2)).toThrow(TypeError);
  });

  it("throws for non-integer k", () => {
    expect(() => rising(5, 2.5)).toThrow(TypeError);
  });
});