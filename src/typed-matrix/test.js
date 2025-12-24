import { F32Matrix } from "./index.js";

const M = new F32Matrix(9, 1, [1,2,3,4,5,6,7,8,9], Int16Array)
// const M2 = new AbstractTypedMatrix()

// console.log(M.data)
// console.log(M.at(0))
// console.log(M.T.at(0))

// console.log(M.hstack(M).arr)

// console.log(M.arr)

// M.arr[0][0] = 17


console.log(M.mul(M).T)