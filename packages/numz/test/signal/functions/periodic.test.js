import { describe, expect, it } from "vitest";
import {
  square,
  tri_wave,
  sawtooth_wave,
  pulse_train,
  pwm,
  sinusoid,
} from "numz/signal";

describe("signal waveforms", () => {
  describe("square", () => {
    it("generates a square wave", () => {
      expect(square(0)).toBe(1);
      expect(square(0.25)).toBe(1);
      expect(square(0.5)).toBe(-1);
      expect(square(0.75)).toBe(-1);
    });

    it("supports custom amplitude and period", () => {
      expect(square(0, 2, 5)).toBe(5);
      expect(square(1, 2, 5)).toBe(-5);
    });

    it("supports custom duty cycle", () => {
      expect(square(0, 1, 1, 0.25)).toBe(1);
      expect(square(0.24, 1, 1, 0.25)).toBe(1);
      expect(square(0.25, 1, 1, 0.25)).toBe(-1);
    });

    it("supports phase offset", () => {
      expect(square(1, 1, 1, 0.5, 1)).toBe(1);
      expect(square(1.5, 1, 1, 0.5, 1)).toBe(-1);
    });

    it("is periodic", () => {
      expect(square(0.2)).toBe(square(1.2));
      expect(square(0.8)).toBe(square(2.8));
    });

    it("handles negative time", () => {
      expect(square(-0.25)).toBe(-1);
      expect(square(-0.75)).toBe(1);
    });

    it("accepts arrays", () => {
      expect(square([0, 0.25, 0.5, 0.75])).toEqual([
        1, 1, -1, -1,
      ]);
    });
  });

  describe("tri_wave", () => {
    it("generates a triangle wave", () => {
      expect(tri_wave(0)).toBe(-1);
      expect(tri_wave(0.25)).toBe(0);
      expect(tri_wave(0.5)).toBe(1);
      expect(tri_wave(0.75)).toBe(0);
    });

    it("reaches the configured amplitude", () => {
      expect(tri_wave(0.5, 1, 5)).toBe(5);
      expect(tri_wave(0, 1, 5)).toBe(-5);
    });

    it("supports custom period", () => {
        expect(tri_wave(0.5, 2)).toBe(0);
        expect(tri_wave(1, 2)).toBe(1);
    });

    it("supports custom duty cycle", () => {
      expect(tri_wave(0, 1, 1, 0.25)).toBe(-1);
      expect(tri_wave(0.125, 1, 1, 0.25)).toBe(0);
      expect(tri_wave(0.25, 1, 1, 0.25)).toBe(1);
    });

    it("is periodic", () => {
      expect(tri_wave(0.2)).toBeCloseTo(tri_wave(1.2));
      expect(tri_wave(0.8)).toBeCloseTo(tri_wave(2.8));
    });

    it("accepts arrays", () => {
      expect(tri_wave([0, 0.25, 0.5, 0.75])).toEqual([
        -1, 0, 1, 0,
      ]);
    });
  });

    describe("sawtooth_wave", () => {
    it("generates a rising sawtooth wave", () => {
        expect(sawtooth_wave(0)).toBe(-1);
        expect(sawtooth_wave(0.25)).toBe(-0.5);
        expect(sawtooth_wave(0.5)).toBe(0);
        expect(sawtooth_wave(0.75)).toBe(0.5);
    });

    it("reaches the upper endpoint", () => {
        expect(sawtooth_wave(0.999999)).toBeCloseTo(1);
    });

    it("resets at the period boundary", () => {
        expect(sawtooth_wave(1)).toBe(-1);
        expect(sawtooth_wave(2)).toBe(-1);
    });

    it("supports custom amplitude and period", () => {
        expect(sawtooth_wave(0, 2, 4)).toBe(-4);
        expect(sawtooth_wave(1, 2, 4)).toBe(0);
    });

    it("is periodic", () => {
        expect(sawtooth_wave(0.25)).toBeCloseTo(
        sawtooth_wave(1.25),
        );
    });

    it("accepts arrays", () => {
        expect(
        sawtooth_wave([0, 0.25, 0.5, 0.75]),
        ).toEqual([
        -1,
        -0.5,
        0,
        0.5,
        ]);
    });
    });

  describe("pulse_train", () => {
    it("generates a pulse train", () => {
      expect(pulse_train(0)).toBe(1);
      expect(pulse_train(0.25)).toBe(1);
      expect(pulse_train(0.5)).toBe(0);
      expect(pulse_train(0.75)).toBe(0);
    });

    it("supports custom width", () => {
      expect(pulse_train(0.2, 1, 0.25)).toBe(1);
      expect(pulse_train(0.25, 1, 0.25)).toBe(0);
    });

    it("supports custom amplitude", () => {
      expect(pulse_train(0, 1, 0.5, 5)).toBe(5);
      expect(pulse_train(0.5, 1, 0.5, 5)).toBe(0);
    });

    it("supports custom period", () => {
      expect(pulse_train(0, 2, 0.5)).toBe(1);
      expect(pulse_train(0.5, 2, 0.5)).toBe(0);
    });

    it("is periodic", () => {
      expect(pulse_train(0.2)).toBe(pulse_train(1.2));
    });

    it("supports phase offset", () => {
      expect(pulse_train(1, 1, 0.5, 1, 1)).toBe(1);
      expect(pulse_train(1.5, 1, 0.5, 1, 1)).toBe(0);
    });

    it("accepts arrays", () => {
      expect(pulse_train([0, 0.25, 0.5, 0.75])).toEqual([
        1, 1, 0, 0,
      ]);
    });
  });

  describe("pwm", () => {
    it("generates a PWM signal", () => {
      expect(pwm(0)).toBe(1);
      expect(pwm(0.25)).toBe(1);
      expect(pwm(0.5)).toBe(-1);
      expect(pwm(0.75)).toBe(-1);
    });

    it("supports custom duty cycle", () => {
      expect(pwm(0.2, 1, 0.25)).toBe(1);
      expect(pwm(0.25, 1, 0.25)).toBe(-1);
    });

    it("supports custom amplitude", () => {
      expect(pwm(0, 1, 0.5, 5)).toBe(5);
      expect(pwm(0.5, 1, 0.5, 5)).toBe(-5);
    });

    it("is periodic", () => {
      expect(pwm(0.2)).toBe(pwm(1.2));
    });

    it("supports phase offset", () => {
      expect(pwm(1, 1, 0.5, 1, 1)).toBe(1);
      expect(pwm(1.5, 1, 0.5, 1, 1)).toBe(-1);
    });

    it("accepts arrays", () => {
      expect(pwm([0, 0.25, 0.5, 0.75])).toEqual([
        1, 1, -1, -1,
      ]);
    });
  });

  describe("sinusoid", () => {
    it("generates a sine wave", () => {
      expect(sinusoid(0)).toBeCloseTo(0);
      expect(sinusoid(0.25)).toBeCloseTo(1);
      expect(sinusoid(0.5)).toBeCloseTo(0);
      expect(sinusoid(0.75)).toBeCloseTo(-1);
    });

    it("supports custom frequency", () => {
      expect(sinusoid(0.25, 2)).toBeCloseTo(0);
      expect(sinusoid(0.125, 2)).toBeCloseTo(1);
    });

    it("supports custom amplitude", () => {
      expect(sinusoid(0.25, 1, 5)).toBeCloseTo(5);
      expect(sinusoid(0.75, 1, 5)).toBeCloseTo(-5);
    });

    it("supports phase", () => {
      expect(sinusoid(0, 1, 1, Math.PI / 2)).toBeCloseTo(1);
      expect(sinusoid(0, 1, 1, Math.PI)).toBeCloseTo(0);
    });

    it("is periodic", () => {
      expect(sinusoid(0.2)).toBeCloseTo(sinusoid(1.2));
    });

    it("accepts arrays", () => {
    expect(sinusoid([0, 0.25, 0.5, 0.75])).toEqual([
        0,
        1,
        expect.closeTo(0),
        -1,
    ]);
    });
  });
});