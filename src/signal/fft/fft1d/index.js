import { twiddle } from "../utils/index.js";
export function fft1d(arr) {
    const N = arr.length;
    if (N === 1) return [arr[0]];

    // Split even/odd
    const even = fft1d(arr.filter((_, i) => i % 2 === 0));
    const odd  = fft1d(arr.filter((_, i) => i % 2 === 1));

    const out = new Array(N);
    for (let k = 0; k < N/2; k++) {
        const w = twiddle(N, k);
        const t = w.mul(odd[k]);
        out[k]        = even[k].add(t);
        out[k + N/2]  = even[k].sub(t);
    }
    return out;
}
