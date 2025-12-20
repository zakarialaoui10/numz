// ==========================================
// Discrete Mathematics / Combinatorics
// ==========================================
// ------------------------------
// Binomial & Multichoose
// ------------------------------
export const binomial = (n, k) => {
  if (n !== Math.floor(n) || k !== Math.floor(k))
    return TypeError("n,k must be integers");
  if (k < 0 || k > n) return 0;
  k = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - (k - i))) / i;
  return r;
};
export const comb_repetition = (n, k) => binomial(n + k - 1, k);
export const multichoose = comb_repetition;

// Comb // Perm
export const power_set = (arr) => {
  const n = arr.length,
    result = [];
  for (let i = 0; i < 1 << n; i++) {
    const subset = [];
    for (let j = 0; j < n; j++) if ((i >> j) & 1) subset.push(arr[j]);
    result.push(subset);
  }
  return result;
};

export const cartesian = (...sets) => {
  let result = [[]];
  for (const set of sets) {
    const temp = [];
    for (const x of result) for (const y of set) temp.push([...x, y]);
    result = temp;
  }
  return result;
};

// ------------------------------
// Counting / Sequences
// ------------------------------
export const derangement = (n) => {
  if (n !== Math.floor(n)) return TypeError("n must be integer");
  let r = 1;
  for (let i = 1; i <= n; i++) {
    r = i * r + (i % 2 === 0 ? 1 : -1);
  }
  return Math.round(r / Math.E);
};

export const catalan = (n) => binomial(2 * n, n) / (n + 1);

export const stirling2 = (n, k) => {
  if (k < 0 || k > n) return 0;
  let S = Array(k + 1).fill(0);
  S[0] = 1;
  for (let i = 1; i <= n; i++)
    for (let j = k; j > 0; j--) S[j] = j * S[j] + S[j - 1];
  return S[k];
};

export const bell = (n) => {
  let B = [1];
  for (let i = 1; i <= n; i++) {
    B[i] = 0;
    for (let j = 0; j < i; j++) B[i] += binomial(i - 1, j) * B[j];
  }
  return B[n];
};

export const lah = (n, k) => {
  if (n < 0 || k < 0 || k > n) return 0;
  return (binomial(n - 1, k - 1) * factorial(n)) / factorial(k);
};

// // Eulerian numbers: number of permutations with exactly k ascents
export const eulerian = (n,k)=>{
  if(k<0||k>=n) return 0;
  let dp=[Array(k+2).fill(0)];
  dp[0][0]=1;
  for(let i=1;i<=n;i++){
    const ndp=Array(k+2).fill(0);
    for(let j=0;j<=Math.min(i-1,k);j++){
      ndp[j]= (i-j)*dp[i-1]?[j]??0:
      ndp[j+1]= (j+1)*dp[i-1][j];
    }
    dp=ndp;
  } 
  return dp[k];
};

// Partition numbers
export const partition_number = (n) => {
  if (n === 0) return 1;
  let p = [1];
  for (let i = 1; i <= n; i++) {
    let s = 0;
    for (let k = 1; ; k++) {
      let j1 = i - (k * (3 * k - 1)) / 2;
      let j2 = i - (k * (3 * k + 1)) / 2;
      if (j1 < 0 && j2 < 0) break;
      if (j1 >= 0) s += (k % 2 === 0 ? -1 : 1) * p[j1];
      if (j2 >= 0) s += (k % 2 === 0 ? -1 : 1) * p[j2];
    }
    p.push(s);
  }
  return p[n];
};
