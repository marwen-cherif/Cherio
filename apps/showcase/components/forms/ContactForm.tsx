'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { socialLinks } from '@/config/socialLinks';
import { Button } from '@/components/ui/Button';

interface ContactFormProps {
  isRTL: boolean;
}

export function ContactForm({ isRTL }: ContactFormProps) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg border border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md border border-border px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isRTL={isRTL}
          isLoading={status === 'sending'}
          disabled={status === 'sending'}
          className="w-full"
        >
          {status === 'sending' ? t('sending') : t('send')}
        </Button>

        {status === 'success' && (
          <div className="rounded-md bg-accent p-4 text-primary">
            {t('success')}
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-md bg-accent p-4 text-secondary">
            {t('error')}
          </div>
        )}
      </form>

      <div className="mt-8 border-t border-border pt-8">
        <h3 className="text-lg font-semibold text-primary mb-4">
          {t('socialMedia')}
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-primary transition-colors"
              aria-label={link.ariaLabel}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

