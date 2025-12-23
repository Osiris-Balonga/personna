import type { LocaleData } from '../../types';

export const FR_LOCALE: LocaleData = {
  code: 'FR',
  phone: {
    countryCode: '+33',
    formats: ['6 XX XX XX XX', '7 XX XX XX XX'],
    mobileOnly: true,
  },
  address: {
    cities: [
      { name: 'Paris', weight: 25, postalCodes: ['75001', '75002', '75003', '75004'] },
      { name: 'Marseille', weight: 12, postalCodes: ['13001', '13002'] },
      { name: 'Lyon', weight: 10, postalCodes: ['69001', '69002'] },
      { name: 'Toulouse', weight: 8, postalCodes: ['31000'] },
      { name: 'Nice', weight: 6, postalCodes: ['06000'] },
      { name: 'Bordeaux', weight: 5, postalCodes: ['33000'] },
    ],
    streetFormats: ['{number} rue {name}', '{number} avenue {name}', '{number} boulevard {name}'],
    districts: [],
  },
  email: {
    domains: ['gmail.com', 'orange.fr', 'free.fr', 'sfr.fr', 'hotmail.fr'],
  },
};
