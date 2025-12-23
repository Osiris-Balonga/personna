import type { LocaleData } from '../types';

class LocaleRegistryClass {
  private locales: Map<string, LocaleData> = new Map();

  register(locale: LocaleData): void {
    this.locales.set(locale.code.toUpperCase(), locale);
  }

  get(nationality: string): LocaleData | undefined {
    return this.locales.get(nationality.toUpperCase());
  }

  has(nationality: string): boolean {
    return this.locales.has(nationality.toUpperCase());
  }

  clear(): void {
    this.locales.clear();
  }
}

export const LocaleRegistry = new LocaleRegistryClass();
