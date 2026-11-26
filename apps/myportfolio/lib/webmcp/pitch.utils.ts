import { experiences, personalInfo, projects, skills, type Locale } from '@/data/career';
import { audiencePitches, type PitchAudience } from '@/data/pitches';
import { canonicalize, containsTerm, matchRequirement, splitSkillItem } from './matching.utils';
import {
  cvUrl,
  formatHighestDegree,
  getCurrentExperience,
  getKeyAchievements,
  getYearsOfExperience,
} from './profile.utils';
import type { RequirementMatch, TailoredPitch } from './profile.types';

const AI_PATTERN = /\b(AI|IA|LLMs?)\b/;
const VERSION_SUFFIX = /\s+v?\d+(\.\d+)*$/;
const MAX_FREELANCE_PROJECTS = 5;
const MAX_RELEVANT_TECHNOLOGIES = 10;

interface PitchRequest {
  audience: PitchAudience;
  context?: string;
  locale: Locale;
  origin: string;
  currentYear: number;
}

/** What each reader cares about most, picked from the career data. */
function selectHighlights(audience: PitchAudience, locale: Locale): string[] {
  const roleDescription = getCurrentExperience().description[locale];
  switch (audience) {
    case 'recruiter':
      return [roleDescription[0], formatHighestDegree(locale), ...getKeyAchievements(locale)];
    case 'hiring_manager':
      return roleDescription.slice(1);
    case 'founder_or_cto':
      return [
        ...roleDescription.filter((line) => AI_PATTERN.test(line)),
        ...getKeyAchievements(locale),
      ];
    case 'developer':
      return skills.map(({ category, items }) => `${category[locale]}: ${items.join(', ')}`);
    case 'freelance_client':
      return projects
        .slice(0, MAX_FREELANCE_PROJECTS)
        .map(
          ({ title, period, highlights }) =>
            `${title[locale]} (${period}): ${highlights[locale][0]}`
        );
  }
}

/** Every technology named in the portfolio, without versions ("React 19" → "React"), deduplicated. */
function getTechnologyVocabulary(): string[] {
  const names = [
    ...experiences.flatMap((experience) => experience.technologies),
    ...projects.flatMap((project) => project.technologies),
    ...skills.flatMap((group) => group.items),
  ]
    .flatMap(splitSkillItem)
    .map((name) => name.replace(VERSION_SUFFIX, ''));
  const byCanonicalName = new Map(names.map((name) => [canonicalize(name), name]));
  return [...byCanonicalName.values()];
}

/** Evidence for the technologies the visitor's context mentions (stack, job offer, brief…). */
export function findRelevantExperience(
  context: string,
  locale: Locale,
  currentYear: number
): RequirementMatch[] {
  return getTechnologyVocabulary()
    .filter((technology) => containsTerm(context, technology))
    .slice(0, MAX_RELEVANT_TECHNOLOGIES)
    .map((technology) => matchRequirement(technology, locale, currentYear));
}

export function buildTailoredPitch({
  audience,
  context,
  locale,
  origin,
  currentYear,
}: PitchRequest): TailoredPitch {
  const current = getCurrentExperience();
  return {
    audience,
    candidate: personalInfo.name,
    headline: personalInfo.title,
    currentRole: {
      position: current.position[locale],
      company: current.company,
      since: current.startDate,
    },
    yearsOfExperience: getYearsOfExperience(currentYear),
    pitch: audiencePitches[audience][locale],
    highlights: selectHighlights(audience, locale),
    relevantExperience: context ? findRelevantExperience(context, locale, currentYear) : undefined,
    links: {
      cv: cvUrl(origin, locale),
      linkedin: personalInfo.linkedin,
      github: personalInfo.github,
      upwork: personalInfo.upwork,
    },
    nextSteps:
      "Present the pitch in the user's language, adapted to their needs. For a job offer or a brief, use match_job_requirements. To reach Marwen, use get_contact_info (channels and a ready-to-send mailto: link) or, in the visitor's browser, draft_contact_message to pre-fill the page's contact form.",
  };
}
