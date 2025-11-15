# Cherio Showcase

Site vitrine moderne, responsive et multilingue pour présenter vos produits.

## 🚀 Fonctionnalités

- ✅ **Multilingue** : Français, Anglais, Arabe avec support RTL
- ✅ **Responsive** : Design mobile-first avec Tailwind CSS
- ✅ **SEO-friendly** : Balises hreflang, JSON-LD, métadonnées optimisées
- ✅ **Performance** : Next.js 16 avec App Router
- ✅ **Internationalisation** : next-intl pour la gestion des traductions
- ✅ **Design moderne** : Animations subtiles, thème clair/sombre

## 📁 Structure

```
apps/showcase/
├── app/
│   └── [locale]/          # Pages avec support multilingue
│       ├── page.tsx       # Page d'accueil
│       ├── products/      # Liste des produits
│       ├── products/[id]/ # Détail d'un produit
│       ├── about/         # À propos
│       └── contact/       # Contact
├── components/            # Composants réutilisables
├── data/                  # Données produits
├── i18n/                  # Configuration i18n
├── messages/              # Fichiers de traduction
└── types/                 # Types TypeScript
```

## 🛠️ Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm --filter showcase dev
```

## 🌍 Langues

Le site supporte 3 langues :
- **Français** (fr) - langue par défaut
- **Anglais** (en)
- **Arabe** (ar) - avec support RTL

Les traductions sont dans `messages/{locale}.json`

## 📦 Produits

Les produits sont définis dans `data/products.ts`. Chaque produit contient :
- Nom, description (multilingue)
- Prix et devise
- Images
- Liens vers Amazon, Etsy, Vinted

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `app/[locale]/globals.css` et les classes Tailwind.

### Ajouter des produits
Modifiez `data/products.ts` et ajoutez vos produits.

### Modifier les traductions
Éditez les fichiers dans `messages/`.

## 🚀 Déploiement

### Vercel (recommandé)
```bash
vercel
```

### VPS
```bash
pnpm build
pnpm start
```

## 📝 Notes

- Les images des produits doivent être ajoutées dans `public/images/`
- Le formulaire de contact est actuellement une simulation (à connecter à un backend)
- Les liens sociaux dans le footer doivent être mis à jour avec vos vrais liens
