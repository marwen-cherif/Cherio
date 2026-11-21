import type { Locale } from '@/data/career';
import { PITCH_AUDIENCES } from '@/data/pitches';
import type { ModelContextTool } from './modelContext.types';
import { canonicalize } from './matching.utils';
import { draftContactTool, showSectionTool } from './pageTools';
import { buildTailoredPitch } from './pitch.utils';
import {
  buildContactInfo,
  buildJobMatchReport,
  buildProfileOverview,
  buildSkillsReport,
  searchCareer,
} from './profile.utils';
import { SEARCH_SCOPES, type ProfileToolDefinition, type ProfileToolName } from './profile.types';
import {
  readEnum,
  readString,
  readStringArray,
  resolveLocale,
  toToolResult,
  toolError,
} from './toolInput.utils';

const MAX_REQUIREMENTS = 30;

const localeProperty = {
  type: 'string',
  enum: ['en', 'fr'],
  description:
    'Language of the returned content. Defaults to the language of the visited page (English outside the browser).',
};

const overviewTool: ProfileToolDefinition = {
  name: 'get_profile_overview',
  description:
    'Get a structured overview of Marwen Cherif, the Fullstack Tech Lead who owns this portfolio: headline, current role, years of experience, summary, core stack, AI skills, quantified achievements, employers, education and languages. Call it first when the user asks who Marwen is, wants a summary of the profile, or evaluates Marwen as a candidate or freelancer.',
  inputSchema: { type: 'object', properties: { locale: localeProperty } },
  readOnly: true,
  run: (input, { locale, currentYear }) =>
    buildProfileOverview(resolveLocale(input?.locale, locale), currentYear),
};

const pitchTool: ProfileToolDefinition = {
  name: 'get_tailored_pitch',
  description:
    "Get a pitch about Marwen Cherif tailored to who the user is: a recruiter, a hiring manager or tech lead, a founder or CTO, a fellow developer, or a client looking for a freelancer. Returns a short pitch, the highlights that matter most to that reader and useful links. Infer the audience from the conversation, or ask the user. Pass context about the user's company, team, product or tech stack to also get Marwen's experience with the technologies it names.",
  inputSchema: {
    type: 'object',
    properties: {
      audience: {
        type: 'string',
        enum: [...PITCH_AUDIENCES],
        description:
          'Who the user is: recruiter, hiring_manager (engineering manager or tech lead), founder_or_cto, developer, or freelance_client.',
      },
      context: {
        type: 'string',
        description:
          'Optional free text about the user\'s company, team, product or tech stack, e.g. "fintech scale-up, React + Node.js + PostgreSQL".',
      },
      locale: localeProperty,
    },
    required: ['audience'],
  },
  readOnly: true,
  run: (input, { locale, origin, currentYear }) => {
    const audience = readEnum(input, 'audience', [...PITCH_AUDIENCES, ''], '');
    if (!audience) {
      return toolError(`Unknown audience. Available: ${PITCH_AUDIENCES.join(', ')}.`);
    }
    return buildTailoredPitch({
      audience,
      context: readString(input, 'context'),
      locale: resolveLocale(input?.locale, locale),
      origin,
      currentYear,
    });
  },
};

const jobMatchTool: ProfileToolDefinition = {
  name: 'match_job_requirements',
  description:
    "Check Marwen Cherif's profile against requirements extracted from a job description or a client brief (technologies, skills, domains). Returns, for each requirement, an evidence-based status — proven (used in professional experience or projects, with years of use and where), listed (declared skill), mentioned (appears in experience descriptions), not_found — and an overall match rate. Use it whenever the user shares a job offer or asks whether Marwen fits a role or a mission.",
  inputSchema: {
    type: 'object',
    properties: {
      requirements: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: MAX_REQUIREMENTS,
        description:
          'One short item per requirement, e.g. ["React", "TypeScript", "GraphQL", "CI/CD", "mentoring"].',
      },
      locale: localeProperty,
    },
    required: ['requirements'],
  },
  readOnly: true,
  run: (input, { locale, currentYear }) => {
    const requirements = readStringArray(input, 'requirements')
      .filter((requirement) => canonicalize(requirement))
      .slice(0, MAX_REQUIREMENTS);
    if (requirements.length === 0) {
      return toolError('Provide at least one requirement, e.g. ["React"].');
    }
    return buildJobMatchReport(requirements, resolveLocale(input?.locale, locale), currentYear);
  },
};

const searchTool: ProfileToolDefinition = {
  name: 'search_experience',
  description:
    'Search Marwen Cherif\'s professional experience, projects and education by keyword: a technology ("GraphQL"), a company or client ("BNP", "RATP"), a domain or responsibility ("mentoring", "CI/CD", "RPA"). Returns complete entries (period, responsibilities, highlights, technologies), best matches first. Leave the query empty to list everything in the chosen scope.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Keywords separated by spaces or commas.' },
      scope: {
        type: 'string',
        enum: [...SEARCH_SCOPES],
        description: 'Restrict the search to one kind of entry. Defaults to "all".',
      },
      locale: localeProperty,
    },
  },
  readOnly: true,
  run: (input, { locale }) =>
    searchCareer(
      readString(input, 'query') ?? '',
      readEnum(input, 'scope', SEARCH_SCOPES, 'all'),
      resolveLocale(input?.locale, locale)
    ),
};

const skillsTool: ProfileToolDefinition = {
  name: 'get_skills',
  description:
    "List Marwen Cherif's technical skills grouped by category (Backend, Frontend, AI-Assisted Development, AI in Products, Quality, Tools, RPA, Infrastructure…). When a skill is backed by professional experience or projects, it includes the years of use and whether it is used in the current role.",
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: 'Optional category filter, e.g. "Frontend".' },
      locale: localeProperty,
    },
  },
  readOnly: true,
  run: (input, { locale, currentYear }) =>
    buildSkillsReport(
      resolveLocale(input?.locale, locale),
      currentYear,
      readString(input, 'category')
    ),
};

const contactTool: ProfileToolDefinition = {
  name: 'get_contact_info',
  description:
    'Get the ways to contact or hire Marwen Cherif (email, phone, LinkedIn, GitHub, Upwork) and the links to download the CV as PDF (English and French). Pass a subject and/or a message to also get a ready-to-use mailto: link that the user can open to send the email themselves.',
  inputSchema: {
    type: 'object',
    properties: {
      subject: { type: 'string', description: 'Optional email subject for the mailto: link.' },
      message: { type: 'string', description: 'Optional email body for the mailto: link.' },
      locale: localeProperty,
    },
  },
  readOnly: true,
  run: (input, { locale, origin }) =>
    buildContactInfo(resolveLocale(input?.locale, locale), origin, {
      subject: readString(input, 'subject'),
      message: readString(input, 'message'),
    }),
};

/** Every tool, in the order agents see them. */
export const PROFILE_TOOLS: ProfileToolDefinition[] = [
  overviewTool,
  pitchTool,
  jobMatchTool,
  searchTool,
  skillsTool,
  contactTool,
  draftContactTool,
  showSectionTool,
];

interface ProfileToolsConfig {
  locale: Locale;
  origin: string;
  getTitle: (name: ProfileToolName) => string;
}

/** WebMCP adapter: tools registered on the visitor's page through `document.modelContext`. */
export function createProfileTools({
  locale,
  origin,
  getTitle,
}: ProfileToolsConfig): ModelContextTool[] {
  return PROFILE_TOOLS.map((tool) => ({
    name: tool.name,
    title: getTitle(tool.name),
    description: tool.description,
    inputSchema: tool.inputSchema,
    annotations: tool.readOnly ? { readOnlyHint: true } : undefined,
    execute: (input) =>
      toToolResult(tool.run(input, { locale, origin, currentYear: new Date().getFullYear() })),
  }));
}
