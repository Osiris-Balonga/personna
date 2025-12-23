import { describe, it, expect } from 'vitest';
import { SeededRandom } from '../src/random';

describe('SeededRandom', () => {
  it('should produce deterministic results with same seed', () => {
    const random1 = new SeededRandom('test-seed');
    const random2 = new SeededRandom('test-seed');

    expect(random1.next()).toBe(random2.next());
    expect(random1.next()).toBe(random2.next());
    expect(random1.next()).toBe(random2.next());
  });

  it('should produce different results with different seeds', () => {
    const random1 = new SeededRandom('seed-a');
    const random2 = new SeededRandom('seed-b');

    expect(random1.next()).not.toBe(random2.next());
  });

  it('should generate integers in range', () => {
    const random = new SeededRandom(42);

    for (let i = 0; i < 100; i++) {
      const value = random.int(5, 10);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  it('should pick from array deterministically', () => {
    const items = ['a', 'b', 'c', 'd'];
    const random1 = new SeededRandom('pick-test');
    const random2 = new SeededRandom('pick-test');

    expect(random1.pick(items)).toBe(random2.pick(items));
  });

  it('should generate valid UUIDs', () => {
    const random = new SeededRandom('uuid-test');
    const uuid = random.uuid();

    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it('should respect weighted picks', () => {
    const random = new SeededRandom('weighted');
    const options = [
      { value: 'rare', weight: 1 },
      { value: 'common', weight: 99 },
    ];

    const results = { rare: 0, common: 0 };
    for (let i = 0; i < 1000; i++) {
      const pick = random.weightedPick(options);
      results[pick]++;
    }

    // Common should be picked much more often
    expect(results.common).toBeGreaterThan(results.rare * 5);
  });
});
