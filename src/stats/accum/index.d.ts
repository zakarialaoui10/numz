/**
 * Computes the cumulative sum of an array.
 *
 * Each element in the returned array represents the sum of all
 * elements up to the corresponding position in the input array.
 *
 * @param arr - Array of numbers to accumulate.
 * @returns An array containing the cumulative sums.
 *
 * @example
 * ```js
 * accum_sum([1, 2, 3, 4]);
 * // [1, 3, 6, 10]
 * ```
 */
export declare const accum_sum: (arr: number[]) => number[];


/**
 * Computes the cumulative product of an array.
 *
 * Each element in the returned array represents the product of all
 * elements up to the corresponding position in the input array.
 *
 * @param arr - Array of numbers to accumulate.
 * @returns An array containing the cumulative products.
 *
 * @example
 * ```js
 * accum_product([1, 2, 3, 4]);
 * // [1, 2, 6, 24]
 * ```
 */
export declare const accum_product: (arr: number[]) => number[];


/**
 * Computes the cumulative maximum of an array.
 *
 * Each element in the returned array is the largest value encountered
 * from the beginning of the array up to that position.
 *
 * @param arr - Array of numbers to process.
 * @returns An array containing the cumulative maximum values.
 *
 * @example
 * ```js
 * accum_max([3, 1, 5, 2, 4]);
 * // [3, 3, 5, 5, 5]
 * ```
 */
export declare const accum_max: (arr: number[]) => number[];


/**
 * Computes the cumulative minimum of an array.
 *
 * Each element in the returned array is the smallest value encountered
 * from the beginning of the array up to that position.
 *
 * @param arr - Array of numbers to process.
 * @returns An array containing the cumulative minimum values.
 *
 * @example
 * ```js
 * accum_min([3, 1, 5, 2, 4]);
 * // [3, 1, 1, 1, 1]
 * ```
 */
export declare const accum_min: (arr: number[]) => number[];