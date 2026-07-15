'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">

      {/* Main grid */}
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:px-8">

        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
            <span className="editable-display text-base font-bold tracking-tight text-white">
              {SITE_CONFIG.name}
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
            {globalContent.footer?.description || 'Find deals, post classifieds, and discover profiles — your local marketplace for buyers and sellers.'}
          </p>
        </div>

        {/* Resources column */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Resources</h4>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ['Search', '/search'],
              ['FAQ', '/contact'],
              ['Privacy Policy', '/about'],
            ].map(([label, href]) => (
              <Link key={href + label} href={href} className="text-sm font-medium text-white/65 transition duration-200 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Account column */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Account</h4>
          <div className="mt-5 grid gap-3">
            {session ? (
              <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/65 transition duration-200 hover:text-white">Log out</button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-white/65 transition duration-200 hover:text-white">Sign In</Link>
                <Link href="/contact" className="text-sm font-medium text-white/65 transition duration-200 hover:text-white">Support</Link>
              </>
            )}
          </div>
        </div>

        {/* Stay in touch column */}
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Stay In Touch</h4>
          <p className="mt-5 text-sm leading-6 text-white/55">
            Subscribe for exclusive deals and new listings!
          </p>
          <div className="mt-5 space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/15 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 transition duration-200 focus:border-[var(--slot4-accent-fill)]"
            />
            <button
              type="button"
              className="w-full rounded-full bg-[var(--slot4-accent-fill)] px-4 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-200 hover:opacity-90 hover:-translate-y-0.5"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name} — All Rights Reserved.</span>
          <span>{globalContent.footer?.bottomNote || 'Your local marketplace for buyers and sellers.'}</span>
        </div>
      </div>
    </footer>
  )
}
