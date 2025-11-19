'use client';

import { useTranslations } from 'next-intl';
import { education } from '@/data/career';
import { GraduationCap, Calendar, MapPin } from 'iconoir-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

interface EducationProps {
  locale: string;
}

export default function Education({ locale }: EducationProps) {
  const t = useTranslations('education');

  return (
    <section id="education" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {education.map((edu, index) => (
            <AnimatedSection key={edu.id} direction="left" delay={index * 0.1}>
              <AnimatedCard className="p-6 md:p-8" delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-2">{edu.field}</p>
                    <h4 className="text-xl md:text-2xl text-primary mb-4 font-semibold">
                      {edu.institution}
                    </h4>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
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
