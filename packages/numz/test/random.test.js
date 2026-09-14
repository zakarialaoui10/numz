import { describe, it, expect, vi } from "vitest";
import { Random } from "numz/random";

describe("Random", () => {
    describe("int", () => {
        it("generates an integer from 0 to n - 1", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.int(10);

                expect(Number.isInteger(value)).toBe(true);
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(10);
            }
        });

        it("generates an integer between a and b - 1", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.int(5, 10);

                expect(Number.isInteger(value)).toBe(true);
                expect(value).toBeGreaterThanOrEqual(5);
                expect(value).toBeLessThan(10);
            }
        });
    });

    describe("float", () => {
        it("generates a float from 0 to a", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.float(10);

                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(10);
            }
        });

        it("generates a float between a and b", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.float(5, 10);

                expect(value).toBeGreaterThanOrEqual(5);
                expect(value).toBeLessThan(10);
            }
        });
    });

    describe("bin", () => {
        it("generates either 0 or 1", () => {
            for (let i = 0; i < 100; i++) {
                expect([0, 1]).toContain(Random.bin());
            }
        });
    });

    describe("oct", () => {
        it("generates an octal digit", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.oct();

                expect(Number.isInteger(value)).toBe(true);
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(8);
            }
        });
    });

    describe("dec", () => {
        it("generates a decimal digit", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.dec();

                expect(Number.isInteger(value)).toBe(true);
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(10);
            }
        });
    });

    describe("hex", () => {
        it("generates a hexadecimal digit", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.hex();

                expect(typeof value).toBe("string");
                expect(value).toMatch(/^[0-9a-fA-F]+$/);
            }
        });
    });

    describe("char", () => {
        it("generates lowercase letters by default", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.char();

                expect(value).toMatch(/^[a-z]$/);
            }
        });

        it("generates uppercase letters when requested", () => {
            for (let i = 0; i < 100; i++) {
                const value = Random.char(true);

                expect(value).toMatch(/^[A-Z]$/);
            }
        });
    });

    describe("bool", () => {
        it("generates a boolean", () => {
            for (let i = 0; i < 100; i++) {
                expect(typeof Random.bool()).toBe("boolean");
            }
        });
    });

    describe("sample", () => {
        it("samples integers", () => {
            const result = Random.sample.int(20, 1, 5);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(Number.isInteger(value)).toBe(true);
                expect(value).toBeGreaterThanOrEqual(1);
                expect(value).toBeLessThan(5);
            });
        });

        it("samples floats", () => {
            const result = Random.sample.float(20, 1, 5);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(1);
                expect(value).toBeLessThan(5);
            });
        });

        it("samples characters", () => {
            const result = Random.sample.char(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toMatch(/^[a-z]$/);
            });
        });

        it("samples uppercase characters", () => {
            const result = Random.sample.char(20, true);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toMatch(/^[A-Z]$/);
            });
        });

        it("samples booleans", () => {
            const result = Random.sample.bool(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(typeof value).toBe("boolean");
            });
        });

        it("samples binary digits", () => {
            const result = Random.sample.bin(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect([0, 1]).toContain(value);
            });
        });

        it("samples octal digits", () => {
            const result = Random.sample.oct(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(8);
            });
        });

        it("samples decimal digits", () => {
            const result = Random.sample.dec(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThan(10);
            });
        });

        it("samples hexadecimal digits", () => {
            const result = Random.sample.hex(20);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(value).toMatch(/^[0-9a-fA-F]+$/);
            });
        });

        it("samples choices", () => {
            const choices = ["a", "b", "c"];
            const result = Random.sample.choice(20, choices);

            expect(result).toHaveLength(20);
            result.forEach(value => {
                expect(choices).toContain(value);
            });
        });
    });

    describe("shuffle", () => {
        it("returns a new array", () => {
            const input = [1, 2, 3, 4, 5];
            const result = Random.shuffle(input);

            expect(result).not.toBe(input);
        });

        it("preserves all elements", () => {
            const input = [1, 2, 3, 4, 5];
            const result = Random.shuffle(input);

            expect(result).toHaveLength(input.length);
            expect(result).toEqual(expect.arrayContaining(input));
            expect(input).toEqual(expect.arrayContaining(result));
        });

        it("does not mutate the original array", () => {
            const input = [1, 2, 3, 4, 5];
            const original = [...input];

            Random.shuffle(input);

            expect(input).toEqual(original);
        });
    });

    describe("choice", () => {
        it("returns one of the choices", () => {
            const choices = ["a", "b", "c"];

            for (let i = 0; i < 100; i++) {
                expect(choices).toContain(Random.choice(choices));
            }
        });

        it("uses the first choice by default", () => {
            const result = Random.choice();

            expect([1, 2, 3]).toContain(result);
        });

        it("supports weighted choices", () => {
            const choices = ["rare", "common"];
            const probabilities = [0, 1];

            for (let i = 0; i < 20; i++) {
                expect(Random.choice(choices, probabilities)).toBe("common");
            }
        });

        it("can select a choice with probability 1", () => {
            const choices = ["a", "b", "c"];
            const probabilities = [0, 0, 1];

            for (let i = 0; i < 20; i++) {
                expect(Random.choice(choices, probabilities)).toBe("c");
            }
        });
    });

    describe("randomness", () => {
        it("uses Math.random for float generation", () => {
            vi.spyOn(Math, "random").mockReturnValue(0.5);

            expect(Random.float(10)).toBe(5);

            vi.restoreAllMocks();
        });

        it("uses Math.random for integer generation", () => {
            vi.spyOn(Math, "random").mockReturnValue(0.5);

            expect(Random.int(10)).toBe(5);

            vi.restoreAllMocks();
        });
    });
});