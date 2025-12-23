import { Complex } from 'ziko/math/complex' 
import { isPow2 } from './utils/index.js';

export function dft(arr) {
    const N = arr.length;
    const out = new Array(N);

    for (let k = 0; k < N; k++) {
        let sum = new Complex(0, 0);
        for (let n = 0; n < N; n++) {
            const W = Complex.twiddle(k * n, N);
            sum = sum.add(W.mul(arr[n]));
        }
        out[k] = sum;
    }
    return out;
}

export function fft(arr) {
    const N = arr.length;

    // fallback for non power-of-two
    if (!isPow2(N)) {
        return dft(arr);
    }

    if (N === 1) return [arr[0]];

    const even = new Array(N / 2);
    const odd  = new Array(N / 2);

    for (let i = 0; i < N / 2; i++) {
        even[i] = arr[2*i];
        odd[i]  = arr[2*i+1];
    }

    const Fe = fft(even);
    const Fo = fft(odd);

    const out = new Array(N);
    for (let k = 0; k < N / 2; k++) {
        const t = Complex.twiddle(k, N).mul(Fo[k]);
        out[k]       = Fe[k].add(t);
        out[k+N/2]   = Fe[k].sub(t);
    }
    return out;
}