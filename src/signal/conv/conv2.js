import { Complex } from 'ziko/math/complex';
import { add, mul} from 'ziko/math/functions'
export function conv2(signal, kernel, mode = 'full', boundary = 'fill', fillValue = 0) {
    const isMatix = signal?.isMatix?.() || kernel?.isMatix?.();
    const signalRows = signal.length;
    const signalCols = signal[0].length;
    const kernelRows = kernel.length;
    const kernelCols = kernel[0].length;

    const flippedKernel = kernel.map(row => [...row].reverse()).reverse();
    
    // Determine output size
    let outRows, outCols;
    switch(mode){
        case 'full':{
            outRows = signalRows + kernelRows - 1;
            outCols = signalCols + kernelCols - 1;
        }; break;
        case 'same':{
            outRows = signalRows;
            outCols = signalCols;
        }; break;
        case 'valid':{
            outRows = signalRows - kernelRows + 1;
            outCols = signalCols - kernelCols + 1;
        }; break;
        default: throw new Error("mode must be 'full', 'same', or 'valid'");

    }
    // Initialize output
    const output = Array.from({ length: outRows }, () => Array(outCols).fill(0));

    // Helper to get signal value considering boundary
    function getSignalValue(i, j) {
        if (i < 0 || i >= signalRows || j < 0 || j >= signalCols) {
            if (boundary === 'fill') return fillValue;
            if (boundary === 'wrap') return signal[(i + signalRows) % signalRows][(j + signalCols) % signalCols];
            if (boundary === 'symm') {
                const ii = i < 0 ? -i - 1 : i >= signalRows ? 2*signalRows - i - 1 : i;
                const jj = j < 0 ? -j - 1 : j >= signalCols ? 2*signalCols - j - 1 : j;
                return signal[ii][jj];
            }
            return 0;
        }
        return signal[i][j];
    }

    // Convolution
    for (let i = 0; i < outRows; i++) {
        for (let j = 0; j < outCols; j++) {
            let sum = 0;
            for (let m = 0; m < kernelRows; m++) {
                for (let n = 0; n < kernelCols; n++) {
                    const ii = i + m - Math.floor(kernelRows / 2);
                    const jj = j + n - Math.floor(kernelCols / 2);
                    sum += flippedKernel[m][n] * getSignalValue(ii, jj);
                    sum = add(
                        mul(
                            flippedKernel[m][n],
                            getSignalValue(ii, jj)
                        )
                    )
                }
            }
            output[i][j] = sum;
        }
    }

    return output;
}

