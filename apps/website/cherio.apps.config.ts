export const cherioApps = [
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    publicName: { fr: 'CleanMyText', en: 'CleanMyText' },
    description: {
      fr: 'Outil en ligne pour nettoyer les caractères cachés et les scripts invisibles de votre texte.',
      en: 'Online tool to clean hidden characters and invisible scripts from your text.',
    },
    urls: {
      fr: 'https://text-cleaner.cherio.me/fr',
      en: 'https://text-cleaner.cherio.me/en',
    },
    icon: '/icons/text-cleaner.svg',
    published: true,
  },
] as const;

export type CherioApp = (typeof cherioApps)[number];
