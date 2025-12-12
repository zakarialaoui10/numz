export const noise = null
// Sign function (signum)
export const signum = (t, t0 = 0, A = 1) => {
    if (Array.isArray(t)) return t.map(v => (v - t0) > 0 ? A : (v - t0) < 0 ? -A : 0);
    return (t - t0) > 0 ? A : (t - t0) < 0 ? -A : 0;
};

// Ramp function
export const rampe = (t, t0 = 0, A = 1) => {
    if (Array.isArray(t)) return t.map(v => v < t0 ? 0 : A * (v - t0));
    return t < t0 ? 0 : A * (t - t0);
};

// Rectangular pulse (width = 1 for simplicity, centered at t0)
export const rect = (t, t0 = 0, A = 1, width = 1) => {
    const half = width / 2;
    if (Array.isArray(t)) return t.map(v => (v >= t0 - half && v <= t0 + half ? A : 0));
    return (t >= t0 - half && t <= t0 + half ? A : 0);
};

// Triangular pulse (period T, centered at t0)
export const tri = (t, T = 1, t0 = 0, A = 1) => {
    const half = T / 2;
    const x = t - t0;
    if (Array.isArray(t)) {
        return t.map(v => {
            const y = v - t0;
            return (Math.abs(y) <= half) ? A * (1 - 2 * Math.abs(y) / T) : 0;
        });
    }
    return (Math.abs(x) <= half) ? A * (1 - 2 * Math.abs(x) / T) : 0;
};


// Dirac delta approximation
// Since δ(t) is not a true function, we approximate with a narrow pulse
export const dirac = (t, t0 = 0, eps = 1e-6, A = 1) => {
    if (Array.isArray(t)) return t.map(v => Math.abs(v - t0) < eps ? A / eps : 0);
    return Math.abs(t - t0) < eps ? A / eps : 0;
};

// Lorentzian (Cauchy) function
// L(t) = (A / π) * (gamma / ((t - t0)^2 + gamma^2))
export const lorentz = (t, t0 = 0, gamma = 1, A = 1) => {
    const value = (v) => (A / Math.PI) * (gamma / ((v - t0) ** 2 + gamma ** 2));
    if (Array.isArray(t)) return t.map(value);
    return value(t);
};

// Sinc function: sin(pi*(t-t0)) / (pi*(t-t0))
export const sinc = (t, t0 = 0, A = 1) => {
    const f = (v) => {
        const x = Math.PI * (v - t0);
        return x === 0 ? A : A * Math.sin(x) / x;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};


// Gaussian pulse
export const gaussian = (t, t0 = 0, sigma = 1, A = 1) => {
    const f = (v) => A * Math.exp(-((v - t0) ** 2) / (2 * sigma ** 2));
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Exponential pulse (causal)
export const expPulse = (t, t0 = 0, alpha = 1, A = 1) => {
    const f = (v) => (v >= t0 ? A * Math.exp(-alpha * (v - t0)) : 0);
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Trapezoidal pulse
export const trapezoid = (t, t0 = 0, rise = 0.5, width = 1, fall = 0.5, A = 1) => {
    const f = (v) => {
        const x = v - t0;
        if (x < 0 || x > rise + width + fall) return 0;
        if (x < rise) return A * (x / rise);
        if (x < rise + width) return A;
        return A * (1 - (x - rise - width) / fall);
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Hamming window (useful for DSP)
export const hamming = (t, t0 = 0, T = 1, A = 1) => {
    const f = (v) => {
        const x = (v - t0) / T;
        return (x >= 0 && x <= 1) ? A * (0.54 - 0.46 * Math.cos(2 * Math.PI * x)) : 0;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Hanning window
export const hanning = (t, t0 = 0, T = 1, A = 1) => {
    const f = (v) => {
        const x = (v - t0) / T;
        return (x >= 0 && x <= 1) ? A * 0.5 * (1 - Math.cos(2 * Math.PI * x)) : 0;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Dirichlet (periodic sinc) function
export const dirichlet = (t, N = 5, t0 = 0, A = 1) => {
    const f = (v) => {
        const x = Math.PI * (v - t0);
        return x === 0 ? A : A * Math.sin(N * x) / (N * Math.sin(x));
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};
