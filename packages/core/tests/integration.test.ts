import { describe, it, expect } from 'vitest';
import { Personna, isValidUser } from '../src';
import '../src/locales';

describe('Integration Tests', () => {
  describe('Full User Generation', () => {
    it('should generate valid users for all supported nationalities', () => {
      const nationalities = ['SN', 'CI', 'CG', 'FR', 'US', 'JP', 'BR'];

      nationalities.forEach((nat) => {
        const user = Personna.create({ nationality: nat, seed: `nat-${nat}` });
        expect(isValidUser(user)).toBe(true);
        expect(user.nationality).toBe(nat);
      });
    });

    it('should generate valid users for all age groups', () => {
      const ageGroups = ['child', 'teen', 'young_adult', 'adult', 'senior'] as const;

      ageGroups.forEach((ag) => {
        const user = Personna.create({ ageGroup: ag, seed: `age-${ag}` });
        expect(isValidUser(user)).toBe(true);
        expect(user.ageGroup).toBe(ag);
      });
    });

    it('should generate valid users for both genders', () => {
      const male = Personna.create({ gender: 'male', seed: 'gender-male' });
      const female = Personna.create({ gender: 'female', seed: 'gender-female' });

      expect(isValidUser(male)).toBe(true);
      expect(isValidUser(female)).toBe(true);
      expect(male.gender).toBe('male');
      expect(female.gender).toBe('female');
    });

    it('should generate valid users for all avatar styles', () => {
      const realistic = Personna.create({
        avatarStyle: 'realistic',
        seed: 'style-real',
      });
      const cartoon = Personna.create({
        avatarStyle: 'cartoon',
        seed: 'style-cartoon',
      });

      expect(realistic.avatar?.style).toBe('realistic');
      expect(realistic.avatar?.url).toContain('.webp');

      expect(cartoon.avatar?.style).toBe('cartoon');
      expect(cartoon.avatar?.url).toContain('.svg');
    });
  });

  describe('Batch Generation', () => {
    it('should generate 100 unique valid users', () => {
      const users = Personna.createMany(100, { seed: 'batch-100' });

      expect(users).toHaveLength(100);

      const ids = new Set(users.map((u) => u.id));
      expect(ids.size).toBe(100);

      users.forEach((user) => {
        expect(isValidUser(user)).toBe(true);
      });
    });

    it('should respect weighted distributions', () => {
      const users = Personna.createMany(500, {
        seed: 'weighted-dist',
        ageGroup: [
          { value: 'young_adult', weight: 80 },
          { value: 'senior', weight: 20 },
        ],
      });

      const youngAdults = users.filter((u) => u.ageGroup === 'young_adult').length;
      const seniors = users.filter((u) => u.ageGroup === 'senior').length;

      // Young adults should be ~4x more common
      expect(youngAdults / seniors).toBeGreaterThan(2);
      expect(youngAdults / seniors).toBeLessThan(8);
    });

    it('should distribute array options evenly', () => {
      const users = Personna.createMany(200, {
        seed: 'even-dist',
        gender: ['male', 'female'],
      });

      const males = users.filter((u) => u.gender === 'male').length;
      const females = users.filter((u) => u.gender === 'female').length;

      // Should be roughly 50/50 (allow 35-65 range)
      expect(males).toBeGreaterThan(70);
      expect(males).toBeLessThan(130);
      expect(females).toBeGreaterThan(70);
      expect(females).toBeLessThan(130);
    });
  });

  describe('Determinism', () => {
    it('should produce identical results across multiple runs', () => {
      const seed = 'determinism-test';

      for (let run = 0; run < 3; run++) {
        const users = Personna.createMany(10, { seed });

        // All runs should produce the same first user
        expect(users[0].id).toBe(Personna.createMany(10, { seed })[0].id);
        expect(users[0].name.full).toBe(Personna.createMany(10, { seed })[0].name.full);
      }
    });

    it('should produce different results with different seeds', () => {
      const users1 = Personna.createMany(5, { seed: 'seed-alpha' });
      const users2 = Personna.createMany(5, { seed: 'seed-beta' });

      expect(users1[0].id).not.toBe(users2[0].id);
    });
  });

  describe('Edge Cases', () => {
    it('should handle unknown nationality gracefully', () => {
      const user = Personna.create({ nationality: 'ZZ', seed: 'unknown-nat' });

      expect(isValidUser(user)).toBe(true);
      expect(user.nationality).toBe('ZZ');
      expect(user.ethnicity).toBe('mixed'); // Falls back to mixed
    });

    it('should handle empty string seed', () => {
      const user = Personna.create({ seed: '' });
      expect(isValidUser(user)).toBe(true);
    });

    it('should handle numeric seed', () => {
      const user1 = Personna.create({ seed: 12345 });
      const user2 = Personna.create({ seed: 12345 });

      expect(user1.id).toBe(user2.id);
    });
  });
});
