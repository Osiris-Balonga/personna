export type AgeGroup = 'child' | 'teen' | 'young_adult' | 'adult' | 'senior';

export const AGE_GROUP_RANGES: Record<AgeGroup, [number, number]> = {
  child: [5, 12],
  teen: [13, 17],
  young_adult: [18, 25],
  adult: [26, 59],
  senior: [60, 85],
};

export const AGE_GROUPS: AgeGroup[] = ['child', 'teen', 'young_adult', 'adult', 'senior'];
