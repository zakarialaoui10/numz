import { Complex } from 'ziko/math/complex';
import { fft, dft } from './fft.js'; 
import { isPow2 } from './utils/index.js';

export function ifft(arr) {
    const N = arr.length;

    // Step 1: conjugate input
    const conjugated = arr.map(n => new Complex(n, 0).conj)

    // Step 2: compute FFT (or DFT if not power-of-2)
    const y = isPow2(N) ? fft(conjugated) : dft(conjugated);

    // Step 3: conjugate output and normalize
    return y.map(c => new Complex(c.a / N, -c.b / N));
}
