import { 
    AbstractIntMatrix,
    AbstractFloatMatrix
} from "./abstract/index.js";
export class I8Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Int8Array)
    }
}
export class I16Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Int16Array)
    }
}
export class I32Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Int32Array)
    }
}
// export class I64Matrix extends AbstractIntMatrix{
//     constructor(rows, cols, data){
//         super(rows, cols, data, Int64Array)
//     }
// }

export class U8Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Uint8Array)
    }
}
export class U16Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Uint16Array)
    }
}
export class U32Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Uint32Array)
    }
}
// export class U64Matrix extends AbstractTypedMatrix{
//     constructor(rows, cols, data){
//         super(rows, cols, data, Uint64Array)
//     }
// }

export class F16Matrix extends AbstractFloatMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Float16Array)
    }
}
export class F32Matrix extends AbstractFloatMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, Float32Array)
    }
}
export class F64Matrix extends AbstractFloatMatrix{
    static type = Float64Array
    constructor(rows, cols, data){
        super(rows, cols, data, Float64Array)
    }
}

export class BI64Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, BigInt64Array)
    }
}

export class BU64Matrix extends AbstractIntMatrix{
    constructor(rows, cols, data){
        super(rows, cols, data, BigUint64Array)
    }
}

export const matrix_i8 = (rows, cols, data) => new I8Matrix(rows, cols, data)
export const matrix_i16 = (rows, cols, data) => new I16Matrix(rows, cols, data)
export const matrix_i32 = (rows, cols, data) => new I32Matrix(rows, cols, data)
export const matrix_i64 = (rows, cols, data) => new I16Matrix(rows, cols, data)

export const matrix_u8 = (rows, cols, data) => new U8Matrix(rows, cols, data)
export const matrix_u16 = (rows, cols, data) => new U16Matrix(rows, cols, data)
export const matrix_u32 = (rows, cols, data) => new U32Matrix(rows, cols, data)
export const matrix_u64 = (rows, cols, data) => new U16Matrix(rows, cols, data)

export const matrix_f16 = (rows, cols, data) => new F16Matrix(rows, cols, data)
export const matrix_f32 = (rows, cols, data) => new F32Matrix(rows, cols, data)
export const matrix_f64 = (rows, cols, data) => new F16Matrix(rows, cols, data)

export const matrix_bi64 = (rows, cols, data) => new BI64Matrix(rows, cols, data)
export const matrix_bu64 = (rows, cols, data) => new BI64Matrix(rows, cols, data)
