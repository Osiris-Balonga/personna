import type { UserName } from '../types';
import type { SeededRandom } from '../random';

/**
 * Normalize string for username
 */
function normalizeForUsername(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_]/g, '');
}

/**
 * Generate username patterns
 */
function getUsernamePatterns(name: UserName): string[] {
  const first = normalizeForUsername(name.first);
  const last = normalizeForUsername(name.last);

  return [
    `${first}_${last}`,
    `${first}${last}`,
    `${first[0]}${last}`,
    `${first}_${last[0]}`,
    `${last}_${first}`,
    `${first}`,
    `${last}${first[0]}`,
  ];
}

/**
 * Generate username
 */
export function generateUsername(name: UserName, random: SeededRandom): string {
  const patterns = getUsernamePatterns(name);
  const pattern = random.pick(patterns);

  // Add numbers for uniqueness
  const addNumbers = random.boolean(0.5);
  const suffix = addNumbers ? random.int(1, 999).toString() : '';

  return `${pattern}${suffix}`;
}
