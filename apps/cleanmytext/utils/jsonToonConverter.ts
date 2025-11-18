import { encode, decode } from '@toon-format/toon';

/**
 * Converts JSON to TOON (Token-Oriented Object Notation) format
 * Uses the official @toon-format/toon library
 * @param jsonString - The JSON string to convert
 * @returns The TOON formatted string
 */
export function jsonToToon(jsonString: string): string {
  if (!jsonString || !jsonString.trim()) {
    return '';
  }

  try {
    const obj = JSON.parse(jsonString);
    return encode(obj);
  } catch (error: any) {
    throw new Error(`Invalid JSON format: ${error.message || 'Parse error'}`);
  }
}

/**
 * Converts TOON format back to JSON
 * Uses the official @toon-format/toon library
 * @param toonString - The TOON formatted string
 * @returns The JSON string
 */
export function toonToJson(toonString: string): string {
  if (!toonString || !toonString.trim()) {
    return '';
  }

  try {
    const obj = decode(toonString);
    return JSON.stringify(obj, null, 2);
  } catch (error: any) {
    throw new Error(`Invalid TOON format: ${error.message || 'Parse error'}`);
  }
}
