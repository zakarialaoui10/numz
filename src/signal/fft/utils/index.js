// export const C = (x) => x?.isComplex?.() ? x : new Complex(x, 0);
// export function twiddle(N, k) {
//     const angle = -2 * Math.PI * k / N;
//     return new Complex(Math.cos(angle), Math.sin(angle));
// }

// function normalizeComplexND(data) {
//     if (data instanceof Matrix) {
//         return new Matrix(
//             data.rows,
//             data.cols,
//             data.arr.flat(1).map(C)
//         );
//     } else if (Array.isArray(data)) {
//         return data.map(normalizeComplexND);
//     } else {
//         return C(data);
//     }
// }
