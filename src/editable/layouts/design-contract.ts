import type { CSSProperties } from 'react'

/*
  hampawp.com — lavender-teal playful directory palette.

  #B5B9F0 (lavender)   — primary CTA buttons, brand signature
  #408175 (teal)       — links, active nav, secondary accents
  #2E4540 (dark teal)  — trust band gradient, hover darken
  #0B0909 (near-black) — dark sections, footer, page text
*/

export const editableRootStyle = {
  '--slot4-page-bg': '#fafaff',
  '--slot4-page-text': '#0B0909',
  '--slot4-panel-bg': '#eeeeff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5a6070',
  '--slot4-soft-muted-text': '#8890a8',
  '--slot4-accent': '#408175',
  '--slot4-accent-fill': '#B5B9F0',
  '--slot4-accent-b': '#2E4540',
  '--slot4-accent-soft': '#eceeff',
  '--slot4-on-accent': '#0B0909',
  '--slot4-dark-bg': '#0B0909',
  '--slot4-dark-text': '#f5f5f8',
  '--slot4-media-bg': '#eceeff',
  '--slot4-cream': '#f5f5fc',
  '--slot4-warm': '#f5f5fc',
  '--slot4-lavender': '#eceeff',
  '--slot4-gray': '#f5f5fc',
  '--slot4-line': '#e8e8f0',
  '--slot4-tint-1': '#e8e8ff',
  '--slot4-tint-2': '#e0f2ee',
  '--slot4-tint-3': '#fef3e8',
  '--slot4-tint-4': '#f0efff',
  '--slot4-tint-5': '#eceeff',
  '--slot4-tint-6': '#e8f2f0',
  '--slot4-icon-1': '#B5B9F0',
  '--slot4-icon-2': '#408175',
  '--slot4-icon-3': '#fcb373',
  '--slot4-icon-4': '#c8d0f0',
  '--slot4-icon-5': '#B5B9F0',
  '--slot4-icon-6': '#408175',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#0B0909',
  '--editable-container': '1200px',
  '--editable-border': '#e8e8f0',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#0B0909',
  '--editable-nav-active': '#408175',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#B5B9F0',
  '--editable-cta-text': '#0B0909',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0B0909',
  '--editable-footer-text': '#f5f5f8',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_4px_rgba(0,0,0,0.07)]',
  shadowStrong: 'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableCardTints = [
  { bg: 'var(--slot4-tint-1)', icon: 'var(--slot4-icon-1)' },
  { bg: 'var(--slot4-tint-2)', icon: 'var(--slot4-icon-2)' },
  { bg: 'var(--slot4-tint-3)', icon: 'var(--slot4-icon-3)' },
  { bg: 'var(--slot4-tint-4)', icon: 'var(--slot4-icon-4)' },
  { bg: 'var(--slot4-tint-5)', icon: 'var(--slot4-icon-5)' },
  { bg: 'var(--slot4-tint-6)', icon: 'var(--slot4-icon-6)' },
] as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
    sectionYLarge: 'py-20 sm:py-24 lg:py-32',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start sm:w-[300px]',
  },
  type: {
    eyebrow:
      'inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]',
    heroTitle:
      'text-[2.75rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3.75rem] lg:text-[5rem]',
    sectionTitle:
      'text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.25rem]',
    body: 'text-base leading-[1.7] text-[var(--slot4-page-text)]',
    lead: 'text-lg leading-[1.7] text-[var(--slot4-muted-text)] sm:text-xl',
  },
  surface: {
    card: 'rounded-2xl border border-[var(--editable-border)] bg-white',
    soft: 'rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]',
    dark: 'rounded-2xl bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]',
    tinted: 'rounded-2xl border border-[var(--editable-border)]',
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.98]',
    ghost:
      'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--slot4-page-text)] transition duration-300 hover:text-[var(--slot4-accent)]',
  },
  badge: {
    pill: 'inline-flex items-center gap-1.5 rounded-full border border-[var(--editable-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--slot4-muted-text)]',
    accentPill:
      'inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--slot4-accent)]',
    lavenderPill:
      'inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-tint-1)] px-3 py-1 text-xs font-semibold text-[#5a5fd8]',
  },
  media: {
    frame: 'relative overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)]',
    frameFull: 'relative overflow-hidden rounded-3xl bg-[var(--slot4-media-bg)]',
    ratio: 'aspect-[4/3]',
    ratioWide: 'aspect-[16/9]',
    ratioSquare: 'aspect-square',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(64,129,117,0.22)]',
    fade: 'transition duration-300 hover:opacity-80',
    zoom: 'transition duration-500 group-hover:scale-[1.04]',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
