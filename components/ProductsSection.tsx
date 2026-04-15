'use client'

import { useTranslations } from 'next-intl'

const BASKET_ICONS: Record<string, string> = {
  breakfast:     '☕',
  'mothers-day': '🌸',
  birthday:      '🎈',
  custom:        '✨',
}

const BASKET_COLORS: Record<string, { bg: string; accent: string; border: string }> = {
  breakfast:     { bg: 'bg-rust-400/8',   accent: 'text-rust-600',   border: 'border-rust-200' },
  'mothers-day': { bg: 'bg-sage-400/8',   accent: 'text-sage-600',   border: 'border-sage-200' },
  birthday:      { bg: 'bg-gold-300/15',  accent: 'text-gold-600',   border: 'border-gold-200' },
  custom:        { bg: 'bg-cream-300/60', accent: 'text-bark-700',   border: 'border-cream-400' },
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

  return (
    <section id="baskets" className="py-28 bg-cream-100">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-body font-bold tracking-widest uppercase text-rust-500 mb-4 block">
            — Our Collections —
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bark-900 mb-5">
            {t('title')}
          </h2>
          <p className="font-body text-bark-700/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const colors = BASKET_COLORS[item.id] ?? BASKET_COLORS.custom
            const icon   = BASKET_ICONS[item.id] ?? '🎁'
            const badge  = item.badge ? t(`badge.${item.badge}`) : null

            return (
              <div key={item.id} className={`card-basket group ${colors.bg} border ${colors.border}`}>
                {/* Icon area */}
                <div className="px-6 pt-8 pb-4 flex items-start justify-between">
                  <span className="text-4xl">{icon}</span>
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
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mt-20">
          <div className="flex-1 h-px bg-cream-300" />
          <span className="text-2xl">🌿</span>
          <div className="flex-1 h-px bg-cream-300" />
        </div>
      </div>
    </section>
  )
}
