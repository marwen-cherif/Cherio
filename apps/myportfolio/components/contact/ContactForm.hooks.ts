import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { CONTACT_DRAFT_EVENT, type ContactDraft } from '@/lib/contact/contact.types';
import { buildMailto } from '@/lib/contact/mailto.utils';
import type { ContactFormValues } from './ContactForm.types';

const EMPTY_VALUES: ContactFormValues = { name: '', subject: '', message: '' };

/** Contact form state; an AI agent can pre-fill it (WebMCP), the visitor always sends it. */
export function useContactForm(email: string) {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [draftedByAgent, setDraftedByAgent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleDraft = (event: Event) => {
      const draft = (event as CustomEvent<ContactDraft>).detail;
      setValues((current) => ({
        name: draft.name ?? current.name,
        subject: draft.subject ?? '',
        message: draft.message ?? '',
      }));
      setDraftedByAgent(true);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formRef.current
        ?.querySelector<HTMLButtonElement>('button[type="submit"]')
        ?.focus({ preventScroll: true });
    };

    window.addEventListener(CONTACT_DRAFT_EVENT, handleDraft);
    return () => window.removeEventListener(CONTACT_DRAFT_EVENT, handleDraft);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildMailto(email, values);
    setDraftedByAgent(false);
  };

  return { values, draftedByAgent, formRef, handleChange, handleSubmit };
}
