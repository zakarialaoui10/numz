import { percentile } from "numz/stats";
import { fft1d } from 'numz/signal'
import { Complex } from "ziko/math/complex";

console.log(
    percentile([1,2,3,4,5,6,7,8,9,10], 50)
)

// console.log(fft1d([1, 2, 1, -1, 1.5]))

// console.log(Complex)