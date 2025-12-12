function fft1d(arr) {
    const N = arr.length;
    if (N === 1) return [arr[0]];

    const even = fft1d(arr.filter((_, i) => i % 2 === 0));
    const odd  = fft1d(arr.filter((_, i) => i % 2 === 1));

    const out = new Array(N);
    for (let k = 0; k < N/2; k++) {
        const t = Complex.Twiddle(N, k).mul(odd[k]);
        out[k]        = even[k].add(t);
        out[k + N/2]  = even[k].sub(t);
    }
    return out;
}

function fftnd(data) {
    if (data instanceof Matrix) data = data.toComplex();

    if (Array.isArray(data) && !Array.isArray(data[0])) {
        return fft1d(data);
    }

    if (data instanceof Matrix) {
        const rows = data.rows;
        const cols = data.cols;

        // FFT along rows
        let rowFFT = new Matrix(rows, cols, []);
        for (let i = 0; i < rows; i++) {
            rowFFT.arr[i] = fft1d(data.arr[i]);
        }

        let colFFT = new Matrix(cols, rows, []);
        const rowFFT_T = rowFFT.T;
        for (let i = 0; i < cols; i++) {
            colFFT.arr[i] = fft1d(rowFFT_T.arr[i]);
        }

        return colFFT.T; 
    }

    if (Array.isArray(data)) {
        return data.map(fftND);
    }

    throw new Error("Invalid data type for FFT");
}
