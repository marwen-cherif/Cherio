import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import HeaderClient from './HeaderClient';

export default async function Header({ locale }: { locale: string }) {
  const t = await getTranslations('common');

  return (
    <HeaderClient
      locale={locale}
      translations={{
        home: t('home'),
        apps: t('apps'),
        contact: t('contact'),
        about: t('about'),
        menu: t('menu'),
        close: t('close'),
      }}
    />
  );
}
