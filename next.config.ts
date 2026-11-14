import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 301 ze starych adresów WordPress/WooCommerce.
  async redirects() {
    return [
      { source: '/produkt/biosyntonikatm-sesja-11', destination: '/oferta/sesja-1-1', permanent: true },
      {
        source: '/produkt/warsztaty-praca-z-anhedonia-biosyntonikatm',
        destination: '/oferta/warsztaty-praca-z-anhedonia',
        permanent: true,
      },
      { source: '/produkt/:path*', destination: '/#oferta', permanent: true },
      { source: '/sklep', destination: '/#oferta', permanent: true },
      { source: '/kategoria-produktu/:path*', destination: '/#oferta', permanent: true },
      { source: '/znacznik-produktu/:path*', destination: '/#oferta', permanent: true },
      { source: '/koszyk', destination: '/#oferta', permanent: true },
      { source: '/zamowienie', destination: '/#oferta', permanent: true },
      { source: '/moje-konto/:path*', destination: '/', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/2026/09/06/hello-world', destination: '/', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/wp-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/wp-sitemap-:rest(.*)', destination: '/sitemap.xml', permanent: true },
    ]
  },
}

export default nextConfig
