import {
  experiences,
  projects,
  skills,
  type Experience,
  type Locale,
  type Project,
} from '@/data/career';
import type { CareerEntry, Evidence, RequirementMatch, TechnologyUsage } from './profile.types';

export const PRESENT: Record<Locale, string> = { en: 'present', fr: 'présent' };

const ALIASES: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  postgres: 'postgresql',
  mongo: 'mongodb',
  csharp: 'c#',
  dotnet: 'net',
  restapi: 'rest',
  restapis: 'rest',
  restful: 'rest',
  tailwindcss: 'tailwind',
  turbo: 'turborepo',
  modelcontextprotocol: 'mcp',
  llms: 'llm',
  largelanguagemodel: 'llm',
  largelanguagemodels: 'llm',
};

// AngularJS and Angular are different frameworks: keep the suffix.
const KEEP_JS_SUFFIX = new Set(['angularjs']);

/** "Node.js" → "node", "React 19" → "react", "REST APIs" → "rest", "C#" → "c#". */
export function canonicalize(term: string): string {
  const compact = term
    .toLowerCase()
    .trim()
    .replace(/\s+v?\d+(\.\d+)*$/, '')
    .replace(/[^a-z0-9#+.]/g, '');
  const withoutJs = KEEP_JS_SUFFIX.has(compact.replace(/\./g, ''))
    ? compact
    : compact.replace(/([a-z]{2})\.?js$/, '$1');
  const canonical = withoutJs.replace(/\./g, '');
  return ALIASES[canonical] ?? canonical;
}

/** "Symfony / PHP" → ["Symfony", "PHP"]. */
export function splitSkillItem(item: string): string[] {
  return item
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

const STOP_WORDS = new Set(['in', 'of', 'and', 'for', 'the', 'with']);

/** A technology and its words: "LLM Integration" also proves "LLM". */
function technologyTerms(technology: string): string[] {
  const words = technology
    .split(/\s+/)
    .map(canonicalize)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
  return [canonicalize(technology), ...words];
}

export function toTechnologySet(technologies: string[]): Set<string> {
  return new Set(technologies.flatMap(splitSkillItem).flatMap(technologyTerms));
}

/** Usage interval of each term; `since` narrows technologies adopted later in the period. */
function toTechnologyIntervals(
  technologies: string[],
  [start, end]: [number, number],
  since: Record<string, string> = {}
): Map<string, [number, number]> {
  const intervals = new Map<string, [number, number]>();
  for (const technology of technologies) {
    const adopted = Math.max(Number(since[technology] ?? start), start);
    for (const term of splitSkillItem(technology).flatMap(technologyTerms)) {
      // A term shared by several technologies ("AI") keeps the earliest adoption.
      const known = intervals.get(term);
      intervals.set(term, [Math.min(known?.[0] ?? adopted, adopted), end]);
    }
  }
  return intervals;
}

/** "2019 – Present" → [2019, currentYear], "2016 - 2018" → [2016, 2018]. */
export function parsePeriod(period: string, currentYear: number): [number, number] {
  const years = (period.match(/\d{4}/g) ?? []).map(Number);
  const start = years[0] ?? currentYear;
  const end = /present|présent/i.test(period) ? currentYear : (years[1] ?? start);
  return [start, end];
}

function experienceToEntry(experience: Experience, locale: Locale, year: number): CareerEntry {
  return {
    evidence: {
      type: 'experience',
      id: experience.id,
      label: `${experience.position[locale]} — ${experience.company}`,
      period: `${experience.startDate} – ${experience.endDate ?? PRESENT[locale]}`,
      current: experience.current,
    },
    technologies: toTechnologyIntervals(
      experience.technologies,
      [Number(experience.startDate), Number(experience.endDate ?? year)],
      experience.technologiesSince
    ),
    text: [
      ...Object.values(experience.position),
      ...experience.description.en,
      ...experience.description.fr,
    ].join(' '),
  };
}

function projectToEntry(project: Project, locale: Locale, year: number): CareerEntry {
  return {
    evidence: {
      type: 'project',
      id: project.id,
      label: project.title[locale],
      period: project.period,
      current: /present/i.test(project.period),
    },
    technologies: toTechnologyIntervals(project.technologies, parsePeriod(project.period, year)),
    text: [
      ...Object.values(project.title),
      ...Object.values(project.description),
      ...project.highlights.en,
      ...project.highlights.fr,
    ].join(' '),
  };
}

export function getCareerEntries(locale: Locale, currentYear: number): CareerEntry[] {
  return [
    ...experiences.map((experience) => experienceToEntry(experience, locale, currentYear)),
    ...projects.map((project) => projectToEntry(project, locale, currentYear)),
  ];
}

/** Total years covered by the union of the intervals (each period counts for at least a year). */
export function countYears(intervals: Array<[number, number]>): number {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [];
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged.reduce((total, [start, end]) => total + Math.max(end - start, 1), 0);
}

export function findUsage(
  terms: string[],
  locale: Locale,
  currentYear: number
): TechnologyUsage | null {
  const matches = getCareerEntries(locale, currentYear).flatMap((entry) => {
    const interval = terms.map((term) => entry.technologies.get(term)).find(Boolean);
    return interval ? [{ evidence: entry.evidence, interval }] : [];
  });
  if (matches.length === 0) return null;

  const intervals = matches.map(({ interval }) => interval);
  return {
    yearsOfUse: countYears(intervals),
    firstUsed: Math.min(...intervals.map(([start]) => start)),
    lastUsed: Math.max(...intervals.map(([, end]) => end)),
    usedInCurrentRole: matches.some(({ evidence }) => evidence.current),
    evidence: matches.map(({ evidence }) => evidence),
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Entries whose texts (in any language) mention the requirement as a whole word. */
export function findMentions(requirement: string, locale: Locale, currentYear: number): Evidence[] {
  const pattern = new RegExp(
    `(^|[^\\p{L}\\p{N}])${escapeRegExp(requirement.trim())}($|[^\\p{L}\\p{N}])`,
    'iu'
  );
  return getCareerEntries(locale, currentYear)
    .filter((entry) => pattern.test(entry.text))
    .map((entry) => entry.evidence);
}

function isListedSkill(term: string): boolean {
  return skills.some((category) => toTechnologySet(category.items).has(term));
}

export function matchRequirement(
  requirement: string,
  locale: Locale,
  currentYear: number
): RequirementMatch {
  const term = canonicalize(requirement);
  const usage = findUsage([term], locale, currentYear);
  if (usage) return { requirement, status: 'proven', ...usage };

  const mentions = findMentions(requirement, locale, currentYear);
  if (isListedSkill(term)) return { requirement, status: 'listed', evidence: mentions };
  if (mentions.length > 0) return { requirement, status: 'mentioned', evidence: mentions };
  return { requirement, status: 'not_found', evidence: [] };
}
