import {describe,expect,it} from "vitest"
import {
  abs,pow,sqrt,cbrt,nthr,croot,exp,ln,sign,
  floor,ceil,round,trunc,fract,
  cos,sin,tan,sec,acos,asin,atan,acot,
  cosh,sinh,tanh,coth,acosh,asinh,atanh,sig
} from "numz/ufunc"
import {complex,Complex} from "numz/complex"

const closeComplex=(z,a,b,precision=6)=>{
  expect(z).toBeInstanceOf(Complex)
  expect(z.a).toBeCloseTo(a,precision)
  expect(z.b).toBeCloseTo(b,precision)
}

const expectMapped=(fn,input,expected)=>{
  const result=fn(input)
  expect(result).toEqual(expected)
}

describe("ufunc mapping",()=>{
  describe("arrays",()=>{
    it("maps arrays",()=>{
      expectMapped(abs,[-1,-2,3],[1,2,3])
      expectMapped(sqrt,[1,4,9],[1,2,3])
      expectMapped(sign,[-2,0,4],[-1,0,1])
    })

    it("maps nested arrays",()=>{
      expect(abs([[-1,2],[-3,4]])).toEqual([[1,2],[3,4]])
    })
  })

  describe("typed arrays",()=>{
    it("maps Float64Array",()=>{
      const result=abs(new Float64Array([-1,2,-3]))
      expect(result).toBeInstanceOf(Float64Array)
      expect([...result]).toEqual([1,2,3])
    })

    it("maps Int32Array",()=>{
      const result=abs(new Int32Array([-1,2,-3]))
      expect(result).toBeInstanceOf(Int32Array)
      expect([...result]).toEqual([1,2,3])
    })
  })

  describe("Set",()=>{
    it("maps Set values",()=>{
      expect(abs(new Set([-1,2,-3]))).toEqual(new Set([1,2,3]))
    })

    it("preserves Set",()=>{
      expect(abs(new Set([1,2]))).toBeInstanceOf(Set)
    })
  })

  describe("Map",()=>{
    it("maps Map values",()=>{
      const result=abs(new Map([
        ["a",-2],
        ["b",3],
        ["c",-4]
      ]))

      expect(result).toEqual(new Map([
        ["a",2],
        ["b",3],
        ["c",4]
      ]))
    })

    it("preserves Map keys",()=>{
      const result=abs(new Map([
        ["a",-2],
        ["b",-3]
      ]))

      expect([...result.keys()]).toEqual(["a","b"])
    })
  })

  describe("objects",()=>{
    it("maps object values",()=>{
      expect(abs({
        a:-2,
        b:3,
        c:-4
      })).toEqual({
        a:2,
        b:3,
        c:4
      })
    })

    it("maps nested objects",()=>{
      expect(abs({
        a:{
          x:-2,
          y:3
        }
      })).toEqual({
        a:{
          x:2,
          y:3
        }
      })
    })
  })

  describe("Complex",()=>{
    it("treats Complex as a mapfun value",()=>{
      const z=complex(3,4)
      expect(abs(z)).toBe(5)
    })

    it("preserves Complex output when the ufunc returns Complex",()=>{
      closeComplex(sqrt(complex(0,1)),Math.SQRT1_2,Math.SQRT1_2)
    })

    it("maps arrays of Complex values",()=>{
      const result=abs([
        complex(3,4),
        complex(5,12)
      ])

      expect(result).toEqual([5,13])
    })
  })

  describe("multiple arguments",()=>{
    it("returns an array when multiple arguments are supplied",()=>{
      expect(abs(-2,3,-4)).toEqual([2,3,4])
    })

    it("maps each argument independently",()=>{
      expect(sqrt(1,4,9)).toEqual([1,2,3])
    })
  })
})

describe("abs",()=>{
  it("handles real numbers",()=>{
    expect(abs(-5)).toBe(5)
    expect(abs(5)).toBe(5)
    expect(abs(0)).toBe(0)
  })

  it("handles Complex numbers",()=>{
    expect(abs(complex(3,4))).toBe(5)
  })
})

describe("pow",()=>{
  it("handles real powers",()=>{
    expect(pow(2,3)).toBe(8)
    expect(pow(9,0.5)).toBe(3)
    expect(pow(10,0)).toBe(1)
  })

  it("maps arrays",()=>{
    expect(pow([1,2,3],2)).toEqual([1,4,9])
  })

  it("handles Complex values",()=>{
    closeComplex(pow(complex(0,1),2),-1,0)
  })
})

describe("sqrt",()=>{
  it("handles positive values",()=>{
    expect(sqrt(0)).toBe(0)
    expect(sqrt(4)).toBe(2)
    expect(sqrt(9)).toBe(3)
  })

  it("handles negative values",()=>{
    closeComplex(sqrt(-4),0,2)
  })

  it("handles Complex values",()=>{
    closeComplex(
      sqrt(complex(0,1)),
      Math.SQRT1_2,
      Math.SQRT1_2
    )
  })
})

describe("cbrt",()=>{
  it("handles real values",()=>{
    expect(cbrt(8)).toBe(2)
    expect(cbrt(-8)).toBe(-2)
    expect(cbrt(0)).toBe(0)
  })

  it("handles Complex values",()=>{
    closeComplex(cbrt(complex(1,0)),1,0)
  })
})

describe("nthr",()=>{
  it("handles positive values",()=>{
    expect(nthr(8,3)).toBe(2)
    expect(nthr(16,2)).toBe(4)
  })

  it("handles negative odd roots",()=>{
    expect(nthr(-8,3)).toBe(-2)
  })

  it("handles negative even roots",()=>{
    closeComplex(nthr(-4,2),0,2)
  })

  it("rejects non-numeric n",()=>{
    expect(()=>nthr(8,"2"))
      .toThrow("nthr expects a real number n")
  })
})

describe("exp",()=>{
  it("handles real values",()=>{
    expect(exp(0)).toBe(1)
    expect(exp(1)).toBeCloseTo(Math.E,7)
  })

  it("handles Complex values",()=>{
    closeComplex(exp(complex(0,Math.PI)),-1,0)
  })

  it("maps arrays",()=>{
    expect(exp([0,1])).toEqual([1,2.71828183])
  })
})

describe("ln",()=>{
  it("handles real values",()=>{
    expect(ln(1)).toBe(0)
    expect(ln(Math.E)).toBe(1)
  })

  it("handles Complex values",()=>{
    closeComplex(ln(complex(-1,0)),0,Math.PI)
  })
})

describe("sign",()=>{
  it("handles real values",()=>{
    expect(sign(-10)).toBe(-1)
    expect(sign(0)).toBe(0)
    expect(sign(10)).toBe(1)
  })

  it("handles Complex values",()=>{
    closeComplex(sign(complex(3,4)),0.6,0.8)
    closeComplex(sign(complex(0,0)),0,0)
  })
})

describe("floor",()=>{
  it("handles real values",()=>{
    expect(floor(1.9)).toBe(1)
    expect(floor(-1.1)).toBe(-2)
  })

  it("handles Complex values",()=>{
    closeComplex(floor(complex(1.9,-1.1)),1,-2)
  })
})

describe("ceil",()=>{
  it("handles real values",()=>{
    expect(ceil(1.1)).toBe(2)
    expect(ceil(-1.1)).toBe(-1)
  })

  it("handles Complex values",()=>{
    closeComplex(ceil(complex(1.1,-1.1)),2,-1)
  })
})

describe("round",()=>{
  it("handles real values",()=>{
    expect(round(1.4)).toBe(1)
    expect(round(1.6)).toBe(2)
  })

  it("handles Complex values",()=>{
    closeComplex(round(complex(1.6,-1.6)),2,-2)
  })
})

describe("trunc",()=>{
  it("handles real values",()=>{
    expect(trunc(1.9)).toBe(1)
    expect(trunc(-1.9)).toBe(-1)
  })

  it("handles Complex values",()=>{
    closeComplex(trunc(complex(1.9,-1.9)),1,-1)
  })
})

describe("fract",()=>{
  it("handles real values",()=>{
    expect(fract(1.25)).toBeCloseTo(0.25)
    expect(fract(-1.25)).toBeCloseTo(-0.25)
  })

  it("handles Complex values",()=>{
    closeComplex(fract(complex(1.25,-2.75)),0.25,-0.75)
  })
})

describe("trigonometric functions",()=>{
  it("cos",()=>{
    expect(cos(0)).toBe(1)
    expect(cos(Math.PI)).toBe(-1)
    closeComplex(cos(complex(0,0)),1,0)
  })

  it("sin",()=>{
    expect(sin(0)).toBe(0)
    expect(sin(Math.PI/2)).toBe(1)
    closeComplex(sin(complex(0,0)),0,0)
  })

  it("tan",()=>{
    expect(tan(0)).toBe(0)
    expect(tan(Math.PI/4)).toBe(1)
    closeComplex(tan(complex(0,0)),0,0)
  })

  it("sec",()=>{
    expect(sec(0)).toBe(1)
    expect(sec(Math.PI)).toBe(-1)
  })

  it("acos",()=>{
    expect(acos(1)).toBe(0)
    expect(acos(0)).toBeCloseTo(Math.PI/2)
  })

  it("asin",()=>{
    expect(asin(0)).toBe(0)
    expect(asin(1)).toBeCloseTo(Math.PI/2)
  })

  it("atan",()=>{
    expect(atan(0)).toBe(0)
    expect(atan(1)).toBeCloseTo(Math.PI/4)
  })

  it("acot",()=>{
    expect(acot(1)).toBeCloseTo(Math.PI/4)
    expect(acot(0)).toBeCloseTo(Math.PI/2)
  })
})

describe("hyperbolic functions",()=>{
  it("cosh",()=>{
    expect(cosh(0)).toBe(1)
    expect(cosh(1)).toBeCloseTo(Math.cosh(1),7)
  })

  it("sinh",()=>{
    expect(sinh(0)).toBe(0)
    expect(sinh(1)).toBeCloseTo(Math.sinh(1),7)
  })

  it("tanh",()=>{
    expect(tanh(0)).toBe(0)
    expect(tanh(1)).toBeCloseTo(Math.tanh(1),7)
  })

  it("coth",()=>{
    expect(coth(1)).toBeCloseTo(1/Math.tanh(1),7)
  })

  it("acosh",()=>{
    expect(acosh(1)).toBe(0)
    expect(acosh(Math.cosh(2))).toBeCloseTo(2,7)
  })

  it("asinh",()=>{
    expect(asinh(0)).toBe(0)
    expect(asinh(Math.sinh(2))).toBeCloseTo(2,7)
  })

  it("atanh",()=>{
    expect(atanh(0)).toBe(0)
    expect(atanh(0.5)).toBeCloseTo(Math.atanh(0.5),7)
  })
})

describe("sig",()=>{
  it("handles scalar values",()=>{
    expect(sig(0)).toBe(0.5)
    expect(sig(1)).toBe(0.73105858)
    expect(sig(-1)).toBe(0.26894142)
  })

  it("maps arrays",()=>{
    expect(sig([0,1])).toEqual([
      0.5,
      0.73105858
    ])
  })
})