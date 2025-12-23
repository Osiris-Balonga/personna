import type { SeededRandom } from '../random';
import { LocaleRegistry } from '../locales/locale-registry';
import { FALLBACK_LOCALE } from '../locales/fallback-locale';

/**
 * Generate phone number based on nationality
 */
export function generatePhone(nationality: string, random: SeededRandom): string {
  const locale = LocaleRegistry.get(nationality) ?? FALLBACK_LOCALE;
  const format = random.pick(locale.phone.formats);

  // Replace X with random digits
  const number = format.replace(/X/g, () => random.int(0, 9).toString());

  return `${locale.phone.countryCode} ${number}`;
}
