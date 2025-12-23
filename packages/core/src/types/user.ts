import type { Address } from './address';
import type { AgeGroup } from './age-group';
import type { AvatarResult } from './avatar';
import type { Ethnicity } from './ethnicity';
import type { Gender } from './gender';

export interface UserName {
  first: string;
  last: string;
  full: string;
}

export interface GeneratedUser {
  id: string;
  name: UserName;
  gender: Gender;
  age: number;
  ageGroup: AgeGroup;
  birthDate: Date;
  nationality: string;
  ethnicity: Ethnicity;
  email: string;
  username: string;
  phone: string;
  address: Address;
  locale: string;
  avatar?: AvatarResult;
}
