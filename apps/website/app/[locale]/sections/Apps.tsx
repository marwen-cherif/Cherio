'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cherioApps } from '../../../cherio.apps.config';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Apps() {
  const t = useTranslations('apps');
  const locale = useLocale() as 'fr' | 'en';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="apps" ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cherioApps.map((app, index) => (
            <div
              key={app.id}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Link href={`/${locale}/apps/${app.slug}`} className="block">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-300 hover:rotate-6">
                    <span className="text-2xl">📱</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{app.publicName[locale]}</h3>
                <p className="text-gray-600 text-sm mb-4">{app.description[locale]}</p>
              </Link>
              {app.published ? (
                <a
                  href={app.urls[locale]}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  {locale === 'fr' ? 'Visiter' : 'Visit'}
                </a>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded text-sm">
                  {t('comingSoon')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
