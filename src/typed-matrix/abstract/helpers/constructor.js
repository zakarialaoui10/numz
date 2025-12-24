export const typed_matrix_constructor = (rows, cols, arr, type = Float32Array) => {
  if(typeof rows === 'number' && typeof cols === 'number'){
    if(arr instanceof Array){
      let typed_arr = new type(rows * cols), i;
      for(i = 0; i < rows * cols ; i++)
        typed_arr[i] = arr[i]
      arr = typed_arr
    }
    return [
        rows,
        cols, 
        arr
    ]
  }
  if(rows instanceof Array){
    const r = rows.length;
    const c = rows[0].length;
    let i;
    arr = new type(r * c);
    for(i = 0; i < r*c ; i++){
      arr[i] = rows.flat(1)[i]
    }
    return [
      r,
      c,
      arr
    ]
  }
};



// const [r,c, arr]= typed_matrix_constructor([[1,2],[3,4]], null, null, Float64Array)

// console.log(r,c, arr)