import { describe, it, expect } from 'vitest';
import { AvatarPicker, buildAvatarUrl } from '../src/avatars';
import { SeededRandom } from '../src/random';
import type { AvatarCriteria } from '../src/types';

describe('buildAvatarUrl', () => {
  it('should build correct URL for realistic avatar', () => {
    const url = buildAvatarUrl({
      style: 'realistic',
      ethnicity: 'black',
      gender: 'female',
      ageGroup: 'young_adult',
      variation: '001',
    });

    expect(url).toContain('/avatars/realistic/female/black/young_adult/001.webp');
  });

  it('should build correct URL for cartoon avatar', () => {
    const url = buildAvatarUrl({
      style: 'cartoon',
      ethnicity: 'asian',
      gender: 'male',
      ageGroup: 'child',
      variation: '002',
    });

    expect(url).toContain('/avatars/cartoon/male/asian/child/002.svg');
  });

  it('should use custom base URL', () => {
    const url = buildAvatarUrl(
      {
        style: 'realistic',
        ethnicity: 'mixed',
        gender: 'female',
        ageGroup: 'adult',
        variation: '001',
      },
      'https://custom.cdn.com'
    );

    expect(url).toBe('https://custom.cdn.com/avatars/realistic/female/mixed/adult/001.webp');
  });
});

describe('AvatarPicker', () => {
  const picker = new AvatarPicker();

  it('should pick avatar with correct properties', () => {
    const random = new SeededRandom('avatar-test');
    const criteria: AvatarCriteria = {
      gender: 'male',
      ageGroup: 'adult',
      ethnicity: 'white',
      style: 'realistic',
    };

    const result = picker.pick(criteria, random);

    expect(result).not.toBeNull();
    expect(result!.style).toBe('realistic');
    expect(result!.url).toContain('/male/white/adult/');
    expect(result!.url).toContain('.webp');
  });

  it('should generate deterministic results', () => {
    const criteria: AvatarCriteria = {
      gender: 'female',
      ageGroup: 'teen',
      ethnicity: 'black',
      style: 'cartoon',
    };

    const random1 = new SeededRandom('deterministic-avatar');
    const random2 = new SeededRandom('deterministic-avatar');

    const result1 = picker.pick(criteria, random1);
    const result2 = picker.pick(criteria, random2);

    expect(result1!.id).toBe(result2!.id);
    expect(result1!.url).toBe(result2!.url);
  });

  it('should include variation in ID', () => {
    const random = new SeededRandom('variation-test');
    const criteria: AvatarCriteria = {
      gender: 'male',
      ageGroup: 'senior',
      ethnicity: 'indian',
      style: 'realistic',
    };

    const result = picker.pick(criteria, random);

    expect(result!.id).toMatch(/indian_male_senior_00[12]/);
  });
});
