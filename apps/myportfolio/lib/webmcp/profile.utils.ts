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
import type {
  CareerSearchResult,
  ContactDraft,
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
const MAX_MAILTO_BODY_LENGTH = 1500;

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

export function buildProfileOverview(locale: Locale, currentYear: number): ProfileOverview {
  const current = experiences.find((experience) => experience.current) ?? experiences[0];
  const degree = education[0];

  return {
    name: personalInfo.name,
    headline: personalInfo.title,
    currentRole: {
      position: current.position[locale],
      company: current.company,
      since: current.startDate,
    },
    yearsOfExperience: currentYear - CAREER_START_YEAR,
    location: personalInfo.location,
    nationality: personalInfo.nationality,
    summary: personalInfo.bio[locale],
    coreStack: current.technologies,
    aiSkills: skills
      .filter((group) => AI_CATEGORY_PATTERN.test(group.category.en))
      .flatMap((group) => group.items),
    keyAchievements: projects
      .flatMap((project) => project.highlights[locale])
      .filter((highlight) => METRIC_PATTERN.test(highlight)),
    employers: experiences.map((experience) => experience.company),
    education: `${degree.degree[locale]} — ${degree.field[locale]}, ${degree.institution} (${degree.endDate})`,
    languages: languages.map((language) => `${language.name} (${language.level})`),
    interests,
    nextSteps:
      'Use match_job_requirements to compare this profile with a job description or client brief, search_experience for details on a technology, company or project, and get_contact_info to reach Marwen or download the CV.',
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

function buildMailto(email: string, { subject, message }: ContactDraft): string {
  const params = [
    subject && `subject=${encodeURIComponent(subject)}`,
    message && `body=${encodeURIComponent(message.slice(0, MAX_MAILTO_BODY_LENGTH))}`,
  ].filter(Boolean);
  return `mailto:${email}?${params.join('&')}`;
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
