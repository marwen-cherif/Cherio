// List of countries with their names in English and French
export interface CountryOption {
  value: string;
  label: string;
  labelFr?: string;
}

export const countries: CountryOption[] = [
  { value: 'FR', label: 'France', labelFr: 'France' },
  { value: 'BE', label: 'Belgium', labelFr: 'Belgique' },
  { value: 'CH', label: 'Switzerland', labelFr: 'Suisse' },
  { value: 'LU', label: 'Luxembourg', labelFr: 'Luxembourg' },
  { value: 'DE', label: 'Germany', labelFr: 'Allemagne' },
  { value: 'ES', label: 'Spain', labelFr: 'Espagne' },
  { value: 'IT', label: 'Italy', labelFr: 'Italie' },
  { value: 'GB', label: 'United Kingdom', labelFr: 'Royaume-Uni' },
  { value: 'PT', label: 'Portugal', labelFr: 'Portugal' },
  { value: 'NL', label: 'Netherlands', labelFr: 'Pays-Bas' },
  { value: 'AT', label: 'Austria', labelFr: 'Autriche' },
  { value: 'DK', label: 'Denmark', labelFr: 'Danemark' },
  { value: 'SE', label: 'Sweden', labelFr: 'Suède' },
  { value: 'NO', label: 'Norway', labelFr: 'Norvège' },
  { value: 'FI', label: 'Finland', labelFr: 'Finlande' },
  { value: 'IE', label: 'Ireland', labelFr: 'Irlande' },
  { value: 'PL', label: 'Poland', labelFr: 'Pologne' },
  { value: 'CZ', label: 'Czech Republic', labelFr: 'République tchèque' },
  { value: 'GR', label: 'Greece', labelFr: 'Grèce' },
  { value: 'US', label: 'United States', labelFr: 'États-Unis' },
  { value: 'CA', label: 'Canada', labelFr: 'Canada' },
  { value: 'AU', label: 'Australia', labelFr: 'Australie' },
  { value: 'NZ', label: 'New Zealand', labelFr: 'Nouvelle-Zélande' },
  { value: 'JP', label: 'Japan', labelFr: 'Japon' },
  { value: 'CN', label: 'China', labelFr: 'Chine' },
  { value: 'IN', label: 'India', labelFr: 'Inde' },
  { value: 'BR', label: 'Brazil', labelFr: 'Brésil' },
  { value: 'MX', label: 'Mexico', labelFr: 'Mexique' },
  { value: 'AR', label: 'Argentina', labelFr: 'Argentine' },
  { value: 'ZA', label: 'South Africa', labelFr: 'Afrique du Sud' },
];

// Helper function to get country label based on locale
export function getCountryLabel(country: CountryOption, locale: string): string {
  if (locale === 'fr' && country.labelFr) {
    return country.labelFr;
  }
  return country.label;
}

// Helper function to find country by value
export function findCountryByValue(value: string): CountryOption | undefined {
  return countries.find((country) => country.value === value);
}

