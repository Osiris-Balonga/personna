import { describe, it, expect } from 'vitest';
import { UserGenerator } from '../src/generators';
import { SeededRandom } from '../src/random';
import '../src/locales'; // Register locales

describe('UserGenerator', () => {
  it('should generate a complete user', () => {
    const random = new SeededRandom('complete-user');
    const generator = new UserGenerator(random);
    const user = generator.generate();

    expect(user.id).toBeTruthy();
    expect(user.name.first).toBeTruthy();
    expect(user.name.last).toBeTruthy();
    expect(user.name.full).toBe(`${user.name.first} ${user.name.last}`);
    expect(['male', 'female']).toContain(user.gender);
    expect(user.age).toBeGreaterThan(0);
    expect(user.ageGroup).toBeTruthy();
    expect(user.birthDate).toBeInstanceOf(Date);
    expect(user.nationality).toBeTruthy();
    expect(user.ethnicity).toBeTruthy();
    expect(user.email).toContain('@');
    expect(user.username).toBeTruthy();
    expect(user.phone).toBeTruthy();
    expect(user.address.city).toBeTruthy();
    expect(user.locale).toBeTruthy();
    expect(user.avatar).toBeTruthy();
  });

  it('should use provided options', () => {
    const random = new SeededRandom('options-test');
    const generator = new UserGenerator(random);
    const user = generator.generate({
      nationality: 'SN',
      gender: 'female',
      ageGroup: 'young_adult',
    });

    expect(user.nationality).toBe('SN');
    expect(user.gender).toBe('female');
    expect(user.ageGroup).toBe('young_adult');
    expect(user.age).toBeGreaterThanOrEqual(18);
    expect(user.age).toBeLessThanOrEqual(25);
  });

  it('should infer ethnicity from nationality', () => {
    const random = new SeededRandom('infer-ethnicity');
    const generator = new UserGenerator(random);

    // Homogeneous country - always black
    const snUser = generator.generate({ nationality: 'SN' });
    expect(snUser.ethnicity).toBe('black');

    // Diverse country - one of the weighted options
    const frUser = generator.generate({ nationality: 'FR' });
    expect(['white', 'black', 'arab', 'mixed']).toContain(frUser.ethnicity);
  });

  it('should use explicit ethnicity over inferred', () => {
    const random = new SeededRandom('explicit-eth');
    const generator = new UserGenerator(random);
    const user = generator.generate({
      nationality: 'FR',
      ethnicity: 'asian',
    });

    expect(user.nationality).toBe('FR');
    expect(user.ethnicity).toBe('asian');
  });

  it('should handle array options', () => {
    const random = new SeededRandom('array-options');
    const generator = new UserGenerator(random);
    const user = generator.generate({
      nationality: ['SN', 'CI', 'NG'],
      gender: ['male', 'female'],
    });

    expect(['SN', 'CI', 'NG']).toContain(user.nationality);
    expect(['male', 'female']).toContain(user.gender);
  });

  it('should handle weighted options', () => {
    const random = new SeededRandom('weighted');
    const generator = new UserGenerator(random);

    const results = { young_adult: 0, senior: 0 };
    for (let i = 0; i < 100; i++) {
      const user = new UserGenerator(new SeededRandom(`weighted-${i}`)).generate({
        ageGroup: [
          { value: 'young_adult', weight: 90 },
          { value: 'senior', weight: 10 },
        ],
      });
      results[user.ageGroup as 'young_adult' | 'senior']++;
    }

    expect(results.young_adult).toBeGreaterThan(results.senior * 3);
  });

  it('should exclude avatar when includeAvatar is false', () => {
    const random = new SeededRandom('no-avatar');
    const generator = new UserGenerator(random);
    const user = generator.generate({ includeAvatar: false });

    expect(user.avatar).toBeUndefined();
  });

  it('should be deterministic with same seed', () => {
    const random1 = new SeededRandom('deterministic');
    const random2 = new SeededRandom('deterministic');

    const user1 = new UserGenerator(random1).generate({ nationality: 'FR' });
    const user2 = new UserGenerator(random2).generate({ nationality: 'FR' });

    expect(user1.id).toBe(user2.id);
    expect(user1.name.full).toBe(user2.name.full);
    expect(user1.email).toBe(user2.email);
    expect(user1.phone).toBe(user2.phone);
  });
});
