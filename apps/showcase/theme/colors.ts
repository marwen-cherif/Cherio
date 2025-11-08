/**
 * Centralized color theme for the showcase app
 * All colors used throughout the application should be defined here
 */

export const colors = {
  // Primary colors
  background: '#FFFBF5',
  foreground: '#5C5451',
  primary: '#5C5451',
  
  // Secondary colors
  secondary: '#A18080',
  muted: '#A18080',
  
  // Accent colors
  accent: '#FFDBD9',
  
  // Semantic colors
  border: '#FFDBD9',
  
  // Additional colors (for buttons, links, etc.)
  white: '#FFFFFF',
  black: '#000000',
  
  // External platform colors (for product links)
  amazon: {
    primary: '#FF9900',
    hover: '#E88900',
  },
  etsy: {
    primary: '#F56400',
    hover: '#D85600',
  },
  vinted: {
    primary: '#09B1BA',
    hover: '#0899A1',
  },
} as const;

/**
 * Type-safe color keys
 */
export type ColorKey = keyof typeof colors;

/**
 * Helper function to get color value
 */
export function getColor(key: ColorKey): string {
  if (typeof colors[key] === 'string') {
    return colors[key] as string;
  }
  // For nested objects like amazon, etsy, vinted
  return (colors[key] as any).primary || colors[key] as string;
}

/**
 * CSS variable names mapping
 */
export const cssVariables = {
  '--color-background': colors.background,
  '--color-foreground': colors.foreground,
  '--color-primary': colors.primary,
  '--color-secondary': colors.secondary,
  '--color-accent': colors.accent,
  '--color-muted': colors.muted,
  '--color-border': colors.border,
} as const;

