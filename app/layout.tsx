import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: '운시엘 · AI 사주 운세 | 우주가 풀어주는 나의 사주팔자',
  description:
    'AI가 오행(목화토금수)과 우주의 기운으로 풀어주는 정확한 사주와 운세. 이름, 생년월일, 출생 시간을 입력하고 나의 사주팔자와 오행 분석을 확인하세요.',
  generator: 'v0.app',
  keywords: ['사주', '운세', '사주팔자', '오행', 'AI 사주', '무료 사주'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1021',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`dark bg-background ${notoSansKr.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">{children}</div>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
