import type { UserName } from '../types';
import type { SeededRandom } from '../random';

const DEFAULT_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'mail.com',
];

/**
 * Normalize string for email (lowercase, remove accents, etc.)
 */
function normalizeForEmail(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric
}

/**
 * Generate email patterns
 */
function getEmailPatterns(name: UserName): string[] {
  const first = normalizeForEmail(name.first);
  const last = normalizeForEmail(name.last);

  return [
    `${first}.${last}`, // john.doe
    `${first}${last}`, // johndoe
    `${first[0]}${last}`, // jdoe
    `${first}_${last}`, // john_doe
    `${first}${last[0]}`, // johnd
    `${last}.${first}`, // doe.john
    `${first}${last.slice(0, 3)}`, // johndoe (truncated)
  ];
}

/**
 * Generate email address
 */
export function generateEmail(
  name: UserName,
  random: SeededRandom,
  domains: string[] = DEFAULT_DOMAINS
): string {
  const patterns = getEmailPatterns(name);
  const pattern = random.pick(patterns);
  const domain = random.pick(domains);

  // Optionally add numbers for uniqueness
  const addNumbers = random.boolean(0.3);
  const suffix = addNumbers ? random.int(1, 99).toString() : '';

  return `${pattern}${suffix}@${domain}`;
}
