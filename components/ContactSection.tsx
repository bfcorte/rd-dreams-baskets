'use client'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import clsx from 'clsx'

const WHATSAPP_URL = 'https://wa.me/13218065340'

function buildSchema(t: ReturnType<typeof useTranslations<'validation'>>) {
  return z.object({
    name:       z.string().min(1, t('nameRequired')),
    email:      z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    phone:      z.string().optional(),
    basketType: z.enum(['breakfast', 'mothers-day', 'birthday', 'custom'], {
      required_error: t('basketTypeRequired'),
    }),
    message:    z.string().min(1, t('messageRequired')),
  })
}

type FormData = z.infer<ReturnType<typeof buildSchema>>

export default function ContactSection() {
  const t       = useTranslations('contact')
  const tf      = useTranslations('contact.form')
  const tv      = useTranslations('validation')
  const params  = useParams()
  const locale  = (params?.locale as string) ?? 'USA'

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const schema = buildSchema(tv)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      // Supports two modes:
      // 1. Static export (GitHub Pages): posts directly to Google Sheets Apps Script webhook
      // 2. Server (Vercel): posts to /api/contact which then forwards to the webhook
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
      const endpoint   = webhookUrl ?? '/api/contact'

      const payload = JSON.stringify({
        timestamp:  new Date().toISOString(),
        name:       data.name,
        email:      data.email,
        phone:      data.phone ?? '',
        basketType: data.basketType,
        message:    data.message,
        locale,
      })

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })

      // Apps Script returns 302 on success (redirect) — treat any non-5xx as ok
      if (res.status >= 500) throw new Error('Server error')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const basketOptions = [
    { value: 'breakfast',   label: tf('basketTypeOptions.breakfast') },
    { value: 'mothers-day', label: tf('basketTypeOptions.mothers-day') },
    { value: 'birthday',    label: tf('basketTypeOptions.birthday') },
    { value: 'custom',      label: tf('basketTypeOptions.custom') },
  ] as const

  return (
    <section id="contact" className="py-28 bg-cream-100">
      <div className="section-padding max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-xs font-body font-bold tracking-widest uppercase text-rust-500 mb-4 block">
            — Get in Touch —
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bark-900 mb-5">
            {t('title')}
          </h2>
          <p className="font-body text-bark-700/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* WhatsApp card — 2 cols */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#075E54] to-[#128C7E] rounded-2xl p-8 text-cream-100 flex flex-col gap-6 shadow-xl shadow-[#075E54]/20">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">{t('whatsappTitle')}</h3>
              <p className="font-body text-sm text-white/70 leading-relaxed">{t('whatsappDescription')}</p>
            </div>

            <div className="border-t border-white/10 pt-4 text-sm font-body text-white/60">
              <p className="font-bold text-white mb-1">+1 (321) 806-5340</p>
              <p>Mon–Sat · 8am–8pm EST</p>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full text-center bg-white text-[#075E54] font-body font-bold text-sm tracking-wide uppercase py-3.5 rounded-full hover:bg-cream-100 transition-colors duration-200"
            >
              {t('whatsappCta')}
            </a>
          </div>

          {/* Form — 3 cols */}
          <div className="lg:col-span-3 bg-cream-50 rounded-2xl p-8 border border-cream-300/60 shadow-sm">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-sage-400/15 flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-semibold text-bark-900">{tf('successTitle')}</h3>
                <p className="font-body text-bark-700/70">{tf('successMessage')}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-2"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-bold tracking-wide text-bark-700 uppercase">{tf('name')}</label>
                    <input
                      {...register('name')}
                      placeholder={tf('namePlaceholder')}
                      className={clsx('input-field', errors.name && 'border-rust-400 focus:border-rust-500')}
                    />
                    {errors.name && <span className="text-xs text-rust-500">{errors.name.message}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-bold tracking-wide text-bark-700 uppercase">{tf('email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={tf('emailPlaceholder')}
                      className={clsx('input-field', errors.email && 'border-rust-400 focus:border-rust-500')}
                    />
                    {errors.email && <span className="text-xs text-rust-500">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-bold tracking-wide text-bark-700 uppercase">{tf('phone')}</label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder={tf('phonePlaceholder')}
                      className="input-field"
                    />
                  </div>

                  {/* Basket type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-body font-bold tracking-wide text-bark-700 uppercase">{tf('basketType')}</label>
                    <select
                      {...register('basketType')}
                      className={clsx('input-field', errors.basketType && 'border-rust-400')}
                    >
                      <option value="">{tf('basketTypePlaceholder')}</option>
                      {basketOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.basketType && <span className="text-xs text-rust-500">{errors.basketType.message}</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-body font-bold tracking-wide text-bark-700 uppercase">{tf('message')}</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder={tf('messagePlaceholder')}
                    className={clsx('input-field resize-none', errors.message && 'border-rust-400')}
                  />
                  {errors.message && <span className="text-xs text-rust-500">{errors.message.message}</span>}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rust-500 bg-rust-400/10 rounded-xl p-3">{tf('errorMessage')}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === 'submitting' ? (
                    <>
                      <Spinner />
                      {tf('submitting')}
                    </>
                  ) : (
                    tf('submit')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
