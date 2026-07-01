'use client';

import { useTranslations } from 'next-intl';
import { personalInfo } from '@/data/career';
import { Linkedin, Github, Globe } from 'iconoir-react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Globe, href: personalInfo.website, label: 'Website' },
  ].filter(link => link.href);

  return (
    <footer className="bg-gradient-to-b from-background to-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <AnimatedSection direction="up">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">{personalInfo.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('description')}</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.1}>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    {tCommon('about')}
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-primary transition-colors">
                    {tCommon('experience')}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-primary transition-colors">
                    {tCommon('projects')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    {tCommon('contact')}
                  </a>
                </li>
              </ul>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.2}>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t('connect')}</h4>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        <AnimatedSection direction="up" delay={0.3}>
          <div className="pt-8 border-t border-border text-center space-y-2">
            <p className="text-muted-foreground">{t('copyright')}</p>
            <p className="text-sm text-muted-foreground">{t('builtWith')}</p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
