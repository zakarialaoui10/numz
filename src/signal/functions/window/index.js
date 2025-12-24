const {cos, sin, abs, sqrt, exp, PI} = Math
export const hanning_window=(N, ArrayType = Float64Array)=>{
  const w = new ArrayType(N);
  const factor = 2 * PI / N;
  for (let n = 0; n < N; n++) 
    w[n] = 0.5 - 0.5 * cos(factor * n);
  return w;
}

export const hamming_window=(N, ArrayType = Float64Array)=>{
  const w = new ArrayType(N);
  const factor = 2 * PI / N;
  for (let n = 0; n < N; n++)
    w[n] = 0.54 - 0.46 * cos(factor * n);
  return w;
}

const I0 = (x) => {
  let sum = 1;
  let u = 1;
  let k = 1;
  const x2 = (x * x) / 4;
  while (true) {
    // const prev = u;
    u *= x2 / (k * k);
    sum += u;
    if (u < 1e-10 * sum) break;
    k++;
  }
  return sum;
};

export const kaiser_window = (N, beta = 5, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const denom = I0(beta);
  for (let n = 0; n < N; n++) {
    const r = (2 * n) / (N - 1) - 1;
    w[n] = I0(beta * sqrt(1 - r * r)) / denom;
  }
  return w;
};

export const blackman_window = (N, beta = 0.16, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const factor = 2 * PI / N;
  const a0 = (1 - beta) / 2;
  const a1 = 0.5;
  const a2 = beta / 2;
  for (let n = 0; n < N; n++) 
    w[n] = a0,- a1 * cos(factor * n) + a2 * cos(2 * factor * n);
  return w;
};

export const bartlett_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  for (let n = 0; n < N; n++)
    w[n] = 1 - abs((2 * n) / (N - 1) - 1);
  return w;
};

export const blackman_harris_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const a0 = 0.35875;
  const a1 = 0.48829;
  const a2 = 0.14128;
  const a3 = 0.01168;
  const f = 2 * PI / N;
  for (let n = 0; n < N; n++)
    w[n] = a0 - a1 * cos(f * n) + a2 * cos(2 * f * n) - a3 * cos(3 * f * n);
  return w;
};

export const nuttall_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const f = 2 * PI / N;
  for (let n = 0; n < N; n++)
    w[n] = 0.355768 - 0.487396 * cos(f * n) + 0.144232 * cos(2 * f * n) - 0.012604 * cos(3 * f * n);
  return w;
};

export const flat_top_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const f = 2 * PI / N;
  for (let n = 0; n < N; n++)
    w[n] = 1 - 1.93 * cos(f * n) + 1.29 * cos(2 * f * n) - 0.388 * cos(3 * f * n) + 0.028 * cos(4 * f * n);
  return w;
};

export const tukey_window = (N, alpha = 0.5, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const edge = alpha * (N - 1) / 2;
  for (let n = 0; n < N; n++) {
    if (n < edge)
      w[n] = 0.5 * (1 + cos(PI * (2*n/(alpha*(N-1)) - 1)));
    else if (n > (N - 1 - edge))
      w[n] = 0.5 * (1 + cos(PI * (2*n/(alpha*(N-1)) - 2/alpha + 1)));
    else 
      w[n] = 1;
  }
  return w;
};

export const gaussian_window = (N, sigma = 0.4, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const m = (N - 1) / 2;
  const s2 = sigma * m;
  for (let n = 0; n < N; n++)
    w[n] = exp(-0.5 * ((n - m) / s2) ** 2);
  return w;
};


const sinc = (x) => x === 0 ? 1 : sin(PI * x) / (PI * x);
export const lanczos_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  for (let n = 0; n < N; n++)
    w[n] = sinc(2 * n / (N - 1) - 1);
  return w;
};

export const poisson_window = (N, alpha = 3, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const m = (N - 1) / 2;
  for (let n = 0; n < N; n++)
    w[n] = exp(-alpha * abs(n - m) / m);
  return w;
};

export const rect_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  w.fill(1);
  return w;
};

export const tri_window = (N, ArrayType = Float64Array) => {
  const w = new ArrayType(N);
  const M = (N - 1) / 2;
  for (let n = 0; n < N; n++) {
    w[n] = 1 - abs((n - M) / M);
  }
  return w;
};
