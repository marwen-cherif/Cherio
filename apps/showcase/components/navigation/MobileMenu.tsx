'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { NavLink } from './NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const t = useTranslations('common');

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background">
      <div className="flex flex-col gap-4 px-4 py-4">
        <Link
          href="/"
          onClick={onClose}
          className={`transition-colors ${
            pathname === '/' ? 'text-primary font-medium' : 'text-secondary'
          }`}
        >
          {t('home')}
        </Link>
        <Link
          href="/products"
          onClick={onClose}
          className={`transition-colors ${
            pathname.startsWith('/products') ? 'text-primary font-medium' : 'text-secondary'
          }`}
        >
          {t('products')}
        </Link>
        <Link
          href="/about"
          onClick={onClose}
          className={`transition-colors ${
            pathname.startsWith('/about') ? 'text-primary font-medium' : 'text-secondary'
          }`}
        >
          {t('about')}
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className={`transition-colors ${
            pathname.startsWith('/contact') ? 'text-primary font-medium' : 'text-secondary'
          }`}
        >
          {t('contact')}
        </Link>
      </div>
    </div>
  );
}

