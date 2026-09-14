import { describe, expect, it } from "vitest";

import {
  hanning_window,
  hamming_window,
  kaiser_window,
  blackman_window,
  bartlett_window,
  blackman_harris_window,
  nuttall_window,
  flat_top_window,
  tukey_window,
  gaussian_window,
  lanczos_window,
  poisson_window,
  rect_window,
  tri_window,
} from "numz/signal";

describe("window functions", () => {
  describe("hanning_window", () => {
    it("generates a Hanning window", () => {
    const w = hanning_window(5);

    expect(w).toHaveLength(5);
    expect(w[0]).toBeCloseTo(0);
    expect(w[1]).toBeCloseTo(0.5);
    expect(w[2]).toBeCloseTo(1);
    expect(w[3]).toBeCloseTo(0.5);
    expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = hanning_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });

    it("supports custom array type", () => {
      const w = hanning_window(5, Array);

      expect(w).toBeInstanceOf(Array);
      expect(w).toHaveLength(5);
    });
  });

  describe("hamming_window", () => {
    it("generates a Hamming window", () => {
      const w = hamming_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(0.08);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0.08);
    });

    it("is symmetric", () => {
      const w = hamming_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("kaiser_window", () => {
    it("generates a Kaiser window", () => {
      const w = kaiser_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(w[4]);
      expect(w[1]).toBeCloseTo(w[3]);
      expect(w[2]).toBeCloseTo(1);
    });

    it("is symmetric", () => {
      const w = kaiser_window(10);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });

    it("supports custom beta", () => {
      const w = kaiser_window(5, 10);

      expect(w[2]).toBeCloseTo(1);
      expect(w[0]).toBeLessThan(w[0] + 1);
    });
  });

  describe("blackman_window", () => {
    it("generates a Blackman window", () => {
      const w = blackman_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(0);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = blackman_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("bartlett_window", () => {
    it("generates a Bartlett window", () => {
      const w = bartlett_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(0);
      expect(w[1]).toBeCloseTo(0.5);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = bartlett_window(9);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("blackman_harris_window", () => {
    it("generates a Blackman-Harris window", () => {
    const w = blackman_harris_window(5);

    expect(w).toHaveLength(5);
    expect(w[2]).toBeCloseTo(1);
    });

    it("is symmetric", () => {
      const w = blackman_harris_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("nuttall_window", () => {
    it("generates a Nuttall window", () => {
      const w = nuttall_window(5);

      expect(w).toHaveLength(5);
      expect(w[2]).toBeCloseTo(1);
    });

    it("is symmetric", () => {
      const w = nuttall_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("flat_top_window", () => {
    it("generates a flat-top window", () => {
      const w = flat_top_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(
        1 - 1.93 + 1.29 - 0.388 + 0.028,
      );
    });

    it("is symmetric", () => {
      const w = flat_top_window(8);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("tukey_window", () => {
    it("generates a Tukey window", () => {
      const w = tukey_window(5, 0.5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(0);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = tukey_window(9);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });

    it("supports alpha = 0", () => {
      const w = tukey_window(5, 0);

      expect([...w]).toEqual([1, 1, 1, 1, 1]);
    });

    it("supports alpha = 1", () => {
      const w = tukey_window(5, 1);

      expect(w[0]).toBeCloseTo(0);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0);
    });
  });

  describe("gaussian_window", () => {
    it("generates a Gaussian window", () => {
      const w = gaussian_window(5);

      expect(w).toHaveLength(5);
      expect(w[2]).toBeCloseTo(1);
      expect(w[0]).toBeCloseTo(w[4]);
    });

    it("is symmetric", () => {
      const w = gaussian_window(10);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });

    it("supports custom sigma", () => {
      const w = gaussian_window(5, 0.2);

      expect(w[2]).toBeCloseTo(1);
      expect(w[0]).toBeLessThan(
        gaussian_window(5, 0.4)[0],
      );
    });
  });

  describe("lanczos_window", () => {
    it("generates a Lanczos window", () => {
      const w = lanczos_window(5);

      expect(w).toHaveLength(5);
      expect(w[2]).toBeCloseTo(1);
      expect(w[0]).toBeCloseTo(0);
      expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = lanczos_window(10);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });

  describe("poisson_window", () => {
    it("generates a Poisson window", () => {
      const w = poisson_window(5);

      expect(w).toHaveLength(5);
      expect(w[2]).toBeCloseTo(1);
    });

    it("is symmetric", () => {
      const w = poisson_window(10);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });

    it("supports custom alpha", () => {
      const w = poisson_window(5, 10);

      expect(w[2]).toBeCloseTo(1);
      expect(w[0]).toBeLessThan(poisson_window(5, 3)[0]);
    });
  });

  describe("rect_window", () => {
    it("generates a rectangular window", () => {
      const w = rect_window(5);

      expect([...w]).toEqual([1, 1, 1, 1, 1]);
    });

    it("supports custom array type", () => {
      const w = rect_window(4, Array);

      expect(w).toBeInstanceOf(Array);
      expect(w).toEqual([1, 1, 1, 1]);
    });
  });

  describe("tri_window", () => {
    it("generates a triangular window", () => {
      const w = tri_window(5);

      expect(w).toHaveLength(5);
      expect(w[0]).toBeCloseTo(0);
      expect(w[1]).toBeCloseTo(0.5);
      expect(w[2]).toBeCloseTo(1);
      expect(w[4]).toBeCloseTo(0);
    });

    it("is symmetric", () => {
      const w = tri_window(10);

      for (let i = 0; i < w.length; i++) {
        expect(w[i]).toBeCloseTo(w[w.length - 1 - i]);
      }
    });
  });
});