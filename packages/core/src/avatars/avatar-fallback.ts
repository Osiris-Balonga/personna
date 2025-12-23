import type { AgeGroup, Ethnicity } from '../types';

/**
 * Get fallback ethnicity when avatar is not available
 */
export function getParentRegion(ethnicity: Ethnicity): Ethnicity {
  // All ethnicities fall back to mixed
  if (ethnicity === 'mixed') return 'mixed';
  return 'mixed';
}

/**
 * Get adjacent age group for fallback
 */
export function getAdjacentAgeGroupForAvatar(ageGroup: AgeGroup): AgeGroup {
  const mapping: Record<AgeGroup, AgeGroup> = {
    child: 'teen',
    teen: 'young_adult',
    young_adult: 'adult',
    adult: 'young_adult',
    senior: 'adult',
  };
  return mapping[ageGroup];
}
