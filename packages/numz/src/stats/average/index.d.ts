/**
 * Computes the arithmetic mean (average) of the given values.
 *
 * @param x - Numeric values.
 * @returns The arithmetic mean.
 *
 * @example
 * ```js
 * mean(1, 2, 3, 4);
 * // 2.5
 * ```
 */
export declare const mean: (...x: number[]) => number;


/**
 * Computes the geometric mean of the given values.
 *
 * @param x - Numeric values.
 * @returns The geometric mean.
 *
 * @example
 * ```js
 * geo_mean(1, 2, 4);
 * // ≈ 2
 * ```
 */
export declare const geo_mean: (...x: number[]) => number;


/**
 * Computes the root mean square (RMS) of the given values.
 *
 * @param x - Numeric values.
 * @returns The root mean square.
 *
 * @example
 * ```js
 * rms(3, 4);
 * // 2.5 with the current implementation
 * ```
 */
export declare const rms: (...x: number[]) => number;


/**
 * Computes the weighted arithmetic mean of a set of values.
 *
 * Each value is multiplied by its corresponding weight.
 *
 * @param values - Values to average.
 * @param weights - Weights corresponding to each value.
 * @returns The weighted mean.
 *
 * @example
 * ```js
 * weighted_mean([10, 20, 30], [1, 2, 1]);
 * // 20
 * ```
 */
export declare const weighted_mean: (
  values: number[],
  weights: number[]
) => number;


/**
 * Computes the harmonic mean of the given values.
 *
 * @param x - Numeric values.
 * @returns The harmonic mean.
 *
 * @example
 * ```js
 * harmonic_mean(1, 2, 4);
 * // ≈ 1.714
 * ```
 */
export declare const harmonic_mean: (...x: number[]) => number;


/**
 * Computes the generalized power mean of a set of values.
 *
 * @param X - Values to average.
 * @param p - Power used to compute the mean.
 * @returns The power mean.
 *
 * @example
 * ```js
 * power_mean([1, 2, 3], 2);
 * // ≈ 2.16
 * ```
 */
export declare const power_mean: (
  X: number[],
  p: number
) => number;


/**
 * Computes the trimmed mean by removing `k` values from both
 * ends of the sorted dataset.
 *
 * @param X - Values to average.
 * @param k - Number of values to remove from each end.
 * @returns The trimmed mean.
 *
 * @example
 * ```js
 * trimmed_mean([1, 2, 3, 4, 100], 1);
 * // 3
 * ```
 */
export declare const trimmed_mean: (
  X: number[],
  k: number
) => number;


/**
 * Computes the Winsorized mean by replacing values outside
 * the selected range with the corresponding boundary values.
 *
 * @param X - Values to average.
 * @param k - Number of values used to determine each boundary.
 * @returns The Winsorized mean.
 *
 * @example
 * ```js
 * winsorized_mean([1, 2, 3, 4, 100], 1);
 * // 22
 * ```
 */
export declare const winsorized_mean: (
  X: number[],
  k: number
) => number;


/**
 * Computes the midrange of a dataset.
 *
 * The midrange is the average of the minimum and maximum values.
 *
 * @param x - Numeric values.
 * @returns The midrange.
 *
 * @example
 * ```js
 * midrange([1, 2, 3, 10]);
 * // 5.5
 * ```
 */
export declare const midrange: (
  x: number[]
) => number;


/**
 * Computes the midhinge of a dataset.
 *
 * The midhinge is the average of the first and third quartiles.
 *
 * @param x - Numeric values.
 * @returns The midhinge.
 *
 * @example
 * ```js
 * midhinge(1, 2, 3, 4, 5, 6, 7, 8);
 * // ≈ 4.5
 * ```
 */
export declare const midhinge: (...x: number[]) => number;


/**
 * Computes the interquartile mean of a dataset.
 *
 * The calculation sorts the values, determines the first and third
 * quartiles, and averages values lying between those quartiles.
 *
 * @param x - Numeric values.
 * @returns The interquartile mean.
 *
 * @example
 * ```js
 * iq_mean(1, 2, 3, 4, 5, 6, 7, 8);
 * // 4.5
 * ```
 */
export declare const iq_mean: (...x: number[]) => number;


/**
 * Computes the contraharmonic mean of a set of values.
 *
 * The contraharmonic mean is the ratio between the sum of squared
 * values and the sum of the values.
 *
 * @param x - Numeric values.
 * @returns The contraharmonic mean.
 *
 * @example
 * ```js
 * contraharmonic_mean(1, 2, 3);
 * // 14 / 6
 * // ≈ 2.333
 * ```
 */
export declare const contraharmonic_mean: (...x: number[]) => number;