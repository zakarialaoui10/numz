/**
 * Computes the probability mass function (PMF) of the multinomial
 * distribution.
 *
 * The multinomial distribution generalizes the binomial distribution
 * to multiple possible outcomes.
 *
 * @param kArray - Number of occurrences for each outcome.
 * @param n - Total number of trials.
 * @param pArray - Probability of each outcome.
 * @returns The probability of the specified outcome counts.
 *
 * @example
 * ```js
 * dist_multinomial(
 *   [2, 1, 1],
 *   4,
 *   [0.5, 0.25, 0.25]
 * );
 * // ≈ 0.09375
 * ```
 */
export declare const dist_multinomial: (
  kArray: number[],
  n: number,
  pArray: number[]
) => number;


/**
 * Computes the probability density function (PDF) of the
 * multivariate normal (Gaussian) distribution.
 *
 * The distribution is defined by a mean vector and covariance matrix.
 *
 * Currently, the implementation supports only 1×1 and 2×2
 * covariance matrices.
 *
 * @param xArray - Point at which to evaluate the density.
 * @param meanArray - Mean vector of the distribution.
 * @param covMatrix - Covariance matrix.
 * @returns The probability density at the specified point.
 *
 * @example
 * ```js
 * const x = [1, 2];
 * const mean = [0, 0];
 * const covariance = [
 *   [1, 0],
 *   [0, 1]
 * ];
 *
 * dist_multivariate_normal(x, mean, covariance);
 * // ≈ 0.0131
 * ```
 */
export declare const dist_multivariate_normal: (
  xArray: number[],
  meanArray: number[],
  covMatrix: number[][]
) => number;


/**
 * Computes the probability density function (PDF) of the
 * Dirichlet distribution.
 *
 * The Dirichlet distribution is a multivariate generalization
 * of the beta distribution and is defined over probability vectors.
 *
 * @param xArray - Values at which to evaluate the density.
 * @param alphaArray - Concentration parameters of the distribution.
 * @returns The probability density at the specified point.
 *
 * @example
 * ```js
 * dist_dirichlet(
 *   [0.25, 0.25, 0.5],
 *   [1, 1, 1]
 * );
 * // 2
 * ```
 */
export declare const dist_dirichlet: (
  xArray: number[],
  alphaArray: number[]
) => number;