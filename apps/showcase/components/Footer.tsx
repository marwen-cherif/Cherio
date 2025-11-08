'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border bg-accent/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Cherio
            </h3>
            <p className="text-sm text-secondary">
              Des produits artisanaux de qualité, créés avec passion et attention aux détails.
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
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">
              Légal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/legal"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t('legal')}
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-secondary hover:text-primary transition-colors"
                >
                  {t('privacy')}
                </a>
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

