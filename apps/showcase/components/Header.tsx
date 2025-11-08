'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            Cherio
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={`transition-colors hover:text-secondary ${
                isActive('/') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href="/products"
              className={`transition-colors hover:text-secondary ${
                isActive('/products') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('products')}
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-secondary ${
                isActive('/about') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-secondary ${
                isActive('/contact') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('contact')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-secondary"
            aria-label={t('menu')}
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
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col gap-4 px-4 py-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors ${
                isActive('/') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href="/products"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors ${
                isActive('/products') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('products')}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors ${
                isActive('/about') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('about')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`transition-colors ${
                isActive('/contact') ? 'text-primary font-medium' : 'text-secondary'
              }`}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

