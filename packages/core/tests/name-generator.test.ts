import { describe, it, expect, beforeEach } from 'vitest';
import { generateName, NameRegistry, FALLBACK_FIRST_NAMES } from '../src/names';
import { SeededRandom } from '../src/random';

describe('Name Generator', () => {
  beforeEach(() => {
    NameRegistry.clear();
  });

  it('should generate name with fallback names', () => {
    const random = new SeededRandom('test');
    const name = generateName('XX', 'male', random);

    expect(name.first).toBeTruthy();
    expect(name.last).toBeTruthy();
    expect(name.full).toBe(`${name.first} ${name.last}`);
    expect(FALLBACK_FIRST_NAMES.male).toContain(name.first);
  });

  it('should generate deterministic names with same seed', () => {
    const random1 = new SeededRandom('deterministic');
    const random2 = new SeededRandom('deterministic');

    const name1 = generateName('US', 'female', random1);
    const name2 = generateName('US', 'female', random2);

    expect(name1.first).toBe(name2.first);
    expect(name1.last).toBe(name2.last);
  });

  it('should use registered provider when available', () => {
    const mockProvider = {
      getFirstNames: (nat: string, gender: string) =>
        gender === 'male' ? ['Mamadou'] : ['Fatou'],
      getLastNames: () => ['Diallo'],
      getSupportedNationalities: () => ['SN'],
    };

    NameRegistry.register(mockProvider);

    const random = new SeededRandom('sn-test');
    const name = generateName('SN', 'male', random);

    expect(name.first).toBe('Mamadou');
    expect(name.last).toBe('Diallo');
  });

  it('should fallback if provider returns empty array', () => {
    const emptyProvider = {
      getFirstNames: () => [],
      getLastNames: () => [],
      getSupportedNationalities: () => ['ZZ'],
    };

    NameRegistry.register(emptyProvider);

    const random = new SeededRandom('empty-test');
    const name = generateName('ZZ', 'male', random);

    expect(FALLBACK_FIRST_NAMES.male).toContain(name.first);
  });
});
