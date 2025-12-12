export const permutations = (arr, repetition = false) => {
  const n = arr.length,
    result = [];
  if (repetition) {
    const back = (cur) => {
      if (cur.length === n) result.push([...cur]);
      else
        for (let i = 0; i < n; i++) {
          cur.push(arr[i]);
          back(cur);
          cur.pop();
        }
    };
    back([]);
    return result;
  }
  const back = (cur, used) => {
    if (cur.length === n) result.push([...cur]);
    else
      for (let i = 0; i < n; i++) {
        if (used[i]) continue;
        used[i] = true;
        cur.push(arr[i]);
        back(cur, used);
        cur.pop();
        used[i] = false;
      }
  };
  back([], Array(n).fill(false));
  return result;
};


export const k_permutations = (arr, k, repetition = false) => {
  const n = arr.length,
    result = [];
  if (repetition) {
    const back = (cur) => {
      if (cur.length === k) result.push([...cur]);
      else
        for (let i = 0; i < n; i++) {
          cur.push(arr[i]);
          back(cur);
          cur.pop();
        }
    };
    back([]);
    return result;
  }
  const back = (cur, used) => {
    if (cur.length === k) result.push([...cur]);
    else
      for (let i = 0; i < n; i++) {
        if (used[i]) continue;
        used[i] = true;
        cur.push(arr[i]);
        back(cur, used);
        cur.pop();
        used[i] = false;
      }
  };
  back([], Array(n).fill(false));
  return result;
};

export const multiset_permutations = (arr) => {
  const result = [],
    counter = {};
  for (const x of arr) counter[x] = (counter[x] || 0) + 1;
  const unique = Object.keys(counter);
  const n = arr.length;
  const back = (cur) => {
    if (cur.length === n) {
      result.push([...cur]);
      return;
    }
    for (const u of unique) {
      if (counter[u] > 0) {
        cur.push(u);
        counter[u]--;
        back(cur);
        cur.pop();
        counter[u]++;
      }
    }
  };
  back([]);
  return result;
};