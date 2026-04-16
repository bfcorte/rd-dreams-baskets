import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['USA', 'BR', 'ES']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as string)) notFound()

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
