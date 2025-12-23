import { describe, it, expect } from 'vitest';
import { generateEmail, generateUsername } from '../src/generators';
import { SeededRandom } from '../src/random';
import type { UserName } from '../src/types';

describe('Email Generator', () => {
  const name: UserName = {
    first: 'John',
    last: 'Doe',
    full: 'John Doe',
  };

  it('should generate valid email format', () => {
    const random = new SeededRandom('email');
    const email = generateEmail(name, random);

    expect(email).toMatch(/^[a-z0-9._]+@[a-z.]+$/);
  });

  it('should use provided domains', () => {
    const random = new SeededRandom('domain');
    const domains = ['custom.com'];
    const email = generateEmail(name, random, domains);

    expect(email).toContain('@custom.com');
  });

  it('should handle accented names', () => {
    const accentedName: UserName = {
      first: 'José',
      last: 'García',
      full: 'José García',
    };
    const random = new SeededRandom('accents');
    const email = generateEmail(accentedName, random);

    expect(email).toMatch(/^[a-z0-9._]+@[a-z.]+$/);
    expect(email).not.toContain('é');
    expect(email).not.toContain('í');
  });

  it('should be deterministic with same seed', () => {
    const random1 = new SeededRandom('deterministic');
    const random2 = new SeededRandom('deterministic');

    expect(generateEmail(name, random1)).toBe(generateEmail(name, random2));
  });
});

describe('Username Generator', () => {
  const name: UserName = {
    first: 'Jane',
    last: 'Smith',
    full: 'Jane Smith',
  };

  it('should generate valid username', () => {
    const random = new SeededRandom('username');
    const username = generateUsername(name, random);

    expect(username).toMatch(/^[a-z0-9_]+$/);
  });

  it('should handle accented names', () => {
    const accentedName: UserName = {
      first: 'Müller',
      last: 'Schäfer',
      full: 'Müller Schäfer',
    };
    const random = new SeededRandom('accents-user');
    const username = generateUsername(accentedName, random);

    expect(username).toMatch(/^[a-z0-9_]+$/);
  });

  it('should be deterministic with same seed', () => {
    const random1 = new SeededRandom('user-det');
    const random2 = new SeededRandom('user-det');

    expect(generateUsername(name, random1)).toBe(generateUsername(name, random2));
  });
});
