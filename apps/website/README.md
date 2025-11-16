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

Le formulaire de contact utilise Mailjet pour envoyer les emails. Pour l'activer, vous devez configurer les variables d'environnement suivantes :

### Variables d'environnement requises

Créez un fichier `.env.local` à la racine du projet `apps/website/` avec les variables suivantes :

```env
# Mailjet Configuration
# Obtenez vos clés API sur https://app.mailjet.com/account/api_keys
MJ_APIKEY_PUBLIC=your_mailjet_api_key_public
MJ_APIKEY_PRIVATE=your_mailjet_api_key_private

# Email de destination (où vous recevrez les messages du formulaire)
MJ_RECIPIENT_EMAIL=your-email@example.com

# Optionnel: Nom du destinataire
MJ_RECIPIENT_NAME=Cherio

# Optionnel: Email et nom de l'expéditeur (par défaut, utilise MJ_RECIPIENT_EMAIL)
MJ_FROM_EMAIL=noreply@cherio.me
MJ_FROM_NAME=Cherio Contact Form
```

### Obtenir les clés API Mailjet

1. Créez un compte sur [Mailjet](https://www.mailjet.com/)
2. Allez dans votre compte → API Keys
3. Copiez votre API Key (publique) et votre Secret Key (privée)
4. Ajoutez-les dans votre fichier `.env.local`

### Note importante

Le mode export statique (`output: 'export'`) a été désactivé pour permettre l'utilisation des routes API nécessaires à l'envoi d'emails. Si vous avez besoin d'un export statique, vous devrez utiliser un service externe ou un backend séparé pour gérer l'envoi d'emails.

