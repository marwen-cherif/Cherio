'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function Vision() {
  const t = useTranslations('vision');
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('content')}
          </p>
        </div>
      </div>
    </section>
  );
}

