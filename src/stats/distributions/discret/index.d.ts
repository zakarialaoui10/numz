/**
 * Computes the probability mass function (PMF) of the binomial distribution.
 *
 * The binomial distribution models the number of successes in `n`
 * independent trials, each with success probability `p`.
 *
 * @param k - Number of successes.
 * @param n - Number of trials.
 * @param p - Probability of success on each trial.
 * @returns The probability of observing exactly `k` successes.
 *
 * @example
 * ```js
 * dist_binomial(3, 10, 0.5);
 * // ≈ 0.1172
 * ```
 */
export declare const dist_binomial: (
  k: number,
  n: number,
  p: number
) => number;


/**
 * Computes the probability mass function (PMF) of the Poisson distribution.
 *
 * The Poisson distribution models the number of events occurring
 * within a fixed interval when the average event rate is `lambda`.
 *
 * @param k - Number of events.
 * @param lambda - Average event rate.
 * @returns The probability of observing exactly `k` events.
 *
 * @example
 * ```js
 * dist_poisson(3, 2);
 * // ≈ 0.1804
 * ```
 */
export declare const dist_poisson: (
  k: number,
  lambda: number
) => number;


/**
 * Computes the probability mass function (PMF) of the geometric distribution.
 *
 * This implementation defines `k` as the trial number of the first success,
 * with `k` starting at 1.
 *
 * @param k - Trial number of the first success.
 * @param p - Probability of success on each trial.
 * @returns The probability that the first success occurs on trial `k`.
 *
 * @example
 * ```js
 * dist_geometric(3, 0.5);
 * // 0.125
 * ```
 */
export declare const dist_geometric: (
  k: number,
  p: number
) => number;


/**
 * Computes the probability mass function (PMF) of the negative
 * binomial distribution.
 *
 * This implementation models `k` failures occurring before the
 * `r`-th success, with success probability `p`.
 *
 * @param k - Number of failures.
 * @param r - Number of required successes.
 * @param p - Probability of success on each trial.
 * @returns The probability of observing `k` failures before the `r`-th success.
 *
 * @example
 * ```js
 * dist_negative_binomial(3, 2, 0.5);
 * // ≈ 0.125
 * ```
 */
export declare const dist_negative_binomial: (
  k: number,
  r: number,
  p: number
) => number;


/**
 * Computes the probability mass function (PMF) of the hypergeometric
 * distribution.
 *
 * The distribution describes the probability of obtaining exactly `k`
 * successes when drawing `n` items without replacement from a population
 * containing `K` successes among `N` total items.
 *
 * @param k - Number of successes in the sample.
 * @param N - Total population size.
 * @param K - Number of successes in the population.
 * @param n - Sample size.
 * @returns The probability of obtaining exactly `k` successes.
 *
 * @example
 * ```js
 * dist_hypergeometric(2, 20, 7, 5);
 * // ≈ 0.3874
 * ```
 */
export declare const dist_hypergeometric: (
  k: number,
  N: number,
  K: number,
  n: number
) => number;


/**
 * Computes the probability mass function (PMF) of the Bernoulli distribution.
 *
 * This implementation returns the probability of `k = 1` as `p`
 * and the probability of `k = 0` as `1 - p`.
 *
 * @param k - Outcome, expected to be 0 or 1.
 * @param p - Probability of success.
 * @returns The probability of the specified outcome.
 *
 * @example
 * ```js
 * dist_bernoulli(1, 0.7);
 * // 0.7
 *
 * dist_bernoulli(0, 0.7);
 * // 0.3
 *
 * dist_bernoulli(2, 0.7);
 * // 0
 * ```
 */
export declare const dist_bernoulli: (
  k: number,
  p: number
) => number;