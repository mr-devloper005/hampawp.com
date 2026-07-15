'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Lock, Send, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass =
  'w-full rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm text-[var(--slot4-page-text)] outline-none transition duration-200 placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)] focus:bg-white focus:ring-2 focus:ring-[var(--slot4-accent-soft)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

const features = [
  { icon: Zap,         label: 'Goes live quickly',  desc: 'Your submission is processed right away.' },
  { icon: ShieldCheck, label: 'Safe & private',      desc: 'Your details stay on this site only.' },
  { icon: Sparkles,    label: 'Simple form',         desc: 'Fill in the basics and you are done.' },
]

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task]    = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title,   setTitle]   = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url,     setUrl]     = useState('')
  const [image,   setImage]   = useState('')
  const [body,    setBody]    = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title:    title.trim(),
      category: category.trim() || 'uncategorized',
      summary:  summary.trim(),
      url:      url.trim(),
      image:    image.trim(),
      body:     body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  /* ── Locked (not signed in) ── */
  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8" style={{ background: 'transparent' }}>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.10)] md:grid md:grid-cols-2">

            {/* Decorative panel */}
            <div
              className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden p-10 md:min-h-0"
              style={{ background: 'linear-gradient(135deg, #2E4540 0%, #408175 55%, #B5B9F0 100%)' }}
            >
              <div className="editable-orb-lavender absolute -top-24 -right-24 h-72 w-72 opacity-35" />
              <div className="editable-orb-dark absolute bottom-0 -left-12 h-48 w-48 opacity-50" />
              <div className="relative z-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm">
                  <Lock className="h-9 w-9 text-white" />
                </div>
                <p className="mt-5 text-base font-semibold text-white">Members only</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Sign in to access the publishing workspace.
                </p>
              </div>
            </div>

            {/* Login prompt */}
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                {pagesContent.create.locked.badge}
              </span>
              <h1 className="editable-display mt-5 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl">
                {pagesContent.create.locked.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">
                {pagesContent.create.locked.description}
              </p>
              <div className="mt-8">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:opacity-90 hover:-translate-y-0.5"
                >
                  Sign in to continue
                </Link>
              </div>
            </div>
          </div>
        </main>
      </EditableSiteShell>
    )
  }

  /* ── Logged-in create form ── */
  return (
    <EditableSiteShell>
      <main className="min-h-screen text-[var(--slot4-page-text)]" style={{ background: 'transparent' }}>
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          {/* Page header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
              {pagesContent.create.hero.badge}
            </span>
            <h1 className="editable-display mx-auto mt-5 max-w-lg text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl lg:text-[2.75rem]">
              {pagesContent.create.hero.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.create.hero.description}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[280px_1fr]">

            {/* ── Left sidebar ── */}
            <aside className="space-y-4">

              {/* User card */}
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3.5 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-tint-1)]">
                  <span className="text-sm font-bold text-[var(--slot4-accent)]">
                    {session.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[var(--slot4-muted-text)]">Publishing as</p>
                  <p className="truncate text-sm font-semibold text-[var(--slot4-page-text)]">{session.name}</p>
                </div>
              </div>

              {/* Feature list */}
              <div className="space-y-3">
                {features.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.label} className="flex gap-3 rounded-2xl border border-[var(--editable-border)] bg-white p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-tint-2)]">
                        <Icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--slot4-page-text)]">{f.label}</p>
                        <p className="mt-0.5 text-xs leading-5 text-[var(--slot4-muted-text)]">{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Teal info band */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'linear-gradient(135deg, #2E4540 0%, #408175 100%)' }}
              >
                <p className="text-sm font-medium leading-6 text-white/85">
                  Submissions are reviewed and may appear on the site after approval.
                </p>
              </div>
            </aside>

            {/* ── Right: form card ── */}
            <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] sm:p-8">

              {/* Form header */}
              <div className="mb-6 flex items-center justify-between border-b border-[var(--editable-border)] pb-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                    {activeTask?.label || 'Content'}
                  </p>
                  <h2 className="editable-display mt-1 text-xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-2xl">
                    {pagesContent.create.formTitle}
                  </h2>
                </div>
              </div>

              <form onSubmit={submit} className="space-y-5">

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Title *</label>
                  <input
                    className={fieldClass}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a clear, descriptive title"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Category</label>
                    <input
                      className={fieldClass}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Services, Jobs, Real estate"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Source URL</label>
                    <input
                      className={fieldClass}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://…"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Featured image URL</label>
                  <input
                    className={fieldClass}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://…"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Short summary *</label>
                  <textarea
                    className={`${fieldClass} min-h-[88px] resize-none`}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="A brief description of the listing…"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--slot4-muted-text)]">Full description *</label>
                  <textarea
                    className={`${fieldClass} min-h-[160px] resize-none`}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Details, notes, or full content…"
                    required
                  />
                </div>

                {created && (
                  <div className="flex items-start gap-3 rounded-xl border border-[var(--slot4-tint-2)] bg-[var(--slot4-tint-2)] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--slot4-page-text)]">
                        {pagesContent.create.successTitle}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--slot4-muted-text)]">{created.title}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
