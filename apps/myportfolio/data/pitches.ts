import type { Localized } from './career';

// Pitches served by the get_tailored_pitch WebMCP tool. Every claim must be backed by career.ts.

export const PITCH_AUDIENCES = [
  'recruiter',
  'hiring_manager',
  'founder_or_cto',
  'developer',
  'freelance_client',
] as const;

export type PitchAudience = (typeof PITCH_AUDIENCES)[number];

export const audiencePitches: Record<PitchAudience, Localized> = {
  recruiter: {
    en: 'Fullstack Tech Lead at Revers.io, where Marwen leads the development and modernization of a SaaS after-sales platform. An end-to-end profile (React, TypeScript, Node.js, GraphQL, PHP/Symfony) with large-account experience — BNP Paribas Asset Management, Bouygues Telecom, Société Générale, RATP, SFR — and hands-on expertise in AI-assisted development.',
    fr: "Tech Lead Fullstack chez Revers.io, où Marwen pilote le développement et la modernisation d'une plateforme SaaS de gestion du SAV. Un profil bout-en-bout (React, TypeScript, Node.js, GraphQL, PHP/Symfony), une expérience des grands comptes — BNP Paribas Asset Management, Bouygues Telecom, Société Générale, RATP, SFR — et une vraie pratique du développement assisté par IA.",
  },
  hiring_manager: {
    en: 'A hands-on tech lead who keeps delivering while raising the bar: architecture and modernization of a production SaaS, code review and mentoring of junior developers, unit and E2E tests, continuous tech-debt work, and estimates and trade-offs worked out with the product team.',
    fr: "Un profil de tech lead opérationnel, qui livre tout en élevant le niveau : architecture et modernisation d'un SaaS en production, code review et mentorat des développeurs junior, tests unitaires et E2E, traitement continu de la dette technique, chiffrages et arbitrages menés avec le produit.",
  },
  founder_or_cto: {
    en: 'A product-minded engineer who covers the whole stack, from database design to the interface, and turns AI into delivery speed: LLM-powered features in the product, AI code review in CI and an automated development workflow built on custom skills — with measurable results such as 50% faster builds and 40% shorter CI/CD.',
    fr: "Un profil orienté produit, qui couvre toute la stack, de la conception de la base de données à l'interface, et fait de l'IA un accélérateur de delivery : fonctionnalités basées sur des LLM dans le produit, code review par IA dans la CI et flux de développement automatisé via des skills custom — avec des résultats mesurables comme des builds 50 % plus rapides et une CI/CD 40 % plus courte.",
  },
  developer: {
    en: 'Works daily with React, Next.js, TypeScript, Node.js and GraphQL; has consolidated applications into a Turborepo monorepo and moved a codebase to TypeScript strict mode. Cares about clean code, tests and code review, and builds AI tooling (Claude Code, MCP, custom skills) — this portfolio itself exposes WebMCP tools.',
    fr: "Au quotidien : React, Next.js, TypeScript, Node.js et GraphQL ; a regroupé des applications dans un monorepo Turborepo et migré une base de code en TypeScript strict. Code propre, tests et code review au cœur de sa pratique, avec de l'outillage IA maison (Claude Code, MCP, skills custom) — ce portfolio expose d'ailleurs ses propres outils WebMCP.",
  },
  freelance_client: {
    en: 'For freelance missions (Upwork profile available), Marwen can take a feature or a modernization project from scoping to production: estimation, architecture, development and tests, with a pragmatic, product-oriented approach backed by more than ten years of fullstack experience.',
    fr: "Pour des missions freelance (profil Upwork disponible), Marwen peut porter une fonctionnalité ou un projet de modernisation du cadrage à la mise en production : chiffrage, architecture, développement et tests, avec une approche pragmatique et orientée produit, appuyée sur plus de dix ans d'expérience fullstack.",
  },
};
