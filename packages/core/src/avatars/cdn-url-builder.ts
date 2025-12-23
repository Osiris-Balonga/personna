import type { AvatarStyle, AgeGroup, Ethnicity, Gender } from '../types';
import { DEFAULT_CONFIG } from '../types';

export interface AvatarUrlParams {
  style: AvatarStyle;
  ethnicity: Ethnicity;
  gender: Gender;
  ageGroup: AgeGroup;
  variation: string;
}

/**
 * Build CDN URL for avatar
 */
export function buildAvatarUrl(
  params: AvatarUrlParams,
  baseUrl: string = DEFAULT_CONFIG.cdnBaseUrl
): string {
  const { style, ethnicity, gender, ageGroup, variation } = params;
  const ext = style === 'realistic' ? 'webp' : 'svg';

  return `${baseUrl}/avatars/${style}/${ethnicity}/${gender}/${ageGroup}/${variation}.${ext}`;
}
