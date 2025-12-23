import { describe, it, expect } from 'vitest';
import {
  generateAge,
  computeBirthDate,
  computeBirthDateWithVariation,
} from '../src/generators';
import { SeededRandom } from '../src/random';
import type { AgeGroup } from '../src/types';

describe('Age Generator', () => {
  it('should generate age within child range (5-12)', () => {
    const random = new SeededRandom('child');
    for (let i = 0; i < 50; i++) {
      const age = generateAge('child', random);
      expect(age).toBeGreaterThanOrEqual(5);
      expect(age).toBeLessThanOrEqual(12);
    }
  });

  it('should generate age within teen range (13-17)', () => {
    const random = new SeededRandom('teen');
    for (let i = 0; i < 50; i++) {
      const age = generateAge('teen', random);
      expect(age).toBeGreaterThanOrEqual(13);
      expect(age).toBeLessThanOrEqual(17);
    }
  });

  it('should generate age within young_adult range (18-25)', () => {
    const random = new SeededRandom('young_adult');
    for (let i = 0; i < 50; i++) {
      const age = generateAge('young_adult', random);
      expect(age).toBeGreaterThanOrEqual(18);
      expect(age).toBeLessThanOrEqual(25);
    }
  });

  it('should generate age within adult range (26-59)', () => {
    const random = new SeededRandom('adult');
    for (let i = 0; i < 50; i++) {
      const age = generateAge('adult', random);
      expect(age).toBeGreaterThanOrEqual(26);
      expect(age).toBeLessThanOrEqual(59);
    }
  });

  it('should generate age within senior range (60-85)', () => {
    const random = new SeededRandom('senior');
    for (let i = 0; i < 50; i++) {
      const age = generateAge('senior', random);
      expect(age).toBeGreaterThanOrEqual(60);
      expect(age).toBeLessThanOrEqual(85);
    }
  });

  it('should be deterministic with same seed', () => {
    const ageGroups: AgeGroup[] = [
      'child',
      'teen',
      'young_adult',
      'adult',
      'senior',
    ];

    for (const ageGroup of ageGroups) {
      const random1 = new SeededRandom(`age-${ageGroup}`);
      const random2 = new SeededRandom(`age-${ageGroup}`);
      expect(generateAge(ageGroup, random1)).toBe(generateAge(ageGroup, random2));
    }
  });
});

describe('Birth Date', () => {
  it('should compute birth date from age', () => {
    const referenceDate = new Date(2025, 0, 1); // Jan 1, 2025
    const birthDate = computeBirthDate(30, referenceDate);

    expect(birthDate.getFullYear()).toBe(1995);
  });

  it('should compute birth date with variation', () => {
    const random = new SeededRandom('birthdate');
    const referenceDate = new Date(2025, 5, 15);
    const birthDate = computeBirthDateWithVariation(25, random, referenceDate);

    expect(birthDate.getFullYear()).toBe(2000);
    expect(birthDate.getMonth()).toBeGreaterThanOrEqual(0);
    expect(birthDate.getMonth()).toBeLessThanOrEqual(11);
  });

  it('should generate birth dates with all valid days including 29-31', () => {
    const days = new Set<number>();

    // Generate enough dates to cover all days
    for (let i = 0; i < 1000; i++) {
      const random = new SeededRandom(`birthday-${i}`);
      const birthDate = computeBirthDateWithVariation(25, random);
      days.add(birthDate.getDate());
    }

    // Verify we generate days > 28
    expect(days.has(29)).toBe(true);
    expect(days.has(30)).toBe(true);
    expect(days.has(31)).toBe(true);
  });
});
