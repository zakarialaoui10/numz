import {describe, expect, it} from "vitest"
import {complex, Complex} from "numz/complex"

describe("Complex", () => {
  describe("constructor", () => {
    it("creates a complex number", () => {
      const z = new Complex(2, 3)

      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })

    it("defaults to zero", () => {
      const z = new Complex()

      expect(z.a).toBe(0)
      expect(z.b).toBe(0)
    })

    it("accepts another Complex", () => {
      const a = new Complex(2, 3)
      const z = new Complex(a)

      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })

    it("accepts an object with a and b", () => {
      const z = new Complex({a:2,b:3})

      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })

    it("accepts polar coordinates", () => {
      const z = new Complex({z:2,phi:Math.PI/2})

      expect(z.a).toBeCloseTo(0)
      expect(z.b).toBeCloseTo(2)
    })
  })

  describe("identity", () => {
    it("has __mapfun__", () => {
      expect(new Complex().__mapfun__).toBe(true)
    })

    it("identifies itself as Complex", () => {
      expect(new Complex().isComplex()).toBe(true)
    })

    it("clones itself", () => {
      const z = new Complex(2,3)
      const clone = z.clone()

      expect(clone).not.toBe(z)
      expect(clone.a).toBe(2)
      expect(clone.b).toBe(3)
    })

    it("creates zero", () => {
      const z = Complex.zero()

      expect(z.a).toBe(0)
      expect(z.b).toBe(0)
    })
  })

  describe("string representation", () => {
    it("formats positive imaginary values", () => {
      expect(new Complex(2,3).toString()).toBe("2+3*i")
    })

    it("formats negative imaginary values", () => {
      expect(new Complex(2,-3).toString()).toBe("2-3*i")
    })

    it("formats pure imaginary values", () => {
      expect(new Complex(0,3).toString()).toBe("3*i")
      expect(new Complex(0,-3).toString()).toBe("-3*i")
    })

    it("formats zero", () => {
      expect(new Complex(0,0).toString()).toBe("0*i")
    })
  })

  describe("polar representation", () => {
    it("returns magnitude", () => {
      expect(new Complex(3,4).z).toBe(5)
    })

    it("returns phase", () => {
      expect(new Complex(0,1).phi).toBeCloseTo(Math.PI/2)
      expect(new Complex(-1,0).phi).toBeCloseTo(Math.PI)
    })

    it("returns exponential representation", () => {
      const z = new Complex(3,4)

      expect(z.expo[0]).toBe(5)
      expect(z.expo[1]).toBeCloseTo(Math.atan2(4,3))
    })

    it("creates a complex number from polar coordinates", () => {
      const z = Complex.fromPolar(2,Math.PI/2)

      expect(z.a).toBeCloseTo(0)
      expect(z.b).toBeCloseTo(2)
    })
  })

  describe("conjugate", () => {
    it("returns the conjugate", () => {
      const z = new Complex(2,3)
      const c = z.conj

      expect(c.a).toBe(2)
      expect(c.b).toBe(-3)
      expect(c).not.toBe(z)
    })
  })

  describe("arithmetic", () => {
    it("adds complex numbers", () => {
      const z = new Complex(2,3)

      z.add(new Complex(4,5))

      expect(z.a).toBe(6)
      expect(z.b).toBe(8)
    })

    it("adds multiple values", () => {
      const z = new Complex(1,2)

      z.add(new Complex(2,3),new Complex(4,5))

      expect(z.a).toBe(7)
      expect(z.b).toBe(10)
    })

    it("adds numbers", () => {
      const z = new Complex(2,3)

      z.add(5)

      expect(z.a).toBe(7)
      expect(z.b).toBe(3)
    })

    it("subtracts complex numbers", () => {
      const z = new Complex(5,7)

      z.sub(new Complex(2,3))

      expect(z.a).toBe(3)
      expect(z.b).toBe(4)
    })

    it("subtracts numbers", () => {
      const z = new Complex(5,7)

      z.sub(2)

      expect(z.a).toBe(3)
      expect(z.b).toBe(7)
    })

    it("multiplies complex numbers", () => {
      const z = new Complex(2,3)

      z.mul(new Complex(4,5))

      expect(z.a).toBeCloseTo(-7)
      expect(z.b).toBeCloseTo(22)
    })

    it("multiplies by a number", () => {
      const z = new Complex(2,3)

      z.mul(2)

      expect(z.a).toBeCloseTo(4)
      expect(z.b).toBeCloseTo(6)
    })

    it("divides complex numbers", () => {
      const z = new Complex(2,3)

      z.div(new Complex(4,5))

      expect(z.a).toBeCloseTo(23/41)
      expect(z.b).toBeCloseTo(2/41)
    })

    it("divides by a number", () => {
      const z = new Complex(4,6)

      z.div(2)

      expect(z.a).toBeCloseTo(2)
      expect(z.b).toBeCloseTo(3)
    })

    it("calculates modulo", () => {
      const z = new Complex(7,8)

      z.modulo(new Complex(3,5))

      expect(z.a).toBe(1)
      expect(z.b).toBe(3)
    })
  })

  describe("powers and roots", () => {
    it("calculates a power", () => {
      const z = new Complex(2,0)

      z.pow(2)

      expect(z.a).toBeCloseTo(4)
      expect(z.b).toBeCloseTo(0)
    })

    it("calculates nth root", () => {
      const z = new Complex(4,0)
      const root = z.nthr(2)

      expect(root.a).toBeCloseTo(2)
      expect(root.b).toBeCloseTo(0)
    })

    it("calculates square root", () => {
      const z = new Complex(9,0)
      const root = z.sqrt

      expect(root.a).toBeCloseTo(3)
      expect(root.b).toBeCloseTo(0)
    })

    it("calculates cube root", () => {
      const z = new Complex(8,0)
      const root = z.cbrt

      expect(root.a).toBeCloseTo(2)
      expect(root.b).toBeCloseTo(0)
    })
  })

  describe("trigonometric functions", () => {
    it("calculates complex cosine", () => {
      const z = new Complex(0,0)
      const result = z.cos

      expect(result.a).toBeCloseTo(1)
      expect(result.b).toBeCloseTo(0)
    })

    it("calculates complex sine", () => {
      const z = new Complex(0,0)
      const result = z.sin

      expect(result.a).toBeCloseTo(0)
      expect(result.b).toBeCloseTo(0)
    })

    it("calculates complex tangent", () => {
      const z = new Complex(0,0)
      const result = z.tan

      expect(result.a).toBeCloseTo(0)
      expect(result.b).toBeCloseTo(0)
    })
  })

  describe("formatting", () => {
    it("rounds with toFixed", () => {
      const z = new Complex(1.23456,2.34567)

      const result = z.toFixed(2)

      expect(result).toBe(z)
      expect(result.a).toBe(1.23)
      expect(result.b).toBe(2.35)
    })

    it("rounds with toPrecision", () => {
      const z = new Complex(1.23456,2.34567)

      const result = z.toPrecision(3)

      expect(result).toBe(z)
      expect(result.a).toBe(1.23)
      expect(result.b).toBe(2.35)
    })
  })

  describe("serialization", () => {
    it("serializes", () => {
      const z = new Complex(2,3)
      const json = z.serialize()

      expect(JSON.parse(json)).toEqual({
        type:"complex",
        data:{a:2,b:3}
      })
    })

    it("deserializes", () => {
      const z = Complex.deserialize({
        type:"complex",
        data:{a:2,b:3}
      })

      expect(z).toBeInstanceOf(Complex)
      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })

    it("deserializes a JSON string", () => {
      const z = Complex.deserialize(
        '{"type":"complex","data":{"a":2,"b":3}}'
      )

      expect(z).toBeInstanceOf(Complex)
      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })
  })

  describe("twiddle", () => {
    it("creates a twiddle factor",()=>{
    const z=Complex.twiddle(1,4)

    expect(z.a).toBeCloseTo(0)
    expect(z.b).toBeCloseTo(-1)
    })

    it("creates the identity twiddle factor", () => {
      const z = Complex.twiddle(0,8)

      expect(z.a).toBeCloseTo(1)
      expect(z.b).toBeCloseTo(0)
    })
  })

  describe("complex helper", () => {
    it("creates a Complex instance", () => {
      const z = complex(2,3)

      expect(z).toBeInstanceOf(Complex)
      expect(z.a).toBe(2)
      expect(z.b).toBe(3)
    })

    it("creates complex numbers from arrays", () => {
      const result = complex([1,2,3],[4,5,6])

      expect(result).toHaveLength(3)
      expect(result[0]).toBeInstanceOf(Complex)
      expect(result[1].a).toBe(2)
      expect(result[1].b).toBe(5)
      expect(result[2].a).toBe(3)
      expect(result[2].b).toBe(6)
    })

    it("accepts typed arrays", () => {
      const result = complex(
        new Float64Array([1,2]),
        new Float64Array([3,4])
      )

      expect(result).toHaveLength(2)
      expect(result[0].a).toBe(1)
      expect(result[0].b).toBe(3)
      expect(result[1].a).toBe(2)
      expect(result[1].b).toBe(4)
    })
  })

  describe("random", () => {
    it("exposes integer random generation", () => {
      const z = Complex.random.int(1,10)

      expect(z).toBeInstanceOf(Complex)
      expect(Number.isInteger(z.a)).toBe(true)
      expect(Number.isInteger(z.b)).toBe(true)
    })

    it("exposes float random generation", () => {
      const z = Complex.random.float(0,1)

      expect(z).toBeInstanceOf(Complex)
      expect(typeof z.a).toBe("number")
      expect(typeof z.b).toBe("number")
    })
  })
})