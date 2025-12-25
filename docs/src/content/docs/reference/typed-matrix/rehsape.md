---
title: reshape
description: reshape
tableOfContents: false
---

- `.reshape(r, c)` : Reshapes the matrix to `(r × c)` without changing the total number of elements.
- `.reshape(r0, c0, r1, c1)` : 
- `.hstack(...matrices: Matrix[])` : Horizontally stacks matrices by columns (same number of rows required).
- `.vstack(...matrices: Matrix[])` : Vertically stacks matrices by rows (same number of columns required).
- `.hqueue(...matrices: Matrix[])` : Appends matrices horizontally, preserving row order (row-wise concatenation).
- `.vqueue(...matrices: Matrix[])` : Appends matrices vertically, preserving column order (column-wise concatenation).