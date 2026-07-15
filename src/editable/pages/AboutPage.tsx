import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8" style={{ background: 'transparent' }}>
        <div className="mx-auto max-w-[var(--editable-container)]">

          {/* Page header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
              {pagesContent.about.badge}
            </span>
            <h1 className="editable-display mx-auto mt-5 max-w-xl text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-4xl lg:text-[2.75rem]">
              About {SITE_CONFIG.name}
            </h1>
          </div>

          {/* Content grid */}
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

            {/* Main article */}
            <article className="rounded-3xl border border-[var(--editable-border)] bg-white p-8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] lg:p-10">
              <p className="text-sm leading-7 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            {/* Values sidebar */}
            <aside className="space-y-4">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-[var(--editable-border)] bg-white p-6 shadow-sm">
                  <div className="mb-3 h-1 w-8 rounded-full bg-[var(--slot4-accent)]" />
                  <h2 className="editable-display text-base font-bold text-[var(--slot4-page-text)]">{value.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </section>
        </div>
      </main>
    </EditableSiteShell>
  )
}
