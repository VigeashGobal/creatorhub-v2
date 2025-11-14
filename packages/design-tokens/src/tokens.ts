export const colors = {
  bg: { DEFAULT: '#0E1220', soft: '#12172A', sunken: '#0B0F1C' },
  fg: { high: '#E9EEF7', base: '#C5CCDA', dim: '#8A93A7' },
  edge: { subtle: 'rgba(255,255,255,0.06)', strong: 'rgba(255,255,255,0.12)' },
  accent: {
    blue: '#5BB6FF',
    purple: '#8E7CFF',
    pink: '#FF7AD9',
    green: '#38E890',
    yellow: '#FFC83D',
    orange: '#F59E0B',
    red: '#EF4444',
  },
}

export const shadows = {
  card: '0 2px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.35)',
}

export const radii = {
  xl2: '16px',
}

export const fonts = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Playfair Display', 'serif'],
}

export const tailwindExtend = {
  colors,
  boxShadow: shadows,
  borderRadius: radii,
  fontFamily: fonts,
}

export type Tokens = {
  colors: typeof colors
  shadows: typeof shadows
  radii: typeof radii
  fonts: typeof fonts
}

