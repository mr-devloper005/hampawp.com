import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal, editableCardTints } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

// Strip HTML tags and decode common entities to produce clean plain-text card summaries.
export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

/* =====================================================================
   CARD STYLE 1: Editorial Feature Card — dark full-bleed hero card
   ===================================================================== */
export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-8 sm:p-10 lg:min-h-[600px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,9,9,0.10)_0%,rgba(11,9,9,0.88)_100%)]" />
        <div className="absolute inset-x-8 top-8 flex items-center justify-between sm:inset-x-10">
          <span className="rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-xs font-semibold text-[var(--slot4-on-accent)]">
            {label}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
            {getEditableCategory(post)}
          </span>
        </div>
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[540px]">
          <h3 className="editable-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.25rem]">
            {post.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            {getEditableExcerpt(post, 160)}
          </p>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 group-hover:-translate-y-0.5">
            View Listing <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* =====================================================================
   CARD STYLE 2: Rail Post Card — tinted rail card with numbered badge
   ===================================================================== */
export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const tint = editableCardTints[index % editableCardTints.length]
  return (
    <Link
      href={href}
      className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-2xl border border-[var(--editable-border)] ${dc.motion.lift}`}
      style={{ backgroundColor: tint.bg }}
    >
      <div className={`${dc.media.frame} aspect-[4/3]`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className={`absolute inset-0 h-full w-full object-cover ${dc.motion.zoom}`}
        />
        <span className={`absolute left-3 top-3 rounded-full ${pal.darkBg} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur`}>
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className={`editable-display mt-3 line-clamp-3 text-lg font-bold leading-[1.25] tracking-[-0.01em] ${pal.panelText}`}>
          {post.title}
        </h3>
        <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 100)}
        </p>
      </div>
    </Link>
  )
}

/* =====================================================================
   CARD STYLE 3: Compact Index Card — numbered list-style card
   ===================================================================== */
export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group flex min-w-0 items-start gap-4 ${dc.surface.soft} p-5 ${dc.motion.lift}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent)] text-xs font-bold text-white">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className={`editable-display mt-1.5 line-clamp-2 text-[15px] font-bold leading-[1.3] tracking-[-0.01em] ${pal.panelText}`}>
          {post.title}
        </h3>
        <p className={`mt-1.5 line-clamp-2 text-xs leading-[1.6] ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 90)}
        </p>
      </div>
    </Link>
  )
}

/* =====================================================================
   CARD STYLE 4: Article List Card — horizontal image-left, text-right
   ===================================================================== */
export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group grid min-w-0 overflow-hidden ${dc.surface.card} ${dc.motion.lift} sm:grid-cols-[200px_minmax(0,1fr)]`}
    >
      <div className={`${dc.media.frame} min-h-[160px] rounded-none sm:min-h-auto sm:rounded-l-2xl sm:rounded-r-none`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className={`absolute inset-0 h-full w-full object-cover ${dc.motion.zoom}`}
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>
          #{String(index + 1).padStart(2, '0')} · {getEditableCategory(post)}
        </p>
        <h2 className={`editable-display mt-3 line-clamp-3 text-xl font-bold leading-[1.2] tracking-[-0.02em] ${pal.panelText} sm:text-2xl`}>
          {post.title}
        </h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 160)}
        </p>
        <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${pal.accentText}`}>
          Open listing <ArrowUpRight className="h-4 w-4 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

/* =====================================================================
   CARD STYLE 5: Image-First Card — photo-led grid card
   ===================================================================== */
export function ImageFirstPostCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link
      href={href}
      className={`group block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}
    >
      <div className={`${dc.media.frame} aspect-[4/3] rounded-t-2xl rounded-b-none`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">
          {getEditableCategory(post)}
        </span>
      </div>
      <div className="p-5">
        <h3 className={`editable-display line-clamp-2 text-lg font-bold leading-[1.25] tracking-[-0.01em] ${pal.panelText}`}>
          {post.title}
        </h3>
        <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>
          {getEditableExcerpt(post, 100)}
        </p>
      </div>
    </Link>
  )
}
