/**
 * Calculates the population variance of the given values.
 *
 * @param x - Numeric values.
 * @returns The population variance, or `NaN` if no values are provided.
 *
 * @example
 * ```js
 * variance(1, 2, 3, 4, 5); // 2
 * ```
 */
export declare const variance: (...x: number[]) => number;

/**
 * Calculates the population standard deviation of the given values.
 *
 * @param x - Numeric values.
 * @returns The population standard deviation.
 *
 * @example
 * ```js
 * std(1, 2, 3, 4, 5); // 1.4142135623730951
 * ```
 */
export declare const std: (...x: number[]) => number;

/**
 * Calculates the sample variance of the given values.
 *
 * Uses Bessel's correction by dividing by `n - 1`.
 *
 * @param x - Numeric values.
 * @returns The sample variance, or `NaN` if fewer than two values are provided.
 *
 * @example
 * ```js
 * sample_variance(1, 2, 3, 4, 5); // 2.5
 * ```
 */
export declare const sample_variance: (...x: number[]) => number;

/**
 * Calculates the sample standard deviation of the given values.
 *
 * @param x - Numeric values.
 * @returns The sample standard deviation.
 *
 * @example
 * ```js
 * sample_std(1, 2, 3, 4, 5); // 1.5811388300841898
 * ```
 */
export declare const sample_std: (...x: number[]) => number;

/**
 * Calculates the weighted population variance.
 *
 * @param X - Numeric values.
 * @param weights - Weight associated with each value.
 * @returns The weighted variance, or `NaN` if the arrays have different lengths or are empty.
 *
 * @example
 * ```js
 * weighted_variance([1, 2, 3], [1, 2, 1]); // 0.5
 * ```
 */
export declare const weighted_variance: (
  X: number[],
  weights: number[]
) => number;

/**
 * Calculates the weighted standard deviation.
 *
 * @param X - Numeric values.
 * @param weights - Weight associated with each value.
 * @returns The weighted standard deviation.
 *
 * @example
 * ```js
 * weighted_std([1, 2, 3], [1, 2, 1]); // 0.7071067811865476
 * ```
 */
export declare const weighted_std: (
  X: number[],
  weights: number[]
) => number;

/**
 * Calculates the rolling sample variance over a moving window.
 *
 * @param X - Numeric values.
 * @param windowSize - Number of values included in each window.
 * @returns An array containing the sample variance for each window.
 *
 * @example
 * ```js
 * rolling_variance([1, 2, 3, 4, 5], 3);
 * // [1, 1, 1]
 * ```
 */
export declare const rolling_variance: (
  X: number[],
  windowSize: number
) => number[];

/**
 * Calculates the rolling sample standard deviation over a moving window.
 *
 * @param X - Numeric values.
 * @param windowSize - Number of values included in each window.
 * @returns An array containing the sample standard deviation for each window.
 *
 * @example
 * ```js
 * rolling_std([1, 2, 3, 4, 5], 3);
 * // [1, 1, 1]
 * ```
 */
export declare const rolling_std: (
  X: number[],
  windowSize: number
) => number[];