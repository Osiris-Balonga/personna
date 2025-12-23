// Types
export type {
  AgeGroup,
  Ethnicity,
  Gender,
  AvatarStyle,
  AvatarCriteria,
  AvatarResult,
  Address,
  WeightedOption,
  OptionValue,
  CreateUserOptions,
  FactoryConfig,
  UserName,
  GeneratedUser,
  LocaleData,
} from './types';

export {
  AGE_GROUPS,
  AGE_GROUP_RANGES,
  ETHNICITIES,
  GENDERS,
  AVATAR_STYLES,
  DEFAULT_CONFIG,
} from './types';

// Random
export { SeededRandom } from './random';

// Distribution
export { DistributionResolver } from './distribution';

// Mappings
export {
  NATIONALITY_ETHNICITY_MAP,
  inferEthnicityFromNationality,
  getNationalitiesForEthnicity,
  isKnownNationality,
  getAdjacentAgeGroup,
  getAgeRange,
  getAgeGroupFromAge,
} from './mappings';

// Names
export type { NameProvider } from './names';
export { NameRegistry, generateName } from './names';

// Generators
export {
  generateAge,
  computeBirthDate,
  computeBirthDateWithVariation,
} from './generators';

export const VERSION = '0.1.0';
