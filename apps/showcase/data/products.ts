import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: {
      fr: 'Produit Artisanal Premium',
      en: 'Premium Artisan Product',
      ar: 'منتج حرفي متميز'
    },
    description: {
      fr: 'Un produit artisanal de qualité supérieure, fabriqué à la main avec des matériaux naturels et durables. Chaque pièce est unique et témoigne de notre savoir-faire traditionnel.',
      en: 'A superior quality artisan product, handmade with natural and durable materials. Each piece is unique and showcases our traditional craftsmanship.',
      ar: 'منتج حرفي عالي الجودة، مصنوع يدوياً من مواد طبيعية ومتينة. كل قطعة فريدة من نوعها وتظهر براعتنا التقليدية.'
    },
    shortDescription: {
      fr: 'Produit artisanal de qualité supérieure',
      en: 'Superior quality artisan product',
      ar: 'منتج حرفي عالي الجودة'
    },
    price: 49.99,
    currency: 'EUR',
    image: '/images/product-1.jpg', // Image principale
    images: [
      '/images/product-1-2.jpg', // Images supplémentaires
      '/images/product-1-3.jpg',
      '/images/product-1-4.jpg',
      '/images/product-1-5.jpg',
      '/images/product-1-6.jpg'
    ],
    video: '/videos/product-1.mp4', // Vidéo optionnelle (sera affichée en premier si présente)
    links: {
      amazon: 'https://amazon.com/product-1',
      etsy: 'https://etsy.com/product-1',
      vinted: 'https://vinted.com/product-1'
    },
    featured: true,
    category: 'artisanat'
  },
  {
    id: '2',
    name: {
      fr: 'Création Unique en Édition Limitée',
      en: 'Unique Limited Edition Creation',
      ar: 'إبداع فريد بإصدار محدود'
    },
    description: {
      fr: 'Une création exclusive disponible en édition limitée. Ce produit reflète notre engagement envers l\'excellence et l\'innovation dans l\'artisanat moderne.',
      en: 'An exclusive creation available in limited edition. This product reflects our commitment to excellence and innovation in modern craftsmanship.',
      ar: 'إبداع حصري متاح بإصدار محدود. يعكس هذا المنتج التزامنا بالتميز والابتكار في الحرفية الحديثة.'
    },
    shortDescription: {
      fr: 'Création exclusive en édition limitée',
      en: 'Exclusive limited edition creation',
      ar: 'إبداع حصري بإصدار محدود'
    },
    price: 79.99,
    currency: 'EUR',
    image: '/images/product-2.jpg', // Add your image at public/images/product-2.jpg
    links: {
      amazon: 'https://amazon.com/product-2',
      etsy: 'https://etsy.com/product-2'
    },
    featured: true,
    category: 'edition-limitee'
  },
  {
    id: '3',
    name: {
      fr: 'Collection Signature',
      en: 'Signature Collection',
      ar: 'مجموعة التوقيع'
    },
    description: {
      fr: 'Notre collection signature qui incarne l\'essence de notre marque. Des produits soigneusement conçus pour allier esthétique et fonctionnalité.',
      en: 'Our signature collection that embodies the essence of our brand. Carefully designed products that combine aesthetics and functionality.',
      ar: 'مجموعتنا المميزة التي تجسد جوهر علامتنا التجارية. منتجات مصممة بعناية تجمع بين الجمال والوظيفة.'
    },
    shortDescription: {
      fr: 'Collection signature de la marque',
      en: 'Brand signature collection',
      ar: 'مجموعة التوقيع للعلامة التجارية'
    },
    price: 59.99,
    currency: 'EUR',
    image: '/images/product-3.jpg', // Add your image at public/images/product-3.jpg
    links: {
      etsy: 'https://etsy.com/product-3',
      vinted: 'https://vinted.com/product-3'
    },
    featured: false,
    category: 'signature'
  }
];

