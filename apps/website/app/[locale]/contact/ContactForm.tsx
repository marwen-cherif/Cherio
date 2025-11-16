'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tMessages = useTranslations('contact.messages');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || tMessages('error'));
      }

      setSubmitStatus('success');
      // Réinitialiser le formulaire
      e.currentTarget.reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : tMessages('error')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {tMessages('success')}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {errorMessage || tMessages('error')}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            placeholder={t('namePlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            placeholder={t('emailPlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            {t('subject')}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            disabled={isSubmitting}
            placeholder={t('subjectPlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            required
            disabled={isSubmitting}
            rows={6}
            placeholder={t('messagePlaceholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}
