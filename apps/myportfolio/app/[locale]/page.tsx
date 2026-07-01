import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import LanguagesInterests from '@/components/sections/LanguagesInterests';
import Contact from '@/components/sections/Contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        'en': '/en',
        'fr': '/fr',
        'x-default': '/en',
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="flex flex-col">
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience locale={locale} />
      <Education locale={locale} />
      <Projects locale={locale} />
      <Skills locale={locale} />
      <LanguagesInterests />
      <Contact locale={locale} />
    </div>
  );
}

