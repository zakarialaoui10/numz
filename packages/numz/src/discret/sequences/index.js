export const factorial = (n) => {
  if (n < 0 || n !== Math.floor(n))
    throw new TypeError("n must be a non-negative integer");

  let r = 1;

  for (let i = 2; i <= n; i++) r *= i;

  return r;
};

export const double_factorial = (n) => {
  if (n < 0 || n !== Math.floor(n))
    throw new TypeError("n must be a non-negative integer");

  let r = 1;

  for (let i = n; i > 1; i -= 2) r *= i;

  return r;
};


export const falling = (n, k) => {
  if (n !== Math.floor(n) || k !== Math.floor(k))
    throw new TypeError("n,k must be integers");

  if (k < 0) return 0;
  if (n >= 0 && k > n) return 0;

  let r = 1;

  for (let i = 0; i < k; i++) r *= n - i;

  return r;
};

export const rising = (n, k) => {
  if (n !== Math.floor(n) || k !== Math.floor(k))
    throw new TypeError("n,k must be integers");

  if (k < 0) return 0;

  let r = 1;

  for (let i = 0; i < k; i++) r *= n + i;

  return r === 0 ? 0 : r;
};