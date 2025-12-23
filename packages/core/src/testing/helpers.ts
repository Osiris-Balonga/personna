import type { GeneratedUser } from '../types';

/**
 * Validate that a user object has all required fields
 */
export function isValidUser(user: unknown): user is GeneratedUser {
  if (!user || typeof user !== 'object') return false;

  const u = user as Record<string, unknown>;

  return (
    typeof u.id === 'string' &&
    typeof u.name === 'object' &&
    u.name !== null &&
    typeof (u.name as Record<string, unknown>).first === 'string' &&
    typeof (u.name as Record<string, unknown>).last === 'string' &&
    typeof (u.name as Record<string, unknown>).full === 'string' &&
    (u.gender === 'male' || u.gender === 'female') &&
    typeof u.age === 'number' &&
    typeof u.ageGroup === 'string' &&
    u.birthDate instanceof Date &&
    typeof u.nationality === 'string' &&
    typeof u.ethnicity === 'string' &&
    typeof u.email === 'string' &&
    typeof u.username === 'string' &&
    typeof u.phone === 'string' &&
    typeof u.address === 'object' &&
    typeof u.locale === 'string'
  );
}

/**
 * Create a test seed from a test name
 */
export function testSeed(testName: string): string {
  return `test-${testName}-${Date.now()}`;
}
