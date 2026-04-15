import { setRequestLocale } from 'next-intl/server'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ProductsSection from '@/components/ProductsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-cream-200">
      <Navigation locale={locale} />
      <HeroSection />
      <ProductsSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
