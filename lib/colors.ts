/**
 * Modern Dark Theme Color Scheme - High Contrast
 * 
 * Usage:
 * import { colors } from '@/lib/colors';
 * const primaryColor = colors.primary[600];
 */

export const colors = {
  // Primary Colors - Bright Cyan
  primary: {
    50: '#0a1f2e',
    100: '#0d3a52',
    200: '#1a5a7f',
    300: '#2681b4',
    400: '#3db8ff',
    500: '#4ec9ff',
    600: '#5fd4ff',
    700: '#7ae0ff',
    800: '#a0edff',
    900: '#e0f8ff',
  },

  // Secondary Colors - Vibrant Purple
  secondary: {
    50: '#2d1b3d',
    100: '#3d2452',
    200: '#5a3d7a',
    300: '#7d5aad',
    400: '#a876ff',
    500: '#bb8eff',
    600: '#cd9fff',
    700: '#deb0ff',
    800: '#e8c5ff',
    900: '#f3e0ff',
  },

  // Success Color - Bright Green
  success: {
    50: '#0d2818',
    100: '#1a3e28',
    200: '#2d5a3a',
    300: '#40774e',
    400: '#5caa68',
    500: '#7ed993',
    600: '#95e6a8',
    700: '#a8f0ba',
    800: '#c0f7d0',
    900: '#e0ffe6',
  },

  // Warning Color - Bright Amber
  warning: {
    50: '#331a00',
    100: '#5c2f00',
    200: '#8c4800',
    300: '#b8620a',
    400: '#e8851f',
    500: '#ffa542',
    600: '#ffb85c',
    700: '#ffc973',
    800: '#ffd99a',
    900: '#ffe8bf',
  },

  // Error Color - Bright Red
  error: {
    50: '#3d0b0b',
    100: '#6b1818',
    200: '#942626',
    300: '#c23c3c',
    400: '#ff5555',
    500: '#ff7777',
    600: '#ff9999',
    700: '#ffb0b0',
    800: '#ffc9c9',
    900: '#ffe0e0',
  },

  // Info Color - Bright Blue
  info: {
    50: '#0a1f2e',
    100: '#0d3a52',
    200: '#1a5a7f',
    300: '#2681b4',
    400: '#3db8ff',
    500: '#4ec9ff',
    600: '#5fd4ff',
    700: '#7ae0ff',
    800: '#a0edff',
    900: '#e0f8ff',
  },

  // Neutral Colors - Grayscale
  neutral: {
    50: '#0f0f0f',
    100: '#1a1a1a',
    200: '#2d2d2d',
    300: '#404040',
    400: '#595959',
    500: '#808080',
    600: '#a6a6a6',
    700: '#d0d0d0',
    800: '#e8e8e8',
    900: '#ffffff',
  },
};

/**
 * CSS Variable Names
 * Use these to reference the CSS variables in your components
 */
export const cssVariables = {
  primary: '--color-primary-500',
  secondary: '--color-secondary-500',
  success: '--color-success-500',
  warning: '--color-warning-500',
  error: '--color-error-500',
  info: '--color-info-500',
  
  background: '--background',
  backgroundSecondary: '--background-secondary',
  backgroundTertiary: '--background-tertiary',
  
  foreground: '--foreground',
  foregroundSecondary: '--foreground-secondary',
  foregroundTertiary: '--foreground-tertiary',
  
  border: '--color-border',
  borderLight: '--color-border-light',
  
  hover: '--color-hover',
  active: '--color-active',
  focusRing: '--color-focus-ring',
  accent: '--color-accent',
  accentHover: '--color-accent-hover',
  accentActive: '--color-accent-active',
} as const;

/**
 * Semantic Color Meanings
 */
export const semanticColors = {
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
  primary: colors.primary,
  secondary: colors.secondary,
} as const;

/**
 * Get CSS variable value
 * Usage: getCSSVariableValue('--color-primary-600')
 */
export const getCSSVariableValue = (variableName: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};
