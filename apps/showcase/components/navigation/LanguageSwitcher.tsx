'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { ButtonPlain } from '@/components/ui/ButtonPlain';
import { ButtonSize } from '@/components/ui/button.types';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative group">
      <ButtonPlain
        variant="ghost"
        size={ButtonSize.Small}
        className="flex items-center gap-2"
        aria-label="Change language"
      >
        <span className="hidden sm:inline">
          {languages.find(l => l.code === locale)?.code.toUpperCase() || locale.toUpperCase()}
        </span>

        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </ButtonPlain>

      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {languages.map((lang) => (
            <ButtonPlain
              key={lang.code}
              variant="ghost"
              size={ButtonSize.Small}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 ${
                locale === lang.code
                  ? 'bg-accent/30 text-primary'
                  : ''
              }`}
            >
              <span>{lang.name}</span>
            </ButtonPlain>
          ))}
        </div>
      </div>
    </div>
  );
}

