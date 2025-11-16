# Cherio Website

Site web statique officiel de Cherio, construit avec Next.js et optimisé pour le SEO.

## Caractéristiques

- 🌍 Multilingue (FR/EN)
- 📱 100% SEO-friendly
- ⚡ SSG (Static Site Generation)
- 🎨 Design moderne avec Tailwind CSS
- 📄 Pages : Landing, Contact

## Structure

- `/fr` - Version française
- `/en` - Version anglaise
- `/fr/contact` - Page de contact (FR)
- `/en/contact` - Page de contact (EN)

## Configuration

Le fichier `cherio.apps.config.ts` contient la configuration centralisée de toutes les applications Cherio. Les pages lisent ce fichier pour afficher dynamiquement les informations.

## Développement

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

Le build génère un site statique dans le dossier `out/`.

## Configuration du formulaire de contact

Le formulaire de contact utilise Formspree. Pour l'activer, modifiez l'URL dans `components/forms/ContactForm.tsx` avec votre ID Formspree.

