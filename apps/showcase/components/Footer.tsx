'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-accent/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
                <div>
                    <span className="text-1xl font-bold text-primary">Eva Accessories</span>
                    <div className="text-sm text-secondary">by Cherio</div>
                </div>
            </h3>
            <p className="text-sm text-secondary">
                {t('description')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              {t('links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-secondary hover:text-primary transition-colors"
                >
                    {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-secondary hover:text-primary transition-colors"
                >
                    {t('products')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary hover:text-primary transition-colors"
                >
                    {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              {locale === 'fr' ? 'Légal' : locale === 'en' ? 'Legal' : 'قانوني'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t('legal')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-secondary">
          <p>© {new Date().getFullYear()} Cherio. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  );
}

