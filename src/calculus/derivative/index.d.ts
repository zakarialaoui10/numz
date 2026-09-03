/**
 * Computes the first derivative of a function at a given point
 * using the central finite-difference method.
 *
 * @param f - The function to differentiate.
 * @param x - The point at which to evaluate the derivative.
 * @param h - Step size used for numerical approximation.
 * @returns The approximate value of f'(x).
 *
 * @example
 * ```js
 * const f = x => x ** 2;
 *
 * derivative(f, 3);
 * // ≈ 6
 * ```
 */
export declare const derivative: (
  f: (x: number) => number,
  x: number,
  h?: number
) => number;


/**
 * Computes the n-th derivative of a function at a given point.
 *
 * The derivative is computed recursively using the central
 * finite-difference method.
 *
 * @param f - The function to differentiate.
 * @param x - The point at which to evaluate the derivative.
 * @param n - The order of the derivative. Defaults to 1.
 * @param h - Step size used for numerical approximation.
 * @returns The approximate value of the n-th derivative at x.
 *
 * @example
 * ```js
 * const f = x => x ** 3;
 *
 * derivative_n(f, 2, 1);
 * // ≈ 12
 *
 * derivative_n(f, 2, 2);
 * // ≈ 12
 * ```
 */
export declare const derivative_n: (
  f: (x: number) => number,
  x: number,
  n?: number,
  h?: number
) => number;


/**
 * Computes a partial derivative of a multivariable function
 * with respect to one variable.
 *
 * The derivative is approximated using the central
 * finite-difference method.
 *
 * @param f - A multivariable function.
 * @param vars - Values of the variables at which to evaluate the derivative.
 * @param varIndex - Zero-based index of the variable to differentiate with respect to.
 * @param h - Step size used for numerical approximation.
 * @returns The approximate partial derivative.
 *
 * @example
 * ```js
 * const f = (x, y) => x ** 2 + y ** 2;
 *
 * partial_derivative(f, [3, 4], 0);
 * // ≈ 6
 *
 * partial_derivative(f, [3, 4], 1);
 * // ≈ 8
 * ```
 */
export declare const partial_derivative: (
  f: (...vars: number[]) => number,
  vars: number[],
  varIndex: number,
  h?: number
) => number;


/**
 * Computes the gradient of a multivariable function at a given point.
 *
 * The gradient is the vector containing the partial derivative
 * with respect to each variable.
 *
 * @param f - A multivariable function.
 * @param vars - Values of the variables at which to evaluate the gradient.
 * @param h - Step size used for numerical approximation.
 * @returns An array containing the partial derivatives.
 *
 * @example
 * ```js
 * const f = (x, y) => x ** 2 + y ** 2;
 *
 * gradient(f, [3, 4]);
 * // ≈ [6, 8]
 * ```
 */
export declare const gradient: (
  f: (...vars: number[]) => number,
  vars: number[],
  h?: number
) => number[];