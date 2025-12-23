import type { Gender, UserName } from '../types';
import type { SeededRandom } from '../random';
import { NameRegistry } from './name-registry';

/**
 * Generate a name for given nationality and gender
 */
export function generateName(
  nationality: string,
  gender: Gender,
  random: SeededRandom
): UserName {
  const firstNames = NameRegistry.getFirstNames(nationality, gender);
  const lastNames = NameRegistry.getLastNames(nationality);

  const first = random.pick(firstNames);
  const last = random.pick(lastNames);

  return {
    first,
    last,
    full: `${first} ${last}`,
  };
}
