'use client';

import { useTranslations } from 'next-intl';
import { Language, Heart } from 'iconoir-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface LanguageItem {
  name: string;
  level: string;
}

export default function LanguagesInterests() {
  const tLang = useTranslations('languages');
  const tInterests = useTranslations('interests');

  const languageItems = tLang.raw('items') as LanguageItem[];
  const interestItems = tInterests.raw('items') as string[];

  return (
    <section id="languages" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-transparent to-pink-500/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Languages */}
          <AnimatedSection direction="left">
            <AnimatedCard className="p-8 h-full" delay={0.1}>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Language className="w-6 h-6 text-white" />
                </span>
                {tLang('title')}
              </h3>
              <div className="space-y-4">
                {languageItems.map((lang, idx) => (
                  <motion.div
                    key={lang.name}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="font-semibold text-foreground">{lang.name}</span>
                    <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {lang.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </AnimatedSection>

          {/* Interests */}
          <AnimatedSection direction="right">
            <AnimatedCard className="p-8 h-full" delay={0.2}>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </span>
                {tInterests('title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {interestItems.map((interest, idx) => (
                  <motion.span
                    key={interest}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </AnimatedCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
