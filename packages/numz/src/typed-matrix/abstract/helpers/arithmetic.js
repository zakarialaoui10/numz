import { maintain_arr } from "./maintain.js";
export function arithmetic(fn, ...M){
    let i, j, k;
    for(k = 0; k < M.length; k++)
        for(i = 0; i < this.rows; i++)
            for(j = 0; j < this.cols; j++)
                this.data[i * this.cols + j] = fn(this.data[i * this.cols + j], M[k].data[i * this.cols + j])
    maintain_arr(this)
    return this;
}

export function typed_matrix_dot(M1, ...Ms) {
  for (const M2 of Ms) {
    if (M1.cols !== M2.rows)
      throw new Error("Matrix shape mismatch");
    const {rows, cols} = M1
    const outCols = M2.cols;
    const out = new M1.type(rows * outCols);
    for (let i = 0; i < rows; i++) {
      const aRowOffset = i * cols;
      const outRowOffset = i * outCols;
      for (let j = 0; j < outCols; j++) {
        let sum = 0;
        for (let k = 0; k < cols; k++)
          sum += M1.data[aRowOffset + k] * M2.data[k * outCols + j];
        out[outRowOffset + j] = sum;
      }
    }
    M1.data = out;
    M1.cols = outCols;
  }
  return M1;
}
