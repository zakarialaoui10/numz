export const matrix_constructor = (Matrix, rows, cols, element) => {
    let arr;
    if (rows instanceof Matrix) {
        const source = rows;
        arr = source.arr;
        rows = source.rows;
        cols = source.cols;
        return [rows, cols, arr];
    }
    if (rows instanceof Array) {
        arr = rows;
        rows = arr.length;
        cols = arr[0]?.length ?? 0;
        return [rows, cols, arr];
    }
    arr = [];
    for (let i = 0; i < rows; i++) {
        arr.push([]);
        for (let j = 0; j < cols; j++) {
            const value = element?.[i * cols + j];
            arr[i][j] = value ?? 0;
        }
    }
    return [rows, cols, arr];
};