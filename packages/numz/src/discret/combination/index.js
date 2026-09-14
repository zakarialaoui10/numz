export const combinations = (arr, repetition = false) => {
  const n = arr.length,
    result = [];
  if (!repetition) {
    const back = (start, cur) => {
      if (cur.length) result.push([...cur]);
      for (let i = start; i < n; i++) {
        cur.push(arr[i]);
        back(i + 1, cur);
        cur.pop();
      }
    };
    back(0, []);
    return result;
  }
  const back = (start, cur) => {
    if (cur.length) result.push([...cur]);
    for (let i = start; i < n; i++) {
      cur.push(arr[i]);
      back(i, cur);
      cur.pop();
    }
  };
  back(0, []);
  return result;
};



export const k_combinations = (arr, k, repetition = false) => {
  const n = arr.length,
    result = [];
  if (!repetition) {
    const back = (start, cur) => {
      if (cur.length === k) result.push([...cur]);
      else
        for (let i = start; i < n; i++) {
          cur.push(arr[i]);
          back(i + 1, cur);
          cur.pop();
        }
    };
    back(0, []);
    return result;
  }
  const back = (start, cur) => {
    if (cur.length === k) result.push([...cur]);
    else
      for (let i = start; i < n; i++) {
        cur.push(arr[i]);
        back(i, cur);
        cur.pop();
      }
  };
  back(0, []);
  return result;
};

export const multiset_combinations = (arr, k) => {
  const counter = {},
    unique = [];
  for (const x of arr) {
    if (!counter[x]) {
      counter[x] = 0;
      unique.push(x);
    }
    counter[x]++;
  }
  const result = [];
  const back = (i, cur, remaining) => {
    if (cur.length === k) {
      result.push([...cur]);
      return;
    }
    if (i >= unique.length) return;
    const u = unique[i],
      max_use = Math.min(counter[u], k - cur.length);
    for (let use = 0; use <= max_use; use++) {
      for (let j = 0; j < use; j++) cur.push(u);
      back(i + 1, cur, remaining - use);
      for (let j = 0; j < use; j++) cur.pop();
    }
  };
  back(0, [], k);
  return result;
};
