'use client';

import { useTranslations } from 'next-intl';
import { personalInfo } from '@/data/career';
import { ArrowDown, Mail, MapPin } from 'iconoir-react';
import { Link } from '@/i18n/routing';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero');
  const spinControls = useAnimationControls();

  // Occasionally, at random intervals, the avatar does a full-turn (360°) spin
  // in a random direction, then eases smoothly back to its idle animation.
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const runSpin = async () => {
      if (cancelled) return;
      const direction = Math.random() < 0.5 ? 1 : -1;
      try {
        await spinControls.start({
          rotate: [0, direction * 360, 0],
          transition: {
            duration: 2.2,
            times: [0, 0.55, 1],
            ease: ['easeOut', 'easeInOut'],
          },
        });
      } catch {
        // animation interrupted (e.g. unmount) — ignore
      }
      if (!cancelled) scheduleNext();
    };

    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 9000; // every ~6–15s
      timeoutId = setTimeout(runSpin, delay);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      spinControls.stop();
    };
  }, [spinControls]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          <AnimatedSection direction="scale" delay={0.2}>
            <div className="mb-8">
              {/* Outer layer: occasional random full-turn spin (controlled) */}
              <motion.div animate={spinControls} className="inline-block mb-6">
                {/* Inner layer: continuous idle pulse + gentle wobble */}
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div>
                      {personalInfo.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="down" delay={0.3}>
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold mb-4 gradient-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {personalInfo.name}
            </motion.h1>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
                {t('title')}
              </h2>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
                {t('aiTouch')}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('subtitle')}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin color="white" className="w-5 h-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {personalInfo.location}
                </span>
              </motion.div>
              {personalInfo.email && (
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail color="white" className="w-5 h-5 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {personalInfo.email}
                  </span>
                </motion.a>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link href="#projects">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  {t('cta')}
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white">
                  {t('scrollDown')}
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={1}>
            <motion.div
              className="flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <a
                href="#about"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Scroll down"
              >
                <ArrowDown className="w-8 h-8" />
              </a>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
