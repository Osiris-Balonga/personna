import type { AgeGroup } from './age-group';
import type { AvatarStyle } from './avatar';
import type { Ethnicity } from './ethnicity';
import type { Gender } from './gender';

export interface WeightedOption<T> {
  value: T;
  weight: number;
}

export type OptionValue<T> = T | T[] | WeightedOption<T>[];

export interface CreateUserOptions {
  nationality?: OptionValue<string>;
  ethnicity?: OptionValue<Ethnicity>;
  gender?: OptionValue<Gender>;
  ageGroup?: OptionValue<AgeGroup>;
  avatarStyle?: OptionValue<AvatarStyle>;
  includeAvatar?: boolean;
  seed?: string | number;
}

export interface FactoryConfig {
  cdnBaseUrl: string;
  defaultAvatarStyle: AvatarStyle;
  onMissingAvatar: 'error' | 'fallback' | 'skip';
  onInvalidOption: 'error' | 'ignore';
}

export const DEFAULT_CONFIG: FactoryConfig = {
  cdnBaseUrl: 'https://cdn.jsdelivr.net/gh/Osiris-Balonga/personna-assets@v1',
  defaultAvatarStyle: 'realistic',
  onMissingAvatar: 'fallback',
  onInvalidOption: 'ignore',
};
