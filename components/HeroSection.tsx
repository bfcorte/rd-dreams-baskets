'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCountUp } from '@/hooks/useCountUp'

const WHATSAPP_URL = 'https://wa.me/13218065340'

export default function HeroSection() {
  const t = useTranslations('hero')

  // Start counter after entrance animation plays
  const [counterStarted, setCounterStarted] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setCounterStarted(true), 800)
    return () => clearTimeout(timer)
  }, [])
  const count = useCountUp(100, 1400, counterStarted)

  return (
    <section className="relative min-h-screen flex items-center bg-texture overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300 opacity-80" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 right-0 w-[520px] h-[520px] bg-rust-400/5 rounded-full blur-3xl translate-x-1/3 animate-breathe" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-sage-400/8 rounded-full blur-3xl -translate-x-1/4 animate-breathe anim-delay-2000" />
      <div className="absolute top-24 left-1/3 w-72 h-72 bg-gold-300/10 rounded-full blur-2xl animate-breathe anim-delay-1000" />

      <div className="relative section-padding max-w-7xl mx-auto w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Text content ─────────────────────────────────── */}
          <div className="flex flex-col items-start gap-7">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-cream-50/80 border border-gold-300/60 text-gold-600 text-xs font-body font-bold tracking-widest uppercase px-4 py-2 rounded-full backdrop-blur-sm animate-fade-up anim-delay-100">
              <span className="w-1.5 h-1.5 bg-rust-500 rounded-full animate-pulse" />
              {t('badge')}
            </span>

            {/* Headline — each line enters with stagger */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-bark-900 leading-[1.1] tracking-tight">
              {t('headline').split('\n').map((line, i) => (
                <span
                  key={i}
                  className={`block animate-fade-up ${i === 1 ? 'text-rust-600 italic' : ''} anim-delay-${i === 0 ? '200' : '300'}`}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg text-bark-700/80 leading-relaxed max-w-md animate-fade-up anim-delay-400">
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2 animate-fade-up anim-delay-500">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t('ctaPrimary')}
              </a>
              <a href="#contact" className="btn-secondary">
                {t('ctaSecondary')}
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Social proof — stars + counter */}
            <div className="flex items-center gap-3 pt-2 animate-fade-up anim-delay-600">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-xs text-bark-700/60 font-body">
                <span className="text-bark-800 font-bold">{count}+</span>{' '}
                happy customers
              </p>
            </div>
          </div>

          {/* ── Hero visual ──────────────────────────────────── */}
          <div className="flex justify-center lg:justify-end animate-fade-up anim-delay-250">
            <HeroCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-fade-up anim-delay-800">
          <span className="text-xs font-body tracking-widest text-bark-700 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-bark-700 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ─── Hero card composition ────────────────────────────────────────────── */

function HeroCard() {
  return (
    <div className="relative w-72 md:w-80 lg:w-[340px]">

      {/* Sparkle particles — scattered around the card */}
      <SparkleIcon className="absolute top-4 left-4 w-3.5 h-3.5 text-gold-400/80 animate-float anim-delay-100" />
      <SparkleIcon className="absolute top-28 -right-1 w-2.5 h-2.5 text-rust-400/50 animate-float-slow anim-delay-1500" />
      <SparkleIcon className="absolute bottom-32 left-0 w-3 h-3 text-sage-400/60 animate-float anim-delay-700" />
      <SparkleIcon className="absolute bottom-8 right-8 w-2 h-2 text-gold-300 animate-float-slow anim-delay-2000" />
      <SparkleIcon className="absolute top-1/2 -left-3 w-2 h-2 text-rust-300/40 animate-float anim-delay-1000" />

      {/* Rating badge — floats top-right */}
      <div className="absolute -top-4 -right-4 z-20 bg-cream-50 border border-cream-300/80 rounded-2xl px-3.5 py-2.5 shadow-lg animate-float anim-delay-900">
        <div className="flex items-center gap-1.5 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-2.5 h-2.5 fill-gold-400 text-gold-400" />
          ))}
          <span className="text-xs font-body font-bold text-bark-900 ml-0.5">5.0</span>
        </div>
        <p className="text-[10px] text-bark-700/50 font-body">100+ happy clients</p>
      </div>

      {/* Main card */}
      <div className="relative z-10 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 rounded-3xl overflow-hidden border border-cream-300/60 shadow-2xl shadow-bark-900/10 transition-transform duration-700 hover:rotate-1 animate-breathe">

        {/* Accent color bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-rust-500 via-gold-400 to-sage-400" />

        {/* Logo area */}
        <div className="relative h-72 lg:h-80">
          <div className="absolute inset-0 bg-texture opacity-25" />
          {/* Subtle radial glow behind logo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,154,108,0.12)_0%,_transparent_70%)]" />
          <div className="absolute inset-8">
            <Image
              src="/logo.jpeg"
              alt="R&D Dreams & Baskets"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Footer strip */}
        <div className="px-5 py-4 border-t border-cream-300/50 flex items-center justify-between bg-cream-50/90">
          <div>
            <p className="font-display text-sm font-semibold text-bark-900 leading-tight">
              R&D Dreams & Baskets
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <LocationIcon className="w-3 h-3 text-rust-500 flex-shrink-0" />
              <span className="text-[10px] text-bark-700/50 font-body">Central Florida</span>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* Delivery badge — floats bottom-left */}
      <div className="absolute -bottom-4 -left-4 z-20 bg-bark-900 rounded-2xl px-3.5 py-2.5 shadow-xl animate-float anim-delay-1500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-sage-400/20 flex items-center justify-center flex-shrink-0">
            <CheckIcon className="w-3 h-3 text-sage-400" />
          </div>
          <span className="text-xs font-body font-bold text-cream-100 whitespace-nowrap">
            Same-Week Delivery
          </span>
        </div>
      </div>

      {/* Glow behind card */}
      <div className="absolute inset-6 bg-gradient-to-br from-gold-300/15 to-rust-400/10 rounded-full blur-3xl -z-10" />
    </div>
  )
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
