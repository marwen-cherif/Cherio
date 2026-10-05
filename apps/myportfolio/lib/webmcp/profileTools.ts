import type { Locale } from '@/data/career';
import type { ModelContextTool } from './modelContext.types';
import { canonicalize } from './matching.utils';
import {
  buildContactInfo,
  buildJobMatchReport,
  buildProfileOverview,
  buildSkillsReport,
  searchCareer,
} from './profile.utils';
import { PAGE_SECTIONS, SEARCH_SCOPES, type ProfileToolName } from './profile.types';
import {
  readEnum,
  readString,
  readStringArray,
  resolveLocale,
  toToolResult,
} from './toolInput.utils';

interface ProfileToolsConfig {
  locale: Locale;
  origin: string;
  getTitle: (name: ProfileToolName) => string;
}

type ProfileTool = Omit<ModelContextTool, 'title'> & { name: ProfileToolName };

const MAX_REQUIREMENTS = 30;
const READ_ONLY = { readOnlyHint: true };
const currentYear = () => new Date().getFullYear();

const localeProperty = {
  type: 'string',
  enum: ['en', 'fr'],
  description: 'Language of the returned content. Defaults to the language of the visited page.',
};

function overviewTool({ locale }: ProfileToolsConfig): ProfileTool {
  return {
    name: 'get_profile_overview',
    description:
      'Get a structured overview of Marwen Cherif, the Fullstack Tech Lead who owns this portfolio: headline, current role, years of experience, summary, core stack, AI skills, quantified achievements, employers, education and languages. Call it first when the user asks who Marwen is, wants a summary of the profile, or evaluates Marwen as a candidate or freelancer.',
    inputSchema: { type: 'object', properties: { locale: localeProperty } },
    annotations: READ_ONLY,
    execute: (input) =>
      toToolResult(buildProfileOverview(resolveLocale(input?.locale, locale), currentYear())),
  };
}

function jobMatchTool({ locale }: ProfileToolsConfig): ProfileTool {
  return {
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
    annotations: READ_ONLY,
    execute: (input) => {
      const requirements = readStringArray(input, 'requirements')
        .filter((requirement) => canonicalize(requirement))
        .slice(0, MAX_REQUIREMENTS);
      if (requirements.length === 0) {
        return toToolResult({ error: 'Provide at least one requirement, e.g. ["React"].' });
      }
      const report = buildJobMatchReport(
        requirements,
        resolveLocale(input?.locale, locale),
        currentYear()
      );
      return toToolResult(report);
    },
  };
}

function searchTool({ locale }: ProfileToolsConfig): ProfileTool {
  return {
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
    annotations: READ_ONLY,
    execute: (input) =>
      toToolResult(
        searchCareer(
          readString(input, 'query') ?? '',
          readEnum(input, 'scope', SEARCH_SCOPES, 'all'),
          resolveLocale(input?.locale, locale)
        )
      ),
  };
}

function skillsTool({ locale }: ProfileToolsConfig): ProfileTool {
  return {
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
    annotations: READ_ONLY,
    execute: (input) =>
      toToolResult(
        buildSkillsReport(
          resolveLocale(input?.locale, locale),
          currentYear(),
          readString(input, 'category')
        )
      ),
  };
}

function contactTool({ locale, origin }: ProfileToolsConfig): ProfileTool {
  return {
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
    annotations: READ_ONLY,
    execute: (input) =>
      toToolResult(
        buildContactInfo(resolveLocale(input?.locale, locale), origin, {
          subject: readString(input, 'subject'),
          message: readString(input, 'message'),
        })
      ),
  };
}

function showSectionTool(): ProfileTool {
  return {
    name: 'show_section',
    description:
      'Scroll the portfolio page to one of its sections so the visitor sees what you are talking about, e.g. show the projects while presenting them.',
    inputSchema: {
      type: 'object',
      properties: { section: { type: 'string', enum: [...PAGE_SECTIONS] } },
      required: ['section'],
    },
    annotations: READ_ONLY,
    execute: (input) => {
      const section = readEnum(input, 'section', [...PAGE_SECTIONS, ''], '');
      const element = section ? document.getElementById(section) : null;
      if (!element) {
        return toToolResult({ error: `Unknown section. Available: ${PAGE_SECTIONS.join(', ')}.` });
      }
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return toToolResult({ shown: section });
    },
  };
}

export function createProfileTools(config: ProfileToolsConfig): ModelContextTool[] {
  return [overviewTool, jobMatchTool, searchTool, skillsTool, contactTool, showSectionTool].map(
    (createTool) => {
      const tool = createTool(config);
      return { ...tool, title: config.getTitle(tool.name) };
    }
  );
}
