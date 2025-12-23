import type { AgeGroup } from './age-group';
import type { Ethnicity } from './ethnicity';
import type { Gender } from './gender';

export type AvatarStyle = 'realistic' | 'cartoon';

export const AVATAR_STYLES: AvatarStyle[] = ['realistic', 'cartoon'];

export interface AvatarCriteria {
  gender: Gender;
  ageGroup: AgeGroup;
  ethnicity: Ethnicity;
  style: AvatarStyle;
}

export interface AvatarResult {
  id: string;
  style: AvatarStyle;
  url: string;
}
