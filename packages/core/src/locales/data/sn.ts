import type { LocaleData } from '../../types';

export const SN_LOCALE: LocaleData = {
  code: 'SN',
  phone: {
    countryCode: '+221',
    // Préfixes opérateurs réels : Orange (77), Free (76), Expresso (70), Promobile (78)
    formats: ['77 XXX XX XX', '76 XXX XX XX', '78 XXX XX XX', '70 XXX XX XX'],
    mobileOnly: true,
  },
  address: {
    cities: [
      { name: 'Dakar', weight: 40, postalCodes: ['10000', '10200', '10300'] },
      { name: 'Thiès', weight: 15, postalCodes: ['21000'] },
      { name: 'Saint-Louis', weight: 10, postalCodes: ['32000'] },
      { name: 'Rufisque', weight: 8, postalCodes: ['11000'] },
      { name: 'Kaolack', weight: 7, postalCodes: ['43000'] },
      { name: 'Ziguinchor', weight: 5 },
      { name: 'Touba', weight: 5 },
    ],
    streetFormats: ['Rue {number}', 'Avenue {name}', 'Quartier {district}'],
    districts: ['Médina', 'Plateau', 'Grand Dakar', 'Parcelles Assainies', 'Pikine', 'Guédiawaye'],
  },
  email: {
    domains: ['gmail.com', 'yahoo.fr', 'orange.sn', 'hotmail.com'],
  },
};
