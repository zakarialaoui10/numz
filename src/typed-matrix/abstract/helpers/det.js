export const typed_matrix_det = M => {
    if (!M.isSquare)
        throw new Error("Determinant is defined only for square matrices");

    const n = M.rows;
    const A = new M.data.constructor(M.data); // clone data
    let det = 1;
    let sign = 1;

    for (let i = 0; i < n; i++) {
        // Find pivot
        let pivot = i;
        for (let r = i + 1; r < n; r++) {
            if (Math.abs(A[r * n + i]) > Math.abs(A[pivot * n + i]))
                pivot = r;
        }
        // Zero pivot → det = 0
        if (A[pivot * n + i] === 0)
            return 0;
        // Row swap
        if (pivot !== i) {
            for (let c = 0; c < n; c++) {
                const tmp = A[i * n + c];
                A[i * n + c] = A[pivot * n + c];
                A[pivot * n + c] = tmp;
            }
            sign *= -1;
        }

        const pivotVal = A[i * n + i];
        det *= pivotVal;
        // Eliminate below
        for (let r = i + 1; r < n; r++) {
            const factor = A[r * n + i] / pivotVal;
            for (let c = i; c < n; c++) {
                A[r * n + c] -= factor * A[i * n + c];
            }
        }
    }
    return det * sign;
}