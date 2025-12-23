export interface WeightedCity {
  name: string;
  weight: number;
  postalCodes?: string[];
  region?: string;
}

export interface LocalePhone {
  countryCode: string;
  formats: string[];
  mobileOnly?: boolean;
}

export interface LocaleAddress {
  cities: WeightedCity[];
  streetFormats: string[];
  districts?: string[];
  states?: string[];
}

export interface LocaleEmail {
  domains: string[];
}

export interface LocaleData {
  code: string;
  phone: LocalePhone;
  address: LocaleAddress;
  email: LocaleEmail;
}
