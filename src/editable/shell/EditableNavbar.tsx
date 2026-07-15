'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[68px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <span className="editable-display font-bold tracking-tight text-[var(--slot4-page-text)] text-[15px]">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Center nav */}
        <div className="ml-4 hidden items-center gap-0.5 md:flex">
          {[{ label: 'Home', href: '/' }, { label: 'Browse', href: '/search' }, { label: 'About', href: '/about' }].map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
                  active
                    ? 'font-semibold text-[var(--slot4-accent)]'
                    : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Search pill */}
        <form action="/search" className="mx-auto hidden max-w-xs flex-1 md:block">
          <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 transition duration-200 focus-within:border-[var(--slot4-accent)] focus-within:ring-2 focus-within:ring-[var(--slot4-accent-soft)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search listings…"
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
          </label>
        </form>

        {/* Right actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <button
              type="button"
              onClick={logout}
              className="hidden text-sm font-medium text-[var(--slot4-muted-text)] transition duration-200 hover:text-[var(--slot4-page-text)] sm:inline-flex"
            >
              Log out
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--slot4-muted-text)] transition duration-200 hover:text-[var(--slot4-page-text)] sm:inline-flex"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white text-[var(--slot4-page-text)] transition duration-200 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 md:hidden">
          <form action="/search" className="mb-4 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search listings…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, { label: 'Browse', href: '/search' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-[var(--slot4-tint-2)] font-semibold text-[var(--slot4-accent)]'
                      : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-3 border-t border-[var(--editable-border)] pt-3">
              {session ? (
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="w-full rounded-full px-4 py-3 text-center text-sm font-medium text-[var(--slot4-muted-text)]">
                  Log out
                </button>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-full border border-[var(--editable-border)] px-4 py-3 text-center text-sm font-semibold">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
