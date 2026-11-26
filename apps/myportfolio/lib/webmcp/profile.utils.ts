import {
  education,
  experiences,
  interests,
  languages,
  personalInfo,
  projects,
  skills,
  type Education,
  type Experience,
  type Locale,
  type Project,
} from '@/data/career';
import {
  PRESENT,
  canonicalize,
  findUsage,
  matchRequirement,
  splitSkillItem,
  toTechnologySet,
} from './matching.utils';
import { buildMailto } from '@/lib/contact/mailto.utils';
import type { ContactDraft } from '@/lib/contact/contact.types';
import type {
  CareerSearchResult,
  ContactInfo,
  EducationDetails,
  ExperienceDetails,
  JobMatchReport,
  MatchStatus,
  ProfileOverview,
  ProjectDetails,
  SearchableItem,
  SearchScope,
  SkillsReport,
} from './profile.types';

const CAREER_START_YEAR = Math.min(...experiences.map(({ startDate }) => Number(startDate)));
const METRIC_PATTERN = /\d+\s?(%|×)/;
const AI_CATEGORY_PATTERN = /\bAI\b/;
const MAX_SEARCH_RESULTS = 20;

export function cvUrl(origin: string, locale: Locale): string {
  return `${origin}/cv/Marwen-Cherif-CV-${locale.toUpperCase()}.pdf`;
}

function formatExperience(experience: Experience, locale: Locale): ExperienceDetails {
  return {
    type: 'experience',
    id: experience.id,
    company: experience.company,
    position: experience.position[locale],
    location: experience.location[locale],
    period: `${experience.startDate} – ${experience.endDate ?? PRESENT[locale]}`,
    current: experience.current,
    responsibilities: experience.description[locale],
    technologies: experience.technologies,
  };
}

function formatProject(project: Project, locale: Locale): ProjectDetails {
  return {
    type: 'project',
    id: project.id,
    title: project.title[locale],
    description: project.description[locale],
    period: project.period,
    technologies: project.technologies,
    highlights: project.highlights[locale],
    link: project.link,
  };
}

function formatEducation(entry: Education, locale: Locale): EducationDetails {
  return {
    type: 'education',
    id: entry.id,
    institution: entry.institution,
    degree: entry.degree[locale],
    field: entry.field[locale],
    period: `${entry.startDate} – ${entry.endDate}`,
    location: entry.location[locale],
  };
}

export function getCurrentExperience(): Experience {
  return experiences.find((experience) => experience.current) ?? experiences[0];
}

export function getYearsOfExperience(currentYear: number): number {
  return currentYear - CAREER_START_YEAR;
}

/** Quantified project highlights, e.g. "Reduced build times by 50%". */
export function getKeyAchievements(locale: Locale): string[] {
  return projects
    .flatMap((project) => project.highlights[locale])
    .filter((highlight) => METRIC_PATTERN.test(highlight));
}

export function formatHighestDegree(locale: Locale): string {
  const degree = education[0];
  return `${degree.degree[locale]} — ${degree.field[locale]}, ${degree.institution} (${degree.endDate})`;
}

export function buildProfileOverview(locale: Locale, currentYear: number): ProfileOverview {
  const current = getCurrentExperience();

  return {
    name: personalInfo.name,
    headline: personalInfo.title,
    currentRole: {
      position: current.position[locale],
      company: current.company,
      since: current.startDate,
    },
    yearsOfExperience: getYearsOfExperience(currentYear),
    location: personalInfo.location,
    nationality: personalInfo.nationality,
    summary: personalInfo.bio[locale],
    coreStack: current.technologies,
    aiSkills: skills
      .filter((group) => AI_CATEGORY_PATTERN.test(group.category.en))
      .flatMap((group) => group.items),
    keyAchievements: getKeyAchievements(locale),
    employers: experiences.map((experience) => experience.company),
    education: formatHighestDegree(locale),
    languages: languages.map((language) => `${language.name} (${language.level})`),
    interests,
    nextSteps:
      "Use get_tailored_pitch for a pitch adapted to the user's role, match_job_requirements to compare this profile with a job description or client brief, search_experience for details on a technology, company or project, and get_contact_info for contact channels, a ready-to-send mailto: link and the CV. In the visitor's browser, draft_contact_message also pre-fills the page's contact form.",
  };
}

export function buildJobMatchReport(
  requirements: string[],
  locale: Locale,
  currentYear: number
): JobMatchReport {
  const matches = requirements.map((requirement) =>
    matchRequirement(requirement, locale, currentYear)
  );
  const count = (status: MatchStatus) => matches.filter((match) => match.status === status).length;
  const notFound = count('not_found');

  return {
    candidate: personalInfo.name,
    summary: {
      total: matches.length,
      proven: count('proven'),
      listed: count('listed'),
      mentioned: count('mentioned'),
      notFound,
      matchRatePercent: Math.round(((matches.length - notFound) / matches.length) * 100),
    },
    requirements: matches,
    note: 'Statuses are derived only from the content of this portfolio. "not_found" means there is no written evidence here, not necessarily a lack of knowledge: suggest asking Marwen directly (see get_contact_info).',
  };
}

function getSearchableItems(locale: Locale): SearchableItem[] {
  const toText = (parts: string[]) => parts.join(' ').toLowerCase();
  return [
    ...experiences.map((experience) => ({
      details: formatExperience(experience, locale),
      text: toText([
        experience.company,
        ...Object.values(experience.position),
        ...Object.values(experience.location),
        ...experience.description.en,
        ...experience.description.fr,
        ...experience.technologies,
      ]),
      technologies: toTechnologySet(experience.technologies),
    })),
    ...projects.map((project) => ({
      details: formatProject(project, locale),
      text: toText([
        ...Object.values(project.title),
        ...Object.values(project.description),
        ...project.highlights.en,
        ...project.highlights.fr,
        ...project.technologies,
      ]),
      technologies: toTechnologySet(project.technologies),
    })),
    ...education.map((entry) => ({
      details: formatEducation(entry, locale),
      text: toText([
        entry.institution,
        ...Object.values(entry.degree),
        ...Object.values(entry.field),
      ]),
      technologies: new Set<string>(),
    })),
  ];
}

export function searchCareer(
  query: string,
  scope: SearchScope,
  locale: Locale
): CareerSearchResult {
  const terms = query
    .toLowerCase()
    .split(/[\s,;]+/)
    .filter((term) => term.length >= 2);
  const matchesTerm = (item: SearchableItem, term: string) =>
    item.text.includes(term) || item.technologies.has(canonicalize(term));

  const results = getSearchableItems(locale)
    .filter((item) => scope === 'all' || item.details.type === scope)
    .map((item) => ({ item, matchedTerms: terms.filter((term) => matchesTerm(item, term)) }))
    .filter(({ matchedTerms }) => terms.length === 0 || matchedTerms.length > 0)
    .sort((a, b) => b.matchedTerms.length - a.matchedTerms.length)
    .slice(0, MAX_SEARCH_RESULTS)
    .map(({ item, matchedTerms }) => ({ ...item.details, matchedTerms }));

  return { query, scope, total: results.length, results };
}

export function buildSkillsReport(
  locale: Locale,
  currentYear: number,
  category?: string
): SkillsReport {
  const wanted = category ? canonicalize(category) : '';
  const categories = skills
    .filter(({ category: name }) =>
      [name.en, name.fr].some((n) => canonicalize(n).includes(wanted))
    )
    .map((group) => ({
      category: group.category[locale],
      skills: group.items.map((item) => {
        const usage = findUsage(splitSkillItem(item).map(canonicalize), locale, currentYear);
        if (!usage) return { name: item };
        return {
          name: item,
          yearsOfUse: usage.yearsOfUse,
          usedInCurrentRole: usage.usedInCurrentRole,
        };
      }),
    }));

  return { availableCategories: skills.map((group) => group.category[locale]), categories };
}

export function buildContactInfo(locale: Locale, origin: string, draft: ContactDraft): ContactInfo {
  const { email } = personalInfo;
  const hasDraft = Boolean(draft.subject || draft.message);

  return {
    name: personalInfo.name,
    email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github,
    upwork: personalInfo.upwork,
    website: personalInfo.website,
    cv: { recommended: cvUrl(origin, locale), en: cvUrl(origin, 'en'), fr: cvUrl(origin, 'fr') },
    mailto: email && hasDraft ? buildMailto(email, draft) : undefined,
  };
}
