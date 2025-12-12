// ------------------------------
// Discrete Distributions
// ------------------------------
export const dist_binomial = (k, n, p) => {
    if (k < 0 || k > n) return 0;
    const comb = (n, k) => {
        if (k === 0 || k === n) return 1;
        let res = 1;
        for (let i = 1; i <= k; i++) res *= (n - i + 1) / i;
        return res;
    };
    return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

export const dist_poisson = (k, lambda) => {
    if (k < 0) return 0;
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    return Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
};

export const dist_geometric = (k, p) => (k < 1 ? 0 : p * Math.pow(1 - p, k - 1));

export const dist_negative_binomial = (k, r, p) => {
    if (k < 0) return 0;
    const comb = (n, k) => {
        if (k === 0 || k === n) return 1;
        let res = 1;
        for (let i = 1; i <= k; i++) res *= (n - i + 1) / i;
        return res;
    };
    return comb(k + r - 1, k) * Math.pow(p, r) * Math.pow(1 - p, k);
};

export const dist_hypergeometric = (k, N, K, n) => {
    if (k < 0 || k > n || k > K) return 0;
    const comb = (n, k) => {
        if (k === 0 || k === n) return 1;
        let res = 1;
        for (let i = 1; i <= k; i++) res *= (n - i + 1) / i;
        return res;
    };
    return (comb(K, k) * comb(N - K, n - k)) / comb(N, n);
};

export const dist_bernoulli = (k, p) => (k === 0 ? 1 - p : k === 1 ? p : 0);
