'use client';

import { useState } from 'react';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

interface HeaderClientProps {
  locale: string;
  translations: {
    home: string;
    apps: string;
    contact: string;
    about: string;
    menu: string;
    close: string;
  };
}

export default function HeaderClient({ locale, translations }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              locale={locale}
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200"
            >
              Cherio
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                locale={locale}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {translations.home}
              </Link>
              <Link
                href="#apps"
                locale={locale}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {translations.apps}
              </Link>
              <Link
                href="/contact"
                locale={locale}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {translations.contact}
              </Link>
              <Link
                href="#about"
                locale={locale}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {translations.about}
              </Link>
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <LanguageSwitcher locale={locale} />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 group"
                aria-label={translations.menu}
              >
                <svg
                  className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu
        locale={locale}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        translations={translations}
      />
    </>
  );
}

