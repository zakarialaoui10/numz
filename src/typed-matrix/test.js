import { F64Matrix } from "./index.js";

const M = new F64Matrix(3,3, [1,2,3,4,5,6,7,8,9], Int16Array)
const M1 = M.clone()
// const M2 = new AbstractTypedMatrix()

// console.log(M.data)
// console.log(M.at(0))
// console.log(M.T.at(0))

// console.log(M.hstack(M).arr)

// console.log(M.arr)

// M.arr[0][0] = 17


// console.log(M.mul(M).T)

// console.log(M.range.norm(0, 10).rank)

// console.log(F64Matrix.ones(3,3).rank)

// console.log(F64Matrix.eye(3).reshape(1,)[0])

const S = M.serialize()
console.log(S)

console.log(F64Matrix.deserialize(S))