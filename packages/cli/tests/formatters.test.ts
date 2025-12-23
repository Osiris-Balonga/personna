import { describe, it, expect } from 'vitest';
import { formatJson, formatCsv, formatSql } from '../src/formatters';
import type { GeneratedUser } from '@personna/core';

const mockUser: GeneratedUser = {
  id: 'test-id',
  name: { first: 'John', last: 'Doe', full: 'John Doe' },
  gender: 'male',
  age: 30,
  ageGroup: 'adult',
  birthDate: new Date('1994-01-01'),
  nationality: 'US',
  ethnicity: 'mixed',
  email: 'john@example.com',
  username: 'johndoe',
  phone: '+1 555-1234',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'US',
    postalCode: '10001',
  },
  locale: 'en_US',
  avatar: { id: 'av1', style: 'realistic', url: 'https://cdn.test/avatar.webp' },
};

describe('formatJson', () => {
  it('should format as valid JSON', () => {
    const output = formatJson([mockUser]);
    const parsed = JSON.parse(output);
    expect(parsed[0].id).toBe('test-id');
  });
});

describe('formatCsv', () => {
  it('should include headers', () => {
    const output = formatCsv([mockUser]);
    expect(output.startsWith('id,')).toBe(true);
  });

  it('should include user data', () => {
    const output = formatCsv([mockUser]);
    expect(output).toContain('John');
    expect(output).toContain('Doe');
  });

  it('should escape commas', () => {
    const userWithComma = {
      ...mockUser,
      address: { ...mockUser.address, street: '123, Main St' },
    };
    const output = formatCsv([userWithComma]);
    expect(output).toContain('"123, Main St"');
  });
});

describe('formatSql', () => {
  it('should generate INSERT statement', () => {
    const output = formatSql([mockUser]);
    expect(output).toContain('INSERT INTO users');
    expect(output).toContain('VALUES');
  });

  it('should escape single quotes', () => {
    const userWithQuote = {
      ...mockUser,
      name: { ...mockUser.name, last: "O'Brien", full: "John O'Brien" },
    };
    const output = formatSql([userWithQuote]);
    expect(output).toContain("O''Brien");
  });
});
