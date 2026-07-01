'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'iconoir-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = pathname.split('/')[1] || 'en';
  const cvHref = `/cv/Marwen-Cherif-CV-${locale === 'fr' ? 'FR' : 'EN'}.pdf`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#skills', label: t('skills') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-md"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-xl md:text-2xl font-bold gradient-text">
            Marwen Cherif
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white dark:text-white hover:text-primary transition-colors font-semibold relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
            >
              <Download className="w-4 h-4" />
              {t('downloadCV')}
            </a>
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
              <Link
                href="/"
                locale="en"
                className={cn(
                  "px-3 py-1.5 rounded-lg font-semibold transition-all",
                  locale === 'en'
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                EN
              </Link>
              <Link
                href="/"
                locale="fr"
                className={cn(
                  "px-3 py-1.5 rounded-lg font-semibold transition-all",
                  locale === 'fr'
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                FR
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white dark:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 rounded-lg text-white dark:text-white hover:text-primary hover:bg-white/10 transition-colors font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-4 pt-2">
                  <a
                    href={cvHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <Download className="w-5 h-5" />
                    {t('downloadCV')}
                  </a>
                </div>
                <div className="flex items-center space-x-2 pt-4 border-t border-white/20 px-4">
                  <Link
                    href="/"
                    locale="en"
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-semibold transition-all",
                      locale === 'en'
                        ? "bg-primary text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    EN
                  </Link>
                  <Link
                    href="/"
                    locale="fr"
                    className={cn(
                      "px-3 py-1.5 rounded-lg font-semibold transition-all",
                      locale === 'fr'
                        ? "bg-primary text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    FR
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
