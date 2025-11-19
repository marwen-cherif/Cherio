export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: string[];
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
  title: 'Front-End Team Lead',
  location: 'Melun, France',
  address: '76 Rue dian fossey, 77000 Melun - FRANCE',
  email: 'marwen.cherif@gmail.com',
  phone: '+33 6 77 62 11 23',
  website: 'https://marwen-cherif.cherio.me/',
  linkedin: 'https://www.linkedin.com/in/marwen-cherif-54898148/',
  upwork: 'https://www.upwork.com/freelancers/~0156bc098f503b1e3a',
  nationality: 'Tunisia, France',
  bio: {
    en: 'Software Developer with 10+ years of hands-on experience spanning front-end, back-end, and automation. I’ve built and scaled applications across the full stack, from modern React/TypeScript front-ends to Node.js back-end services and RPA workflows. My expertise as a Front-End Team Lead includes driving architecture decisions, optimizing developer experience, and delivering robust, scalable interfaces used in production at scale. Above all, I’m deeply passionate about engineering, problem-solving, and crafting elegant technical solutions that stand the test of time.',
    fr: 'Développeur logiciel avec plus de 10 ans d’expérience couvrant le front-end, le back-end et l’automatisation. J’ai conçu, développé et fait évoluer des applications sur l’ensemble de la stack, depuis des interfaces modernes en React/TypeScript jusqu’à des services back-end en Node.js et des workflows RPA. En tant que Front-End Team Lead, j’ai piloté des choix d’architecture, amélioré l’expérience développeur et livré des interfaces robustes et scalables utilisées en production à grande échelle. Avant tout, je suis un passionné d’ingénierie et de résolution de problèmes, animé par la volonté de créer des solutions élégantes et durables.',
  },
};

export const experiences: Experience[] = [
  {
    id: 'reversio',
    company: 'Revers.io (SAV Group)',
    position: 'Front-End Team Lead',
    location: 'France',
    startDate: '06/2019',
    endDate: null,
    current: true,
    description: [
      'Leading the front-end architecture and development of a large-scale SaaS platform used by major retailers and manufacturers to manage after-sales operations and reverse logistics.',
      'Driving the migration from Create React App + Webpack to Vite and React 19, reducing build times by 50% and improving local startup performance by 500%.',
      'Establishing a modern monorepo architecture with Turborepo, GitHub Actions, and Cloudflare R2, cutting CI/CD deployment times by 40%.',
      'Mentoring developers and an alternant, ensuring technical excellence, code quality, and alignment with product and UX teams.',
      'Spearheading adoption of TanStack Query v5, TypeScript strict mode, and component-driven development with Storybook and Chromatic, reducing production bugs by 25%.',
      'Collaborating closely with back-end teams to define GraphQL/REST contracts and improve application performance and maintainability.',
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'Storybook',
      'Cloudflare R2/Workers',
      'GitHub Actions',
      'Turborepo',
      'Node.js',
      'GraphQL',
      'Azure',
    ],
  },
  {
    id: 'addstones',
    company: 'Addstones',
    position: 'Web Developer',
    location: 'France',
    startDate: '02/2018',
    endDate: '05/2019',
    current: false,
    description: [
      'Designed and implemented automation solutions to streamline complex business processes for BNP Paribas Asset Management, improving operational efficiency and reducing manual workload.',
      'Developed front-end interfaces and internal tools using TypeScript and React, ensuring high maintainability and scalability.',
      'Integrated automation workflows through Blue Prism to connect multiple enterprise systems.',
      'Collaborated with cross-functional teams following Agile (Scrum) methodology to deliver reliable and performant automation solutions.',
    ],
    technologies: ['TypeScript', 'React', 'Blue Prism', 'C#', 'Agile/Scrum'],
  },
  {
    id: 'bouygues',
    company: 'Bouygues Telecom',
    position: 'Full-Stack Web Developer',
    location: 'France',
    startDate: '09/2016',
    endDate: '01/2018',
    current: false,
    description: [
      'Support and new feature development on Reflex Ticketing (Bouygues entreprise ticketing platform).',
      'Integration of the aftersales process and delivery of new equipements.',
      'Geographical visualisation of the interventions on fiber infrastructure.',
      'Interactive interface with the client CPE.',
      'Technical support and issues resolving.',
    ],
    technologies: ['PHP5', 'Symfony3', 'PhpUnit', 'jQuery', 'Jenkins', 'Git/GitLab', 'Selenium'],
  },
  {
    id: 'talan',
    company: 'Talan Tunisie Consulting',
    position: 'Consultant Developer',
    location: 'Tunisia',
    startDate: '07/2014',
    endDate: '08/2016',
    current: false,
    description: [
      'Quick restaurant management: Sales and financial reports, stock and funds management, data synchronization.',
      'Platform for automatic profile matching: process profile evaluation and candidates assignation.',
      'Social Network Enterprise solution for enhancing team collaboration.',
      'HR internal recruitment platform and HR management (intervention workflow validation, compensation, reports).',
      'Solution for event/internship organisation and contacts management.',
      'Reporting tool used by RATP for metro equipments data analysis (ODEXO).',
      'Development of an AngularJS module integrated with SFR front-office.',
      'New features on Enedis Showroom Linky Web and IOS application.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'Twitter Bootstrap',
      'PHP5',
      'JavaScript (ES5)',
      'PubSub',
      'Symfony',
      'Silex',
      'Apache2',
      'MySQL',
      'Jira',
      'SVN',
      'AngularJS',
    ],
  },
];

export const education: Education[] = [
  {
    id: 'enit',
    institution: "École nationale d'ingénieurs de Tunis",
    degree: "Master's Degree",
    field: 'Software Engineering',
    startDate: '09/2011',
    endDate: '06/2014',
    location: 'Tunis, Tunisia',
  },
  {
    id: 'ipeim',
    institution: 'IPEIM',
    degree: 'Preparatory Institute',
    field: 'Engineering Preparatory Studies',
    startDate: '09/2009',
    endDate: '09/2011',
    location: 'Tunis, Tunisia',
  },
];

export const projects: Project[] = [
  {
    id: 'reflexticketing',
    title: 'ReflexTicketing [Bouygues Telecom]',
    description:
      'Support and new feature development on Bouygues Telecom platform of issues tracking for enterprise accounts. Integration of aftersales process, geographical visualization of interventions, and interactive client interface.',
    period: 'Sep 2016 - Jan 2018',
    technologies: ['PHP5', 'Symfony3', 'PhpUnit', 'jQuery', 'Jenkins', 'Git/GitLab', 'Selenium'],
    highlights: [
      'Enhanced issue tracking platform for enterprise clients',
      'Geographical visualization of fiber infrastructure interventions',
      'Interactive CPE client interface',
    ],
  },
  {
    id: 'quick-backoffice',
    title: 'Quick Restaurant Management',
    description:
      'Sales and financial reports, stock and funds management, data synchronization platform for Quick restaurant chain.',
    period: '2014 - 2016',
    technologies: ['PHP5', 'Symfony', 'MySQL', 'JavaScript'],
    highlights: [
      'Built comprehensive restaurant management system',
      'Developed financial reporting and stock management',
      'Created data synchronization platform',
    ],
  },
  {
    id: 'internship-platform',
    title: 'Internship Platform [BIAT]',
    description:
      'Platform for automatic matching of candidates with enterprises internship offers. The companies create offers, add weighted criteria, and candidates are assigned automatically to offers.',
    period: '2015 - 2016',
    technologies: ['PHP5', 'Symfony', 'MySQL', 'JavaScript'],
    highlights: [
      'Developed automatic matching algorithm for candidates and offers',
      'Created weighted criteria system for intelligent matching',
      'Built admin validation workflow',
    ],
  },
  {
    id: 'odexo-ratp',
    title: 'ODEXO RATP Tool',
    description:
      'Reporting tool used by RATP for metro equipments data analysis and real-time equipment data reporting.',
    period: '2015',
    technologies: ['PHP5', 'Symfony', 'MySQL', 'Data Analysis'],
    highlights: [
      'Enhanced real-time data reporting system',
      'Improved equipment tracking capabilities',
      'Worked with public transportation systems',
    ],
  },
  {
    id: 'supermarket-management',
    title: 'Supermarket Management and Business Analysis',
    description:
      'Web application for supermarket employees to manage provisioning products, invoices, generating PDF forms for government. API services for product sales and data visualization based on historical transactions for business intelligence.',
    period: 'Jan 2015 - Jun 2016',
    technologies: ['AngularJS', 'Node.js', 'MongoDB', 'Express.js', 'Data Visualization'],
    highlights: [
      'Built complete supermarket management system',
      'Developed API services for product sales',
      'Created data visualization dashboards for business intelligence',
      'Implemented PDF generation for government forms',
    ],
  },
  {
    id: 'sfr-angularjs',
    title: 'SFR Front-Office AngularJS Module',
    description:
      'Development of an AngularJS module integrated with SFR front-office, which allows users to pick offers, options, accessories and mobile, and forward to the billing module.',
    period: '2014 - 2016',
    technologies: ['AngularJS', 'JavaScript', 'Front-end Integration'],
    highlights: [
      'Built AngularJS module for telecom front-office',
      'Integrated with billing system',
      'Enhanced user experience for product selection',
    ],
  },
  {
    id: 'enedis-linky',
    title: 'Enedis Showroom Linky',
    description:
      'New features development on Enedis Showroom Linky Web and iOS application for smart meter management.',
    period: '2014 - 2016',
    technologies: ['Web Development', 'iOS', 'JavaScript'],
    highlights: [
      'Enhanced smart meter management interface',
      'Cross-platform development (Web and iOS)',
      'Improved user experience for energy management',
    ],
  },
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Styled-components',
      'Atomic design',
      'UX/UI Design',
      'Next.js',
      'AngularJS',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
    ],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Symfony', 'REST APIs', 'Swagger', 'GraphQL', 'PHP5'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    category: 'DevOps & Tools',
    items: [
      'Git',
      'Linux',
      'Nginx',
      'Jenkins',
      'GitHub Actions',
      'Azure DevOps',
      'Turborepo',
      'Cloudflare R2/Workers',
      'Vite',
    ],
  },
  {
    category: 'Testing',
    items: ['Jest', 'Vitest', 'PHPUnit', 'Selenium'],
  },
  {
    category: 'Other',
    items: [
      'Agile',
      'Scrum',
      'Kanban',
      'ESLint',
      'NPM',
      'RPA (UiPath)',
      'Blue Prism',
      'Storybook',
      'Chromatic',
      'TanStack Query',
      'Zustand',
    ],
  },
];
