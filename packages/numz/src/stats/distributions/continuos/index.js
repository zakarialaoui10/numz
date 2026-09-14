export const dist_normal = (x, mean = 0, std = 1) => {
    const coeff = 1 / (std * Math.sqrt(2 * Math.PI));
    const expPart = Math.exp(-((x - mean) ** 2) / (2 * std ** 2));
    return coeff * expPart;
};

export const dist_uniform = (x, a = 0, b = 1) => (x < a || x > b ? 0 : 1 / (b - a));

export const dist_exponential = (x, lambda = 1) => (x < 0 ? 0 : lambda * Math.exp(-lambda * x));

export const dist_gamma = (x, k, theta = 1) => {
    if (x < 0) return 0;
    const gamma = (n) => {
        if (n <= 1) return 1;
        return (n - 1) * gamma(n - 1);
    };
    return Math.pow(x, k - 1) * Math.exp(-x / theta) / (gamma(k) * Math.pow(theta, k));
};

export const dist_beta = (x, alpha, beta) => {
    if (x < 0 || x > 1) return 0;
    const gamma = (n) => (n <= 1 ? 1 : (n - 1) * gamma(n - 1));
    const B = (alpha, beta) => gamma(alpha) * gamma(beta) / gamma(alpha + beta);
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1) / B(alpha, beta);
};

export const dist_cauchy = (x, x0 = 0, gamma = 1) => 1 / (Math.PI * gamma * (1 + ((x - x0) / gamma) ** 2));

export const dist_chi2 = (x, k) => dist_gamma(x, k / 2, 2);

export const dist_student_t = (x, nu) => {
    const gamma = (n) => (n <= 1 ? 1 : (n - 1) * gamma(n - 1));
    const coeff = gamma((nu + 1) / 2) / (Math.sqrt(nu * Math.PI) * gamma(nu / 2));
    return coeff * Math.pow(1 + (x ** 2) / nu, -(nu + 1) / 2);
};