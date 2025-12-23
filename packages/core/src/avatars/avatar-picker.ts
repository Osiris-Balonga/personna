import type { AvatarCriteria, AvatarResult, FactoryConfig } from '../types';
import type { SeededRandom } from '../random';
import { DEFAULT_CONFIG } from '../types';
import { buildAvatarUrl } from './cdn-url-builder';
import { getParentRegion, getAdjacentAgeGroupForAvatar } from './avatar-fallback';

const VARIATIONS = ['001', '002'];

export class AvatarPicker {
  private config: FactoryConfig;

  constructor(config: Partial<FactoryConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Pick an avatar based on criteria
   */
  pick(criteria: AvatarCriteria, random: SeededRandom): AvatarResult | null {
    // Pick a random variation
    const variation = random.pick(VARIATIONS);

    return this.buildResult(criteria, variation);
  }

  /**
   * Pick with fallback chain if needed
   * (For now, we assume all combinations exist)
   */
  pickWithFallback(criteria: AvatarCriteria, random: SeededRandom): AvatarResult | null {
    // Try exact match first
    const result = this.pick(criteria, random);
    if (result) return result;

    // Fallback chain
    const fallbackChain: AvatarCriteria[] = [
      { ...criteria, ethnicity: getParentRegion(criteria.ethnicity) },
      { ...criteria, ageGroup: getAdjacentAgeGroupForAvatar(criteria.ageGroup) },
      { ...criteria, ethnicity: 'mixed' },
      {
        ...criteria,
        ethnicity: 'mixed',
        ageGroup: getAdjacentAgeGroupForAvatar(criteria.ageGroup),
      },
    ];

    for (const fallback of fallbackChain) {
      const variation = random.pick(VARIATIONS);
      return this.buildResult(fallback, variation);
    }

    // Handle based on config
    if (this.config.onMissingAvatar === 'error') {
      throw new Error(`No avatar found for criteria: ${JSON.stringify(criteria)}`);
    }

    return null;
  }

  private buildResult(criteria: AvatarCriteria, variation: string): AvatarResult {
    const url = buildAvatarUrl(
      {
        style: criteria.style,
        ethnicity: criteria.ethnicity,
        gender: criteria.gender,
        ageGroup: criteria.ageGroup,
        variation,
      },
      this.config.cdnBaseUrl
    );

    const id = `${criteria.ethnicity}_${criteria.gender}_${criteria.ageGroup}_${variation}`;

    return {
      id,
      style: criteria.style,
      url,
    };
  }
}

// Default instance
export const avatarPicker = new AvatarPicker();
