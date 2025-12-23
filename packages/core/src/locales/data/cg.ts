import type { LocaleData } from '../../types';

export const CG_LOCALE: LocaleData = {
  code: 'CG',
  phone: {
    countryCode: '+242',
    formats: ['06 XXX XX XX', '05 XXX XX XX', '04 XXX XX XX'],
    mobileOnly: true,
  },
  address: {
    cities: [
      { name: 'Brazzaville', weight: 50 },
      { name: 'Pointe-Noire', weight: 35 },
      { name: 'Dolisie', weight: 5 },
      { name: 'Nkayi', weight: 3 },
      { name: 'Ouesso', weight: 2 },
      { name: 'Owando', weight: 2 },
    ],
    streetFormats: ['Avenue {name}', 'Rue {name}', 'Quartier {district}'],
    districts: ['Bacongo', 'Poto-Poto', 'Moungali', 'Ouenzé', 'Talangaï', 'Mfilou', 'Makélékélé'],
  },
  email: {
    domains: ['gmail.com', 'yahoo.fr', 'hotmail.com'],
  },
};
