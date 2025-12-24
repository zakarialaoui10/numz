// import { fft, ifft } from "../src/signal/fft/index.js";
// import { conv, conv2 } from '../src/signal/conv/index.js'
// import { Complex } from "ziko/math/complex";
// // import { cos } from 'ziko/math/functions'

// // const x = Array.from({ length: 100 }, (_, j)=> j/10)
// // const y = cos(x)

// // const ff = fft(x)
// // // const ff = fft([1,2,3])
// // // console.log(ff)

// // // console.log(ifft(ff))
// const signal = [1, 2, 3, 4, 5];
// let kernel = [1, 0.5];
// // kernel = [1, new Complex(0, 0.5)];
// const result = conv(signal, kernel);
// console.log(
//    result
// )

// // console.log(ff)
// // console.log(ifft(ff).map(n=>+ n.a.toFixed(7)))
// // console.log(x)


// // Example usage:
// const image = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];

// const filter = [
//     [1, 0],
//     [0, 1]
// ];

// console.log(conv2(image, filter, 'full', 'fill'));

function hanning(N, ArrayType = Float64Array) {
  const w = new ArrayType(N);
  const factor = 2 * Math.PI / N;

  for (let n = 0; n < N; n++) {
    w[n] = 0.5 - 0.5 * Math.cos(factor * n);
  }
  return w;
}

console.log(hanning(10).map(a=>a*20))

