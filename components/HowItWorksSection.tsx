'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'

type Step = {
  number: string
  title: string
  description: string
}

const STEP_ICONS = [ChooseIcon, CustomizeIcon, ReceiveIcon]

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as Step[]
  const { ref, inView } = useInView(0.15)

  return (
    <section id="how-it-works" className="py-28 bg-cream-200 bg-texture">
      <div ref={ref} className="section-padding max-w-7xl mx-auto">

        {/* Header — no label prefix, just the heading breathing */}
        <div
          className="text-center mb-20 transition-all duration-700 ease-out"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)' }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bark-900 mb-5">
            {t('title')}
          </h2>
          <p className="font-body text-bark-700/70 leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Connector line — draws left to right on scroll */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.66%+3rem)] right-[calc(16.66%+3rem)]">
            <div
              className="h-px bg-gradient-to-r from-rust-400/30 via-gold-400/50 to-rust-400/30 transition-all duration-1200 ease-out"
              style={{
                width: inView ? '100%' : '0%',
                transitionDelay: inView ? '0.3s' : '0s',
              }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? ReceiveIcon
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center transition-all duration-700 ease-out"
                  style={{
                    opacity:   inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(32px)',
                    transitionDelay: inView ? `${0.1 + i * 0.15}s` : '0s',
                  }}
                >
                  {/* Number circle */}
                  <div className="relative mb-5">
                    <div className="w-[104px] h-[104px] rounded-full bg-cream-100 border border-cream-300/60 flex flex-col items-center justify-center gap-1 shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-md">
                      {/* SVG icon */}
                      <div className="text-rust-500">
                        <Icon />
                      </div>
                      {/* Step number */}
                      <span className="font-display text-xs font-semibold text-rust-500/70 tracking-widest">
                        0{step.number}
                      </span>
                    </div>
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border border-rust-400/15 scale-[1.18]" />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-bark-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-bark-700/70 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-16 transition-all duration-700 ease-out"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transitionDelay: inView ? '0.55s' : '0s',
          }}
        >
          <a
            href="https://wa.me/13218065340"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Start Your Order
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Step icons ─────────────────────────────────────────────────────────── */

function ChooseIcon() {
  // Shopping bag / choose
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function CustomizeIcon() {
  // Pencil / customize
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function ReceiveIcon() {
  // Gift / receive
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
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
