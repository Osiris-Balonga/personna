import type { AgeGroup, Ethnicity } from '../types';

/**
 * Get parent/similar region for fallback
 */
export function getParentRegion(ethnicity: Ethnicity): Ethnicity {
  const mapping: Partial<Record<Ethnicity, Ethnicity>> = {
    west_africa: 'mixed',
    east_africa: 'mixed',
    central_africa: 'mixed',
    southern_africa: 'mixed',
    north_africa: 'middle_east',
    western_europe: 'mixed',
    eastern_europe: 'western_europe',
    middle_east: 'mixed',
    south_asia: 'mixed',
    east_asia: 'mixed',
    latin_america: 'mixed',
  };
  return mapping[ethnicity] ?? 'mixed';
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
