export const typed_matrix_inv = M =>{
    if (!M.isSquare)
        throw new Error("Inverse is defined only for square matrices");
    if(M.det === 0) return NaN

    const n = M.rows;
    const Type = M.type;

    // Copy of A
    const A = new Type(M.data);

    // Identity matrix
    const I = new Type(n * n);
    for (let i = 0; i < n; i++)
        I[i * n + i] = 1;

    for (let i = 0; i < n; i++) {
        // Find pivot
        let pivot = i;
        let max = Math.abs(A[i * n + i]);

        for (let r = i + 1; r < n; r++) {
            const v = Math.abs(A[r * n + i]);
            if (v > max) {
                max = v;
                pivot = r;
            }
        }

        if (A[pivot * n + i] === 0)
            throw new Error("Matrix is singular and cannot be inverted");

        // Swap rows in A and I
        if (pivot !== i) {
            for (let c = 0; c < n; c++) {
                let tmp = A[i * n + c];
                A[i * n + c] = A[pivot * n + c];
                A[pivot * n + c] = tmp;

                tmp = I[i * n + c];
                I[i * n + c] = I[pivot * n + c];
                I[pivot * n + c] = tmp;
            }
        }

        // Normalize pivot row
        const pivotVal = A[i * n + i];
        for (let c = 0; c < n; c++) {
            A[i * n + c] /= pivotVal;
            I[i * n + c] /= pivotVal;
        }

        // Eliminate other rows
        for (let r = 0; r < n; r++) {
            if (r === i) continue;
            const factor = A[r * n + i];
            if (factor === 0) continue;
            for (let c = 0; c < n; c++) {
                A[r * n + c] -= factor * A[i * n + c];
                I[r * n + c] -= factor * I[i * n + c];
            }
        }
    }

    return new M.constructor(n, n, I, Type);
}
