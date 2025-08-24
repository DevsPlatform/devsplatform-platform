// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FooterHider from '../components/layout/FooterHider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevsPlatform',
  description: '비전공자를 위한 개발자 학습 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <div className='min-h-screen flex flex-col bg-white'>
          {' '}
          {/* bg-white 추가 */}
          <Header />
          <main className='flex-1'>{children}</main>
          <FooterHider />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
