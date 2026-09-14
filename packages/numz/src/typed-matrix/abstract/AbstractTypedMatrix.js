import { 
    typed_matrix_constructor,
    maintain_indexes,
    maintain_arr,
    hstack,
    vstack,
    arithmetic,
    typed_matrix_dot,
    typed_matrix_det,
    typed_matrix_rank,
} from './helpers/index.js'
export class AbstractTypedMatrix{
    constructor(rows, cols, arr, type){
        [
            this.rows,
            this.cols,
            this.data,
            this.type
        ] = typed_matrix_constructor(rows, cols, arr, type);
        maintain_indexes(this)
    }
    isMatrix(){
        return true;
    }
    isTypedMatrix(){
        return true;
    }
    clone(){
        return new this.constructor(this.rows, this.cols, this.data, this.type);
    }
    get size(){
        return this.rows * this.cols;
    }
    get shape(){
        return [this.rows, this.cols]
    }
    get arr(){
        const arr = new Array(this.rows);
        for(let i = 0; i < this.rows; i++){
            const arr_col = new this.type(this.cols);
            for(let j = 0; j < this.cols; j++)
                arr_col[j] = this.data[i * this.cols + j]
            arr[i] = arr_col
        }
        return arr;
    }
    at(i, j){
        if(i < 0) i += this.rows;
        if(i < 0 || i >= this.rows) throw new Error('Row index out of bounds');
        if(j === undefined) 
            return this.data.slice(i * this.cols, (i + 1) * this.cols);
        if(j < 0) j += this.cols;
        if(j < 0 || j >= this.cols) throw new Error('Column index out of bounds');
        return this.data[i * this.cols + j];
    }
    [Symbol.iterator](){
        return this.arr[Symbol.iterator]
    }
    serialize(){
        return JSON.stringify({
            type : 'TypedMatrix',
            data : {
                rows : this.rows,
                cols : this.cols,
                t : this.type.name,
                arr : [...this.data]
            }
        })
    }
    static deserialize(json){
        const {type, data} = JSON.parse(json);
        const {rows, cols, arr, t} = data
        return new this(rows, cols, arr, globalThis[t])
    }
    reshape(newRows, newCols){
        if(!(newRows * newCols === this.rows * this.cols)) throw Error('size not matched');
        const oldRows = this.rows;
        this.rows = newRows;
        this.cols = newCols;
        maintain_indexes(this, oldRows)
        return this;
    }
    get T(){
        let transpose = new this.data.constructor(this.size);
        let i, j;
        for (i = 0; i < this.cols; i++) {
            for (j = 0; j < this.rows; j++)
                transpose[i * this.rows + j] = this.data[j * this.rows + i]
        }
        [this.cols, this.rows] = this.shape;
        return this
    }
    get det(){
        return + typed_matrix_det(this).toFixed(14)
    }
    get rank(){
        return typed_matrix_rank(this)
    }
    static zeros(rows, cols){
        return new this(rows, cols, new Array(rows * cols).fill(0), this.type)
    }
    static ones(rows, cols){
        return new this(rows, cols, new Array(rows * cols).fill(1), this.type)
    }
    static nums(rows, cols, num){
        return new this(rows, cols, new Array(rows * cols).fill(num), this.type)
    }
    static eye(n){
        const data = new this.type(n * n);
        let i, j;
        for(i = 0; i < n; i++)
            for(j = 0; j <n; j++)
                data[i * n + j] = i === j ? 1 : 0
        return new this(n, n, data);
    }
    toPrecesion(p){
        this.data = this.data.map(n => n.toPrecesion(p));
        return this;
    }
    toFixed(p){
        this.data = this.data.map(n => n.toFixed(p));
        return this;
    }
    hstack(...matrices){
        Object.assign(
            this,
            [this, ...matrices].reduce((a, b) => hstack(a, b))
        );
        maintain_arr(this);
        return this;
    }
    vstack(...matrices){
        Object.assign(
            this, 
            [this, ...matrices].reduce((a, b) => vstack(a, b))
        );
        maintain_arr(this);
        maintain_indexes(this, this.rows);
        return this;
    }
    hqueue(...matrices){
        Object.assign(
            this,
            [this, ...matrices].reverse().reduce((a,b)=>hstack(a, b))
        );
        maintain_arr(this);
        return this;
    }
    vqueue(...matrices){
        Object.assign(
            this,
            [this, ...matrices].reverse().reduce((a,b)=>vstack(a, b))
        );
        maintain_arr(this);
        maintain_indexes(this, this.rows);
        return this;
    }
    forEach(fn){
        this.data.forEach(fn);
        return this;
    }
    forEachRow(fn){

    }
    map(fn){
        this.data = this.data.map(fn);
        return this;
    }
    sort(fn){
        this.data = this.data.sort(fn);
        return this;
    }
    shuffle(){
        return this.sort(() => 0.5-Math.random())
    }
    reduce(fn, initialValue){
        return this.data.reduce(fn, initialValue);
    }
    every(fn){
        return this.data.every(fn);
    }
    some(fn){
        return this.data.some(fn)
    }

    get isSquare(){
        return this.rows === this.cols;
    }

    add(...M){
        return arithmetic.call(
            this,
            (a, b) => a + b,
            ...M 
        )
    }
    sub(...M){
        return arithmetic.call(
            this,
            (a, b) => a - b,
            ...M 
        )
    }
    mul(...M){
        return arithmetic.call(
            this,
            (a, b) => a * b,
            ...M 
        )
    }
    div(...M){
        return arithmetic.call(
            this,
            (a, b) => a / b,
            ...M 
        )
    }
    modulo(...M){
        return arithmetic.call(
            this,
            (a, b) => a % b,
            ...M 
        )
    }
    dot(...M){
       typed_matrix_dot(this, ...M)
       return this
    }

}