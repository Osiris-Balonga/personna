import { describe, it, expect } from 'vitest';
import { DistributionResolver } from '../src/distribution';
import { SeededRandom } from '../src/random';

describe('DistributionResolver', () => {
  it('should return default for undefined option', () => {
    const random = new SeededRandom('test');
    const resolver = new DistributionResolver(random);

    expect(resolver.resolve(undefined, 'default')).toBe('default');
  });

  it('should return single value as-is', () => {
    const random = new SeededRandom('test');
    const resolver = new DistributionResolver(random);

    expect(resolver.resolve('single', 'default')).toBe('single');
    expect(resolver.resolve(42, 0)).toBe(42);
  });

  it('should return default for empty array', () => {
    const random = new SeededRandom('test');
    const resolver = new DistributionResolver(random);

    expect(resolver.resolve([], 'default')).toBe('default');
  });

  it('should pick from simple array with uniform distribution', () => {
    const random = new SeededRandom('uniform');
    const resolver = new DistributionResolver(random);
    const options = ['a', 'b', 'c'];

    const results: Record<string, number> = { a: 0, b: 0, c: 0 };
    for (let i = 0; i < 300; i++) {
      const pick = resolver.resolve(options, 'default');
      results[pick]++;
    }

    // Each should be picked roughly 100 times (uniform)
    expect(results.a).toBeGreaterThan(50);
    expect(results.b).toBeGreaterThan(50);
    expect(results.c).toBeGreaterThan(50);
  });

  it('should respect weights in weighted array', () => {
    const random = new SeededRandom('weighted');
    const resolver = new DistributionResolver(random);
    const options = [
      { value: 'rare', weight: 10 },
      { value: 'common', weight: 90 },
    ];

    const results = { rare: 0, common: 0 };
    for (let i = 0; i < 1000; i++) {
      const pick = resolver.resolve(options, 'default');
      results[pick]++;
    }

    // Common should be ~9x more frequent
    expect(results.common).toBeGreaterThan(results.rare * 5);
  });

  it('should be deterministic with same seed', () => {
    const options = ['a', 'b', 'c', 'd', 'e'];

    const random1 = new SeededRandom('deterministic');
    const resolver1 = new DistributionResolver(random1);

    const random2 = new SeededRandom('deterministic');
    const resolver2 = new DistributionResolver(random2);

    for (let i = 0; i < 10; i++) {
      expect(resolver1.resolve(options, 'x')).toBe(resolver2.resolve(options, 'x'));
    }
  });

  it('should handle resolveAll for multiple options', () => {
    const random = new SeededRandom('multi');
    const resolver = new DistributionResolver(random);

    const result = resolver.resolveAll(
      {
        name: 'John',
        age: [20, 30, 40],
      },
      { name: 'Default', age: 0, city: 'Unknown' }
    );

    expect(result.name).toBe('John');
    expect([20, 30, 40]).toContain(result.age);
    expect(result.city).toBe('Unknown');
  });
});
