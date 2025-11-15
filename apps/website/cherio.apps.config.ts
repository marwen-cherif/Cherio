export const cherioApps = [
  {
    id: "shop",
    slug: "shop",
    publicName: { fr: "Shop Cherio", en: "Cherio Shop" },
    description: {
      fr: "Boutique officielle proposant une sélection de produits modernes et soignés estampillés Cherio.",
      en: "Official store offering a curated selection of clean, modern Cherio-branded products."
    },
    urls: {
      fr: "https://shop.cherio.me/fr",
      en: "https://shop.cherio.me/en"
    },
    icon: "/icons/shop.svg",
    published: false
  },
  {
    id: "studio",
    slug: "studio",
    publicName: { fr: "Cherio Studio", en: "Cherio Studio" },
    description: {
      fr: "Suite d'outils intelligents et IA pour la création numérique et les workflows créatifs.",
      en: "Suite of intelligent AI-powered tools for digital creation and creative workflows."
    },
    urls: {
      fr: "https://studio.cherio.me/fr",
      en: "https://studio.cherio.me/en"
    },
    icon: "/icons/studio.svg",
    published: false
  },
  {
    id: "core",
    slug: "core",
    publicName: { fr: "Cherio Core", en: "Cherio Core" },
    description: {
      fr: "Le moteur technique central : API, logique, services partagés et infrastructure commune.",
      en: "The central technical engine: API, logic, shared services, and unified infrastructure."
    },
    urls: {
      fr: "https://core.cherio.me/fr",
      en: "https://core.cherio.me/en"
    },
    icon: "/icons/core.svg",
    published: false
  },
  {
    id: "portfolio",
    slug: "portfolio",
    publicName: { fr: "Portfolio Cherio", en: "Cherio Portfolio" },
    description: {
      fr: "Présentation des projets, prototypes et outils de l'écosystème Cherio.",
      en: "Showcase of projects, prototypes and tools from the Cherio ecosystem."
    },
    urls: {
      fr: "https://portfolio.cherio.me/fr",
      en: "https://portfolio.cherio.me/en"
    },
    icon: "/icons/portfolio.svg",
    published: false
  }
] as const;

export type CherioApp = typeof cherioApps[number];

