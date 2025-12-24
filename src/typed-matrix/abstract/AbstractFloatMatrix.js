import { AbstractTypedMatrix } from "./AbstractTypedMatrix.js";
export class AbstractFloatMatrix extends AbstractTypedMatrix{
    constructor(rows, cols, data, type){
        super(rows, cols, data, type)
    }
}