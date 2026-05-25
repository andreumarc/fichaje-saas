import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fichajes.impulsodent.com'),
  applicationName: 'Fichajes',
  title: {
    default: 'Fichajes — Control horario para clínicas dentales',
    template: '%s | Fichajes — ImpulsoDent',
  },
  description:
    'Control de jornada laboral para clínicas dentales con geolocalización, modo kiosco y firma digital. Cumple con el RDL 8/2019 de registro horario obligatorio.',
  keywords: [
    'control horario clínica dental',
    'fichaje digital dental',
    'registro jornada laboral dental',
    'RDL 8/2019 clínica dental',
    'geolocalización fichaje dental',
    'modo kiosco clínica',
    'firma digital jornada',
    'control presencia dental',
    'Fichajes ImpulsoDent',
    'ImpulsoDent',
  ],
  authors: [{ name: 'ImpulsoDent', url: 'https://impulsodent.com' }],
  creator: 'ImpulsoDent',
  robots: { index: false, follow: false },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Fichajes — ImpulsoDent',
    title: 'Fichajes — Control horario para clínicas dentales',
    description:
      'Jornada laboral con geolocalización, modo kiosco y firma digital. Cumple RDL 8/2019.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fichajes ImpulsoDent — Control horario dental',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fichajes — Control horario dental',
    description: 'Geolocalización, kiosco y firma digital para clínicas dentales. Cumple RDL 8/2019.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#003A70' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1929' },
  ],
};

// Applies the persisted theme BEFORE first paint to avoid a flash.
// Mirrors the logic in ThemeProvider so the initial class matches client state.
const themeInitScript = `
try {
  var t = localStorage.getItem('fichajeshr-theme') || 'system';
  var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.documentElement.classList.add('dark');
} catch (e) {}
`.trim();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
