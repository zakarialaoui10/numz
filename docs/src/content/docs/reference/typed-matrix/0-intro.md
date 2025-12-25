---
title: Introduction
description: Typed matrices overview
tableOfContents: false
---

**Typed Matrices** in **Numz** are an extension of **Zikojs Matrix**, designed to provide
**high-performance**, **memory-efficient**, and **type-safe** matrix operations.

Unlike regular matrices that rely on standard JavaScript arrays, Typed Matrices are
backed by **TypedArray** structures, enabling contiguous memory layout and faster
numerical computation.

---

## TypedMatrix Variants

Numz provides multiple TypedMatrix classes, each mapped to a specific
JavaScript `TypedArray` implementation.

### Floating-Point Matrices

| Class       | Backing Type  | Precision | Use case |
|-------------|---------------|-----------|----------|
| `F16Matrix` | `Float16Array`| 16-bit    | ML, GPU-style data |
| `F32Matrix` | `Float32Array`| 32-bit    | GPU, graphics, signals |
| `F64Matrix` | `Float64Array`| 64-bit    | Scientific computing |

### Integer Matrices

| Class       | Backing Type       | Range | Use case |
|-------------|--------------------|-------|----------|
| `I8Matrix`  | `Int8Array`        | −128 → 127 | Compact data |
| `U8Matrix`  | `Uint8Array`       | 0 → 255 | Images, buffers |
| `I16Matrix` | `Int16Array`       | −32K → 32K | DSP, audio |
| `U16Matrix` | `Uint16Array`      | 0 → 65K | Indexing |
| `I32Matrix` | `Int32Array`       | 32-bit | General integers |
| `U32Matrix` | `Uint32Array`      | 32-bit | Large indices |

### Big Integer Matrices

| Class         | Backing Type         | Notes |
|--------------|----------------------|-------|
| `BI64Matrix`  | `BigInt64Array`      | Requires `BigInt` |
| `BU64Matrix`  | `BigUint64Array`     | Large integer arithmetic |

---

## Example

```js
import { F64Matrix } from 'numz';

const A = new F64Matrix(2, 2, [
  1, 2,
  3, 4
]);

A.add(2).mul(3);

```


### Note
> During the construction phase, the provided data is accepted as a regular
JavaScript array only as a temporary input.
Internally, Numz copies the values into a TypedArray (``Float64Array`` in this case),
and the original array is discarded and no longer used.

> This guarantees:
- contiguous memory layout
- predictable numeric type
- better performance for subsequent operations

