'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { NavLink } from '@/components/navigation/NavLink';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher';
import CartIcon from '@/components/cart/CartIcon';
import { ButtonPlain } from '@/components/ui/ButtonPlain';
import { ButtonSize } from '@/components/ui/button.types';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-primary">Eva Accessories</span>
          <span className="text-sm text-secondary">by Cherio</span>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <NavLink href="/" pathname={pathname} label={t('home')} />
            <NavLink href="/products" pathname={pathname} label={t('products')} />
            <NavLink href="/about" pathname={pathname} label={t('about')} />
            <NavLink href="/contact" pathname={pathname} label={t('contact')} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CartIcon />
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <ButtonPlain
            variant="icon"
            size={ButtonSize.Normal}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('menu')}
            className="md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </ButtonPlain>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} pathname={pathname} />
    </header>
  );
}

