import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: '전국 공공자전거 대여소 지도 | BikesMap',
    template: '%s | BikesMap',
  },
  description: '전국 1,494개 공공자전거 대여소 위치, 운영시간, 보유 대수를 한눈에 확인하세요.',
  keywords: ['자전거 대여소', '공공자전거', '전국 자전거', '자전거 지도', 'BikesMap'],
  verification: {
    google: 'hNvXWg0ehlmQ3dY5uT1fMkwxAk104_EY265xnfmCVfg',
    other: {
      'naver-site-verification': 'e60bd4cbea2b73e3905ce7bf6d4c5b7737e62689',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://bikesmap.vercel.app',
    siteName: 'BikesMap',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", background: '#f8fafc', color: '#1a1a1a' }}>
        {/* ── 공정위 필수 고지 — 모든 페이지 최상단 ── */}
        <div
          style={{
            background: '#f3f4f6',
            borderBottom: '1px solid #d1d5db',
            textAlign: 'center',
            padding: '7px 16px',
            fontSize: '12px',
            color: '#374151',
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </div>

        {/* ── 사이트 헤더 네비게이션 ── */}
        <nav
          style={{
            background: '#1e3a8a',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚲 BikesMap
          </Link>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
            {[
              { href: '/', label: '홈' },
              { href: '/about', label: '소개' },
              { href: '/contact', label: '문의' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {children}

        {/* ── 공통 푸터 ── */}
        <footer
          style={{
            borderTop: '1px solid #e5e7eb',
            background: '#f9fafb',
            padding: '32px 24px',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <nav style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            {[
              { href: '/', label: '홈' },
              { href: '/about', label: '서비스 소개' },
              { href: '/terms', label: '이용약관' },
              { href: '/privacy', label: '개인정보처리방침' },
              { href: '/contact', label: '문의하기' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p style={{ margin: '0 0 6px' }}>
            데이터 출처: 공공데이터포털(data.go.kr) 전국자전거대여소표준데이터 · 공공누리 제1유형
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
            © 2025 BikesMap · 이 포스팅은 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받습니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
