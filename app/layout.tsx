// Root layout — minimal by design.
// Each [locale]/layout.tsx owns <html>, <body>, and all metadata.
// This pattern is required for next-intl with App Router i18n routing.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
