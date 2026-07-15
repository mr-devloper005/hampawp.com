import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  hampawp.com — lavender-teal playful directory task surfaces.

  #B5B9F0 (lavender) — primary CTA fill
  #408175 (teal)     — accent links, active indicators
  #2E4540 (dark teal)— hover darken, trust band
  #0B0909 (near-black)— text, footer
*/

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif"
const BODY = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY,
  fontBody: BODY,
  bg: '#ffffff',
  surface: '#ffffff',
  raised: '#f5f5fc',
  text: '#0B0909',
  muted: '#5a6070',
  line: '#e8e8f0',
  accent: '#408175',
  accentSoft: '#eceeff',
  onAccent: '#0B0909',
  glow: 'rgba(181,185,240,0.15)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article:    { ...base, kicker: 'Field notes',      note: 'Long-form essays, guides and stories worth your time.' },
  listing:    { ...base, kicker: 'Local Directory',  note: 'Find, compare and connect with local businesses near you.' },
  classified: { ...base, kicker: 'Marketplace',      note: 'Fresh offers, deals and listings ready to act on.' },
  image:      { ...base, kicker: 'Visual feed',      note: 'A gallery-first stream of standout images and photo stories.' },
  sbm:        { ...base, kicker: 'Saved shelf',      note: 'Curated links and resources worth bookmarking.' },
  pdf:        { ...base, kicker: 'Reference Library', note: 'Downloadable guides, reports and reference material.' },
  profile:    { ...base, kicker: 'People',           note: 'Discover creators, businesses and voices behind the platform.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': '#B5B9F0',
    '--slot4-on-accent': '#0B0909',
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
