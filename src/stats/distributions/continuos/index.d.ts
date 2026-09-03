/**
 * Computes the probability density function (PDF) of the normal
 * (Gaussian) distribution.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param mean - Mean of the distribution. Defaults to 0.
 * @param std - Standard deviation of the distribution. Defaults to 1.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_normal(0);
 * // ≈ 0.3989
 *
 * dist_normal(2, 0, 1);
 * // ≈ 0.0540
 * ```
 */
export declare const dist_normal: (
  x: number,
  mean?: number,
  std?: number
) => number;


/**
 * Computes the probability density function (PDF) of the uniform
 * distribution over the interval [a, b].
 *
 * Values outside the interval have a density of 0.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param a - Lower bound of the interval. Defaults to 0.
 * @param b - Upper bound of the interval. Defaults to 1.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_uniform(0.5);
 * // 1
 *
 * dist_uniform(2, 0, 1);
 * // 0
 * ```
 */
export declare const dist_uniform: (
  x: number,
  a?: number,
  b?: number
) => number;


/**
 * Computes the probability density function (PDF) of the exponential
 * distribution.
 *
 * Values below zero have a density of 0.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param lambda - Rate parameter. Defaults to 1.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_exponential(0);
 * // 1
 *
 * dist_exponential(1, 2);
 * // ≈ 0.2707
 * ```
 */
export declare const dist_exponential: (
  x: number,
  lambda?: number
) => number;


/**
 * Computes the probability density function (PDF) of the gamma
 * distribution.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param k - Shape parameter.
 * @param theta - Scale parameter. Defaults to 1.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_gamma(2, 3);
 * // ≈ 0.2707
 *
 * dist_gamma(2, 3, 2);
 * // Gamma distribution with shape 3 and scale 2
 * ```
 */
export declare const dist_gamma: (
  x: number,
  k: number,
  theta?: number
) => number;


/**
 * Computes the probability density function (PDF) of the beta
 * distribution on the interval [0, 1].
 *
 * @param x - Value at which to evaluate the distribution.
 * @param alpha - First shape parameter.
 * @param beta - Second shape parameter.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_beta(0.5, 2, 2);
 * // 1.5
 * ```
 */
export declare const dist_beta: (
  x: number,
  alpha: number,
  beta: number
) => number;


/**
 * Computes the probability density function (PDF) of the Cauchy
 * distribution.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param x0 - Location parameter. Defaults to 0.
 * @param gamma - Scale parameter. Defaults to 1.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_cauchy(0);
 * // ≈ 0.3183
 *
 * dist_cauchy(2, 0, 1);
 * // ≈ 0.0637
 * ```
 */
export declare const dist_cauchy: (
  x: number,
  x0?: number,
  gamma?: number
) => number;


/**
 * Computes the probability density function (PDF) of the chi-squared
 * distribution with k degrees of freedom.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param k - Number of degrees of freedom.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_chi2(2, 4);
 * // ≈ 0.1839
 * ```
 */
export declare const dist_chi2: (
  x: number,
  k: number
) => number;


/**
 * Computes the probability density function (PDF) of Student's
 * t-distribution.
 *
 * @param x - Value at which to evaluate the distribution.
 * @param nu - Degrees of freedom.
 * @returns The probability density at x.
 *
 * @example
 * ```js
 * dist_student_t(0, 10);
 * // ≈ 0.3891
 *
 * dist_student_t(1, 5);
 * // ≈ 0.2197
 * ```
 */
export declare const dist_student_t: (
  x: number,
  nu: number
) => number;