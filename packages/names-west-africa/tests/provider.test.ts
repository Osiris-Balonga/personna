import { describe, it, expect } from 'vitest';
import { WestAfricaNameProvider } from '../src/provider';

describe('WestAfricaNameProvider', () => {
  const provider = new WestAfricaNameProvider();

  it('should support SN, CI, NG, GH, ML', () => {
    const supported = provider.getSupportedNationalities();
    expect(supported).toContain('SN');
    expect(supported).toContain('CI');
    expect(supported).toContain('NG');
    expect(supported).toContain('GH');
    expect(supported).toContain('ML');
  });

  it('should return male first names for Senegal', () => {
    const names = provider.getFirstNames('SN', 'male');
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Mamadou');
    expect(names).toContain('Ousmane');
  });

  it('should return female first names for Senegal', () => {
    const names = provider.getFirstNames('SN', 'female');
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Fatou');
    expect(names).toContain('Aminata');
  });

  it('should return last names for Senegal', () => {
    const names = provider.getLastNames('SN');
    expect(names.length).toBeGreaterThan(0);
    expect(names).toContain('Diallo');
    expect(names).toContain('Ndiaye');
  });

  it('should handle lowercase nationality codes', () => {
    const names = provider.getFirstNames('sn', 'male');
    expect(names.length).toBeGreaterThan(0);
  });

  it('should return empty array for unknown nationality', () => {
    expect(provider.getFirstNames('XX', 'male')).toEqual([]);
    expect(provider.getLastNames('XX')).toEqual([]);
  });
});
