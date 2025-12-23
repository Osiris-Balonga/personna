import type { Ethnicity, WeightedOption } from '../types';
import type { SeededRandom } from '../random';

type EthnicityMapping = Ethnicity | WeightedOption<Ethnicity>[];

/**
 * Map ISO 3166-1 alpha-2 country codes to ethnicities
 * Single value = homogeneous country
 * Weighted array = diverse country with demographic distribution
 */
export const NATIONALITY_ETHNICITY_MAP: Record<string, EthnicityMapping> = {
  // Africa (Sub-Saharan) - homogeneous
  SN: 'black',
  CI: 'black',
  NG: 'black',
  GH: 'black',
  ML: 'black',
  BF: 'black',
  NE: 'black',
  TG: 'black',
  BJ: 'black',
  GM: 'black',
  GN: 'black',
  LR: 'black',
  SL: 'black',
  KE: 'black',
  UG: 'black',
  TZ: 'black',
  ET: 'black',
  RW: 'black',
  BI: 'black',
  SO: 'black',
  ER: 'black',
  DJ: 'black',
  CG: 'black',
  CD: 'black',
  CM: 'black',
  GA: 'black',
  CF: 'black',
  TD: 'black',
  GQ: 'black',
  BW: 'black',
  NA: 'black',
  ZW: 'black',
  MZ: 'black',
  ZM: 'black',
  MW: 'black',
  AO: 'black',
  LS: 'black',
  SZ: 'black',

  // South Africa - diverse
  ZA: [
    { value: 'black', weight: 80 },
    { value: 'white', weight: 8 },
    { value: 'indian', weight: 3 },
    { value: 'mixed', weight: 9 },
  ],

  // Arab (North Africa + Middle East) - mostly homogeneous
  MA: 'arab',
  DZ: 'arab',
  TN: 'arab',
  EG: 'arab',
  LY: 'arab',
  SD: 'arab',
  MR: 'arab',
  SA: 'arab',
  JO: 'arab',
  LB: 'arab',
  IQ: 'arab',
  SY: 'arab',
  KW: 'arab',
  QA: 'arab',
  BH: 'arab',
  OM: 'arab',
  YE: 'arab',
  IR: 'arab',
  PS: 'arab',

  // UAE - diverse expat population
  AE: [
    { value: 'arab', weight: 20 },
    { value: 'indian', weight: 40 },
    { value: 'asian', weight: 25 },
    { value: 'white', weight: 10 },
    { value: 'black', weight: 5 },
  ],

  // Turkey & Israel - diverse
  TR: [
    { value: 'arab', weight: 80 },
    { value: 'white', weight: 15 },
    { value: 'mixed', weight: 5 },
  ],
  IL: [
    { value: 'arab', weight: 20 },
    { value: 'white', weight: 70 },
    { value: 'black', weight: 5 },
    { value: 'mixed', weight: 5 },
  ],

  // Western Europe - diverse
  FR: [
    { value: 'white', weight: 70 },
    { value: 'black', weight: 12 },
    { value: 'arab', weight: 10 },
    { value: 'mixed', weight: 8 },
  ],
  DE: [
    { value: 'white', weight: 80 },
    { value: 'arab', weight: 8 },
    { value: 'black', weight: 4 },
    { value: 'asian', weight: 4 },
    { value: 'mixed', weight: 4 },
  ],
  GB: [
    { value: 'white', weight: 82 },
    { value: 'indian', weight: 6 },
    { value: 'black', weight: 4 },
    { value: 'asian', weight: 4 },
    { value: 'mixed', weight: 4 },
  ],
  UK: [
    { value: 'white', weight: 82 },
    { value: 'indian', weight: 6 },
    { value: 'black', weight: 4 },
    { value: 'asian', weight: 4 },
    { value: 'mixed', weight: 4 },
  ],
  NL: [
    { value: 'white', weight: 77 },
    { value: 'arab', weight: 6 },
    { value: 'black', weight: 5 },
    { value: 'indian', weight: 4 },
    { value: 'asian', weight: 4 },
    { value: 'mixed', weight: 4 },
  ],
  BE: [
    { value: 'white', weight: 75 },
    { value: 'arab', weight: 10 },
    { value: 'black', weight: 8 },
    { value: 'mixed', weight: 7 },
  ],

  // Less diverse European countries
  ES: 'white',
  IT: 'white',
  PT: 'white',
  CH: 'white',
  AT: 'white',
  IE: 'white',
  LU: 'white',
  PL: 'white',
  RU: 'white',
  UA: 'white',
  CZ: 'white',
  RO: 'white',
  HU: 'white',
  SK: 'white',
  BG: 'white',
  RS: 'white',
  HR: 'white',
  BA: 'white',
  SI: 'white',
  MK: 'white',
  AL: 'white',
  MD: 'white',
  BY: 'white',

  // South Asia - mostly homogeneous
  IN: 'indian',
  PK: 'indian',
  BD: 'indian',
  LK: 'indian',
  NP: 'indian',
  AF: 'indian',
  MV: 'indian',
  BT: 'indian',

  // East & Southeast Asia - mostly homogeneous
  CN: 'asian',
  JP: 'asian',
  KR: 'asian',
  VN: 'asian',
  TH: 'asian',
  PH: 'asian',
  MM: 'asian',
  KH: 'asian',
  LA: 'asian',
  TW: 'asian',
  MN: 'asian',

  // Southeast Asia - diverse
  MY: [
    { value: 'asian', weight: 70 },
    { value: 'indian', weight: 20 },
    { value: 'mixed', weight: 10 },
  ],
  SG: [
    { value: 'asian', weight: 75 },
    { value: 'indian', weight: 10 },
    { value: 'white', weight: 5 },
    { value: 'mixed', weight: 10 },
  ],
  ID: 'asian',
  HK: 'asian',

  // Latin America - diverse
  BR: [
    { value: 'latino', weight: 45 },
    { value: 'white', weight: 25 },
    { value: 'black', weight: 15 },
    { value: 'mixed', weight: 15 },
  ],
  MX: 'latino',
  AR: [
    { value: 'white', weight: 70 },
    { value: 'latino', weight: 25 },
    { value: 'mixed', weight: 5 },
  ],
  CO: 'latino',
  CL: 'latino',
  PE: 'latino',
  VE: 'latino',
  EC: 'latino',
  BO: 'latino',
  PY: 'latino',
  UY: 'latino',
  CR: 'latino',
  PA: 'latino',
  CU: [
    { value: 'latino', weight: 50 },
    { value: 'black', weight: 25 },
    { value: 'mixed', weight: 25 },
  ],
  DO: [
    { value: 'latino', weight: 40 },
    { value: 'black', weight: 20 },
    { value: 'mixed', weight: 40 },
  ],
  GT: 'latino',
  HN: 'latino',
  SV: 'latino',
  NI: 'latino',
  PR: 'latino',

  // Multicultural countries - very diverse
  US: [
    { value: 'white', weight: 58 },
    { value: 'latino', weight: 19 },
    { value: 'black', weight: 12 },
    { value: 'asian', weight: 6 },
    { value: 'mixed', weight: 5 },
  ],
  CA: [
    { value: 'white', weight: 70 },
    { value: 'asian', weight: 15 },
    { value: 'indian', weight: 5 },
    { value: 'black', weight: 4 },
    { value: 'latino', weight: 3 },
    { value: 'mixed', weight: 3 },
  ],
  AU: [
    { value: 'white', weight: 75 },
    { value: 'asian', weight: 15 },
    { value: 'indian', weight: 4 },
    { value: 'mixed', weight: 6 },
  ],
  NZ: [
    { value: 'white', weight: 70 },
    { value: 'asian', weight: 15 },
    { value: 'mixed', weight: 15 },
  ],
};

/**
 * Select ethnicity from weighted options
 */
function selectWeightedEthnicity(
  options: WeightedOption<Ethnicity>[],
  random: SeededRandom
): Ethnicity {
  return random.weightedPick(options);
}

/**
 * Infer ethnicity from nationality code
 * Uses weighted distribution for diverse countries
 */
export function inferEthnicityFromNationality(
  nationality: string,
  random?: SeededRandom
): Ethnicity {
  const code = nationality.toUpperCase();
  const mapping = NATIONALITY_ETHNICITY_MAP[code];

  if (!mapping) return 'mixed';

  if (typeof mapping === 'string') {
    return mapping;
  }

  // Weighted distribution - requires random instance
  if (!random) {
    // Fallback: return highest weight option
    return mapping.reduce((a, b) => (a.weight > b.weight ? a : b)).value;
  }

  return selectWeightedEthnicity(mapping, random);
}

/**
 * Get all nationalities for a given ethnicity
 * For weighted countries, includes if ethnicity is in the distribution
 */
export function getNationalitiesForEthnicity(ethnicity: Ethnicity): string[] {
  return Object.entries(NATIONALITY_ETHNICITY_MAP)
    .filter(([, mapping]) => {
      if (typeof mapping === 'string') {
        return mapping === ethnicity;
      }
      return mapping.some((opt) => opt.value === ethnicity);
    })
    .map(([code]) => code);
}

/**
 * Check if nationality code is known
 */
export function isKnownNationality(nationality: string): boolean {
  return nationality.toUpperCase() in NATIONALITY_ETHNICITY_MAP;
}
