import { education, languages, personalInfo, skills, type Locale } from '@/data/career';
import { splitSkillItem } from '@/lib/webmcp/matching.utils';
import { getCurrentExperience } from '@/lib/webmcp/profile.utils';

/** schema.org Person, read by search engines and AI agents (without the "@context"/"@type" keys). */
export function buildPersonJsonLd(locale: Locale): Record<string, unknown> {
  const current = getCurrentExperience();
  return {
    name: personalInfo.name,
    jobTitle: current.position[locale],
    description: personalInfo.bio[locale],
    url: personalInfo.website,
    sameAs: [personalInfo.linkedin, personalInfo.github, personalInfo.upwork].filter(Boolean),
    worksFor: { '@type': 'Organization', name: current.company },
    alumniOf: education.map(({ institution }) => ({
      '@type': 'CollegeOrUniversity',
      name: institution,
    })),
    knowsLanguage: languages.map(({ name }) => name),
    knowsAbout: skills.flatMap(({ items }) => items.flatMap(splitSkillItem)),
    homeLocation: { '@type': 'Place', name: personalInfo.location },
  };
}
