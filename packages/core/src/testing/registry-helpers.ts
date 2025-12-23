import { NameRegistry } from '../names';
import { LocaleRegistry } from '../locales/locale-registry';

/**
 * Reset all registries to clean state
 * À utiliser dans beforeEach() des tests pour éviter la pollution
 */
export function resetAllRegistries(): void {
  NameRegistry.clear();
  LocaleRegistry.clear();
}

/**
 * Re-enregistrer les locales par défaut après un clear
 */
export async function reregisterDefaultLocales(): Promise<void> {
  // Import dynamique pour ré-enregistrer les locales
  await import('../locales');
}
