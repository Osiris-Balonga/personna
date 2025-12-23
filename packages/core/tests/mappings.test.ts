import { describe, it, expect } from 'vitest';
import {
  inferEthnicityFromNationality,
  getNationalitiesForEthnicity,
  isKnownNationality,
  getAdjacentAgeGroup,
  getAgeGroupFromAge,
} from '../src/mappings';

describe('Nationality-Ethnicity Mappings', () => {
  it('should infer ethnicity from known nationality', () => {
    expect(inferEthnicityFromNationality('SN')).toBe('west_africa');
    expect(inferEthnicityFromNationality('FR')).toBe('western_europe');
    expect(inferEthnicityFromNationality('CG')).toBe('central_africa');
    expect(inferEthnicityFromNationality('JP')).toBe('east_asia');
  });

  it('should handle lowercase nationality codes', () => {
    expect(inferEthnicityFromNationality('sn')).toBe('west_africa');
    expect(inferEthnicityFromNationality('fr')).toBe('western_europe');
  });

  it('should return mixed for unknown nationality', () => {
    expect(inferEthnicityFromNationality('XX')).toBe('mixed');
    expect(inferEthnicityFromNationality('ZZ')).toBe('mixed');
  });

  it('should return mixed for multicultural countries', () => {
    expect(inferEthnicityFromNationality('US')).toBe('mixed');
    expect(inferEthnicityFromNationality('CA')).toBe('mixed');
  });

  it('should get nationalities for ethnicity', () => {
    const westAfrica = getNationalitiesForEthnicity('west_africa');
    expect(westAfrica).toContain('SN');
    expect(westAfrica).toContain('CI');
    expect(westAfrica).toContain('NG');
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
