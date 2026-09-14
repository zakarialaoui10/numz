const clean = (x, precision = 12) => {
  const factor = 10 ** precision;
  const rounded = Math.round(x * factor) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
};

export const square = (t, T = 1, A = 1, duty = 0.5, t0 = 0) => {
  const f = (v) => {
    const phase = ((v - t0) % T + T) % T;
    return clean(phase < duty * T ? A : -A);
  };

  return Array.isArray(t) ? t.map(f) : f(t);
};

export const tri_wave = (t, T = 1, A = 1, duty = 0.5, t0 = 0) => {
  const f = (v) => {
    const phase = ((v - t0) % T + T) % T;

    const value =
      phase < duty * T
        ? (A / (duty * T)) * phase * 2 - A
        : A - (A / ((1 - duty) * T)) * (phase - duty * T) * 2;

    return clean(value);
  };

  return Array.isArray(t) ? t.map(f) : f(t);
};

export const sawtooth_wave = (
  t,
  T = 1,
  A = 1,
  duty = 1,
  t0 = 0,
) => {
  const f = (v) => {
    const phase = ((v - t0) % T + T) % T;
    if (phase < duty * T) {
      return (2 * A / (duty * T)) * phase - A;
    }
    return A - (2 * A / ((1 - duty) * T)) *
      (phase - duty * T);
  };
  return Array.isArray(t) ? t.map(f) : f(t);
};

export const pulse_train = (
  t,
  T = 1,
  width = 0.5,
  A = 1,
  t0 = 0,
) => {
  const f = (v) => {
    const phase = ((v - t0) % T + T) % T;
    return clean(phase < width ? A : 0);
  };

  return Array.isArray(t) ? t.map(f) : f(t);
};

export const pwm = (
  t,
  T = 1,
  duty = 0.5,
  A = 1,
  t0 = 0,
) => {
  const f = (v) => {
    const phase = ((v - t0) % T + T) % T;
    return clean(phase < duty * T ? A : -A);
  };

  return Array.isArray(t) ? t.map(f) : f(t);
};

export const sinusoid = (t, f = 1, A = 1, phase = 0) => {
  const fcn = (v) =>
    clean(A * Math.sin(2 * Math.PI * f * v + phase));

  return Array.isArray(t) ? t.map(fcn) : fcn(t);
};