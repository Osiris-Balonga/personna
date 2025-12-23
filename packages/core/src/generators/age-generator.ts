import type { AgeGroup } from '../types';
import type { SeededRandom } from '../random';
import { getAgeRange } from '../mappings';

/**
 * Generate a random age within the age group range
 */
export function generateAge(ageGroup: AgeGroup, random: SeededRandom): number {
  const [min, max] = getAgeRange(ageGroup);
  return random.int(min, max);
}

/**
 * Compute birth date from age
 * Uses current date and subtracts years
 */
export function computeBirthDate(age: number, referenceDate?: Date): Date {
  const now = referenceDate ?? new Date();
  const birthYear = now.getFullYear() - age;

  // Randomize month and day for more realistic dates
  // But keep it simple: use January 1st of birth year
  return new Date(birthYear, 0, 1);
}

/**
 * Compute birth date with random month/day
 * Generates realistic dates respecting days per month
 */
export function computeBirthDateWithVariation(
  age: number,
  random: SeededRandom,
  referenceDate?: Date
): Date {
  const now = referenceDate ?? new Date();
  const birthYear = now.getFullYear() - age;
  const birthMonth = random.int(0, 11);

  // Days per month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year for February
  const isLeapYear =
    (birthYear % 4 === 0 && birthYear % 100 !== 0) || birthYear % 400 === 0;
  if (isLeapYear && birthMonth === 1) {
    daysInMonth[1] = 29;
  }

  const maxDay = daysInMonth[birthMonth];
  const birthDay = random.int(1, maxDay);

  return new Date(birthYear, birthMonth, birthDay);
}
