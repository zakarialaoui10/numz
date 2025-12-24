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
