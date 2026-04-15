import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

const locales = ['USA', 'BR']

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' })

  return {
    title: 'R&D Dreams & Baskets — Cozy Gifts, Handcrafted Joy',
    description: t('subheadline'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/USA',
        'pt-BR': '/BR',
      },
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()

  // Enable static rendering for all locales
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale === 'BR' ? 'pt-BR' : 'en-US'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
