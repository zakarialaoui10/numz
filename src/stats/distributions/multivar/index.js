// ------------------------------
// Multivariate Distributions
// ------------------------------
export const dist_multinomial = (kArray, n, pArray) => {
    const factorial = (x) => (x <= 1 ? 1 : x * factorial(x - 1));
    const comb = factorial(n) / kArray.reduce((acc, k) => acc * factorial(k), 1);
    const prob = kArray.reduce((acc, ki, i) => acc * Math.pow(pArray[i], ki), 1);
    return comb * prob;
};

export const dist_multivariate_normal = (xArray, meanArray, covMatrix) => {
    const n = xArray.length;
    const det = (m) => {
        if (n === 1) return m[0][0];
        if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];
        throw new Error('Only 1x1 and 2x2 supported for now');
    };
    const inv = (m) => {
        if (n === 1) return [[1 / m[0][0]]];
        if (n === 2) {
            const [[a,b],[c,d]] = m;
            const detM = a*d-b*c;
            return [[d/detM,-b/detM],[-c/detM,a/detM]];
        }
        throw new Error('Only 1x1 and 2x2 supported for now');
    };
    const diff = xArray.map((xi, i) => xi - meanArray[i]);
    const covInv = inv(covMatrix);
    const exponent = -0.5 * diff.reduce((sum, _, i) =>
        sum + diff[i] * (covInv[i][0] * diff[0] + covInv[i][1] * diff[1] || 0), 0);
    const denom = Math.sqrt((2 * Math.PI) ** n * det(covMatrix));
    return Math.exp(exponent) / denom;
};

export const dist_dirichlet = (xArray, alphaArray) => {
    const gamma = (n) => (n <= 1 ? 1 : (n - 1) * gamma(n - 1));
    const B = alphaArray.reduce((acc, a) => acc * gamma(a), 1) / gamma(alphaArray.reduce((a,b)=>a+b,0));
    const prod = xArray.reduce((acc, xi, i) => acc * Math.pow(xi, alphaArray[i]-1),1);
    return prod / B;
};
