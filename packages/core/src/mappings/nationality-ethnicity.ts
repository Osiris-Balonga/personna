import type { Ethnicity } from '../types';

/**
 * Map ISO 3166-1 alpha-2 country codes to default ethnicities
 * This is an approximation for visual representation
 */
export const NATIONALITY_ETHNICITY_MAP: Record<string, Ethnicity> = {
  // West Africa
  SN: 'west_africa',
  CI: 'west_africa',
  NG: 'west_africa',
  GH: 'west_africa',
  ML: 'west_africa',
  BF: 'west_africa',
  NE: 'west_africa',
  TG: 'west_africa',
  BJ: 'west_africa',
  GM: 'west_africa',
  GN: 'west_africa',
  LR: 'west_africa',
  SL: 'west_africa',

  // East Africa
  KE: 'east_africa',
  UG: 'east_africa',
  TZ: 'east_africa',
  ET: 'east_africa',
  RW: 'east_africa',
  BI: 'east_africa',
  SO: 'east_africa',
  ER: 'east_africa',
  DJ: 'east_africa',

  // Central Africa
  CG: 'central_africa',
  CD: 'central_africa',
  CM: 'central_africa',
  GA: 'central_africa',
  CF: 'central_africa',
  TD: 'central_africa',
  GQ: 'central_africa',

  // Southern Africa
  ZA: 'southern_africa',
  BW: 'southern_africa',
  NA: 'southern_africa',
  ZW: 'southern_africa',
  MZ: 'southern_africa',
  ZM: 'southern_africa',
  MW: 'southern_africa',
  AO: 'southern_africa',
  LS: 'southern_africa',
  SZ: 'southern_africa',

  // North Africa
  MA: 'north_africa',
  DZ: 'north_africa',
  TN: 'north_africa',
  EG: 'north_africa',
  LY: 'north_africa',
  SD: 'north_africa',
  MR: 'north_africa',

  // Western Europe
  FR: 'western_europe',
  DE: 'western_europe',
  ES: 'western_europe',
  IT: 'western_europe',
  GB: 'western_europe',
  UK: 'western_europe',
  PT: 'western_europe',
  BE: 'western_europe',
  NL: 'western_europe',
  CH: 'western_europe',
  AT: 'western_europe',
  IE: 'western_europe',
  LU: 'western_europe',

  // Eastern Europe
  PL: 'eastern_europe',
  RU: 'eastern_europe',
  UA: 'eastern_europe',
  CZ: 'eastern_europe',
  RO: 'eastern_europe',
  HU: 'eastern_europe',
  SK: 'eastern_europe',
  BG: 'eastern_europe',
  RS: 'eastern_europe',
  HR: 'eastern_europe',
  BA: 'eastern_europe',
  SI: 'eastern_europe',
  MK: 'eastern_europe',
  AL: 'eastern_europe',
  MD: 'eastern_europe',
  BY: 'eastern_europe',

  // Middle East
  SA: 'middle_east',
  AE: 'middle_east',
  JO: 'middle_east',
  LB: 'middle_east',
  IQ: 'middle_east',
  SY: 'middle_east',
  KW: 'middle_east',
  QA: 'middle_east',
  BH: 'middle_east',
  OM: 'middle_east',
  YE: 'middle_east',
  IR: 'middle_east',
  TR: 'middle_east',
  IL: 'middle_east',
  PS: 'middle_east',

  // South Asia
  IN: 'south_asia',
  PK: 'south_asia',
  BD: 'south_asia',
  LK: 'south_asia',
  NP: 'south_asia',
  AF: 'south_asia',
  MV: 'south_asia',
  BT: 'south_asia',

  // East Asia
  CN: 'east_asia',
  JP: 'east_asia',
  KR: 'east_asia',
  VN: 'east_asia',
  TH: 'east_asia',
  PH: 'east_asia',
  MY: 'east_asia',
  ID: 'east_asia',
  SG: 'east_asia',
  MM: 'east_asia',
  KH: 'east_asia',
  LA: 'east_asia',
  TW: 'east_asia',
  HK: 'east_asia',
  MN: 'east_asia',

  // Latin America
  BR: 'latin_america',
  MX: 'latin_america',
  AR: 'latin_america',
  CO: 'latin_america',
  CL: 'latin_america',
  PE: 'latin_america',
  VE: 'latin_america',
  EC: 'latin_america',
  BO: 'latin_america',
  PY: 'latin_america',
  UY: 'latin_america',
  CR: 'latin_america',
  PA: 'latin_america',
  CU: 'latin_america',
  DO: 'latin_america',
  GT: 'latin_america',
  HN: 'latin_america',
  SV: 'latin_america',
  NI: 'latin_america',
  PR: 'latin_america',

  // Mixed (multicultural countries)
  US: 'mixed',
  CA: 'mixed',
  AU: 'mixed',
  NZ: 'mixed',
};

/**
 * Infer ethnicity from nationality code
 */
export function inferEthnicityFromNationality(nationality: string): Ethnicity {
  const code = nationality.toUpperCase();
  return NATIONALITY_ETHNICITY_MAP[code] ?? 'mixed';
}

/**
 * Get all nationalities for a given ethnicity
 */
export function getNationalitiesForEthnicity(ethnicity: Ethnicity): string[] {
  return Object.entries(NATIONALITY_ETHNICITY_MAP)
    .filter(([, eth]) => eth === ethnicity)
    .map(([code]) => code);
}

/**
 * Check if nationality code is known
 */
export function isKnownNationality(nationality: string): boolean {
  return nationality.toUpperCase() in NATIONALITY_ETHNICITY_MAP;
}
