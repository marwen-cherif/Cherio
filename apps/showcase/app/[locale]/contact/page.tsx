'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { PageHeader } from '@/components/sections/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <PageHeader title={t('title')} subtitle={t('subtitle')} isRTL={isRTL} />
        <ContactForm isRTL={isRTL} />
      </div>
    </div>
  );
}

