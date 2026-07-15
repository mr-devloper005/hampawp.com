import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Building2, CheckCircle2,
  Megaphone, Search, Sparkles, Tag, TrendingUp, UserRound,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, getEditableExcerpt, getEditableCategory, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function safePosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
}

/* ======================= Floating chips for hero ======================== */
const floatingChips = [
  { label: 'Real Estate',  icon: Building2, color: '#eceeff', textColor: '#6366f1', rotate: '-rotate-6', pos: 'top-24 left-6 xl:left-0' },
  { label: 'Jobs & Gigs',  icon: Megaphone, color: '#e8f2f0', textColor: '#408175', rotate: 'rotate-3',  pos: 'top-32 right-6 xl:right-0' },
  { label: 'For Sale',     icon: Tag,       color: '#fef3e8', textColor: '#d97706', rotate: 'rotate-4',  pos: 'bottom-40 left-8 xl:left-2' },
  { label: 'Services',     icon: UserRound, color: '#eceeff', textColor: '#8b5cf6', rotate: '-rotate-3', pos: 'bottom-44 right-8 xl:right-2' },
]

/* ============================= 1. Hero ================================== */

export function EditableHomeHero({ primaryTask: _primaryTask, primaryRoute: _primaryRoute, posts: _posts, timeSections: _timeSections }: HomeSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Gradient orb blobs */}
      <div className="editable-orb-lavender absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[700px] opacity-70" />
      <div className="editable-orb-teal absolute bottom-0 -left-48 h-[500px] w-[500px] opacity-60" />
      <div className="editable-orb-lavender absolute -top-20 -right-48 h-[600px] w-[600px] opacity-45" />
      {/* Dot grid overlay */}
      <div className="editable-dot-grid pointer-events-none absolute inset-0 opacity-60" />
      {/* Fade to page bg at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fafaff] to-transparent" />

      {/* Floating chips — xl screens only */}
      {floatingChips.map((chip) => {
        const Icon = chip.icon
        return (
          <div
            key={chip.label}
            className={`absolute z-10 hidden xl:flex items-center gap-2 rounded-full px-4 py-2.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)] ${chip.rotate} ${chip.pos}`}
            style={{ backgroundColor: chip.color }}
          >
            <Icon className="h-4 w-4 shrink-0" style={{ color: chip.textColor }} />
            <span className="text-sm font-semibold" style={{ color: chip.textColor }}>{chip.label}</span>
          </div>
        )
      })}

      <div className={`relative z-10 pb-10 pt-16 sm:pt-20 lg:pt-24 ${container}`}>
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--slot4-muted-text)] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
            {pagesContent.home.hero.badge || 'Find Deals · Post Ads · Discover Profiles'}
          </span>
        </div>

        {/* Heading */}
        <h1 className="editable-display mx-auto mt-7 max-w-3xl text-balance text-center text-[2.8rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-[3.6rem] lg:text-[4.5rem]">
          Your Local Marketplace for{' '}
          <span className="editable-gradient-text">Buyers &amp; Sellers</span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-7 text-[var(--slot4-muted-text)] sm:text-lg">
          {pagesContent.home.hero.description || 'Browse classifieds, discover profiles, and connect with people near you — everything in one place.'}
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_8px_20px_-6px_rgba(181,185,240,0.7)]">
            Browse Listings <ArrowRight className="h-4 w-4" />
          </span>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] hover:-translate-y-0.5"
          >
            <Search className="h-4 w-4" /> Search
          </Link>
        </div>

      </div>
    </section>
  )
}

/* ======================== 2. Story Rail (Trust + Features) ============== */

const features = [
  { icon: CheckCircle2, color: '#B5B9F0', label: 'Verified Listings', desc: 'Every ad is reviewed for quality before it goes live.' },
  { icon: TrendingUp,   color: '#408175', label: 'Updated Daily',     desc: 'Fresh classifieds and profiles added every single day.' },
  { icon: Sparkles,     color: '#fcb373', label: 'Easy to Post',      desc: 'Create an ad in under 2 minutes — no account needed to browse.' },
]

export function EditableStoryRail({ primaryTask: _primaryTask, primaryRoute: _primaryRoute, posts: _posts, timeSections: _timeSections }: HomeSectionProps) {
  return (
    <>
      {/* Feature cards */}
      <section className="editable-mesh-bg relative overflow-hidden">
        <div className="editable-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className={`relative py-16 sm:py-20 ${container}`}>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">Why {SITE_CONFIG.name}</p>
            <h2 className="editable-display mx-auto mt-4 max-w-2xl text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-[2.5rem]">
              Everything you need in one place
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.label} className="rounded-2xl border border-[var(--editable-border)] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(64,129,117,0.18)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: f.color + '22' }}>
                    <Icon className="h-7 w-7" style={{ color: f.color }} />
                  </div>
                  <h3 className="editable-display mt-6 text-lg font-bold text-[var(--slot4-page-text)]">{f.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

/* ====================== 3. Magazine Split (Posts grid) ================== */

function PostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const isFeature = index === 0
  if (isFeature) {
    return (
      <Link href={href} className="group col-span-2 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(64,129,117,0.20)] sm:grid sm:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[220px] overflow-hidden bg-[var(--slot4-media-bg)] sm:min-h-[300px]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-8">
          <span className="inline-flex w-fit rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
          <h2 className="editable-display mt-4 text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-3xl">{post.title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 160)}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
            View listing <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(64,129,117,0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-[1.25] tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 90)}</p>
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = safePosts(posts, timeSections).slice(0, 5)
  if (!pool.length) return null

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle lavender dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(181,185,240,0.4) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className={`relative py-16 sm:py-20 ${container}`}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">Latest posts</p>
          <h2 className="editable-display mt-3 text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-[2.5rem]">
            Fresh on the marketplace
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {pool.map((post, i) => (
            <PostCard
              key={post.id || post.slug}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
              index={i}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={primaryRoute}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-8 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] hover:-translate-y-0.5"
          >
            View all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* =================== 4. Time Collections (Discovery sections) =========== */

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse:    { eyebrow: 'Trending now',    title: 'Popular this month' },
  index:     { eyebrow: 'Evergreen',       title: 'From the archive' },
}

function CompactCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(64,129,117,0.20)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">{getEditableCategory(post)}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8),  href: primaryRoute },
          { key: 'browse',    posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index',     posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        const isDark = index % 2 !== 0
        return (
          <section
            key={section.key}
            className="relative overflow-hidden"
            style={isDark
              ? { background: 'linear-gradient(135deg,#f0efff 0%,#eeeeff 50%,#edf7f4 100%)' }
              : { background: '#ffffff' }
            }
          >
            {isDark && <div className="editable-dot-grid pointer-events-none absolute inset-0 opacity-30" />}
            <div className={`relative py-14 sm:py-16 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-2 text-2xl font-bold tracking-[-0.01em] text-[var(--slot4-page-text)] sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--slot4-accent)] hover:underline">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ========================== 5. Home CTA ================================= */

export function EditableHomeCta() {
  return null
}
