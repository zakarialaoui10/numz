import {describe,expect,it} from "vitest"
import {
  integral_simpson,
  integral_trapezoid,
  integral_midpoint
} from "numz/calculus"

describe("integral_simpson",()=>{
  it("integrates a constant function",()=>{
    expect(integral_simpson(()=>5,0,2)).toBeCloseTo(10)
  })

  it("integrates x",()=>{
    expect(integral_simpson(x=>x,0,2)).toBeCloseTo(2)
  })

  it("integrates x²",()=>{
    expect(integral_simpson(x=>x**2,0,3)).toBeCloseTo(9)
  })

  it("integrates x³",()=>{
    expect(integral_simpson(x=>x**3,0,2)).toBeCloseTo(4)
  })

  it("integrates sin(x)",()=>{
    expect(integral_simpson(Math.sin,0,Math.PI)).toBeCloseTo(2)
  })

  it("handles an odd number of intervals",()=>{
    expect(integral_simpson(x=>x**2,0,3,101)).toBeCloseTo(9)
  })

  it("handles reversed bounds",()=>{
    expect(integral_simpson(x=>x,2,0)).toBeCloseTo(-2)
  })

  it("handles equal bounds",()=>{
    expect(integral_simpson(x=>x**2,2,2)).toBe(0)
  })
})

describe("integral_trapezoid",()=>{
  it("integrates a constant function",()=>{
    expect(integral_trapezoid(()=>5,0,2)).toBeCloseTo(10)
  })

  it("integrates x",()=>{
    expect(integral_trapezoid(x=>x,0,2)).toBeCloseTo(2)
  })

  it("integrates x²",()=>{
    expect(integral_trapezoid(x=>x**2,0,3,1000)).toBeCloseTo(9)
  })

  it("integrates sin(x)",()=>{
    expect(integral_trapezoid(Math.sin,0,Math.PI,1000)).toBeCloseTo(2)
  })

  it("handles reversed bounds",()=>{
    expect(integral_trapezoid(x=>x,2,0)).toBeCloseTo(-2)
  })

  it("handles equal bounds",()=>{
    expect(integral_trapezoid(x=>x**2,2,2)).toBe(0)
  })
})

describe("integral_midpoint",()=>{
  it("integrates a constant function",()=>{
    expect(integral_midpoint(()=>5,0,2)).toBeCloseTo(10)
  })

  it("integrates x",()=>{
    expect(integral_midpoint(x=>x,0,2)).toBeCloseTo(2)
  })

  it("integrates x²",()=>{
    expect(integral_midpoint(x=>x**2,0,3,1000)).toBeCloseTo(9)
  })

  it("integrates sin(x)",()=>{
    expect(integral_midpoint(Math.sin,0,Math.PI,1000)).toBeCloseTo(2)
  })

  it("handles reversed bounds",()=>{
    expect(integral_midpoint(x=>x,2,0)).toBeCloseTo(-2)
  })

  it("handles equal bounds",()=>{
    expect(integral_midpoint(x=>x**2,2,2)).toBe(0)
  })
})