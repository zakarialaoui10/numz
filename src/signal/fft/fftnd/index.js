import { normalizeComplexND } from '../utils/index.js'
import { fft1d } from '../fft1d/index.js';
function fftND(arr) {
    arr = normalizeComplexND(arr);

    // Base case: 1-D
    if (!Array.isArray(arr[0])) 
        return fft1d(arr);

    const transformed = arr.map(sub => fftND(sub));

    const rows = transformed.length;
    const cols = transformed[0].length;

    const colsData = Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => transformed[r][c])
    );

    const colsTransformed = colsData.map(col => fft1d(col));

    // Transpose back
    const out = Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => colsTransformed[c][r])
    );

    return out;
}
