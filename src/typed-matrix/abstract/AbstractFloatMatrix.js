import { AbstractIntMatrix } from "./AbstractIntMatrix.js";
import { typed_matrix_inv } from './helpers/index.js'
import {
    map,
    lerp,
    clamp,
    norm,
} from 'ziko/math/functions'
export class AbstractFloatMatrix extends AbstractIntMatrix{
    constructor(rows, cols, data, type){
        super(rows, cols, data, type)
    }
    get inv(){
        return typed_matrix_inv(this)
    }
    get range(){
        return {
            map : (xmin, xmax, ymin, ymax) => {
                // To Do
                return this;
            },
            norm : (min, max) => {
                this.data = this.data.map(
                    n => min !== max ? (n - min) / ( max - min) : 0 
                )
                return this;
            },
            lerp : (min, max) => {
                this.data = this.data.map(
                    n => min !== max ? (max - min) * n + min : 0 
                )
                return this;
            },
            clamp : (min, max) => {
                this.data = this.data.map(
                    n => Math.min(Math.max(n, min), max)
                );
                return this;
            },

        }
    }
}