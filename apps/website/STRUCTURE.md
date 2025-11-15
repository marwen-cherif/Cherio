# Structure du site Cherio

## Architecture

```
apps/website/
├── app/
│   ├── [locale]/          # Routes localisées
│   │   ├── page.tsx       # Landing page
│   │   ├── contact/       # Page contact
│   │   └── layout.tsx     # Layout avec Header/Footer
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer
│   ├── navigation/        # LanguageSwitcher
│   ├── sections/          # Sections de la landing
│   ├── forms/             # ContactForm
│   └── seo/               # Metadata, JsonLd
├── i18n/                  # Configuration i18n
├── messages/              # Traductions FR/EN
├── public/
│   └── icons/             # Icônes des applications
└── cherio.apps.config.ts   # Configuration centralisée
```

## Routes

- `/fr` - Landing page (FR)
- `/en` - Landing page (EN)
- `/fr/contact` - Contact (FR)
- `/en/contact` - Contact (EN)

## Configuration

Le fichier `cherio.apps.config.ts` contient la configuration de toutes les applications Cherio. Les pages lisent ce fichier pour afficher dynamiquement les informations.

## SEO

Chaque page inclut :
- Metadata complète (title, description)
- OpenGraph tags
- Twitter cards
- Canonical links
- Schema.org JSON-LD
- Structure HTML sémantique

## Build

Le site est généré en statique avec `next build`, produisant des fichiers HTML dans `out/`.

