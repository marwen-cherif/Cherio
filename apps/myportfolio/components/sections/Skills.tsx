'use client';

import { useTranslations } from 'next-intl';
import { skills } from '@/data/career';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

interface SkillsProps {
  locale: string;
}

export default function Skills({ locale }: SkillsProps) {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillCategory, idx) => (
            <AnimatedSection key={idx} direction="up" delay={idx * 0.1}>
              <AnimatedCard className="p-6" delay={idx * 0.1}>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-8 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                  {skillCategory.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx * 0.1) + (skillIdx * 0.05) }}
                      whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))', color: 'white' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
