'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { socialLinks } from '@/config/socialLinks';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { contactFormSchema, type ContactFormData } from './ContactForm.schema';

interface ContactFormProps {
  isRTL: boolean;
}

export function ContactForm({ isRTL }: ContactFormProps) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-lg border border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full rounded-md border ${
              errors.name ? 'border-red-500' : 'border-border'
            } px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full rounded-md border ${
              errors.email ? 'border-red-500' : 'border-border'
            } px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
            {t('message')}
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className={`w-full rounded-md border ${
              errors.message ? 'border-red-500' : 'border-border'
            } px-4 py-2 text-primary shadow-sm focus:border-secondary focus:ring-secondary bg-background`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size={ButtonSize.Normal}
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

