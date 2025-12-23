import type { Gender } from '../types';

export interface NameProvider {
  getFirstNames(nationality: string, gender: Gender): string[];
  getLastNames(nationality: string): string[];
  getSupportedNationalities(): string[];
}
