import type { AvatarCriteria, AvatarResult } from '../types';
import type { SeededRandom } from '../random';

/**
 * Mock avatar provider for testing
 * Returns placeholder URLs without requiring CDN
 */
export class MockAvatarProvider {
  pick(criteria: AvatarCriteria, random: SeededRandom): AvatarResult {
    const variation = random.boolean() ? '001' : '002';
    const id = `mock_${criteria.ethnicity}_${criteria.gender}_${criteria.ageGroup}_${variation}`;

    return {
      id,
      style: criteria.style,
      url: `https://placeholder.test/avatar/${id}.png`,
    };
  }
}
