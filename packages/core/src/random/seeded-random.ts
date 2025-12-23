export class SeededRandom {
  private state: number;

  constructor(seed: string | number) {
    this.state = this.hashSeed(seed);
  }

  /**
   * Convert any seed to a numeric state
   */
  private hashSeed(seed: string | number): number {
    if (typeof seed === 'number') {
      return seed >>> 0;
    }

    // Simple string hash (djb2)
    let hash = 5381;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 33) ^ seed.charCodeAt(i);
    }
    return hash >>> 0;
  }

  /**
   * Generate next random number between 0 and 1 (exclusive)
   * Using Mulberry32 algorithm
   */
  next(): number {
    this.state += 0x6d2b79f5;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Generate random integer between min (inclusive) and max (inclusive)
   */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float between min and max
   */
  float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Pick a random element from an array
   */
  pick<T>(array: readonly T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick from empty array');
    }
    return array[this.int(0, array.length - 1)];
  }

  /**
   * Pick a random element using weights
   */
  weightedPick<T>(options: Array<{ value: T; weight: number }>): T {
    if (options.length === 0) {
      throw new Error('Cannot pick from empty options');
    }

    const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
    let random = this.float(0, totalWeight);

    for (const option of options) {
      random -= option.weight;
      if (random <= 0) {
        return option.value;
      }
    }

    return options[options.length - 1].value;
  }

  /**
   * Shuffle an array (returns new array)
   */
  shuffle<T>(array: readonly T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Generate a UUID v4
   */
  uuid(): string {
    const hex = '0123456789abcdef';
    let uuid = '';

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        uuid += '4'; // Version 4
      } else if (i === 19) {
        uuid += hex[(this.int(0, 15) & 0x3) | 0x8]; // Variant
      } else {
        uuid += hex[this.int(0, 15)];
      }
    }

    return uuid;
  }

  /**
   * Generate random boolean with optional probability
   */
  boolean(probabilityTrue = 0.5): boolean {
    return this.next() < probabilityTrue;
  }
}
