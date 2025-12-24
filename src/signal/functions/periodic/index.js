// --------------------------
// Corrected Periodic Functions with Duty
// --------------------------

// Square wave: amplitude A, period T, duty cycle, centered at t0
export const square = (t, T = 1, A = 1, duty = 0.5, t0 = 0) => {
    const f = (v) => {
        const phase = ((v - t0) % T + T) % T; // normalize to [0,T)
        return phase < duty * T ? A : -A;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Triangle wave: amplitude A, period T, duty cycle, centered at t0
export const tri_wave = (t, T = 1, A = 1, duty = 0.5, t0 = 0) => {
    const f = (v) => {
        const phase = ((v - t0) % T + T) % T;
        if (phase < duty * T) {
            return (A / (duty * T)) * phase * 2 - A; // rising slope
        } else {
            return A - (A / ((1 - duty) * T)) * (phase - duty * T) * 2; // falling slope
        }
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Sawtooth wave: amplitude A, period T, duty cycle, centered at t0
export const sawtooth_wave = (t, T = 1, A = 1, duty = 1, t0 = 0) => {
    const f = (v) => {
        const phase = ((v - t0) % T + T) % T;
        if (phase < duty * T) {
            return (A / (duty * T)) * phase - A; // rising part
        } else {
            return A - (A / ((1 - duty) * T)) * (phase - duty * T); // optional falling part
        }
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// Pulse train: amplitude A, period T, pulse width, centered at t0
export const pulse_train = (t, T = 1, width = 0.5, A = 1, t0 = 0) => {
    const f = (v) => {
        const phase = ((v - t0) % T + T) % T;
        return phase < width ? A : 0;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};

// PWM: amplitude A, period T, duty cycle, centered at t0
export const pwm = (t, T = 1, duty = 0.5, A = 1, t0 = 0) => {
    const f = (v) => {
        const phase = ((v - t0) % T + T) % T;
        return phase < duty * T ? A : -A;
    };
    if (Array.isArray(t)) return t.map(f);
    return f(t);
};


// Sinusoidal wave
export const sinusoid = (t, f = 1, A = 1, phase = 0) => {
    const fcn = (v) => A * Math.sin(2 * Math.PI * f * v + phase);
    if (Array.isArray(t)) return t.map(fcn);
    return fcn(t);
};
