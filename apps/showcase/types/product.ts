export interface Product {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  shortDescription: {
    fr: string;
    en: string;
    ar: string;
  };
  price: number;
  currency: string;
  image: string;
  images?: string[];
  video?: string;
  links: {
    amazon?: string;
    etsy?: string;
    vinted?: string;
  };
  featured?: boolean;
  category?: string;
}

