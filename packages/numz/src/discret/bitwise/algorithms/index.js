export const bitmasks = (n) => {
  const res = [];
  for (let i = 0; i < 1 << n; i++) {
    const mask = [];
    for (let j = 0; j < n; j++) mask.push((i >> j) & 1);
    res.push(mask);
  }
  return res;
};
export const subsets_by_mask = (arr) => {
  const n = arr.length,
    res = [];
  for (let i = 0; i < 1 << n; i++) {
    const subset = [];
    for (let j = 0; j < n; j++) if ((i >> j) & 1) subset.push(arr[j]);
    res.push(subset);
  }
  return res;
};
export const gray_code = (n) => Array.from(
    { length: 1 << n },
    (_, i) => i ^ (i >> 1),
);
export const hamming_weight = (x) => {
  let count = 0;
  while (x) {
    x &= x - 1;
    count++;
  }
  return count;
};