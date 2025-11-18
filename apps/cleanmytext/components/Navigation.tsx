'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, FileJson, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export default function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      href: '/',
      label: t('home'),
      icon: <Home className="h-5 w-5" />,
      description: t('homeDescription'),
    },
    {
      href: '/json-toon',
      label: t('jsonToon'),
      icon: <FileJson className="h-5 w-5" />,
      description: t('jsonToonDescription'),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/en' || pathname === '/fr';
    }
    return pathname?.includes(href);
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md'
          : 'bg-white dark:bg-slate-900'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity"
          >
            <Sparkles className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <span className="hidden sm:inline">Text AI Tools</span>
            <span className="hidden md:inline text-sm font-normal text-slate-500 dark:text-slate-400">
              by Cherio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  className={cn(
                    'flex items-center gap-2',
                    isActive(item.href) && 'shadow-sm'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('closeMenu') : t('openMenu')}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                )}
                onClick={() => setIsOpen(false)}
              >
                <div
                  className={cn(
                    'mt-0.5',
                    isActive(item.href)
                      ? 'text-slate-900 dark:text-slate-100'
                      : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={cn(
                      'font-medium',
                      isActive(item.href)
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-slate-900 dark:text-slate-100'
                    )}
                  >
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.description}
                  </div>
                </div>
                {isActive(item.href) && (
                  <div className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100 mt-2" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

