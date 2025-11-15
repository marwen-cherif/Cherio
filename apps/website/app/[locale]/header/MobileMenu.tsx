'use client';

import { useState, useEffect } from 'react';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileMenuProps {
  locale: string;
  isOpen: boolean;
  onClose: () => void;
  translations: {
    home: string;
    apps: string;
    contact: string;
    about: string;
    close: string;
    menu: string;
  };
}

const menuItems = [
  { href: '/', icon: '🏠', labelKey: 'home' as const },
  { href: '#apps', icon: '📱', labelKey: 'apps' as const },
  { href: '/contact', icon: '✉️', labelKey: 'contact' as const },
  { href: '#about', icon: 'ℹ️', labelKey: 'about' as const },
];

export default function MobileMenu({ locale, isOpen, onClose, translations }: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <>
      {/* Overlay with backdrop blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-gradient-to-br from-white via-gray-50 to-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {translations.menu}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 group"
              aria-label={translations.close}
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
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                locale={locale}
                onClick={handleLinkClick}
                className={`group flex items-center gap-4 py-4 px-5 rounded-xl text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium transform hover:translate-x-2 hover:scale-[1.02] ${
                  isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{
                  transitionDelay: `${index * 50 + 100}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-md">
                  {item.icon}
                </div>
                <span className="flex-1 text-lg">{translations[item.labelKey]}</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Footer with Language Switcher */}
          <div className="p-6 border-t border-gray-200 bg-gray-50/50">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-3">Langue / Language</p>
              <div className="flex justify-center">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                © 2025 Cherio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

