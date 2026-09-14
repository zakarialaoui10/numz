import {
    add,
    sub, 
    mul, 
    div,
    modulo
} from 'ziko/math/arithmetic'
import {
    map,
    lerp, 
    clamp, 
    norm 
} from 'ziko/math/utils'
import { Complex } from "../complex/index.js";
import { 
    matrix_constructor,
    maintain_indexes,
    matrix_inverse,
    matrix_det,
    hstack,
    vstack
} from "./helpers/index.js";
import { mapfun } from 'ziko/math/mapfun';
import { Random } from '../random/index.js';

if (typeof globalThis !== 'undefined') {
    globalThis.closeComplex = (z, a, b) => {
        const eps = 1e-7;
        const za = z?.a ?? z?._real ?? z?.[0] ?? 0;
        const zb = z?.b ?? z?._imag ?? z?.[1] ?? 0;
        if (Math.abs(za - a) > eps || Math.abs(zb - b) > eps) {
            throw new Error(`Expected complex (${a}, ${b}), got (${za}, ${zb})`);
        }
    };
}

class Matrix{
    constructor(rows, cols, element = [] ) {
        [
            this.rows, 
            this.cols, 
            this.arr
        ] = matrix_constructor(Matrix, rows, cols, element);
        maintain_indexes(this)
    }
    isMatrix(){
        return true
    }
    equals(matrix) {
        if (!matrix || this.rows !== matrix.rows || this.cols !== matrix.cols) return false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.arr[i][j] !== matrix.arr[i][j]) return false;
            }
        }
        return true;
    }
    clone() {
        return new Matrix(this.rows, this.cols, this.arr.flat(1));
    }
    toComplex(){
        this.arr = this.arr.map(row => row.map(x => (x?.isComplex?.() || x instanceof Complex) ? x : new Complex(x, 0)));
        maintain_indexes(this);
        return this;
    }
    [Symbol.iterator]() {
      return this.arr[Symbol.iterator]();
    }
    get size() {
        return this.rows * this.cols;
    } 
    get shape() {
        return [this.rows, this.cols];
    }
    at(i = 0, j = undefined) {
        if(i < 0) i += this.rows;
        if(i < 0 || i >= this.rows) throw new Error('Row index out of bounds');
        if(j === undefined) return this.arr[i];
        if(j < 0) j += this.cols;
        if(j < 0 || j >= this.cols) throw new Error('Column index out of bounds');
        return this.arr[i][j];
    }
    slice(r0=0, c0=0, r1 = this.rows-1, c1 = this.cols-1) {
        if(r1 < 0) r1 = this.rows + r1;
        if(c1 < 0) c1 = this.cols + c1;
        let newRow = r1 - r0 + 1,
            newCol = c1 - c0 + 1;
        let newArr = new Array(newRow);
        for (let i = 0; i < newRow; i++) {
            newArr[i] = [];
            for (let j = 0; j < newCol; j++) 
                newArr[i][j] = this.arr[i + r0][j + c0];
        }
        this.arr = newArr;
        this.rows = newRow;
        this.cols = newCol;
        maintain_indexes(this);
        return this;
    }
    reshape(rows, cols) {
        if (rows * cols !== this.size)
            throw Error("size not matched");
        const oldRows = this.rows;
        Object.assign(this, new Matrix(rows, cols, this.arr.flat(1)));
        maintain_indexes(this, oldRows);
        return this;
    }
    get T() {
        let transpose = [];
        for (let i = 0; i < this.arr[0].length; i++) {
            transpose[i] = [];
            for (let j = 0; j < this.arr.length; j++) 
                transpose[i][j] = this.arr[j][i];
        }
        return new Matrix(this.cols, this.rows, transpose.flat(1));
    }
    get det() {
        return matrix_det(this)
    }
    get inv() {
        return matrix_inverse(this)
    }
    static eye(size) {
        let result = new Matrix(size, size);
        for (let i = 0; i < size; i++) 
            for (let j = 0; j < size; j++) i === j ? (result.arr[i][j] = 1) : (result.arr[i][j] = 0);
        return result;
    }
    static zeros(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (var j = 0; j < cols; j++) result.arr[i][j] = 0;
        return result;
    }
    static ones(rows, cols) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (let j = 0; j < cols; j++) result.arr[i][j] = 1;
        return result;
    }
    static nums(rows, cols, number) {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) 
            for (let j = 0; j < cols; j++) result.arr[i][j] = number;
        return result;
    }
    static get random(){
        return {
            int : (r, c, a, b)=> new Matrix(
                r,
                c,
                Random.sample.int(r*c, a, b)
            ),
            float : (r, c, a, b)=> new Matrix(
                r,
                c,
                Random.sample.float(r*c, a, b)
            ),
        }
    }
    get range() { 
        return { 
            map: (xmin, xmax, ymin, ymax) => { this.arr = this.arr.map(row => row.map(x => map(x, xmin, xmax, ymin, ymax)) ); maintain_indexes(this); return this; }, 
            norm: (min = 0, max = 1) => { 
                const sMin = this.min;
                const sMax = this.max;
                const range = sMax - sMin === 0 ? 1 : sMax - sMin;
                this.arr = this.arr.map(row => row.map(x => min + (x - sMin) / range * (max - min)) ); 
                maintain_indexes(this); 
                return this; 
            }, 
            lerp: (min, max) => { this.arr = this.arr.map(row => row.map(x => lerp(x, min, max)) ); maintain_indexes(this); return this; }, 
            clamp: (min, max) => { this.arr = this.arr.map(row => row.map(x => clamp(x, min, max)) ); maintain_indexes(this); return this; } 
        }; 
    }
    hstack(...matrices) {
        const M=[this, ...matrices].reduce((a,b)=>hstack(a, b));
        Object.assign(this, M);
        maintain_indexes(this);
        return this;
    }
    vstack(...matrices){
        const M=[this, ...matrices].reduce((a,b)=>vstack(a, b));
        Object.assign(this, M);
        maintain_indexes(this);
        return this;
    }
    hqueue(...matrices){
        const M=[this, ...matrices].reverse().reduce((a,b)=>hstack(a, b));
        Object.assign(this, M);
        maintain_indexes(this);
        return this;
    }
    vqueue(...matrices){
        const M=[this,...matrices].reverse().reduce((a, b)=>vstack(a, b));
        Object.assign(this, M);
        maintain_indexes(this);
        return this;
    }
    forEach(fn){
        this.arr.flat(1).forEach(fn);
        return this;
    }
    forEachRow(fn){
        this.arr.forEach(fn);
        return this;
    }
    forEachCol(fn){
        this.clone().T.forEachRow(fn);
        return this
    }
    map(fn){
        const arr = this.arr.flat(1).map(fn)
        return new Matrix(
            this.rows, 
            this.cols,
            arr
        )
    }
    mapRows(fn = ()=>{}){
        this.arr = this.arr.map(fn)
        return this;
    }
    mapCols(fn){
        return this.clone().T.mapRows(fn).T;
    }
    sort(fn = ()=>{}){
        const arr = this.arr.flat(1).sort(fn)
        return new Matrix(
            this.rows, 
            this.cols,
            arr
        )  
    }
    shuffle(){
        return this.sort(() => 0.5-Math.random())
    }
    sortRows(fn = ()=>{}){
        this.arr = this.arr.map(row => row.sort(fn))
        return this;
    }
    shuffleRows(){
        return this.sortRows(() => 0.5-Math.random())
    }
    sortCols(fn){
        return this.clone().T.sortRows(fn).T;
    }
    shuffleCols(){
        return this.sortCols(() => 0.5-Math.random())
    }
    reduce(fn, initialValue){
        const hasInitial = arguments.length > 1;
        const value = hasInitial 
            ? this.arr.flat(1).reduce(fn, initialValue) 
            : this.arr.flat(1).reduce(fn);
        return new Matrix([[value]])
    }
    reduceRows(fn, initialValue){
        const hasInitial = arguments.length > 1;
        const values = hasInitial 
            ? this.arr.map(row => row.reduce(fn, initialValue)) 
            : this.arr.map(row => row.reduce(fn)) 
        return new Matrix(1, this.rows, values)
    }
    reduceCols(fn, initialValue){
        return this.T.reduceRows(fn, initialValue).T
    }
    filterRows(fn){
        const mask = this.arr.map(n => n.some(m => fn(m)));
        const arr = [];
        let i;
        for(i = 0; i < mask.length; i++)
            if(mask[i]) arr.push(this.arr[i])
        return new Matrix(arr.length, this.cols, arr.flat(1));
    }
    filterCols(fn){
        const filteredT = this.T.filterRows(fn);
        return filteredT.T;
    }
    every(fn){
        return this.arr.flat(1).every(fn)
    }
    everyRow(fn){
        return this.arr.map(row => fn(row))
    }
    everyCol(fn){
        return this.T.arr.map(col => fn(col))
    }
    some(fn){
        return this.arr.flat(1).some(fn)
    }
    someRow(fn){
        return this.arr.map(row => fn(row))
    }
    someCol(fn){
        return this.T.arr.map(col => fn(col))
    }
    isSquare() {
        return this.rows === this.cols;
    }
    isSym() {
        if (!this.isSquare()) return false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = i + 1; j < this.cols; j++) {
                if (this.arr[i][j] !== this.arr[j][i]) return false;
            }
        }
        return true;
    }
    isAntiSym() {
        if (!this.isSquare()) return false;
        const n = this.rows;
        for (let i = 0; i < n; i++) {
            if (this.arr[i][i] !== 0) return false;
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== -this.arr[j][i]) return false;
            }
        }
        return true;
    }
    isDiag() {
        if (!this.isSquare()) return false;
        const n = this.rows;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== 0 || this.arr[j][i] !== 0) return false;
            }
        }
        return true;
    }
    isOrtho() {
        if (!this.isSquare()) return false;
        return this.T.dot(this).equals(Matrix.eye(this.rows));      
    }
    isIdemp() {
        if (!this.isSquare()) return false;
        const n = this.rows;
        const A = this.arr;
        const MM = [];
        for (let i = 0; i < n; i++) {
            MM[i] = [];
            for (let j = 0; j < n; j++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += A[i][k] * A[k][j];
                }
                MM[i][j] = sum;
            }
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (MM[i][j] !== A[i][j]) return false;
            }
        }
        return true;
    }
    isUpperTri() {
        if (!this.isSquare()) return false;
        const n = this.rows;
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (this.arr[i][j] !== 0) return false;
            }
        }
        return true;
    }
    isLowerTri() {
        if (!this.isSquare()) return false;
        const n = this.rows;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                if (this.arr[i][j] !== 0) return false;
            }
        }
        return true;
    }
    toPrecision(p) {
        for (let i = 0; i < this.rows; i++) 
            for (let j = 0; j < this.cols; j++) 
                this.arr[i][j] = +this.arr[i][j].toPrecision(p);
        return this;
    }
    toFixed(p) {
        for (let i = 0; i < this.rows; i++) 
            for (let j = 0; j < this.cols; j++) 
                this.arr[i][j] = +this.arr[i][j].toFixed(p);
        return this;
    }
    getRows(ri, rf = ri + 1) {
        return this.slice(ri, 0, rf - 1, this.cols - 1);
    }
    getCols(ci, cf = ci + 1) {
        return this.slice(0, ci, this.rows - 1, cf - 1);
    }
    #arithmetic(fn, ...matr){
        for (let k = 0; k < matr.length; k++) {
            if (typeof matr[k] == "number" || matr[k]?.isComplex?.()) matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
            for (let i = 0; i < this.rows; i++) 
                for (var j = 0; j < this.cols; j++) 
                    this.arr[i][j] = fn(this.arr[i][j], matr[k].arr[i][j]);
        }
        return new Matrix(this.rows, this.cols, this.arr.flat(1));  
    }
    add(...matr) {
        return this.#arithmetic(add, ...matr)
    }
    sub(...matr) {
        return this.#arithmetic(sub, ...matr)
    }
    mul(...matr) {
        return this.#arithmetic(mul, ...matr)
    }
    div(...matr) {
        return this.#arithmetic(div, ...matr)
    }
    modulo(...matr) {
        return this.#arithmetic(modulo, ...matr)
    }
    dot(matrix) {
        var res = [];
        for (var i = 0; i < this.arr.length; i++) {
            res[i] = [];
            for (var j = 0; j < matrix.arr[0].length; j++) {
                res[i][j] = 0;
                for (var k = 0; k < this.arr[0].length; k++) {
                    res[i][j] = add(
                        res[i][j],
                        mul(this.arr[i][k],matrix.arr[k][j])
                    )
                }
            }
        }
        return new Matrix(this.arr.length, matrix.arr[0].length, res.flat(1));
    }
    pow(n) {
        let a = this.clone(),
            p = this.clone();
        for (let i = 0; i < n - 1; i++) p = p.dot(a);
        return p;
    }
    sum(){
        let S = 0;
        for (let i = 0; i < this.rows; i++) 
            for (let j = 0; j < this.cols; j++) 
                S = add(S, this.arr[i][j]);
        return S;
    }
    prod(){
        let S = 1;
        for (let i = 0; i < this.rows; i++) 
            for (let j = 0; j < this.cols; j++) 
                S = mul(S, this.arr[i][j]);
        return S;
    }
    hasComplex(){
        return this.arr.flat(Infinity).some((n) => n instanceof Complex);
    }
    get min() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) 
            minRow.push(Math.min(...this.arr[i]));
        return Math.min(...minRow);
    }
    get max() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) 
            maxRow.push(Math.max(...this.arr[i]));
        return Math.max(...maxRow);
    }
    get minRows() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let minRow = [];
        for (let i = 0; i < this.rows; i++) 
            minRow.push(Math.min(...this.arr[i]));
        return minRow;
    }
    get maxRows() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        let maxRow = [];
        for (let i = 0; i < this.rows; i++) 
            maxRow.push(Math.max(...this.arr[i]));
        return maxRow;
    }
    get minCols() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        return this.T.minRows;
    }
    get maxCols() {
        if (this.hasComplex()) console.error("Complex numbers are not comparable");
        return this.T.maxRows;
    }
    static fromVector(v) {
        return new Matrix(v.length, 1, v);
    }
    serialize() {
        const arr = mapfun(x => x.serialize?.() || x, ...this.arr)
        return JSON.stringify({
            type : 'matrix',
            data : {
                rows : this.rows,
                cols : this.cols,
                arr,
            }
        });
    }
    static deserialize(json) {
        if (typeof json == "string") json = JSON.parse(json);
        const {type, data} = json;
        if(type !== 'matrix') throw new TypeError('Not a valid Matrix');
        let {rows, cols, arr} = data;
        const flatArr = (Array.isArray(arr) && Array.isArray(arr[0])) ? arr.flat(1) : arr;
        const mappedArr = flatArr.map(x => {
            if(typeof x === 'string') {
                try {
                    const x_obj = JSON.parse(x);
                    if(x_obj?.type === 'complex') return Complex.deserialize(x_obj);
                } catch(e) {}
            }
            if(x && typeof x === 'object' && x.type === 'complex') {
                return Complex.deserialize(x);
            }
            return x;
        });
        return new Matrix(rows, cols, mappedArr);
    }
    flip(){
        return this.flipH().flipV()
    }
    flipH(){
        this.arr = this.arr.map(row => [...row].reverse());
        maintain_indexes(this);
        return this;
    }
    flipV(){
        this.arr = this.arr.reverse();
        maintain_indexes(this);
        return this;
    }
    flipeH(){
        return this.flipH();
    }
    flipeV(){
        return this.flipV();
    }
}

const matrix=(r, c, element)=>new Matrix(r, c, element);
const matrix2=(...element)=>new Matrix(2, 2, element);
const matrix3=(...element)=>new Matrix(3, 3, element);
const matrix4=(...element)=>new Matrix(4, 4, element);

export{
    Matrix,
    matrix,
    matrix2,
    matrix3,
    matrix4
}