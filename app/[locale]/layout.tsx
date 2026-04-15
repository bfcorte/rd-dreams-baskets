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
      languages: { 'en-US': '/USA', 'pt-BR': '/BR' },
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
  setRequestLocale(locale)
  const messages = await getMessages()

  // Root layout already provides <html><body>.
  // This layout only adds the i18n Provider + sets lang via script.
  return (
    <>
      <LangSetter locale={locale} />
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </>
  )
}

// Sets the <html lang> attribute client-side to match the active locale.
// Uses suppressHydrationWarning on <html> so this never causes a mismatch.
function LangSetter({ locale }: { locale: string }) {
  const lang = locale === 'BR' ? 'pt-BR' : 'en-US'
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang='${lang}'`,
      }}
    />
  )
}
