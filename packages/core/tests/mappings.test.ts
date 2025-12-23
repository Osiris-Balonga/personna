import { describe, it, expect } from 'vitest';
import {
  inferEthnicityFromNationality,
  getNationalitiesForEthnicity,
  isKnownNationality,
  getAdjacentAgeGroup,
  getAgeGroupFromAge,
} from '../src/mappings';
import { SeededRandom } from '../src/random';

describe('Nationality-Ethnicity Mappings', () => {
  it('should infer ethnicity from homogeneous countries', () => {
    expect(inferEthnicityFromNationality('SN')).toBe('black');
    expect(inferEthnicityFromNationality('CG')).toBe('black');
    expect(inferEthnicityFromNationality('JP')).toBe('asian');
    expect(inferEthnicityFromNationality('IT')).toBe('white');
  });

  it('should return highest weight for diverse countries without random', () => {
    // FR: white has highest weight (70)
    expect(inferEthnicityFromNationality('FR')).toBe('white');
    // US: white has highest weight (58)
    expect(inferEthnicityFromNationality('US')).toBe('white');
  });

  it('should use weighted distribution with random instance', () => {
    const results: Record<string, number> = {};

    // Use a single random instance and call multiple times
    const random = new SeededRandom('weighted-test');
    for (let i = 0; i < 200; i++) {
      const ethnicity = inferEthnicityFromNationality('FR', random);
      results[ethnicity] = (results[ethnicity] || 0) + 1;
    }

    // Should have diversity (not all white)
    expect(Object.keys(results).length).toBeGreaterThan(1);
    // White should be most common (~70%)
    expect(results['white']).toBeGreaterThan(100);
  });

  it('should handle lowercase nationality codes', () => {
    expect(inferEthnicityFromNationality('sn')).toBe('black');
    expect(inferEthnicityFromNationality('jp')).toBe('asian');
  });

  it('should return mixed for unknown nationality', () => {
    expect(inferEthnicityFromNationality('XX')).toBe('mixed');
    expect(inferEthnicityFromNationality('ZZ')).toBe('mixed');
  });

  it('should get nationalities for ethnicity including diverse countries', () => {
    const blackNationalities = getNationalitiesForEthnicity('black');
    expect(blackNationalities).toContain('SN');
    expect(blackNationalities).toContain('CI');
    expect(blackNationalities).toContain('NG');
    // FR has black in its distribution
    expect(blackNationalities).toContain('FR');
  });

  it('should check if nationality is known', () => {
    expect(isKnownNationality('SN')).toBe(true);
    expect(isKnownNationality('XX')).toBe(false);
  });
});

describe('Age Group Mappings', () => {
  it('should get adjacent age group', () => {
    expect(getAdjacentAgeGroup('child')).toBe('teen');
    expect(getAdjacentAgeGroup('teen')).toBe('young_adult');
    expect(getAdjacentAgeGroup('adult')).toBe('young_adult');
    expect(getAdjacentAgeGroup('senior')).toBe('adult');
  });

  it('should determine age group from age', () => {
    expect(getAgeGroupFromAge(8)).toBe('child');
    expect(getAgeGroupFromAge(15)).toBe('teen');
    expect(getAgeGroupFromAge(22)).toBe('young_adult');
    expect(getAgeGroupFromAge(40)).toBe('adult');
    expect(getAgeGroupFromAge(70)).toBe('senior');
  });
});
