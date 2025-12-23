export { LocaleRegistry } from './locale-registry';
export { FALLBACK_LOCALE, STREET_NAMES } from './fallback-locale';

// Register built-in locales
import { SN_LOCALE } from './data/sn';
import { CG_LOCALE } from './data/cg';
import { FR_LOCALE } from './data/fr';
import { LocaleRegistry } from './locale-registry';

LocaleRegistry.register(SN_LOCALE);
LocaleRegistry.register(CG_LOCALE);
LocaleRegistry.register(FR_LOCALE);
