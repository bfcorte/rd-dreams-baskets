import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import Script from 'next/script'

const locales = ['USA', 'BR']

// ─── Canonical base URL ───────────────────────────────────────────────────────
// Update this if you move to a custom domain (e.g. https://rddreamsbaskets.com)
const SITE_URL = 'https://bfcorte.github.io/rd-dreams-baskets'

// ─── SEO copy per locale ──────────────────────────────────────────────────────
const SEO = {
  USA: {
    title: 'R&D Dreams & Baskets | Handcrafted Gift Baskets · Central Florida',
    titleShort: 'R&D Dreams & Baskets | Gift Baskets · Florida',
    description:
      'Beautiful custom gift baskets & balloon arrangements delivered across Central Florida. Perfect for Mother\'s Day, birthdays, breakfast & special occasions. Order via WhatsApp — same-week delivery!',
    keywords: [
      'gift baskets Central Florida',
      'custom gift baskets Orlando',
      'balloon arrangements Florida',
      'handcrafted gift baskets',
      'Mother\'s Day gift baskets Florida',
      'birthday gift baskets Orlando',
      'breakfast gift baskets',
      'gift delivery Central Florida',
      'artisan gift baskets',
      'gift baskets near me Florida',
    ],
    ogLocale: 'en_US',
    htmlLang: 'en-US',
  },
  BR: {
    title: 'R&D Dreams & Baskets | Cestas Artesanais de Presente · Flórida',
    titleShort: 'R&D Dreams & Baskets | Cestas de Presente · Flórida',
    description:
      'Cestas de presente e arranjos de balões feitos à mão, entregues no centro da Flórida. Perfeito para Dia das Mães, aniversários, café da manhã e ocasiões especiais. Peça pelo WhatsApp — entrega na mesma semana!',
    keywords: [
      'cestas de presente Flórida',
      'cestas artesanais Orlando',
      'arranjos de balões Florida',
      'cestas personalizadas Central Florida',
      'presente Dia das Mães Florida',
      'cesta de aniversário Orlando',
      'café da manhã especial Florida',
      'presentes artesanais Florida',
      'cesta presente brasileiros Florida',
    ],
    ogLocale: 'pt_BR',
    htmlLang: 'pt-BR',
  },
}

// ─── JSON-LD structured data (LocalBusiness) ─────────────────────────────────
const getJsonLd = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: 'R&D Dreams & Baskets',
  description:
    locale === 'USA'
      ? 'Handcrafted gift baskets & balloon arrangements for every occasion in Central Florida.'
      : 'Cestas de presente artesanais e arranjos de balões para todas as ocasiões no centro da Flórida.',
  url: SITE_URL,
  telephone: '+13218065340',
  image: `${SITE_URL}/logo.jpeg`,
  logo: `${SITE_URL}/logo.jpeg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Central Florida',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5383,
    longitude: -81.3792,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+13218065340',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Portuguese'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gift Baskets & Balloon Arrangements',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Breakfast Gift Baskets' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Mother's Day Baskets" } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Birthday Baskets & Balloon Arrangements' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Gift Baskets' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100',
    bestRating: '5',
    worstRating: '1',
  },
})

// ─── Next.js Metadata API ─────────────────────────────────────────────────────
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const seo = SEO[locale as keyof typeof SEO] ?? SEO.USA

  // OG image — replace with a proper 1200×630 image for best ad performance
  // Recommended: create /public/og-image.jpg (1200×630, brand visuals + copy)
  const ogImage = `${SITE_URL}/og-image.jpg`

  return {
    // ── Core ──────────────────────────────────────────────────────────────────
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'R&D Dreams & Baskets' }],
    creator: 'R&D Dreams & Baskets',
    publisher: 'R&D Dreams & Baskets',

    // ── Canonical + hreflang ─────────────────────────────────────────────────
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: {
        'en-US': `${SITE_URL}/USA/`,
        'pt-BR': `${SITE_URL}/BR/`,
        'x-default': `${SITE_URL}/USA/`,
      },
    },

    // ── Robots ───────────────────────────────────────────────────────────────
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // ── Open Graph — used by Facebook, Instagram, WhatsApp link previews ─────
    openGraph: {
      type: 'website',
      locale: seo.ogLocale,
      alternateLocale: locale === 'USA' ? 'pt_BR' : 'en_US',
      url: `${SITE_URL}/${locale}/`,
      siteName: 'R&D Dreams & Baskets',
      title: seo.titleShort,
      description: seo.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'R&D Dreams & Baskets — Handcrafted Gift Baskets · Central Florida',
          type: 'image/jpeg',
        },
      ],
    },

    // ── Twitter / X Card — also used by LinkedIn, Telegram previews ──────────
    twitter: {
      card: 'summary_large_image',
      title: seo.titleShort,
      description: seo.description,
      images: [ogImage],
    },

    // ── Verification placeholders ─────────────────────────────────────────────
    // Uncomment and fill in after connecting each platform:
    // verification: {
    //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE',
    //   other: { 'facebook-domain-verification': 'YOUR_FB_DOMAIN_CODE' },
    // },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// ─── Layout ───────────────────────────────────────────────────────────────────
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
  const seo = SEO[locale as keyof typeof SEO] ?? SEO.USA
  const jsonLd = getJsonLd(locale)

  // Tracking IDs — set via GitHub Actions secrets or .env.local
  const fbPixelId  = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  const gaId       = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang={seo.htmlLang}>
      <head>
        {/* JSON-LD structured data — read by Google for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 — set NEXT_PUBLIC_GA_ID to enable */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </head>

      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* Facebook Pixel — set NEXT_PUBLIC_FB_PIXEL_ID to enable */}
        {fbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId}');fbq('track','PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
