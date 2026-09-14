/**
 * Numerically approximates a definite integral using Simpson's rule.
 *
 * Simpson's rule approximates the integral by fitting quadratic
 * polynomials over consecutive intervals.
 *
 * The number of subdivisions is automatically increased by one
 * when an odd value is provided, since Simpson's rule requires
 * an even number of subdivisions.
 *
 * @param f - The function to integrate.
 * @param a - Lower integration bound.
 * @param b - Upper integration bound.
 * @param n - Number of subdivisions. Defaults to 1000.
 * @returns The numerical approximation of the definite integral.
 *
 * @example
 * ```js
 * const f = x => x ** 2;
 *
 * integral_simpson(f, 0, 1);
 * // ≈ 0.3333333333
 * ```
 */
export declare const integral_simpson: (
  f: (x: number) => number,
  a: number,
  b: number,
  n?: number
) => number;


/**
 * Numerically approximates a definite integral using the trapezoidal rule.
 *
 * The interval [a, b] is divided into `n` equally sized subintervals,
 * and the area is approximated using trapezoids.
 *
 * @param f - The function to integrate.
 * @param a - Lower integration bound.
 * @param b - Upper integration bound.
 * @param n - Number of subdivisions. Defaults to 1000.
 * @returns The numerical approximation of the definite integral.
 *
 * @example
 * ```js
 * const f = x => x ** 2;
 *
 * integral_trapezoid(f, 0, 1);
 * // ≈ 0.3333333333
 * ```
 */
export declare const integral_trapezoid: (
  f: (x: number) => number,
  a: number,
  b: number,
  n?: number
) => number;


/**
 * Numerically approximates a definite integral using the midpoint rule.
 *
 * The interval [a, b] is divided into `n` equally sized subintervals,
 * and the function is evaluated at the midpoint of each subinterval.
 *
 * @param f - The function to integrate.
 * @param a - Lower integration bound.
 * @param b - Upper integration bound.
 * @param n - Number of subdivisions. Defaults to 1000.
 * @returns The numerical approximation of the definite integral.
 *
 * @example
 * ```js
 * const f = x => x ** 2;
 *
 * integral_midpoint(f, 0, 1);
 * // ≈ 0.3333333333
 * ```
 */
export declare const integral_midpoint: (
  f: (x: number) => number,
  a: number,
  b: number,
  n?: number
) => number;