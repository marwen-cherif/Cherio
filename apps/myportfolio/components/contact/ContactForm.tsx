'use client';

import { useTranslations } from 'next-intl';
import { Send, Sparks } from 'iconoir-react';
import AnimatedCard from '@/components/ui/AnimatedCard';
import Button from '@/components/ui/Button';
import { CONTACT_FORM_ID, CONTACT_LIMITS } from '@/lib/contact/contact.types';
import { useContactForm } from './ContactForm.hooks';

const FIELD_CLASS =
  'w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring';

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const { values, draftedByAgent, formRef, handleChange, handleSubmit } = useContactForm(email);

  return (
    <AnimatedCard className="p-8 md:p-12" delay={0.2} hover={false}>
      <h3 className="text-3xl font-bold text-foreground mb-8">{t('title')}</h3>

      {draftedByAgent && (
        <p
          role="status"
          className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-primary/10 text-foreground"
        >
          <Sparks className="w-5 h-5 flex-shrink-0 text-primary" />
          {t('agentNotice')}
        </p>
      )}

      <form id={CONTACT_FORM_ID} ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="block font-semibold text-foreground mb-2">{t('name')}</span>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder={t('namePlaceholder')}
            maxLength={CONTACT_LIMITS.name}
            autoComplete="name"
            required
            className={FIELD_CLASS}
          />
        </label>

        <label className="block">
          <span className="block font-semibold text-foreground mb-2">{t('subject')}</span>
          <input
            name="subject"
            value={values.subject}
            onChange={handleChange}
            placeholder={t('subjectPlaceholder')}
            maxLength={CONTACT_LIMITS.subject}
            required
            className={FIELD_CLASS}
          />
        </label>

        <label className="block">
          <span className="block font-semibold text-foreground mb-2">{t('message')}</span>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder={t('messagePlaceholder')}
            maxLength={CONTACT_LIMITS.message}
            rows={7}
            required
            className={`${FIELD_CLASS} resize-y`}
          />
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button type="submit">
            <Send className="w-5 h-5 mr-2" />
            {t('submit')}
          </Button>
          <p className="text-sm text-muted-foreground">{t('hint')}</p>
        </div>
      </form>
    </AnimatedCard>
  );
}
