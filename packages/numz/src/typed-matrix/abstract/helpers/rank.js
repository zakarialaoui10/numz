export const typed_matrix_rank = M =>{
    const m = M.rows;
    const n = M.cols;
    const A = M.clone();
    const eps = 1e-12;

    let rank = 0;
    let row = 0;

    for (let col = 0; col < n && row < m; col++) {
        // Find pivot
        let pivot = row;
        let max = Math.abs(A[row * n + col]);

        for (let r = row + 1; r < m; r++) {
            const v = Math.abs(A[r * n + col]);
            if (v > max) {
                max = v;
                pivot = r;
            }
        }

        // No pivot in this column
        if (max < eps) continue;

        // Swap rows
        if (pivot !== row) {
            for (let c = col; c < n; c++) {
                const tmp = A[row * n + c];
                A[row * n + c] = A[pivot * n + c];
                A[pivot * n + c] = tmp;
            }
        }

        // Eliminate below
        const pivotVal = A[row * n + col];
        for (let r = row + 1; r < m; r++) {
            const factor = A[r * n + col] / pivotVal;
            if (Math.abs(factor) < eps) continue;
            for (let c = col; c < n; c++)
                A[r * n + c] -= factor * A[row * n + c];
        }

        rank++;
        row++;
    }

    return rank;
}