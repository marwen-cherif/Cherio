/**
 * Cleans text by removing hidden characters, invisible scripts, and normalizing whitespace
 * @param input - The text to clean
 * @returns The cleaned text
 */
export function cleanAIText(input: string): string {
  if (!input) return "";

  return input
    .normalize("NFKC") 
    // 1) Supprimer invisibles / contrôle / bidi
    .replace(
      /[\u007F\u200B\u200C\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069]/g,
      ""
    )
    .replace(
      /[\u0000-\u001F]/g,
      "\n"
    )
    // 3) Espaces spéciaux → espace normal
    .replace(/[\u00A0\u2000-\u200A\u202F\u205F]/g, " ")
    // 4) Tirets typographiques → -
    .replace(/[\u2011\u2012\u2013\u2014\u2212]/g, "-")
    // 5) Guillemets français → "
    .replace(/[«»]/g, '"')
    // 6) Lignes vides multiples → une seule ligne vide
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    // 7) Espaces multiples → un seul
    .replace(/[ \t]+/g, " ")
    // 8) Trim final
    .trim();
}


// Alias pour compatibilité avec le code existant
export const cleanText = cleanAIText;

