'use client';

import { useTranslations } from 'next-intl';
import { projects } from '@/data/career';
import { NavArrowRight } from 'iconoir-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

interface ProjectsProps {
  locale: string;
}

export default function Projects({ locale }: ProjectsProps) {
  const t = useTranslations('projects');

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      
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
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} direction="scale" delay={index * 0.1}>
              <AnimatedCard className="p-6 h-full flex flex-col group" delay={index * 0.1}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground flex-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      whileHover={{ x: 5 }}
                      aria-label="Open project link"
                    >
                      <NavArrowRight className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 font-medium">
                  {project.period}
                </p>

                <p className="text-foreground mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {t('technologies')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
                        whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))', color: 'white' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {t('highlights')}:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="pl-2">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
