export const maintain_arr = (Matrix) =>{
    const arr = new Array(Matrix.rows);
        for(let i = 0; i < Matrix.rows; i++){
            const arr_col = new Matrix.type(Matrix.cols);
            for(let j = 0; j < Matrix.cols; j++)
                arr_col[j] = Matrix.data[i * Matrix.cols + j]
            arr[i] = arr_col
        }
    Matrix.arr = arr
}
export const maintain_indexes = (Matrix, oldRows) =>{
    for (let i = 0; i < Matrix.arr.length; i++) {
        Object.defineProperty(Matrix, i, {
            value: Matrix.arr[i],
            writable: true,
            configurable: true,
            enumerable: false
        });
    }
    for (let i = Matrix.arr.length; i < oldRows; i++) {
        delete Matrix[i];
    }
}

