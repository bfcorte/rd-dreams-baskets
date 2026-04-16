'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import US from 'country-flag-icons/react/3x2/US'
import BR from 'country-flag-icons/react/3x2/BR'
import ES from 'country-flag-icons/react/3x2/ES'

const WHATSAPP_URL = 'https://wa.me/13218065340'

type FlagComponent = React.ComponentType<{ className?: string }>

const FLAG_COMPONENTS: Record<string, FlagComponent> = { USA: US, BR, ES }
const LOCALE_LABEL: Record<string, string> = { USA: 'EN', BR: 'PT', ES: 'ES' }
const ALL_LOCALES = ['USA', 'BR', 'ES']

function LocaleLink({
  loc,
  className,
}: {
  loc: string
  className: string
}) {
  const Flag = FLAG_COMPONENTS[loc]
  return (
    <Link href={`/${loc}`} className={className}>
      <Flag className="w-4 h-3 rounded-[2px] flex-shrink-0" />
      <span>{LOCALE_LABEL[loc]}</span>
    </Link>
  )
}

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLocales = ALL_LOCALES.filter(l => l !== locale)

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream-100/95 backdrop-blur-md shadow-sm border-b border-cream-300/50'
          : 'bg-transparent'
      )}
    >
      <nav className="section-padding max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src="/logo.jpeg"
            alt="R&D Dreams & Baskets"
            width={120}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {(['#baskets', '#how-it-works', '#contact'] as const).map((href, i) => {
            const keys = ['baskets', 'howItWorks', 'contact'] as const
            return (
              <li key={href}>
                <a
                  href={href}
                  className="text-bark-700 hover:text-rust-600 font-body text-sm tracking-wide transition-colors duration-200"
                >
                  {t(keys[i])}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          {otherLocales.map(loc => (
            <LocaleLink
              key={loc}
              loc={loc}
              className="flex items-center gap-1.5 text-xs font-body font-bold tracking-widest text-bark-700/60 hover:text-rust-600 border border-bark-700/20 hover:border-rust-400 px-3 py-1.5 rounded-full transition-all duration-200"
            />
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t('orderWhatsApp')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-bark-800 hover:text-rust-600 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          'md:hidden bg-cream-100/98 backdrop-blur-md border-t border-cream-300/50 overflow-hidden',
          'transition-all duration-300 ease-out',
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          <a href="#baskets"      onClick={() => setOpen(false)} className="text-bark-800 font-body py-2 border-b border-cream-300/60">{t('baskets')}</a>
          <a href="#how-it-works" onClick={() => setOpen(false)} className="text-bark-800 font-body py-2 border-b border-cream-300/60">{t('howItWorks')}</a>
          <a href="#contact"      onClick={() => setOpen(false)} className="text-bark-800 font-body py-2 border-b border-cream-300/60">{t('contact')}</a>
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            {otherLocales.map(loc => (
              <LocaleLink
                key={loc}
                loc={loc}
                className="flex items-center gap-1.5 text-xs font-body font-bold tracking-widest text-bark-700 border border-bark-700/40 hover:text-rust-600 hover:border-rust-400 px-3 py-1.5 rounded-full transition-all duration-200"
              />
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex-1 justify-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {t('orderWhatsApp')}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
