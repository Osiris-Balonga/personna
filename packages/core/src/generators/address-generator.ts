import type { Address } from '../types';
import type { SeededRandom } from '../random';
import { LocaleRegistry } from '../locales/locale-registry';
import { FALLBACK_LOCALE, STREET_NAMES } from '../locales/fallback-locale';

/**
 * Generate address based on nationality
 */
export function generateAddress(nationality: string, random: SeededRandom): Address {
  const locale = LocaleRegistry.get(nationality) ?? FALLBACK_LOCALE;

  // Pick city using weights
  const cities = locale.address.cities;
  const city = random.weightedPick(
    cities.map((c) => ({ value: c, weight: c.weight }))
  );

  // Generate street
  const streetFormat = random.pick(locale.address.streetFormats);
  const streetNumber = random.int(1, 200);
  const streetName = random.pick(STREET_NAMES);
  const district = locale.address.districts?.length
    ? random.pick(locale.address.districts)
    : '';

  const street = streetFormat
    .replace('{number}', streetNumber.toString())
    .replace('{name}', streetName)
    .replace('{street}', streetName)
    .replace('{district}', district);

  // Pick postal code if available
  const postalCode = city.postalCodes?.length
    ? random.pick(city.postalCodes)
    : undefined;

  return {
    street: street.trim(),
    city: city.name,
    country: nationality.toUpperCase(),
    postalCode,
    region: city.region,
  };
}
