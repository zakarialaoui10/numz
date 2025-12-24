import { 
    typed_matrix_constructor,
    maintain_arr,
    hstack,
    vstack,
    arithmetic
} from './helpers/index.js'
export class AbstractTypedMatrix{
    constructor(rows, cols, arr, type){
        [
            this.rows,
            this.cols,
            this.data
        ] = typed_matrix_constructor(rows, cols, arr, type);
        maintain_arr(this) 
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
    get type(){
        return this.data.constructor;
    }
    get size(){
        return this.rows * this.cols;
    }
    get shape(){
        return [this.rows, this.cols]
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
    reshape(newRows, newCols){
        if(!(newRows * newCols === this.rows * this.cols)) throw Error('size not matched');
        this.rows = newRows;
        this.cols = newCols;
        maintain_arr(this);
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
        maintain_arr(this)
        return this
    }
    toPrecesion(p){
        this.data = this.data.map(n => n.toPrecesion(p));
        maintain_arr(this) 
        return this;
    }
    toFixed(p){
        this.data = this.data.map(n => n.toFixed(p));
        maintain_arr(this) 
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

}