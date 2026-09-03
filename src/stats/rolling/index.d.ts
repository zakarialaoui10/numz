/**
 * Computes the Simple Moving Average (SMA) of a numeric sequence.
 *
 * For each window of `w` consecutive values, the arithmetic mean
 * is calculated. The result contains one value for each complete window.
 *
 * @param X - Numeric sequence.
 * @param w - Size of the moving window.
 * @returns An array containing the simple moving averages.
 *
 * @example
 * ```js
 * sma([1, 2, 3, 4, 5], 3);
 * // [2, 3, 4]
 * ```
 */
export declare const sma: (
  X: number[],
  w: number
) => number[];


/**
 * Computes the Exponential Moving Average (EMA) of a numeric sequence.
 *
 * Each value is weighted according to the smoothing factor `alpha`,
 * giving more importance to recent observations.
 *
 * @param X - Numeric sequence.
 * @param alpha - Smoothing factor, typically between 0 and 1.
 * @returns An array containing the exponential moving averages.
 *
 * @example
 * ```js
 * ema([10, 20, 30, 40], 0.5);
 * // [10, 15, 22.5, 31.25]
 * ```
 */
export declare const ema: (
  X: number[],
  alpha: number
) => number[];


/**
 * Computes the Weighted Moving Average (WMA) of a numeric sequence.
 *
 * Each moving window is multiplied element-by-element by the supplied
 * weights. The weighted sum is then divided by the sum of the weights.
 *
 * @param X - Numeric sequence.
 * @param weights - Weights applied to each value in the moving window.
 * @returns An array containing the weighted moving averages.
 *
 * @example
 * ```js
 * wma(
 *   [1, 2, 3, 4, 5],
 *   [1, 2, 3]
 * );
 * // [2.333..., 3.333..., 4.333...]
 * ```
 */
export declare const wma: (
  X: number[],
  weights: number[]
) => number[];