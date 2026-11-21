import { CONTACT_LIMITS, type ContactDraft } from './contact.types';

function buildBody({ name, message }: ContactDraft): string | undefined {
  const body = message?.slice(0, CONTACT_LIMITS.message);
  if (!body) return undefined;
  return name ? `${body}\n\n— ${name}` : body;
}

/** "mailto:" link with the subject and the message (signed with the name, when given). */
export function buildMailto(email: string, draft: ContactDraft): string {
  const body = buildBody(draft);
  const params = [
    draft.subject && `subject=${encodeURIComponent(draft.subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${email}?${params.join('&')}`;
}
