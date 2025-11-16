# CleanMyText

A Next.js application for cleaning hidden characters and invisible scripts from text.

## Features

- 🧹 Clean hidden characters and invisible scripts
- 🌍 Internationalization support (English and French)
- 📱 Mobile-responsive design
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- ⚡ Fast and efficient text processing
- 📋 One-click clean and copy functionality

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Or from the root directory:

```bash
pnpm dev:cleanmytext
```

The application will be available at `http://localhost:3000`

## Usage

1. Paste your text in the input area
2. Click "Clean Text" to clean the text
3. Click "Clean & Copy" to clean and copy to clipboard in one action
4. Use the "Copy" button to copy the cleaned text
5. Use "Clear" to reset both input and output

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **next-intl** - Internationalization
- **Radix UI** - Accessible component primitives

## Project Structure

```
apps/cleanmytext/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Main page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization config
├── lib/                   # Utility libraries
├── messages/              # Translation files
└── utils/                 # Utility functions
    └── textCleaner.ts     # Text cleaning logic
```

## Text Cleaning

The `cleanText` function in `utils/textCleaner.ts` removes:

- Zero-width characters
- Invisible Unicode characters
- Control characters (except newlines, tabs, carriage returns)
- Bidirectional text marks
- Variation selectors
- Language tags
- Tag characters
- Normalizes whitespace

## License

Private - Cherio Platform

