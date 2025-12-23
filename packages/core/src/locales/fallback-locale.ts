import type { LocaleData } from '../types';

export const FALLBACK_LOCALE: LocaleData = {
  code: 'XX',
  phone: {
    countryCode: '+1',
    formats: ['XXX-XXX-XXXX'],
  },
  address: {
    cities: [
      { name: 'New York', weight: 20 },
      { name: 'Los Angeles', weight: 15 },
      { name: 'Chicago', weight: 10 },
      { name: 'Houston', weight: 8 },
      { name: 'Phoenix', weight: 7 },
    ],
    streetFormats: ['{number} {street} Street', '{number} {street} Avenue'],
    districts: ['Downtown', 'Midtown', 'Uptown', 'Westside', 'Eastside'],
  },
  email: {
    domains: ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'],
  },
};

export const STREET_NAMES = [
  'Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Park',
  'Lake', 'Hill', 'River', 'Spring', 'Valley', 'Forest',
];
