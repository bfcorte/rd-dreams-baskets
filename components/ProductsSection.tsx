'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

const BASKET_COLORS: Record<string, { bg: string; accent: string; border: string; icon: string }> = {
  breakfast:     { bg: 'bg-rust-400/8',   accent: 'text-rust-600',   border: 'border-rust-200',   icon: 'text-rust-500' },
  'mothers-day': { bg: 'bg-sage-400/8',   accent: 'text-sage-600',   border: 'border-sage-200',   icon: 'text-sage-500' },
  birthday:      { bg: 'bg-gold-300/15',  accent: 'text-gold-600',   border: 'border-gold-200',   icon: 'text-gold-500' },
  custom:        { bg: 'bg-cream-300/60', accent: 'text-bark-700',   border: 'border-cream-400',  icon: 'text-bark-600' },
}

type ProductItem = {
  id: string
  name: string
  description: string
  badge: string | null
}

export default function ProductsSection() {
  const t = useTranslations('products')
  const items = t.raw('items') as ProductItem[]
  const { ref, inView } = useInView(0.1)

  return (
    <section id="baskets" className="py-28 bg-cream-100">
      <div ref={ref} className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="text-center mb-16 max-w-2xl mx-auto transition-all duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-rust-400/40" />
            <span className="text-xs font-body font-bold tracking-widest uppercase text-rust-500">
              Our Collections
            </span>
            <div className="h-px w-12 bg-rust-400/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bark-900 mb-5">
            {t('title')}
          </h2>
          <p className="font-body text-bark-700/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid — cards stagger on scroll */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const colors = BASKET_COLORS[item.id] ?? BASKET_COLORS.custom
            const badge  = item.badge ? t(`badge.${item.badge}`) : null

            return (
              <div
                key={item.id}
                className={`card-basket group ${colors.bg} border ${colors.border} transition-all duration-700 ease-out`}
                style={{
                  opacity:   inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(32px)',
                  transitionDelay: inView ? `${i * 0.1}s` : '0s',
                }}
              >
                {/* Icon area */}
                <div className="px-6 pt-8 pb-4 flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-cream-100/80 border border-cream-300/60 ${colors.icon} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <BasketIcon id={item.id} />
                  </div>
                  {badge && (
                    <span className={`text-xs font-body font-bold tracking-wide ${colors.accent} bg-cream-100/80 border ${colors.border} px-2.5 py-1 rounded-full`}>
                      {badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 pb-8">
                  <h3 className="font-display text-xl font-semibold text-bark-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="font-body text-sm text-bark-700/70 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-1.5 text-xs font-body font-bold tracking-wide uppercase ${colors.accent} hover:opacity-70 transition-opacity`}
                  >
                    Order Now
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Decorative divider */}
        <div
          className="flex items-center gap-6 mt-20 transition-all duration-1000 ease-out"
          style={{ opacity: inView ? 1 : 0, transitionDelay: inView ? '0.4s' : '0s' }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-400 to-transparent" />
          <div className="flex gap-1.5">
            {['bg-rust-400', 'bg-gold-400', 'bg-sage-400'].map((color, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${color} opacity-50`} />
            ))}
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-400 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ─── Per-category SVG icons ─────────────────────────────────────────────── */

function BasketIcon({ id }: { id: string }) {
  const cls = 'w-5 h-5'
  switch (id) {
    case 'breakfast':
      return (
        // Coffee cup
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="2" x2="6" y2="5" />
          <line x1="10" y1="2" x2="10" y2="5" />
          <line x1="14" y1="2" x2="14" y2="5" />
        </svg>
      )
    case 'mothers-day':
      return (
        // Flower / bloom
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
          <path d="M12 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
          <path d="M2 12a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2z" />
          <path d="M18 12a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2z" />
          <path d="M5.64 5.64a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83z" />
          <path d="M15.54 15.54a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83z" />
          <path d="M5.64 18.36a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0z" />
          <path d="M15.54 8.46a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0z" />
        </svg>
      )
    case 'birthday':
      return (
        // Gift box with ribbon
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    default:
      return (
        // Sparkles — custom
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </svg>
      )
  }
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}
