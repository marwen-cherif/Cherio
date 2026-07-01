'use client';

import { useTranslations } from 'next-intl';
import { experiences } from '@/data/career';
import { Calendar, MapPin, Building } from 'iconoir-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

interface ExperienceProps {
  locale: string;
}

export default function Experience({ locale }: ExperienceProps) {
  const t = useTranslations('experience');
  const tCommon = useTranslations('common');
  const l: 'en' | 'fr' = locale === 'fr' ? 'fr' : 'en';

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
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

        <div className="max-w-5xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.id} direction="right" delay={index * 0.1}>
              <AnimatedCard className="p-6 md:p-8 relative overflow-hidden" delay={index * 0.1}>
                {/* Timeline line */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent hidden md:block" />
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Building className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                          {exp.position[l]}
                        </h3>
                        <h4 className="text-xl md:text-2xl text-primary mb-3 font-semibold">
                          {exp.company}
                        </h4>
                      </div>
                      {exp.current && (
                        <motion.span
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded-full self-start"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {tCommon('current')}
                        </motion.span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location[l]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.startDate} - {exp.current ? tCommon('present') : exp.endDate}
                        </span>
                      </div>
                    </div>

                    <p className="text-foreground mb-4 text-lg">
                      {exp.description[l][0]}
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                      {exp.description[l].slice(1).map((item, idx) => (
                        <li key={idx} className="pl-2">{item}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
