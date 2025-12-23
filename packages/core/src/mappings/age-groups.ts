import type { AgeGroup } from '../types';
import { AGE_GROUP_RANGES } from '../types';

/**
 * Get adjacent age group for fallback
 */
export function getAdjacentAgeGroup(ageGroup: AgeGroup): AgeGroup {
  const mapping: Record<AgeGroup, AgeGroup> = {
    child: 'teen',
    teen: 'young_adult',
    young_adult: 'adult',
    adult: 'young_adult',
    senior: 'adult',
  };
  return mapping[ageGroup];
}

/**
 * Get age range for age group
 */
export function getAgeRange(ageGroup: AgeGroup): [number, number] {
  return AGE_GROUP_RANGES[ageGroup];
}

/**
 * Determine age group from age
 */
export function getAgeGroupFromAge(age: number): AgeGroup {
  if (age < 13) return 'child';
  if (age < 18) return 'teen';
  if (age < 26) return 'young_adult';
  if (age < 60) return 'adult';
  return 'senior';
}
