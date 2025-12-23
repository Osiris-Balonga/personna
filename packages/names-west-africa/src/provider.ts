import type { NameProvider, Gender } from '@personna/core';
import { SN_NAMES } from './data/sn';
import { CI_NAMES } from './data/ci';
import { NG_NAMES } from './data/ng';
import { GH_NAMES } from './data/gh';
import { ML_NAMES } from './data/ml';

type NamesData = {
  m: string[];
  f: string[];
  l: string[];
};

const NAMES_DATA: Record<string, NamesData> = {
  SN: SN_NAMES,
  CI: CI_NAMES,
  NG: NG_NAMES,
  GH: GH_NAMES,
  ML: ML_NAMES,
};

export class WestAfricaNameProvider implements NameProvider {
  getFirstNames(nationality: string, gender: Gender): string[] {
    const data = NAMES_DATA[nationality.toUpperCase()];
    if (!data) return [];
    return gender === 'male' ? data.m : data.f;
  }

  getLastNames(nationality: string): string[] {
    const data = NAMES_DATA[nationality.toUpperCase()];
    return data?.l ?? [];
  }

  getSupportedNationalities(): string[] {
    return Object.keys(NAMES_DATA);
  }
}
