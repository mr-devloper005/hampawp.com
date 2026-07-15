import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { toPlainText } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => {
  const content = getContent(post)
  return toPlainText(
    (typeof post.summary === 'string' && post.summary) ||
    compactRaw(content.description) ||
    compactRaw(content.excerpt) ||
    compactRaw(content.body) ||
    '',
  )
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(64,129,117,0.20)] ${strong ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">
            {taskLabel}
          </span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? (
          <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--slot4-accent)]">
            {taskLabel}
          </span>
        ) : null}
        <h2 className="editable-display mt-3 line-clamp-3 text-xl font-bold leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)]">
          {post.title}
        </h2>
        {summary ? (
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition duration-200 group-hover:gap-2.5">
          Open result <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  return (
    <EditableSiteShell>
      <main className="min-h-screen text-[var(--slot4-page-text)]" style={{ background: 'transparent' }}>
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          {/* Results header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                {results.length} results
              </p>
              <h2 className="editable-display mt-1 text-2xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-3xl">
                {query ? `Results for "${query}"` : pagesContent.search.resultsTitle}
              </h2>
            </div>
            <Link
              href="/article"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
            >
              Browse latest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Results grid */}
          {results.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => (
                <SearchResultCard key={post.id || post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[var(--editable-border)] bg-white/60 p-12 text-center">
              <p className="editable-display text-2xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)]">
                No matching posts found.
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--slot4-muted-text)]">
                Try a different keyword, task type, or category.
              </p>
            </div>
          )}

        </section>
      </main>
    </EditableSiteShell>
  )
}
