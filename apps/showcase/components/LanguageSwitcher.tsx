'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#A18080] hover:text-[#5C5451] transition-colors rounded-lg hover:bg-[#FFDBD9]/30"
        aria-label="Change language"
      >
        <span className="text-lg">
          {languages.find(l => l.code === locale)?.flag || '🌐'}
        </span>
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
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-[#FFDBD9] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                locale === lang.code
                  ? 'bg-[#FFDBD9]/30 text-[#5C5451]'
                  : 'text-[#A18080] hover:bg-[#FFDBD9]/20'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

