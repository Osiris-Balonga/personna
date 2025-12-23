// Main API
export { Personna } from './factory';

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
  WeightedCity,
  LocalePhone,
  LocaleAddress,
  LocaleEmail,
} from './types';

export {
  AGE_GROUPS,
  AGE_GROUP_RANGES,
  ETHNICITIES,
  GENDERS,
  AVATAR_STYLES,
  DEFAULT_CONFIG,
} from './types';

// Utilities (advanced usage)
export { SeededRandom } from './random';
export { DistributionResolver } from './distribution';
export { inferEthnicityFromNationality, isKnownNationality } from './mappings';
export { NameRegistry } from './names';
export type { NameProvider } from './names';
export { LocaleRegistry } from './locales';
export { AvatarPicker, buildAvatarUrl } from './avatars';
export { UserGenerator } from './generators';

// Version
export const VERSION = '0.1.0';

// Auto-register built-in locales (side-effect)
import './locales';
