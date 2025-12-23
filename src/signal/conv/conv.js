import { Complex } from 'ziko/math/complex';
import { add, mul} from 'ziko/math/functions'

// const nextPow2 = n => 1 << Math.ceil(Math.log2(n));


export function conv(signal, kernel, mode = 'full') {
    const N = signal.length;
    const M = kernel.length;
    if(signal.some(n => n?.isComplex?.()) || kernel.some(n => n?.isComplex?.())){
        signal = new Complex(signal, 0);
        kernel = new Complex(kernel, 0);
    }
    let outLength;
    let startIdx;
    switch(mode){
        case 'full' : {
            outLength = N + M - 1;
            startIdx = 0;
        }; break;
        case 'same' : {
            outLength = N;
            startIdx = Math.floor((M - 1) / 2);            
        }; break;
        case 'valid' : {
            outLength = Math.max(N - M + 1, 0);
            startIdx = M - 1;           
        }; break;
        default : throw new Error(`Invalid mode: ${mode}. Must be 'full', 'same', or 'valid'`);
    }
    const out = new Array(outLength);
    for (let n = 0; n < outLength; n++) {
        let sum = new Complex(0, 0);
        const actualN = n + startIdx;
        for (let k = 0; k < M; k++) {
            const idx = actualN - k;
            if (idx >= 0 && idx < N)
                sum = add(mul(signal[idx], kernel[k]))
        }
        out[n] = sum;
    }
    return out;
}