/** Window event carrying a `ContactDraft`, dispatched by the draft_contact_message WebMCP tool. */
export const CONTACT_DRAFT_EVENT = 'portfolio:contact-draft';

export const CONTACT_FORM_ID = 'contact-form';

/** Shared by the form fields and the WebMCP tool; the message cap keeps mailto: links short. */
export const CONTACT_LIMITS = { name: 100, subject: 150, message: 1500 } as const;

export interface ContactDraft {
  name?: string;
  subject?: string;
  message?: string;
}
