import type { Locale } from '@/data/career';
import type { PitchAudience } from '@/data/pitches';
import type { ToolInput } from './modelContext.types';

export const SEARCH_SCOPES = ['all', 'experience', 'project', 'education'] as const;
export type SearchScope = (typeof SEARCH_SCOPES)[number];

export const PAGE_SECTIONS = [
  'about',
  'experience',
  'education',
  'projects',
  'skills',
  'languages',
  'contact',
] as const;
export type PageSection = (typeof PAGE_SECTIONS)[number];

export type ProfileToolName =
  | 'get_profile_overview'
  | 'match_job_requirements'
  | 'search_experience'
  | 'get_skills'
  | 'get_tailored_pitch'
  | 'get_contact_info'
  | 'draft_contact_message'
  | 'show_section';

/** Where a tool runs: the visitor's page (WebMCP) or the remote MCP endpoint. */
export interface ToolContext {
  /** Default language: the page's locale in the browser, English on the MCP endpoint. */
  locale: Locale;
  origin: string;
  currentYear: number;
}

export interface ToolError {
  error: string;
}

/** Transport-agnostic tool: adapted to WebMCP (lib/webmcp) and to the MCP endpoint (lib/mcp). */
export interface ProfileToolDefinition {
  name: ProfileToolName;
  description: string;
  /** JSON Schema of the input, advertised as is to agents. */
  inputSchema: Record<string, unknown>;
  readOnly: boolean;
  /** Acts on the page (scroll, contact form): exposed through WebMCP only. */
  browserOnly?: boolean;
  run: (input: ToolInput | undefined, context: ToolContext) => unknown;
}

export interface Evidence {
  type: 'experience' | 'project';
  id: string;
  label: string;
  period: string;
  current: boolean;
}

export interface CareerEntry {
  evidence: Evidence;
  /** Canonical term → years during which it was used. */
  technologies: Map<string, [number, number]>;
  text: string;
}

export interface TechnologyUsage {
  yearsOfUse: number;
  firstUsed: number;
  lastUsed: number;
  usedInCurrentRole: boolean;
  evidence: Evidence[];
}

export type MatchStatus = 'proven' | 'listed' | 'mentioned' | 'not_found';

export type RequirementMatch =
  | ({ requirement: string; status: 'proven' } & TechnologyUsage)
  | { requirement: string; status: Exclude<MatchStatus, 'proven'>; evidence: Evidence[] };

export interface JobMatchReport {
  candidate: string;
  summary: {
    total: number;
    proven: number;
    listed: number;
    mentioned: number;
    notFound: number;
    matchRatePercent: number;
  };
  requirements: RequirementMatch[];
  note: string;
}

export interface ExperienceDetails {
  type: 'experience';
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectDetails {
  type: 'project';
  id: string;
  title: string;
  description: string;
  period: string;
  technologies: string[];
  highlights: string[];
  link?: string;
}

export interface EducationDetails {
  type: 'education';
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
}

export type CareerItem = ExperienceDetails | ProjectDetails | EducationDetails;

export interface SearchableItem {
  details: CareerItem;
  text: string;
  technologies: Set<string>;
}

export interface CareerSearchResult {
  query: string;
  scope: SearchScope;
  total: number;
  results: Array<CareerItem & { matchedTerms: string[] }>;
}

export interface ProfileOverview {
  name: string;
  headline: string;
  currentRole: { position: string; company: string; since: string };
  yearsOfExperience: number;
  location: string;
  nationality?: string;
  summary: string;
  coreStack: string[];
  aiSkills: string[];
  keyAchievements: string[];
  employers: string[];
  education: string;
  languages: string[];
  interests: string[];
  nextSteps: string;
}

export interface SkillsReport {
  availableCategories: string[];
  categories: Array<{
    category: string;
    skills: Array<{ name: string; yearsOfUse?: number; usedInCurrentRole?: boolean }>;
  }>;
}

export interface TailoredPitch {
  audience: PitchAudience;
  candidate: string;
  headline: string;
  currentRole: { position: string; company: string; since: string };
  yearsOfExperience: number;
  pitch: string;
  highlights: string[];
  /** Technologies named in the visitor's context, with the evidence found in the portfolio. */
  relevantExperience?: RequirementMatch[];
  links: { cv: string; linkedin?: string; github?: string; upwork?: string };
  nextSteps: string;
}

export interface ContactInfo {
  name: string;
  email?: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  upwork?: string;
  website?: string;
  cv: { recommended: string; en: string; fr: string };
  mailto?: string;
}
