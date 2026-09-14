import { describe, expect, it } from "vitest";
import {
  noise,
  signum,
  ramp,
  rect,
  tri,
  dirac,
  lorentz,
  sinc,
  gaussian_pulse,
  exp_pulse,
  trapezoid,
  hamming,
  hanning,
  dirichlet,
} from "numz/signal";

describe("signal functions", () => {
  describe("noise", () => {
    it("is not implemented", () => {
      expect(noise).toBeNull();
    });
  });

  describe("signum", () => {
    it("returns the sign of a value", () => {
      expect(signum(-2)).toBe(-1);
      expect(signum(0)).toBe(0);
      expect(signum(2)).toBe(1);
    });

    it("supports custom amplitude", () => {
      expect(signum(-2, 0, 5)).toBe(-5);
      expect(signum(2, 0, 5)).toBe(5);
    });

    it("supports offset", () => {
      expect(signum(1, 2)).toBe(-1);
      expect(signum(2, 2)).toBe(0);
      expect(signum(3, 2)).toBe(1);
    });

    it("accepts arrays", () => {
      expect(signum([-2, 0, 2])).toEqual([-1, 0, 1]);
    });
  });

  describe("ramp", () => {
    it("generates a ramp", () => {
      expect(ramp(-1)).toBe(0);
      expect(ramp(0)).toBe(0);
      expect(ramp(1)).toBe(1);
      expect(ramp(2)).toBe(2);
    });

    it("supports offset and amplitude", () => {
      expect(ramp(1, 2, 3)).toBe(0);
      expect(ramp(2, 2, 3)).toBe(0);
      expect(ramp(3, 2, 3)).toBe(3);
    });

    it("accepts arrays", () => {
      expect(ramp([-1, 0, 1, 2])).toEqual([0, 0, 1, 2]);
    });
  });

  describe("rect", () => {
    it("generates a rectangular pulse", () => {
      expect(rect(-0.5)).toBe(1);
      expect(rect(0)).toBe(1);
      expect(rect(0.5)).toBe(1);
      expect(rect(0.6)).toBe(0);
    });

    it("supports custom width", () => {
      expect(rect(-1, 0, 1, 2)).toBe(1);
      expect(rect(1, 0, 1, 2)).toBe(1);
      expect(rect(1.1, 0, 1, 2)).toBe(0);
    });

    it("supports amplitude and offset", () => {
      expect(rect(2, 2, 5)).toBe(5);
      expect(rect(0, 2, 5)).toBe(0);
    });

    it("accepts arrays", () => {
      expect(rect([-1, 0, 0.5, 1])).toEqual([0, 1, 1, 0]);
    });
  });

  describe("tri", () => {
    it("generates a triangular pulse", () => {
      expect(tri(0)).toBe(1);
      expect(tri(0.25)).toBe(0.5);
      expect(tri(0.5)).toBe(0);
      expect(tri(-0.25)).toBe(0.5);
      expect(tri(0.6)).toBe(0);
    });

    it("supports custom period and amplitude", () => {
      expect(tri(0, 2, 0, 5)).toBe(5);
      expect(tri(0.5, 2, 0, 5)).toBe(2.5);
      expect(tri(1, 2, 0, 5)).toBe(0);
    });

    it("supports offset", () => {
      expect(tri(2, 1, 2)).toBe(1);
      expect(tri(2.25, 1, 2)).toBe(0.5);
    });

    it("accepts arrays", () => {
      expect(tri([-0.5, 0, 0.5])).toEqual([0, 1, 0]);
    });
  });

  describe("dirac", () => {
    it("approximates a Dirac delta", () => {
      expect(dirac(0)).toBe(1e6);
      expect(dirac(0.5)).toBe(0);
    });

    it("supports custom amplitude and epsilon", () => {
      expect(dirac(0, 0, 0.1, 5)).toBe(50);
      expect(dirac(0.05, 0, 0.1, 5)).toBe(50);
      expect(dirac(0.1, 0, 0.1, 5)).toBe(0);
    });

    it("supports offset", () => {
      expect(dirac(2, 2, 1)).toBe(1);
      expect(dirac(0, 2, 1)).toBe(0);
    });

    it("accepts arrays", () => {
      expect(dirac([-1, 0, 1], 0, 1)).toEqual([
        0,
        1,
        0,
      ]);
    });
  });

  describe("lorentz", () => {
    it("generates a Lorentzian pulse", () => {
      expect(lorentz(0)).toBeCloseTo(1 / Math.PI);
      expect(lorentz(1)).toBeCloseTo(1 / (2 * Math.PI));
    });

    it("reaches maximum at the center", () => {
      expect(lorentz(0)).toBeGreaterThan(lorentz(1));
      expect(lorentz(0)).toBeGreaterThan(lorentz(2));
    });

    it("supports custom parameters", () => {
      expect(lorentz(0, 0, 2, 3)).toBeCloseTo(3 / (2 * Math.PI));
      expect(lorentz(2, 2, 1, 5)).toBeCloseTo(5 / Math.PI);
    });

    it("accepts arrays", () => {
      expect(lorentz([-1, 0, 1])).toEqual([
        expect.closeTo(1 / (2 * Math.PI)),
        expect.closeTo(1 / Math.PI),
        expect.closeTo(1 / (2 * Math.PI)),
      ]);
    });
  });

  describe("sinc", () => {
    it("returns one at the center", () => {
      expect(sinc(0)).toBe(1);
    });

    it("computes the normalized sinc function", () => {
      expect(sinc(1)).toBeCloseTo(0);
      expect(sinc(0.5)).toBeCloseTo(2 / Math.PI);
    });

    it("supports amplitude and offset", () => {
      expect(sinc(2, 2, 5)).toBe(5);
      expect(sinc(3, 2, 5)).toBeCloseTo(0);
    });

    it("accepts arrays", () => {
      expect(sinc([0, 0.5, 1])).toEqual([
        1,
        expect.closeTo(2 / Math.PI),
        expect.closeTo(0),
      ]);
    });
  });

  describe("gaussian_pulse", () => {
    it("generates a Gaussian pulse", () => {
      expect(gaussian_pulse(0)).toBe(1);
      expect(gaussian_pulse(1)).toBeCloseTo(Math.exp(-0.5));
    });

    it("reaches maximum at the center", () => {
      expect(gaussian_pulse(0)).toBeGreaterThan(
        gaussian_pulse(1),
      );
    });

    it("supports custom parameters", () => {
      expect(gaussian_pulse(2, 2, 1, 5)).toBe(5);
      expect(gaussian_pulse(3, 2, 1, 5)).toBeCloseTo(
        5 * Math.exp(-0.5),
      );
    });

    it("accepts arrays", () => {
      expect(gaussian_pulse([0, 1])).toEqual([
        1,
        expect.closeTo(Math.exp(-0.5)),
      ]);
    });
  });

  describe("exp_pulse", () => {
    it("generates a causal exponential pulse", () => {
      expect(exp_pulse(-1)).toBe(0);
      expect(exp_pulse(0)).toBe(1);
      expect(exp_pulse(1)).toBeCloseTo(Math.exp(-1));
    });

    it("supports custom alpha and amplitude", () => {
      expect(exp_pulse(0, 0, 2, 5)).toBe(5);
      expect(exp_pulse(1, 0, 2, 5)).toBeCloseTo(
        5 * Math.exp(-2),
      );
    });

    it("supports offset", () => {
      expect(exp_pulse(1, 2)).toBe(0);
      expect(exp_pulse(2, 2)).toBe(1);
    });

    it("accepts arrays", () => {
      expect(exp_pulse([-1, 0, 1])).toEqual([
        0,
        1,
        expect.closeTo(Math.exp(-1)),
      ]);
    });
  });

  describe("trapezoid", () => {

    it("generates a trapezoidal pulse", () => {
        expect(trapezoid(0)).toBe(0);
        expect(trapezoid(0.25)).toBe(0.5);
        expect(trapezoid(0.5)).toBe(1);
        expect(trapezoid(1)).toBe(1);
        expect(trapezoid(1.5)).toBe(1);
        expect(trapezoid(2)).toBe(0);
    });

    it("supports custom parameters", () => {
      expect(trapezoid(0, 0, 1, 2, 1, 5)).toBe(0);
      expect(trapezoid(0.5, 0, 1, 2, 1, 5)).toBe(2.5);
      expect(trapezoid(1, 0, 1, 2, 1, 5)).toBe(5);
      expect(trapezoid(3, 0, 1, 2, 1, 5)).toBe(5);
      expect(trapezoid(4, 0, 1, 2, 1, 5)).toBe(0);
    });

    it("supports offset", () => {
      expect(trapezoid(2, 2)).toBe(0);
      expect(trapezoid(2.25, 2)).toBe(0.5);
    });

    it("accepts arrays", () => {
      expect(trapezoid([0, 0.25, 0.5])).toEqual([
        0,
        0.5,
        1,
      ]);
    });
  });

  describe("hamming", () => {
    it("generates a Hamming window", () => {
      expect(hamming(0)).toBeCloseTo(0.08);
      expect(hamming(0.5)).toBeCloseTo(1);
      expect(hamming(1)).toBeCloseTo(0.08);
      expect(hamming(1.1)).toBe(0);
    });

    it("supports amplitude and period", () => {
      expect(hamming(0, 0, 2, 5)).toBeCloseTo(0.4);
      expect(hamming(1, 0, 2, 5)).toBeCloseTo(5);
    });

    it("supports offset", () => {
      expect(hamming(2, 2)).toBeCloseTo(0.08);
      expect(hamming(2.5, 2)).toBeCloseTo(1);
    });

    it("accepts arrays", () => {
      expect(hamming([0, 0.5, 1])).toEqual([
        expect.closeTo(0.08),
        expect.closeTo(1),
        expect.closeTo(0.08),
      ]);
    });
  });

  describe("hanning", () => {
  it("generates a Hanning window", () => {
    expect(hanning(0)).toBeCloseTo(0);
    expect(hanning(0.5)).toBeCloseTo(1);
    expect(hanning(1)).toBeCloseTo(0);
    expect(hanning(1.1)).toBe(0);
  });

  it("supports amplitude and period", () => {
    expect(hanning(0, 0, 2, 5)).toBeCloseTo(0);
    expect(hanning(1, 0, 2, 5)).toBeCloseTo(5);
  });

  it("supports offset", () => {
    expect(hanning(2, 2)).toBeCloseTo(0);
    expect(hanning(2.5, 2)).toBeCloseTo(1);
  });

  it("accepts arrays", () => {
    expect(hanning([0, 0.5, 1])).toEqual([
      expect.closeTo(0),
      expect.closeTo(1),
      expect.closeTo(0),
    ]);
  });
});

  describe("dirichlet", () => {
    it("returns one at the center", () => {
      expect(dirichlet(0)).toBe(1);
    });

    it("computes the periodic sinc", () => {
      expect(dirichlet(0.5, 5)).toBeCloseTo(0.2);
      expect(dirichlet(1)).toBeCloseTo(1);
    });

    it("supports amplitude and offset", () => {
      expect(dirichlet(2, 5, 2, 3)).toBe(3);
      expect(dirichlet(2.5, 5, 2, 3)).toBeCloseTo(
        3 * Math.sin(2.5 * Math.PI) /
        (5 * Math.sin(0.5 * Math.PI)),
      );
    });

    it("accepts arrays", () => {
      expect(dirichlet([0, 0.5, 1])).toEqual([
        1,
        expect.closeTo(0.2),
        expect.closeTo(1),
      ]);
    });
  });
});