import { describe, expect, it } from "vitest";

import {
  dist_normal,
  dist_uniform,
  dist_exponential,
  dist_gamma,
  dist_beta,
  dist_cauchy,
  dist_chi2,
  dist_student_t,
} from "numz/stats";

describe("dist_normal", () => {
  it("computes the standard normal density at zero", () => {
    expect(dist_normal(0)).toBeCloseTo(
      1 / Math.sqrt(2 * Math.PI),
    );
  });

  it("is symmetric around the mean", () => {
    expect(dist_normal(-1)).toBeCloseTo(dist_normal(1));
  });

  it("supports a custom mean", () => {
    expect(dist_normal(5, 5)).toBeCloseTo(
      1 / Math.sqrt(2 * Math.PI),
    );
  });

  it("supports a custom standard deviation", () => {
    expect(dist_normal(0, 0, 2)).toBeCloseTo(
      1 / (2 * Math.sqrt(2 * Math.PI)),
    );
  });

  it("decreases away from the mean", () => {
    expect(dist_normal(0)).toBeGreaterThan(dist_normal(1));
    expect(dist_normal(1)).toBeGreaterThan(dist_normal(2));
  });
});

describe("dist_uniform", () => {
  it("computes the standard uniform density", () => {
    expect(dist_uniform(0.5)).toBe(1);
  });

  it("returns zero below the interval", () => {
    expect(dist_uniform(-1)).toBe(0);
  });

  it("returns zero above the interval", () => {
    expect(dist_uniform(2)).toBe(0);
  });

  it("includes the boundaries", () => {
    expect(dist_uniform(0)).toBe(1);
    expect(dist_uniform(1)).toBe(1);
  });

  it("supports a custom interval", () => {
    expect(dist_uniform(5, 0, 10)).toBe(0.1);
  });
});

describe("dist_exponential", () => {
  it("computes the standard exponential density at zero", () => {
    expect(dist_exponential(0)).toBe(1);
  });

  it("returns zero for negative values", () => {
    expect(dist_exponential(-1)).toBe(0);
  });

  it("decreases as x increases", () => {
    expect(dist_exponential(0)).toBeGreaterThan(dist_exponential(1));
    expect(dist_exponential(1)).toBeGreaterThan(dist_exponential(2));
  });

  it("supports a custom rate", () => {
    expect(dist_exponential(0, 2)).toBe(2);
  });

  it("computes the density correctly", () => {
    expect(dist_exponential(1, 2)).toBeCloseTo(
      2 * Math.exp(-2),
    );
  });
});

describe("dist_gamma", () => {
  it("computes the gamma density for k=1", () => {
    expect(dist_gamma(0, 1)).toBeCloseTo(1);
  });

  it("returns zero for negative values", () => {
    expect(dist_gamma(-1, 2)).toBe(0);
  });

  it("computes the gamma density for k=2", () => {
    expect(dist_gamma(1, 2)).toBeCloseTo(Math.exp(-1));
  });

  it("supports a custom scale", () => {
    expect(dist_gamma(1, 2, 2)).toBeCloseTo(
      Math.exp(-0.5) / 4,
    );
  });
});

describe("dist_beta", () => {
  it("computes the beta(1,1) density", () => {
    expect(dist_beta(0.5, 1, 1)).toBeCloseTo(1);
  });

  it("returns zero below zero", () => {
    expect(dist_beta(-1, 1, 1)).toBe(0);
  });

  it("returns zero above one", () => {
    expect(dist_beta(2, 1, 1)).toBe(0);
  });

  it("computes the beta(2,2) density", () => {
    expect(dist_beta(0.5, 2, 2)).toBeCloseTo(1.5);
  });

  it("is symmetric for equal parameters", () => {
    expect(dist_beta(0.25, 2, 2)).toBeCloseTo(
      dist_beta(0.75, 2, 2),
    );
  });
});

describe("dist_cauchy", () => {
  it("computes the standard Cauchy density at zero", () => {
    expect(dist_cauchy(0)).toBeCloseTo(1 / Math.PI);
  });

  it("is symmetric around x0", () => {
    expect(dist_cauchy(-1)).toBeCloseTo(dist_cauchy(1));
  });

  it("supports a custom location", () => {
    expect(dist_cauchy(5, 5)).toBeCloseTo(1 / Math.PI);
  });

  it("supports a custom scale", () => {
    expect(dist_cauchy(0, 0, 2)).toBeCloseTo(
      1 / (2 * Math.PI),
    );
  });
});

describe("dist_chi2", () => {
  it("computes the chi-square density for k=2", () => {
    expect(dist_chi2(1, 2)).toBeCloseTo(
      0.5 * Math.exp(-0.5),
    );
  });

  it("returns zero for negative values", () => {
    expect(dist_chi2(-1, 2)).toBe(0);
  });

  it("computes the chi-square density for k=4", () => {
    expect(dist_chi2(2, 4)).toBeCloseTo(
      0.5 * Math.exp(-1),
    );
  });
});

describe("dist_student_t", () => {
  it("computes the standard t density at zero", () => {
    expect(dist_student_t(0, 1)).toBeCloseTo(
      1 / Math.PI,
    );
  });

  it("is symmetric around zero", () => {
    expect(dist_student_t(-1, 5)).toBeCloseTo(
      dist_student_t(1, 5),
    );
  });

  it("supports different degrees of freedom", () => {
    expect(dist_student_t(0, 2)).toBeCloseTo(
      1 / (2 * Math.sqrt(2)),
    );
  });

  it("decreases away from zero", () => {
    expect(dist_student_t(0, 5)).toBeGreaterThan(
      dist_student_t(1, 5),
    );
  });
});
