export function hstack(M1, M2){
    M1 = M1.clone();
    M2 = M2.clone();
    if (M1.rows !== M2.rows) return;
    if (M1.type !== M2.type) return;
    const data = new M1.type(M1.size + M2.size)
    data.set(M1.data, 0)
    data.set(M2.data, M1.data.length)
    return new M1.constructor(M1.rows, M1.cols + M2.cols, data);
}

export function vstack(M1, M2){
    return hstack(M1.T, M2.T).T
}