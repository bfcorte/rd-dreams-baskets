'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

const WHATSAPP_URL = 'https://wa.me/13218065340'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-bark-900 text-cream-200">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1440 60" className="w-full h-12 fill-cream-100">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="section-padding max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.jpeg"
              alt="R&D Dreams & Baskets"
              width={100}
              height={50}
              className="h-12 w-auto object-contain brightness-[1.15] contrast-75"
            />
            <p className="font-body text-xs text-cream-300/60 leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <p className="font-display italic text-gold-400 text-sm">{t('tagline')}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body text-xs font-bold tracking-widest uppercase text-cream-300/40 mb-1">
              {t('contact')}
            </h4>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-body text-cream-200/80 hover:text-[#25D366] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +1 (321) 806-5340
            </a>
          </div>

          {/* Lang switcher */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body text-xs font-bold tracking-widest uppercase text-cream-300/40 mb-1">Language</h4>
            <div className="flex gap-3 flex-wrap">
              <Link href="/USA" className="text-sm font-body text-cream-200/80 hover:text-gold-400 transition-colors">
                🇺🇸 English
              </Link>
              <span className="text-cream-300/20">·</span>
              <Link href="/BR" className="text-sm font-body text-cream-200/80 hover:text-gold-400 transition-colors">
                🇧🇷 Português
              </Link>
              <span className="text-cream-300/20">·</span>
              <Link href="/ES" className="text-sm font-body text-cream-200/80 hover:text-gold-400 transition-colors">
                🇪🇸 Español
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream-200/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-body text-cream-300/30">
          <p>© {new Date().getFullYear()} R&D Dreams & Baskets. {t('rights')}</p>
          <p className="flex items-center gap-1">
            {t('madeWith')} <span className="text-rust-400">♥</span> in Central Florida
          </p>
        </div>
      </div>
    </footer>
  )
}
