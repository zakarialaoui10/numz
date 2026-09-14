import { describe, expect, it } from "vitest";

import {
  dist_multinomial,
  dist_multivariate_normal,
  dist_dirichlet,
} from "numz/stats";

describe("dist_multinomial", () => {
  it("computes a multinomial probability", () => {
    // n = 3, k = [1, 1, 1], p = [1/3, 1/3, 1/3]
    // 3! / (1!1!1!) * (1/3)^3 = 2/9
    expect(
      dist_multinomial(
        [1, 1, 1],
        3,
        [1 / 3, 1 / 3, 1 / 3],
      ),
    ).toBeCloseTo(2 / 9);
  });

  it("computes probability when all observations are in one category", () => {
    expect(
      dist_multinomial([3, 0], 3, [0.5, 0.5]),
    ).toBeCloseTo(0.125);
  });

  it("handles zero counts", () => {
    expect(
      dist_multinomial([0, 2], 2, [0.25, 0.75]),
    ).toBeCloseTo(0.75 ** 2);
  });

  it("handles a single trial", () => {
    expect(
      dist_multinomial([1, 0, 0], 1, [0.2, 0.3, 0.5]),
    ).toBeCloseTo(0.2);
  });

  it("computes the symmetric case", () => {
    expect(
      dist_multinomial(
        [2, 2, 2],
        6,
        [1 / 3, 1 / 3, 1 / 3],
      ),
    ).toBeCloseTo(
      (720 / (2 * 2 * 2)) * (1 / 3) ** 6,
    );
  });

  it("returns one for n=0", () => {
    expect(
      dist_multinomial([0, 0], 0, [0.5, 0.5]),
    ).toBe(1);
  });
});

describe("dist_multivariate_normal", () => {
  it("computes the standard 1D normal density", () => {
    expect(
      dist_multivariate_normal(
        [0],
        [0],
        [[1]],
      ),
    ).toBeCloseTo(
      1 / Math.sqrt(2 * Math.PI),
    );
  });

  it("computes the standard 1D normal away from zero", () => {
    expect(
      dist_multivariate_normal(
        [1],
        [0],
        [[1]],
      ),
    ).toBeCloseTo(
      Math.exp(-0.5) / Math.sqrt(2 * Math.PI),
    );
  });

  it("computes the standard 2D normal density at the origin", () => {
    expect(
      dist_multivariate_normal(
        [0, 0],
        [0, 0],
        [
          [1, 0],
          [0, 1],
        ],
      ),
    ).toBeCloseTo(1 / (2 * Math.PI));
  });

  it("is symmetric around the mean", () => {
    const covariance = [
      [1, 0],
      [0, 1],
    ];

    expect(
      dist_multivariate_normal(
        [-1, 1],
        [0, 0],
        covariance,
      ),
    ).toBeCloseTo(
      dist_multivariate_normal(
        [1, -1],
        [0, 0],
        covariance,
      ),
    );
  });

  it("supports a non-zero mean", () => {
    expect(
      dist_multivariate_normal(
        [2, 3],
        [2, 3],
        [
          [1, 0],
          [0, 1],
        ],
      ),
    ).toBeCloseTo(1 / (2 * Math.PI));
  });

  it("supports correlated covariance", () => {
    const covariance = [
      [1, 0.5],
      [0.5, 1],
    ];

    expect(
      dist_multivariate_normal(
        [0, 0],
        [0, 0],
        covariance,
      ),
    ).toBeCloseTo(
      1 / (2 * Math.PI * Math.sqrt(0.75)),
    );
  });

  it("decreases away from the mean", () => {
    const covariance = [
      [1, 0],
      [0, 1],
    ];

    expect(
      dist_multivariate_normal(
        [0, 0],
        [0, 0],
        covariance,
      ),
    ).toBeGreaterThan(
      dist_multivariate_normal(
        [1, 0],
        [0, 0],
        covariance,
      ),
    );
  });

  it("throws for dimensions greater than 2", () => {
    expect(() =>
      dist_multivariate_normal(
        [0, 0, 0],
        [0, 0, 0],
        [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
      ),
    ).toThrow("Only 1x1 and 2x2 supported for now");
  });
});

describe("dist_dirichlet", () => {
  it("computes the uniform Dirichlet distribution", () => {
    expect(
      dist_dirichlet(
        [0.2, 0.3, 0.5],
        [1, 1, 1],
      ),
    ).toBeCloseTo(2);
  });

  it("computes a symmetric Dirichlet distribution", () => {
    expect(
        dist_dirichlet(
        [0.25, 0.25, 0.5],
        [2, 2, 2],
        ),
    ).toBeCloseTo(3.75);
    });

  it("computes a two-dimensional Dirichlet distribution", () => {
    // Dirichlet(alpha=[2,2]) = Beta(2,2)
    expect(
      dist_dirichlet(
        [0.5, 0.5],
        [2, 2],
      ),
    ).toBeCloseTo(1.5);
  });

  it("handles equal parameters", () => {
    expect(
      dist_dirichlet(
        [1 / 3, 1 / 3, 1 / 3],
        [1, 1, 1],
      ),
    ).toBeCloseTo(2);
  });

  it("is symmetric when alpha parameters are equal", () => {
    expect(
      dist_dirichlet(
        [0.2, 0.8],
        [2, 2],
      ),
    ).toBeCloseTo(
      dist_dirichlet(
        [0.8, 0.2],
        [2, 2],
      ),
    );
  });

  it("returns a higher density near the center for alpha > 1", () => {
    expect(
      dist_dirichlet(
        [0.5, 0.5],
        [2, 2],
      ),
    ).toBeGreaterThan(
      dist_dirichlet(
        [0.1, 0.9],
        [2, 2],
      ),
    );
  });
});