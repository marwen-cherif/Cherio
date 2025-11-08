'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-[#FFDBD9] bg-[#FFDBD9]/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-[#5C5451] mb-4">
              Cherio
            </h3>
            <p className="text-sm text-[#A18080]">
              Des produits artisanaux de qualité, créés avec passion et attention aux détails.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-[#5C5451] mb-4">
              {t('links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[#A18080] hover:text-[#5C5451] transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[#A18080] hover:text-[#5C5451] transition-colors"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#A18080] hover:text-[#5C5451] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-[#5C5451] mb-4">
              Légal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/legal"
                  className="text-[#A18080] hover:text-[#5C5451] transition-colors"
                >
                  {t('legal')}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-[#A18080] hover:text-[#5C5451] transition-colors"
                >
                  {t('privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-[#FFDBD9] pt-8 text-center text-sm text-[#A18080]">
          <p>© {new Date().getFullYear()} Cherio. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}

