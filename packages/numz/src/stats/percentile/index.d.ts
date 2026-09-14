/**
 * Computes a percentile of a numeric dataset using linear interpolation.
 *
 * The input array is sorted in ascending order before calculating
 * the requested percentile.
 *
 * @param X - Numeric dataset.
 * @param p - Percentile to calculate, expressed as a value from 0 to 100.
 * @returns The interpolated percentile value, or `NaN` for an empty array.
 *
 * @example
 * ```js
 * percentile([1, 2, 3, 4, 5], 50);
 * // 3
 *
 * percentile([1, 2, 3, 4, 5], 25);
 * // 2
 * ```
 */
export declare const percentile: (
  X: number[],
  p: number
) => number;


/**
 * Computes the first quartile (Q1) of a numeric dataset.
 *
 * Q1 corresponds to the 25th percentile.
 *
 * @param X - Numeric dataset.
 * @returns The first quartile.
 *
 * @example
 * ```js
 * q1([1, 2, 3, 4, 5, 6, 7, 8]);
 * // 2.75
 * ```
 */
export declare const q1: (
  X: number[]
) => number;


/**
 * Computes the median (second quartile, Q2) of a numeric dataset.
 *
 * The median corresponds to the 50th percentile.
 *
 * @param X - Numeric dataset.
 * @returns The median value.
 *
 * @example
 * ```js
 * median([1, 2, 3, 4, 5]);
 * // 3
 * ```
 */
export declare const median: (
  X: number[]
) => number;


/**
 * Computes the third quartile (Q3) of a numeric dataset.
 *
 * Q3 corresponds to the 75th percentile.
 *
 * @param X - Numeric dataset.
 * @returns The third quartile.
 *
 * @example
 * ```js
 * q3([1, 2, 3, 4, 5, 6, 7, 8]);
 * // 6.25
 * ```
 */
export declare const q3: (
  X: number[]
) => number;


/**
 * Computes the interquartile range (IQR) of a numeric dataset.
 *
 * The interquartile range is the difference between the third
 * quartile (Q3) and the first quartile (Q1).
 *
 * @param X - Numeric dataset.
 * @returns The interquartile range.
 *
 * @example
 * ```js
 * iqr([1, 2, 3, 4, 5, 6, 7, 8]);
 * // 3.5
 * ```
 */
export declare const iqr: (
  X: number[]
) => number;