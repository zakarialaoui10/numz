export const derivative = (f, x, h = 1e-8) => (f(x + h) - f(x - h)) / (2 * h);
export const derivative_n = (f, x, n = 1, h = 1e-8) => {
    if (n === 0) return f(x);
    const df = (x0) => derivative(f, x0, h);
    return derivative_n(df, x, n - 1, h);
};


export const partial_derivative = (f, vars, varIndex, h = 1e-8) => {
    const x1 = [...vars]; 
    const x2 = [...vars];
    x1[varIndex] += h; 
    x2[varIndex] -= h;
    return (f(...x1) - f(...x2)) / (2 * h);
};
export const gradient = (f, vars, h = 1e-8) => vars.map((_, i) => partial_derivative(f, vars, i, h));
