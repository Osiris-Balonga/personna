import { describe, it, expect, beforeEach } from 'vitest';
import { Personna } from '../src/factory';
import { DEFAULT_CONFIG } from '../src/types';
import '../src/locales'; // Register locales

describe('Personna', () => {
  beforeEach(() => {
    Personna.resetConfig();
  });

  describe('create()', () => {
    it('should create a single user', () => {
      const user = Personna.create();

      expect(user.id).toBeTruthy();
      expect(user.name.full).toBeTruthy();
      expect(user.email).toContain('@');
    });

    it('should accept options', () => {
      const user = Personna.create({
        nationality: 'SN',
        gender: 'male',
        ageGroup: 'adult',
      });

      expect(user.nationality).toBe('SN');
      expect(user.gender).toBe('male');
      expect(user.ageGroup).toBe('adult');
    });

    it('should be deterministic with seed', () => {
      const user1 = Personna.create({ seed: 'test-seed-123' });
      const user2 = Personna.create({ seed: 'test-seed-123' });

      expect(user1.id).toBe(user2.id);
      expect(user1.name.full).toBe(user2.name.full);
      expect(user1.email).toBe(user2.email);
    });

    it('should create different users without seed', () => {
      const user1 = Personna.create();
      const user2 = Personna.create();

      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('createMany()', () => {
    it('should create specified number of users', () => {
      const users = Personna.createMany(5);

      expect(users).toHaveLength(5);
      users.forEach((user) => {
        expect(user.id).toBeTruthy();
      });
    });

    it('should create unique users', () => {
      const users = Personna.createMany(10);
      const ids = users.map((u) => u.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(10);
    });

    it('should apply options to all users', () => {
      const users = Personna.createMany(5, {
        nationality: 'FR',
        gender: 'female',
      });

      users.forEach((user) => {
        expect(user.nationality).toBe('FR');
        expect(user.gender).toBe('female');
      });
    });

    it('should distribute array options across users', () => {
      const users = Personna.createMany(20, {
        gender: ['male', 'female'],
      });

      const males = users.filter((u) => u.gender === 'male').length;
      const females = users.filter((u) => u.gender === 'female').length;

      // Should have some of each
      expect(males).toBeGreaterThan(0);
      expect(females).toBeGreaterThan(0);
    });

    it('should be deterministic with seed', () => {
      const users1 = Personna.createMany(3, { seed: 'batch-seed' });
      const users2 = Personna.createMany(3, { seed: 'batch-seed' });

      expect(users1[0].id).toBe(users2[0].id);
      expect(users1[1].id).toBe(users2[1].id);
      expect(users1[2].id).toBe(users2[2].id);
    });

    it('should return empty array for count < 1', () => {
      expect(Personna.createMany(0)).toEqual([]);
      expect(Personna.createMany(-5)).toEqual([]);
    });
  });

  describe('configure()', () => {
    it('should update configuration', () => {
      Personna.configure({ defaultAvatarStyle: 'cartoon' });

      const config = Personna.getConfig();
      expect(config.defaultAvatarStyle).toBe('cartoon');
    });

    it('should merge with existing config', () => {
      Personna.configure({ defaultAvatarStyle: 'cartoon' });
      Personna.configure({ onMissingAvatar: 'skip' });

      const config = Personna.getConfig();
      expect(config.defaultAvatarStyle).toBe('cartoon');
      expect(config.onMissingAvatar).toBe('skip');
    });

    it('should use custom CDN URL', () => {
      Personna.configure({ cdnBaseUrl: 'https://custom.cdn.com' });

      const user = Personna.create({ seed: 'cdn-test' });
      expect(user.avatar?.url).toContain('https://custom.cdn.com');
    });
  });

  describe('resetConfig()', () => {
    it('should reset to defaults', () => {
      Personna.configure({
        defaultAvatarStyle: 'cartoon',
        cdnBaseUrl: 'https://custom.com',
      });

      Personna.resetConfig();

      const config = Personna.getConfig();
      expect(config).toEqual(DEFAULT_CONFIG);
    });
  });
});
