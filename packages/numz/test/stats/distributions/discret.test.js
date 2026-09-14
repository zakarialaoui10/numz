import { describe, expect, it } from "vitest";

import {
  dist_binomial,
  dist_poisson,
  dist_geometric,
  dist_negative_binomial,
  dist_hypergeometric,
  dist_bernoulli,
} from "numz/stats";

describe("dist_binomial", () => {
  it("computes a binomial probability", () => {
    expect(dist_binomial(2, 4, 0.5)).toBeCloseTo(0.375);
  });

  it("computes probability for k=0", () => {
    expect(dist_binomial(0, 5, 0.5)).toBeCloseTo(0.03125);
  });

  it("computes probability for k=n", () => {
    expect(dist_binomial(5, 5, 0.5)).toBeCloseTo(0.03125);
  });

  it("returns zero when k is below zero", () => {
    expect(dist_binomial(-1, 5, 0.5)).toBe(0);
  });

  it("returns zero when k is greater than n", () => {
    expect(dist_binomial(6, 5, 0.5)).toBe(0);
  });

  it("handles p=0", () => {
    expect(dist_binomial(0, 5, 0)).toBe(1);
    expect(dist_binomial(1, 5, 0)).toBe(0);
  });

  it("handles p=1", () => {
    expect(dist_binomial(5, 5, 1)).toBe(1);
    expect(dist_binomial(4, 5, 1)).toBe(0);
  });

  it("probabilities sum to one", () => {
    const probabilities = Array.from(
      { length: 11 },
      (_, k) => dist_binomial(k, 10, 0.3),
    );

    expect(
      probabilities.reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(1);
  });
});

describe("dist_poisson", () => {
  it("computes a Poisson probability", () => {
    expect(dist_poisson(2, 3)).toBeCloseTo(
      (3 ** 2 * Math.exp(-3)) / 2,
    );
  });

  it("computes probability at zero", () => {
    expect(dist_poisson(0, 4)).toBeCloseTo(Math.exp(-4));
  });

  it("returns zero for negative k", () => {
    expect(dist_poisson(-1, 3)).toBe(0);
  });

  it("computes probability for k=1", () => {
    expect(dist_poisson(1, 2)).toBeCloseTo(
      2 * Math.exp(-2),
    );
  });

  it("probabilities sum to one approximately", () => {
    const probabilities = Array.from(
      { length: 30 },
      (_, k) => dist_poisson(k, 4),
    );

    expect(
      probabilities.reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(1, 6);
  });
});

describe("dist_geometric", () => {
  it("computes a geometric probability", () => {
    expect(dist_geometric(1, 0.25)).toBeCloseTo(0.25);
  });

  it("computes probability for k=2", () => {
    expect(dist_geometric(2, 0.25)).toBeCloseTo(
      0.25 * 0.75,
    );
  });

  it("returns zero for k below one", () => {
    expect(dist_geometric(0, 0.5)).toBe(0);
    expect(dist_geometric(-1, 0.5)).toBe(0);
  });

  it("handles p=1", () => {
    expect(dist_geometric(1, 1)).toBe(1);
    expect(dist_geometric(2, 1)).toBe(0);
  });

  it("probabilities sum to one approximately", () => {
    const probabilities = Array.from(
      { length: 100 },
      (_, i) => dist_geometric(i + 1, 0.25),
    );

    expect(
      probabilities.reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(1, 6);
  });
});

describe("dist_negative_binomial", () => {
  it("computes a negative binomial probability", () => {
    expect(dist_negative_binomial(2, 3, 0.5)).toBeCloseTo(
      0.1875,
    );
  });

  it("computes probability for zero failures", () => {
    expect(dist_negative_binomial(0, 3, 0.5)).toBeCloseTo(
      0.125,
    );
  });

  it("returns zero for negative k", () => {
    expect(dist_negative_binomial(-1, 3, 0.5)).toBe(0);
  });

  it("handles p=1", () => {
    expect(dist_negative_binomial(0, 3, 1)).toBe(1);
    expect(dist_negative_binomial(1, 3, 1)).toBe(0);
  });

  it("probabilities sum to one approximately", () => {
    const probabilities = Array.from(
      { length: 100 },
      (_, k) => dist_negative_binomial(k, 3, 0.5),
    );

    expect(
      probabilities.reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(1, 6);
  });
});

describe("dist_hypergeometric", () => {
  it("computes a hypergeometric probability", () => {
    // N=10, K=4, n=3, P(X=2) = C(4,2)C(6,1)/C(10,3)
    expect(dist_hypergeometric(2, 10, 4, 3)).toBeCloseTo(
      0.3,
    );
  });

  it("computes probability for zero successes", () => {
    expect(dist_hypergeometric(0, 10, 4, 3)).toBeCloseTo(
      0.1666666667,
    );
  });

  it("returns zero when k is negative", () => {
    expect(dist_hypergeometric(-1, 10, 4, 3)).toBe(0);
  });

  it("returns zero when k is greater than n", () => {
    expect(dist_hypergeometric(4, 10, 4, 3)).toBe(0);
  });

  it("returns zero when k is greater than K", () => {
    expect(dist_hypergeometric(5, 10, 4, 6)).toBe(0);
  });

  it("probabilities sum to one", () => {
    const probabilities = Array.from(
      { length: 4 },
      (_, k) => dist_hypergeometric(k, 10, 4, 3),
    );

    expect(
      probabilities.reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(1);
  });
});

describe("dist_bernoulli", () => {
  it("returns 1-p for k=0", () => {
    expect(dist_bernoulli(0, 0.3)).toBeCloseTo(0.7);
  });

  it("returns p for k=1", () => {
    expect(dist_bernoulli(1, 0.3)).toBeCloseTo(0.3);
  });

  it("returns zero for values other than 0 and 1", () => {
    expect(dist_bernoulli(-1, 0.5)).toBe(0);
    expect(dist_bernoulli(2, 0.5)).toBe(0);
  });

  it("handles p=0", () => {
    expect(dist_bernoulli(0, 0)).toBe(1);
    expect(dist_bernoulli(1, 0)).toBe(0);
  });

  it("handles p=1", () => {
    expect(dist_bernoulli(0, 1)).toBe(0);
    expect(dist_bernoulli(1, 1)).toBe(1);
  });

  it("probabilities sum to one", () => {
    expect(
      dist_bernoulli(0, 0.4) + dist_bernoulli(1, 0.4),
    ).toBeCloseTo(1);
  });
});