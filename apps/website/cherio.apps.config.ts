export interface AppMedia {
  type: 'image' | 'video';
  url: string;
  alt?: { fr: string; en: string };
  thumbnail?: string; // Pour les vidéos
}

export interface AppSection {
  title: { fr: string; en: string };
  content: { fr: string; en: string };
}

export interface AppFAQ {
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
}

export interface CherioAppConfig {
  id: string;
  slug: string;
  publicName: { fr: string; en: string };
  description: {
    fr: string;
    en: string;
  };
  longDescription?: {
    fr: string;
    en: string;
  };
  urls: {
    fr: string;
    en: string;
  };
  icon: string;
  published: boolean;
  media?: AppMedia[]; // Carrousel d'images/vidéos
  howItWorks?: AppSection; // Section "Comment ça fonctionne"
  useCases?: AppSection; // Section "Cas d'usage"
  faq?: AppFAQ[]; // Section FAQ
}

export const cherioApps: CherioAppConfig[] = [
  {
    id: 'text-cleaner',
    slug: 'text-cleaner',
    publicName: { fr: 'Text AI tools', en: 'Text AI tools' },
    description: {
      fr: 'Une panoplie d’outils dédiés aux LLM : nettoyer vos textes, optimiser vos prompts et transformer vos JSON en formats allégés pour un traitement plus économique et plus efficace par les modèles d’IA.',
      en: 'A suite of tools designed for LLM workflows: clean your text, optimize your prompts, and convert JSON into lightweight, cost-efficient formats for faster and more economical processing by AI models.',
    },
    longDescription: {
      fr: 'Text AI tools est un outil puissant et gratuit conçu pour nettoyer votre texte de tous les caractères invisibles, scripts cachés et caractères de contrôle qui peuvent causer des problèmes dans vos applications, bases de données ou lors de la copie-collage. Que vous travailliez avec du texte généré par IA, copié depuis des documents PDF, ou récupéré depuis des sites web, Text AI tools garantit un texte propre et sécurisé.',
      en: 'Text AI tools is a powerful and free tool designed to clean your text from all invisible characters, hidden scripts, and control characters that can cause issues in your applications, databases, or when copy-pasting. Whether you work with AI-generated text, copied from PDF documents, or retrieved from websites, Text AI tools ensures clean and secure text.',
    },
    urls: {
      fr: 'https://text-cleaner.cherio.me/fr',
      en: 'https://text-cleaner.cherio.me/en',
    },
    icon: '/icons/text-cleaner.svg',
    published: true,
    media: [
      // Exemple de configuration - vous pouvez ajouter vos propres images/vidéos
      {
        type: 'image',
        url: '/images/cleanmytext-screenshot-1.png',
        alt: {
          fr: 'Interface Text AI tools',
          en: 'Text AI tools interface',
        },
      },
      {
        type: 'image',
        url: '/images/cleanmytext-screenshot-2.png',
        alt: {
          fr: 'Résultat du nettoyage de texte',
          en: 'Text cleaning result',
        },
      },
      {
        type: 'video',
        url: '/videos/cleanmytext-demo.mp4',
        thumbnail: '/images/cleanmytext-screenshot-1.png',
        alt: {
          fr: 'Démonstration Text AI tools',
          en: 'Text AI tools demonstration',
        },
      },
    ],
    howItWorks: {
      title: {
        fr: 'Comment ça fonctionne',
        en: 'How it works',
      },
      content: {
        fr: `Text AI tools utilise des algorithmes avancés pour détecter et supprimer automatiquement tous les caractères problématiques de votre texte. Le processus est simple et rapide :

1. **Collez votre texte** : Copiez et collez n'importe quel texte dans la zone de saisie
2. **Nettoyage automatique** : L'outil analyse et supprime instantanément :
   - Les caractères de largeur zéro (zero-width)
   - Les scripts invisibles Unicode
   - Les caractères de contrôle
   - Les espaces spéciaux et non-standard
   - Les caractères de formatage cachés
3. **Résultat propre** : Obtenez un texte nettoyé que vous pouvez copier en un clic

L'outil normalise également les espaces multiples, les lignes vides excessives et convertit les caractères spéciaux en leurs équivalents standards, garantissant un texte parfaitement formaté et sécurisé.`,
        en: `Text AI tools uses advanced algorithms to automatically detect and remove all problematic characters from your text. The process is simple and fast:

1. **Paste your text**: Copy and paste any text into the input area
2. **Automatic cleaning**: The tool instantly analyzes and removes:
   - Zero-width characters
   - Invisible Unicode scripts
   - Control characters
   - Special and non-standard spaces
   - Hidden formatting characters
3. **Clean result**: Get cleaned text that you can copy with one click

The tool also normalizes multiple spaces, excessive blank lines, and converts special characters to their standard equivalents, ensuring perfectly formatted and secure text.`,
      },
    },
    useCases: {
      title: {
        fr: "Cas d'usage",
        en: 'Use cases',
      },
      content: {
        fr: `Text AI tools est indispensable dans de nombreuses situations :

**Développement et programmation** : Nettoyez le texte avant de l'insérer dans des bases de données, des APIs ou des fichiers de configuration pour éviter les erreurs et les problèmes de sécurité.

**Traitement de texte IA** : Éliminez les caractères invisibles des textes générés par ChatGPT, Claude ou d'autres modèles de langage avant de les utiliser dans vos projets.

**Copie depuis PDF** : Les documents PDF contiennent souvent des caractères invisibles et des espaces spéciaux. Text AI tools les nettoie automatiquement.

**Sécurité** : Protégez-vous contre les scripts invisibles et les caractères de contrôle qui pourraient être utilisés pour des attaques ou causer des dysfonctionnements.

**Préparation de contenu** : Préparez votre texte pour les publications, emails, ou tout autre usage professionnel avec un texte propre et formaté.`,
        en: `Text AI tools is essential in many situations:

**Development and programming**: Clean text before inserting it into databases, APIs, or configuration files to avoid errors and security issues.

**AI text processing**: Remove invisible characters from texts generated by ChatGPT, Claude, or other language models before using them in your projects.

**Copying from PDF**: PDF documents often contain invisible characters and special spaces. Text AI tools automatically cleans them.

**Security**: Protect yourself against invisible scripts and control characters that could be used for attacks or cause malfunctions.

**Content preparation**: Prepare your text for publications, emails, or any other professional use with clean and formatted text.`,
      },
    },
    faq: [
      {
        question: {
          fr: 'Text AI tools est-il gratuit ?',
          en: 'Is Text AI tools free?',
        },
        answer: {
          fr: "Oui, Text AI tools est entièrement gratuit et sans limitation. Vous pouvez l'utiliser autant de fois que vous le souhaitez.",
          en: 'Yes, Text AI tools is completely free and unlimited. You can use it as many times as you want.',
        },
      },
      {
        question: {
          fr: 'Mes données sont-elles stockées ?',
          en: 'Is my data stored?',
        },
        answer: {
          fr: "Non, Text AI tools fonctionne entièrement dans votre navigateur. Aucune donnée n'est envoyée à nos serveurs, garantissant une confidentialité totale.",
          en: 'No, Text AI tools works entirely in your browser. No data is sent to our servers, ensuring complete privacy.',
        },
      },
      {
        question: {
          fr: 'Quels types de caractères sont supprimés ?',
          en: 'What types of characters are removed?',
        },
        answer: {
          fr: 'Text AI tools supprime les caractères de largeur zéro, les scripts invisibles Unicode, les caractères de contrôle, les espaces spéciaux et tous les caractères non-standard qui peuvent causer des problèmes.',
          en: 'Text AI tools removes zero-width characters, invisible Unicode scripts, control characters, special spaces, and all non-standard characters that can cause issues.',
        },
      },
      {
        question: {
          fr: 'Puis-je utiliser Text AI tools pour nettoyer du code ?',
          en: 'Can I use Text AI tools to clean code?',
        },
        answer: {
          fr: "Text AI tools est conçu pour nettoyer du texte, pas du code. Pour le code, il est recommandé d'utiliser des outils spécialisés qui préservent la syntaxe.",
          en: 'Text AI tools is designed to clean text, not code. For code, it is recommended to use specialized tools that preserve syntax.',
        },
      },
    ],
  },
] as const;

export type CherioApp = (typeof cherioApps)[number];
