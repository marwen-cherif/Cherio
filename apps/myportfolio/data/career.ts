export type Locale = 'en' | 'fr';

export interface Localized {
  en: string;
  fr: string;
}

export interface LocalizedList {
  en: string[];
  fr: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: Localized;
  location: Localized;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: LocalizedList;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: Localized;
  field: Localized;
  startDate: string;
  endDate: string;
  location: Localized;
}

export interface Project {
  id: string;
  title: Localized;
  description: Localized;
  period: string;
  technologies: string[];
  highlights: LocalizedList;
  link?: string;
  github?: string;
}

export interface Skill {
  category: Localized;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  upwork?: string;
  nationality?: string;
  bio: {
    en: string;
    fr: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: 'Marwen Cherif',
  title: 'Software Engineer — Front-End Specialization',
  location: 'Melun, Île-de-France',
  address: '76 Rue Dian Fossey, 77000 Melun - FRANCE',
  email: 'marwen.cherif@gmail.com',
  phone: '+33 6 77 62 11 23',
  website: 'https://marwen-cherif.cherio.me/',
  linkedin: 'https://www.linkedin.com/in/marwen-cherif-54898148/',
  github: 'https://github.com/marwen-cherif',
  upwork: 'https://www.upwork.com/freelancers/~0156bc098f503b1e3a',
  nationality: 'Tunisia, France',
  bio: {
    en: "Front-End Tech Lead at Revers.io, where I drive the modernization of a SaaS platform — architecture, UI overhauls, and scaling. I contribute to continuous product improvement, both cross-functionally and on specific initiatives. An earlier full-stack chapter (Symfony/PHP) gives me an end-to-end perspective, from the backend to the interface. I value clean code, mentoring, and pragmatic decisions. A tech enthusiast, I love experimenting with new development tools, whether AI-related or not.",
    fr: "Tech Lead Front-End chez Revers.io, où je pilote la modernisation d'une plateforme SaaS — architecture, refontes UI, montée en charge. Je contribue à l'amélioration continue du produit, aussi bien de façon transverse que sur des sujets spécifiques. Une première partie de carrière en full-stack (Symfony/PHP) me donne une vision bout-en-bout, du backend à l'interface. Je privilégie le code propre, le mentorat, et les décisions pragmatiques. Technophile, j'aime expérimenter les nouveaux outils de développement, liés ou non à l'IA.",
  },
};

export const experiences: Experience[] = [
  {
    id: 'reversio',
    company: 'Revers.io',
    position: { en: 'Front-End Tech Lead', fr: 'Tech Lead Front-End' },
    location: { en: 'France', fr: 'France' },
    startDate: '2019',
    endDate: null,
    current: true,
    description: {
      en: [
        'SaaS after-sales management platform for retailers (refunds, repairs, on-site interventions). Front-End Tech Lead since 2022, after joining as a Front-End Software Engineer in 2019.',
        'Driving the front-end modernization: UI redesigns, library migrations, React / TypeScript / GraphQL architecture.',
        'Technical analysis and estimation of new features, technical trade-offs alongside the product team.',
        "Code review and mentoring of junior developers, growing the team's skills.",
        'Hardening the platform: unit and E2E tests, production incident support.',
        'Detecting and addressing technical debt continuously.',
        'Contributing to continuous product improvement, proactively or through analysis of customer-funnel feedback.',
      ],
      fr: [
        "Plateforme SaaS de gestion du SAV pour le compte de distributeurs (remboursement, réparation, intervention à domicile…). Tech Lead Front-End depuis 2022, après avoir rejoint l'équipe comme Front-End Software Engineer en 2019.",
        'Pilotage de la modernisation front-end : refonte UI, migration de librairies, architecture React / TypeScript / GraphQL.',
        'Analyse technique et chiffrage des nouvelles fonctionnalités, arbitrages techniques avec le produit.',
        "Code review et mentorat des développeurs junior, montée en compétence de l'équipe.",
        'Fiabilisation de la plateforme : tests unitaires et E2E, support des anomalies en production.',
        "Détection et traitement de la dette technique au fil de l'eau.",
        "Contribution à l'amélioration continue du produit, de façon proactive ou via l'analyse des retours du funnel client.",
      ],
    },
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'GraphQL',
      'Redux-Saga',
      'Storybook',
      'Vite',
      'Azure DevOps',
      'Cloudflare',
    ],
  },
  {
    id: 'addstones',
    company: 'Addstones — BNP Paribas Asset Management',
    position: { en: 'Consultant Engineer', fr: 'Ingénieur Consultant' },
    location: { en: 'France', fr: 'France' },
    startDate: '2018',
    endDate: '2019',
    current: false,
    description: {
      en: [
        'Consultant for BNP Paribas Asset Management, delivering RPA automations and internal tools.',
        'Blue Prism automations: control of fund/ETF factsheets and consistency checks on published data.',
        'Automation of the client data update and termination journey (KYC) toward Salesforce, with inconsistency detection and enforcement of regulatory rules.',
        'Developed a code analyzer for Blue Prism processes.',
        'Works-council grants management tool (React, .NET API).',
      ],
      fr: [
        'Consultant pour BNP Paribas Asset Management : automatisations RPA et outils internes.',
        'Automatismes Blue Prism : contrôle des factsheets des fonds/ETFs, contrôle de cohérence des données publiées.',
        'Automatisation du parcours de mise à jour et de résiliation des données clients (KYC) vers Salesforce, avec détection des incohérences et des règles réglementaires.',
        "Développement d'un analyseur de code pour les processus Blue Prism.",
        'Outil de gestion des subventions du CE (React, API .NET).',
      ],
    },
    technologies: ['Blue Prism', 'React', '.NET', 'C#', 'Salesforce', 'RPA'],
  },
  {
    id: 'bouygues',
    company: 'Bouygues Telecom',
    position: { en: 'Consultant Engineer', fr: 'Ingénieur Consultant' },
    location: { en: 'France', fr: 'France' },
    startDate: '2016',
    endDate: '2018',
    current: false,
    description: {
      en: [
        'Consultant engineer working on enterprise support tooling and RPA proofs-of-concept.',
        'PoC for PSA Auto & Bank: automation of vehicle-registration processing and data collection (UiPath, VB.NET, Node.js / Puppeteer).',
        'Development and maintenance of Reflex Ticketing, the incident-support tool for enterprise clients.',
        'End-to-end features: ticket lifecycle, notifications, dashboards.',
        'REST APIs and database integrations.',
        'Participation in agile ceremonies (sprint planning, code reviews, CI/CD).',
      ],
      fr: [
        'Ingénieur consultant sur les outils de support entreprise et des POC RPA.',
        'POC pour PSA Auto & Bank : automatisation du traitement des immatriculations et collecte de données (UiPath, VB.NET, Node.js / Puppeteer).',
        "Développement et maintenance de Reflex Ticketing, l'outil de support des incidents pour les clients entreprises.",
        'Fonctionnalités de bout en bout : cycle de vie des tickets, notifications, dashboards.',
        'API REST et intégrations base de données.',
        'Participation aux cérémonies agiles (sprint planning, revues de code, CI/CD).',
      ],
    },
    technologies: ['UiPath', 'VB.NET', 'Node.js', 'Puppeteer', 'PHP', 'Symfony', 'REST APIs', 'Jenkins'],
  },
  {
    id: 'talan',
    company: 'Talan Tunisie',
    position: { en: 'Consultant Engineer', fr: 'Ingénieur Consultant' },
    location: { en: 'Tunisia', fr: 'Tunisie' },
    startDate: '2014',
    endDate: '2016',
    current: false,
    description: {
      en: [
        'Consultant engineer delivering and evolving projects for Société Générale, RATP, SFR, Quick Belux and Bouygues Telecom.',
        'Société Générale: HR management and university-contact management applications (PHP, AngularJS, MySQL).',
        'RATP: evolution of the ODEXO tool for analyzing metro-line equipment data (PHP).',
        'Quick Belux: restaurant back-office and centralized supervision platform (Symfony, JavaScript).',
        'SFR: mobile-plan configuration module for the online store (AngularJS, J2EE).',
      ],
      fr: [
        'Ingénieur consultant : développement et évolution de projets pour Société Générale, RATP, SFR, Quick Belux et Bouygues Telecom.',
        'Société Générale : applications de gestion RH et de gestion des contacts universités (PHP, AngularJS, MySQL).',
        "RATP : évolution de l'outil ODEXO d'analyse des données d'équipements des lignes de métro (PHP).",
        'Quick Belux : back-office restaurants et plateforme de supervision centralisée (Symfony, JavaScript).',
        'SFR : module de configuration des offres mobiles pour la boutique en ligne (AngularJS, J2EE).',
      ],
    },
    technologies: ['PHP', 'Symfony', 'AngularJS', 'MySQL', 'JavaScript', 'J2EE'],
  },
];

export const education: Education[] = [
  {
    id: 'enit',
    institution: "École Nationale d'Ingénieurs de Tunis (ENIT)",
    degree: { en: 'Engineering Degree', fr: "Diplôme d'Ingénieur" },
    field: { en: 'Software Engineering', fr: 'Ingénierie Logicielle' },
    startDate: '2011',
    endDate: '2014',
    location: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie' },
  },
  {
    id: 'ipeim',
    institution: "Institut Préparatoire aux Études d'Ingénieurs d'El Manar",
    degree: { en: 'Preparatory Classes', fr: 'Classes préparatoires' },
    field: {
      en: 'Engineering Preparatory Studies',
      fr: "Études préparatoires aux écoles d'ingénieurs",
    },
    startDate: '2009',
    endDate: '2011',
    location: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie' },
  },
];

export const projects: Project[] = [
  {
    id: 'reversio-saas-core',
    title: {
      en: 'Reverse Logistics Platform – Core Frontend Development',
      fr: 'Plateforme de logistique inverse – Développement front-end principal',
    },
    description: {
      en: 'Led the frontend development of a mission-critical after-sales and reverse-logistics platform used by major European retailers, focusing on performance, scalability, and cross-team alignment.',
      fr: "Pilotage du développement front-end d'une plateforme critique de SAV et de logistique inverse utilisée par de grands distributeurs européens, avec un focus sur la performance, la scalabilité et l'alignement inter-équipes.",
    },
    period: '2019 – Present',
    technologies: ['React 19', 'TypeScript', 'GraphQL', 'REST APIs', 'Azure', 'Redux Toolkit'],
    highlights: {
      en: [
        'Built high-impact UI modules for claims management, workflows, and operational dashboards',
        'Collaborated closely with backend teams to define and optimize GraphQL/REST contracts',
        'Mentored engineers and an apprentice, establishing best practices across squads',
        'Improved application responsiveness and maintainability through structured state management and streamlined API interaction layers',
      ],
      fr: [
        'Développement de modules UI à fort impact : gestion des réclamations, workflows, dashboards opérationnels',
        'Collaboration étroite avec les équipes back-end pour définir et optimiser les contrats GraphQL/REST',
        "Mentorat d'ingénieurs et d'un alternant, mise en place de bonnes pratiques entre les squads",
        "Amélioration de la réactivité et de la maintenabilité via une gestion d'état structurée et des couches d'interaction API simplifiées",
      ],
    },
  },
  {
    id: 'reversio-modernization',
    title: {
      en: 'Frontend Platform Modernization & Performance Overhaul',
      fr: 'Modernisation de la plateforme front-end & refonte des performances',
    },
    description: {
      en: 'Led the end-to-end migration of a large-scale SaaS frontend from Create React App and Webpack to a modern Vite + React 19 architecture, delivering major productivity and runtime performance gains for engineering teams.',
      fr: "Pilotage de la migration de bout en bout d'un front-end SaaS à grande échelle, de Create React App et Webpack vers une architecture moderne Vite + React 19, avec des gains majeurs de productivité et de performance à l'exécution pour les équipes.",
    },
    period: '2022 – 2024',
    technologies: ['React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Redux Toolkit', 'Storybook'],
    highlights: {
      en: [
        'Reduced build times by 50% and improved local startup performance by 5×',
        'Introduced TypeScript strict mode, improving reliability and maintainability',
        'Modernized the component architecture and design system with Storybook',
        'Reduced production defects by 25% by enforcing predictable data-fetching patterns with TanStack Query v5',
      ],
      fr: [
        'Réduction des temps de build de 50 % et démarrage local 5× plus rapide',
        'Introduction du mode strict de TypeScript, fiabilité et maintenabilité accrues',
        "Modernisation de l'architecture des composants et du design system avec Storybook",
        'Réduction des anomalies en production de 25 % grâce à des patterns de data-fetching prévisibles avec TanStack Query v5',
      ],
    },
    link: 'https://revers.io',
  },
  {
    id: 'reversio-monorepo',
    title: {
      en: 'Monorepo Architecture & CI/CD Pipeline Acceleration',
      fr: 'Architecture monorepo & accélération des pipelines CI/CD',
    },
    description: {
      en: 'Designed and deployed a scalable monorepo architecture to unify multiple front-end applications, standardize tooling, and dramatically shorten integration and deployment cycles.',
      fr: "Conception et déploiement d'une architecture monorepo scalable pour unifier plusieurs applications front-end, standardiser l'outillage et raccourcir fortement les cycles d'intégration et de déploiement.",
    },
    period: '2021 – 2024',
    technologies: ['Turborepo', 'GitHub Actions', 'Cloudflare R2', 'Node.js', 'pnpm'],
    highlights: {
      en: [
        'Centralized all applications into a Turborepo-driven monorepo with shared configs and tooling',
        'Cut CI/CD times by 40% through optimized caching, incremental builds, and parallel pipelines',
        'Implemented versioned asset delivery via Cloudflare R2 for reliable rollbacks',
        'Improved developer experience through standardized linting, testing, and release workflows',
      ],
      fr: [
        'Centralisation de toutes les applications dans un monorepo Turborepo avec configs et outillage partagés',
        'Réduction des temps CI/CD de 40 % via un cache optimisé, des builds incrémentaux et des pipelines parallèles',
        "Livraison d'assets versionnés via Cloudflare R2 pour des rollbacks fiables",
        "Amélioration de l'expérience développeur : linting, tests et workflows de release standardisés",
      ],
    },
  },
  {
    id: 'psa-rpa-poc',
    title: {
      en: 'PSA Auto & Bank – Vehicle Registration Automation (PoC)',
      fr: 'PSA Auto & Bank – Automatisation des immatriculations (PoC)',
    },
    description: {
      en: 'Proof-of-concept automating the processing of vehicle registrations and data collection for PSA Auto & Bank, combining RPA and headless-browser scraping.',
      fr: 'Preuve de concept automatisant le traitement des immatriculations et la collecte de données pour PSA Auto & Bank, combinant RPA et scraping via navigateur headless.',
    },
    period: '2016 - 2018',
    technologies: ['UiPath', 'VB.NET', 'Node.js', 'Puppeteer'],
    highlights: {
      en: [
        'Automated end-to-end vehicle-registration processing',
        'Headless data collection with Node.js / Puppeteer',
        'Reduced manual back-office workload',
      ],
      fr: [
        'Automatisation de bout en bout du traitement des immatriculations',
        'Collecte de données headless avec Node.js / Puppeteer',
        'Réduction de la charge manuelle du back-office',
      ],
    },
  },
  {
    id: 'reflexticketing',
    title: {
      en: 'Reflex Ticketing [Bouygues Telecom]',
      fr: 'Reflex Ticketing [Bouygues Telecom]',
    },
    description: {
      en: 'Development and maintenance of Bouygues Telecom incident-support platform for enterprise accounts: ticket lifecycle, notifications, dashboards, REST APIs and database integrations.',
      fr: 'Développement et maintenance de la plateforme de support des incidents de Bouygues Telecom pour les comptes entreprises : cycle de vie des tickets, notifications, dashboards, API REST et intégrations base de données.',
    },
    period: '2016 - 2018',
    technologies: ['PHP', 'Symfony', 'REST APIs', 'jQuery', 'Jenkins', 'Selenium'],
    highlights: {
      en: [
        'End-to-end ticket lifecycle, notifications and dashboards',
        'REST APIs and database integrations',
        'Agile ceremonies: sprint planning, code reviews, CI/CD',
      ],
      fr: [
        'Cycle de vie des tickets de bout en bout, notifications et dashboards',
        'API REST et intégrations base de données',
        'Cérémonies agiles : sprint planning, revues de code, CI/CD',
      ],
    },
  },
  {
    id: 'bnp-kyc-automation',
    title: {
      en: 'KYC Automation toward Salesforce [BNP Paribas AM]',
      fr: 'Automatisation KYC vers Salesforce [BNP Paribas AM]',
    },
    description: {
      en: 'Blue Prism automation of the client data update and termination journey (KYC) toward Salesforce, with inconsistency detection and enforcement of regulatory rules.',
      fr: 'Automatisation Blue Prism du parcours de mise à jour et de résiliation des données clients (KYC) vers Salesforce, avec détection des incohérences et application des règles réglementaires.',
    },
    period: '2018 - 2019',
    technologies: ['Blue Prism', 'Salesforce', 'RPA'],
    highlights: {
      en: [
        'Automated KYC update and termination journeys',
        'Consistency checks on fund/ETF factsheets and published data',
        'Built a code analyzer for Blue Prism processes',
      ],
      fr: [
        'Automatisation des parcours de mise à jour et de résiliation KYC',
        'Contrôles de cohérence des factsheets fonds/ETFs et des données publiées',
        "Développement d'un analyseur de code pour les processus Blue Prism",
      ],
    },
  },
  {
    id: 'odexo-ratp',
    title: { en: 'ODEXO RATP Tool', fr: 'Outil ODEXO RATP' },
    description: {
      en: 'Reporting tool used by RATP for metro-line equipment data analysis and real-time equipment reporting.',
      fr: "Outil de reporting utilisé par la RATP pour l'analyse des données d'équipements des lignes de métro et le reporting en temps réel.",
    },
    period: '2014 - 2016',
    technologies: ['PHP', 'Symfony', 'MySQL', 'Data Analysis'],
    highlights: {
      en: [
        'Enhanced real-time data reporting system',
        'Improved equipment tracking capabilities',
        'Worked with public transportation systems',
      ],
      fr: [
        'Amélioration du système de reporting de données en temps réel',
        'Meilleur suivi des équipements',
        'Travail sur des systèmes de transport public',
      ],
    },
  },
  {
    id: 'sfr-angularjs',
    title: {
      en: 'SFR Online Store – Mobile Plan Configuration',
      fr: 'Boutique en ligne SFR – Configuration des forfaits mobiles',
    },
    description: {
      en: 'AngularJS module for SFR online store letting users configure mobile plans, options, accessories and devices, forwarding the selection to the billing module.',
      fr: 'Module AngularJS pour la boutique en ligne SFR permettant de configurer forfaits, options, accessoires et mobiles, puis de transmettre la sélection au module de facturation.',
    },
    period: '2014 - 2016',
    technologies: ['AngularJS', 'JavaScript', 'J2EE'],
    highlights: {
      en: [
        'Built the mobile-plan configuration module',
        'Integrated with the billing system',
        'Enhanced user experience for product selection',
      ],
      fr: [
        'Développement du module de configuration des forfaits mobiles',
        'Intégration avec le système de facturation',
        "Amélioration de l'expérience de sélection des produits",
      ],
    },
  },
  {
    id: 'quick-backoffice',
    title: {
      en: 'Quick Belux – Restaurant Back-Office',
      fr: 'Quick Belux – Back-office restaurants',
    },
    description: {
      en: 'Restaurant back-office and centralized supervision platform for Quick Belux: sales and financial reports, stock and funds management, data synchronization.',
      fr: 'Back-office restaurants et plateforme de supervision centralisée pour Quick Belux : rapports de ventes et financiers, gestion des stocks et des fonds, synchronisation des données.',
    },
    period: '2014 - 2016',
    technologies: ['Symfony', 'PHP', 'MySQL', 'JavaScript'],
    highlights: {
      en: [
        'Built comprehensive restaurant management system',
        'Financial reporting and stock management',
        'Centralized supervision platform',
      ],
      fr: [
        "Développement d'un système complet de gestion de restaurants",
        'Reporting financier et gestion des stocks',
        'Plateforme de supervision centralisée',
      ],
    },
  },
];

export const skills: Skill[] = [
  {
    category: { en: 'Frontend', fr: 'Frontend' },
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux / Redux-Saga',
      'Zustand',
      'Storybook',
      'Tailwind CSS',
    ],
  },
  {
    category: { en: 'Quality', fr: 'Qualité' },
    items: ['Jest', 'Vitest', 'Testing Library', 'Cypress', 'Code Review'],
  },
  {
    category: { en: 'Styling', fr: 'Style' },
    items: ['Styled Components', 'Bootstrap'],
  },
  {
    category: { en: 'Tools', fr: 'Outils' },
    items: ['Webpack', 'Vite', 'Git', 'GitHub', 'Jenkins'],
  },
  {
    category: { en: 'Backend', fr: 'Backend' },
    items: ['Symfony / PHP', 'Nest', 'C#', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: { en: 'RPA', fr: 'RPA' },
    items: ['UiPath', 'Blue Prism'],
  },
  {
    category: { en: 'Automation & AI', fr: 'Automatisation & IA' },
    items: ['Claude', 'Dynamic Workflows', 'Custom Skills', 'Smart GitHub Actions'],
  },
  {
    category: { en: 'Infrastructure', fr: 'Infrastructure' },
    items: ['Azure DevOps', 'Cloudflare', 'Datadog'],
  },
];

export const languages: Language[] = [
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'Professional' },
  { name: 'Arabic', level: 'Native' },
];

export const interests: string[] = ['DIY & Tinkering', 'New Technologies & AI', 'Reading'];
