'use client';

import { useTranslations } from 'next-intl';
import { personalInfo } from '@/data/career';
import { Mail, MapPin, Globe, Linkedin, Github, Phone } from 'iconoir-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';

interface ContactProps {
  locale: string;
}

export default function Contact({ locale }: ContactProps) {
  const t = useTranslations('contact');

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.linkedin, label: t('linkedin') },
    { icon: Github, href: personalInfo.github, label: t('github') },
    { icon: Globe, href: personalInfo.upwork, label: t('upwork') },
  ].filter((link) => link.href);

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="down">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text">{t('title')}</h2>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">{t('subtitle')}</p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('description')}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <AnimatedCard className="p-8 md:p-12" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8">{t('contactInfo')}</h3>
                  <div className="space-y-6">
                    <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }}>
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{t('location')}</p>
                        <p className="text-muted-foreground">
                          {personalInfo.address || personalInfo.location}
                        </p>
                      </div>
                    </motion.div>

                    {personalInfo.phone && (
                      <motion.a
                        href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                        className="flex items-start gap-4 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                          <Phone className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">{t('phone')}</p>
                          <p className="text-primary group-hover:underline">{personalInfo.phone}</p>
                        </div>
                      </motion.a>
                    )}

                    {personalInfo.email && (
                      <motion.a
                        href={`mailto:${personalInfo.email}`}
                        className="flex items-start gap-4 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                          <Mail className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">{t('email')}</p>
                          <p className="text-primary group-hover:underline">{personalInfo.email}</p>
                        </div>
                      </motion.a>
                    )}

                    {personalInfo.website && (
                      <motion.a
                        href={personalInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                          <Globe className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">{t('website')}</p>
                          <p className="text-primary group-hover:underline">
                            {personalInfo.website}
                          </p>
                        </div>
                      </motion.a>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8">{t('socialLinks')}</h3>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                         <motion.a
                           key={link.label}
                           href={link.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors group"
                           whileHover={{ x: 5, scale: 1.02 }}
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                         >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                            <Icon className="w-6 h-6 text-primary group-hover:text-primary transition-colors" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
