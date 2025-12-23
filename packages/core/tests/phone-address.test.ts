import { describe, it, expect } from 'vitest';
import { generatePhone, generateAddress } from '../src/generators';
import { SeededRandom } from '../src/random';
import '../src/locales'; // Register locales

describe('Phone Generator', () => {
  it('should generate Senegalese phone number', () => {
    const random = new SeededRandom('sn-phone');
    const phone = generatePhone('SN', random);

    // Doit correspondre aux préfixes opérateurs réels (70, 76, 77, 78)
    expect(phone).toMatch(/^\+221 7[0678] \d{3} \d{2} \d{2}$/);
  });

  it('should generate Congo phone number', () => {
    const random = new SeededRandom('cg-phone');
    const phone = generatePhone('CG', random);

    expect(phone).toMatch(/^\+242 0[456] \d{3} \d{2} \d{2}$/);
  });

  it('should use fallback for unknown nationality', () => {
    const random = new SeededRandom('unknown');
    const phone = generatePhone('XX', random);

    expect(phone).toMatch(/^\+1 \d{3}-\d{3}-\d{4}$/);
  });

  it('should be deterministic', () => {
    const random1 = new SeededRandom('det-phone');
    const random2 = new SeededRandom('det-phone');

    expect(generatePhone('FR', random1)).toBe(generatePhone('FR', random2));
  });
});

describe('Address Generator', () => {
  it('should generate Senegalese address', () => {
    const random = new SeededRandom('sn-addr');
    const address = generateAddress('SN', random);

    expect(address.country).toBe('SN');
    expect(['Dakar', 'Thiès', 'Saint-Louis', 'Rufisque', 'Kaolack', 'Ziguinchor', 'Touba'])
      .toContain(address.city);
  });

  it('should include postal code when available', () => {
    // Force Dakar which has postal codes
    const random = new SeededRandom('dakar-test-123');
    let foundPostalCode = false;

    for (let i = 0; i < 20; i++) {
      const address = generateAddress('SN', new SeededRandom(`sn-postal-${i}`));
      if (address.postalCode) {
        foundPostalCode = true;
        break;
      }
    }

    expect(foundPostalCode).toBe(true);
  });

  it('should be deterministic', () => {
    const random1 = new SeededRandom('det-addr');
    const random2 = new SeededRandom('det-addr');

    const addr1 = generateAddress('CG', random1);
    const addr2 = generateAddress('CG', random2);

    expect(addr1.city).toBe(addr2.city);
    expect(addr1.street).toBe(addr2.street);
  });
});
