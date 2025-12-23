import type { Gender } from '../types';
import type { NameProvider } from './name-provider';
import { FALLBACK_FIRST_NAMES, FALLBACK_LAST_NAMES } from './fallback-names';

/**
 * Registry for name providers
 * External packages register themselves here
 */
class NameRegistryClass {
  private providers: Map<string, NameProvider> = new Map();

  /**
   * Register a name provider for specific nationalities
   */
  register(provider: NameProvider): void {
    for (const nationality of provider.getSupportedNationalities()) {
      this.providers.set(nationality.toUpperCase(), provider);
    }
  }

  /**
   * Get first names for nationality and gender
   */
  getFirstNames(nationality: string, gender: Gender): string[] {
    const provider = this.providers.get(nationality.toUpperCase());
    if (provider) {
      const names = provider.getFirstNames(nationality, gender);
      if (names.length > 0) return names;
    }
    return FALLBACK_FIRST_NAMES[gender];
  }

  /**
   * Get last names for nationality
   */
  getLastNames(nationality: string): string[] {
    const provider = this.providers.get(nationality.toUpperCase());
    if (provider) {
      const names = provider.getLastNames(nationality);
      if (names.length > 0) return names;
    }
    return FALLBACK_LAST_NAMES;
  }

  /**
   * Check if nationality has a dedicated provider
   */
  hasProvider(nationality: string): boolean {
    return this.providers.has(nationality.toUpperCase());
  }

  /**
   * Clear all registered providers (for testing)
   */
  clear(): void {
    this.providers.clear();
  }
}

export const NameRegistry = new NameRegistryClass();
