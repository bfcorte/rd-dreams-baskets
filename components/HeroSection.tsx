'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

const WHATSAPP_URL = 'https://wa.me/13218065340'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center bg-texture overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300 opacity-80" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rust-400/5 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-400/10 rounded-full blur-2xl -translate-x-1/3" />
      <div className="absolute top-10 left-1/4 w-40 h-40 bg-gold-300/15 rounded-full blur-2xl" />

      <div className="relative section-padding max-w-7xl mx-auto w-full pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text content */}
          <div className="flex flex-col items-start gap-7 animate-fade-up">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-cream-50/80 border border-gold-300/60 text-gold-600 text-xs font-body font-bold tracking-widest uppercase px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-rust-500 rounded-full animate-pulse" />
              {t('badge')}
            </span>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-bark-900 leading-[1.1] tracking-tight">
              {t('headline').split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? 'block text-rust-600 italic' : 'block'}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Sub headline */}
            <p className="font-body text-lg text-bark-700/80 leading-relaxed max-w-md">
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
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

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {['#C4624A', '#7A9B76', '#C49A6C', '#8B3322'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-cream-200 flex items-center justify-center text-cream-100 text-xs font-display font-semibold"
                    style={{ backgroundColor: color }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-xs text-bark-700/60 font-body">
                <span className="text-bark-800 font-bold">100+</span> happy customers
              </p>
            </div>
          </div>

          {/* Logo / illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]">
              {/* Glow ring */}
              <div className="absolute inset-4 bg-gradient-to-br from-gold-300/30 to-rust-400/20 rounded-full blur-2xl" />
              <Image
                src="/logo.jpeg"
                alt="R&D Dreams & Baskets"
                fill
                className="object-contain animate-float drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs font-body tracking-widest text-bark-700 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-bark-700 to-transparent" />
        </div>
      </div>
    </section>
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
