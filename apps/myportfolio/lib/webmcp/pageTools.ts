import {
  CONTACT_DRAFT_EVENT,
  CONTACT_FORM_ID,
  CONTACT_LIMITS,
  type ContactDraft,
} from '@/lib/contact/contact.types';
import type { ToolInput } from './modelContext.types';
import { PAGE_SECTIONS, type ProfileToolDefinition } from './profile.types';
import { readEnum, readString, toolError } from './toolInput.utils';

// Tools acting on the visitor's page: exposed through WebMCP only, never on the MCP endpoint.

function readContactDraft(input: ToolInput | undefined): ContactDraft {
  return {
    name: readString(input, 'name')?.slice(0, CONTACT_LIMITS.name),
    subject: readString(input, 'subject')?.slice(0, CONTACT_LIMITS.subject),
    message: readString(input, 'message')?.slice(0, CONTACT_LIMITS.message),
  };
}

export const draftContactTool: ProfileToolDefinition = {
  name: 'draft_contact_message',
  description:
    "Pre-fill the contact form of the portfolio page with a message from the user to Marwen Cherif (job opportunity, interview request, freelance mission…) and scroll to it. Nothing is sent automatically: the user reviews the message and clicks Send, which opens their email app. Write the message on the user's behalf, in their language, and sign it with their name when known.",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        maxLength: CONTACT_LIMITS.name,
        description: "The user's name, used to sign the message.",
      },
      subject: { type: 'string', maxLength: CONTACT_LIMITS.subject, description: 'Email subject.' },
      message: {
        type: 'string',
        maxLength: CONTACT_LIMITS.message,
        description:
          'Message body: who the user is, the opportunity or project, and the proposed next step.',
      },
    },
    required: ['subject', 'message'],
  },
  readOnly: false,
  browserOnly: true,
  run: (input) => {
    const draft = readContactDraft(input);
    if (!draft.subject || !draft.message) {
      return toolError('Provide both a subject and a message.');
    }
    if (!document.getElementById(CONTACT_FORM_ID)) {
      return toolError('The contact form is not available on this page.');
    }
    window.dispatchEvent(new CustomEvent<ContactDraft>(CONTACT_DRAFT_EVENT, { detail: draft }));
    return {
      status: 'drafted',
      nextStep:
        'Tell the user the contact form at the bottom of the page is pre-filled: they review it and click Send, which opens their email app with the message ready.',
    };
  },
};

export const showSectionTool: ProfileToolDefinition = {
  name: 'show_section',
  description:
    'Scroll the portfolio page to one of its sections so the visitor sees what you are talking about, e.g. show the projects while presenting them.',
  inputSchema: {
    type: 'object',
    properties: { section: { type: 'string', enum: [...PAGE_SECTIONS] } },
    required: ['section'],
  },
  readOnly: true,
  browserOnly: true,
  run: (input) => {
    const section = readEnum(input, 'section', [...PAGE_SECTIONS, ''], '');
    const element = section ? document.getElementById(section) : null;
    if (!element) {
      return toolError(`Unknown section. Available: ${PAGE_SECTIONS.join(', ')}.`);
    }
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return { shown: section };
  },
};
