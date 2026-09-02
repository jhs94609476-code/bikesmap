import { Metadata } from 'next';
import Link from 'next/link';
import { getBikeStations } from '@/lib/bikeData';
import StationList from '@/components/StationList';

export const metadata: Metadata = {
  title: '전국 공공자전거 대여소 지도 | BikesMap',
  description:
    '전국 1,494개 공공자전거 대여소 위치, 운영시간, 보유 대수를 한눈에 확인하세요. 공공데이터포털 공식 데이터 기반.',
  keywords: ['자전거 대여소', '공공자전거', '전국 자전거', '자전거 지도', 'BikesMap'],
  openGraph: {
    title: '전국 공공자전거 대여소 지도 | BikesMap',
    description: '전국 1,494개 공공자전거 대여소 정보를 지역별로 검색하세요.',
    type: 'website',
    url: 'https://bikesmap.vercel.app',
  },
};

export default function HomePage() {
  const stations = getBikeStations();

  return (
    <>
      {/* ── 헤더 ── */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
          color: '#fff',
          padding: '64px 24px 80px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-40px',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🚲</div>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 800,
              margin: '0 0 16px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            전국 공공자전거 대여소 지도
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              opacity: 0.85,
              margin: '0 auto 32px',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            공공데이터포털 공식 데이터 기반 · 전국{' '}
            <strong>{stations.length.toLocaleString()}개</strong> 대여소 정보
          </p>

          {/* 통계 칩 */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '📍', label: '전국 대여소', value: `${stations.length.toLocaleString()}곳` },
              { icon: '💨', label: '공기주입기 비치', value: `${stations.filter((s) => s.airPump === '있음').length.toLocaleString()}곳` },
              { icon: '🔧', label: '수리대 비치', value: `${stations.filter((s) => s.repairBench === '있음').length.toLocaleString()}곳` },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {stat.icon} {stat.label} <span style={{ opacity: 0.8 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '48px 16px 0',
        }}
      >
        <StationList stations={stations} />
      </main>

      {/* ── 푸터 ── */}
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
            <Link
              key={item.href}
              href={item.href}
              style={{ color: '#6b7280', textDecoration: 'none', fontWeight: 500 }}
            >
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
    </>
  );
}
