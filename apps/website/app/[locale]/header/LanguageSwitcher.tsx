import { Link } from '../../../i18n/routing';
import { routing } from '../../../i18n/routing';

export default async function LanguageSwitcher({ locale }: { locale: string }) {
  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((loc) => {
        const isActive = locale === loc;

        return (
          <Link
            key={loc}
            href={`/`}
            locale={loc}
            aria-label={`Switch to ${loc.toUpperCase()}`}
            aria-current={isActive ? 'page' : undefined}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              isActive
                ? 'bg-gray-900 text-white cursor-default pointer-events-none'
                : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
