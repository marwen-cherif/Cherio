'use client';

import { useTranslations } from 'next-intl';
import { personalInfo } from '@/data/career';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface AboutProps {
  locale: string;
}

export default function About({ locale }: AboutProps) {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="down">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <AnimatedCard className="p-8 md:p-12" delay={0.3}>
              <p className="text-lg md:text-xl text-foreground leading-relaxed text-center">
                {personalInfo.bio[locale as 'en' | 'fr'] || personalInfo.bio.en}
              </p>
            </AnimatedCard>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
