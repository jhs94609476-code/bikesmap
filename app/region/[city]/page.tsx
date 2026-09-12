import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBikeStations, sidoSlug } from '@/lib/bikeData';
import {
  getRegionLabel,
  getRegionFullName,
  ALL_REGION_SLUGS,
} from '@/lib/regionUtils';
import StationList from '@/components/StationList';

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ city: string }>;
}

// ── 정적 빌드 경로 생성 (17개 시/도 사전 빌드) ───────────────────────────────
export async function generateStaticParams() {
  return ALL_REGION_SLUGS.map((city) => ({ city }));
}

// ── 메타데이터 ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const label    = getRegionLabel(city);
  const fullName = getRegionFullName(city);

  if (label === city) {
    // 매핑되지 않는 슬러그 → 기본 타이틀
    return { title: '지역을 찾을 수 없습니다' };
  }

  const title       = `${label} 공공자전거 대여소 위치 및 이용 안내 지도`;
  const description = `${fullName} 지역의 공공자전거 대여소 위치, 실시간 거치대 대수, 요금 및 길찾기 정보를 한눈에 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://bikesmap.vercel.app/region/${city}`,
    },
  };
}

// ── 페이지 ────────────────────────────────────────────────────────────────────
export default async function RegionPage({ params }: PageProps) {
  const { city } = await params;

  // 알 수 없는 슬러그 → 404
  if (!ALL_REGION_SLUGS.includes(city as (typeof ALL_REGION_SLUGS)[number])) {
    notFound();
  }

  const label    = getRegionLabel(city);
  const fullName = getRegionFullName(city);

  // 해당 지역 대여소 필터링
  const all      = getBikeStations();
  const stations = all.filter((s) => sidoSlug(s.sido) === city);

  const airPumpCount     = stations.filter((s) => s.airPump).length;
  const repairBenchCount = stations.filter((s) => s.repairBench).length;

  return (
    <>
      {/* ── 히어로 헤더 ─────────────────────────────────────────── */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 55%, #06b6d4 100%)',
          color: '#fff',
          padding: '48px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          {/* 뒤로가기 */}
          <div style={{ marginBottom: '20px' }}>
            <Link
              href="/"
              style={{
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                background: 'rgba(255,255,255,0.12)',
                padding: '6px 14px',
                borderRadius: '50px',
              }}
            >
              ← 전국 목록으로
            </Link>
          </div>

          <div style={{ fontSize: '2.8rem', marginBottom: '10px' }}>🚲</div>

          {/* ── 핵심 H1: 지역명 + 페이지 주제 ──────────────────── */}
          <h1
            style={{
              fontSize: 'clamp(1.7rem, 4.5vw, 2.6rem)',
              fontWeight: 800,
              margin: '0 0 14px',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
            }}
          >
            {label} 공공자전거 대여소 지도
          </h1>

          <p style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)', opacity: 0.85, margin: '0 auto 28px', maxWidth: '480px', lineHeight: 1.6 }}>
            {fullName} 공공자전거 대여소 위치 및 이용 정보
          </p>

          {/* 통계 칩 */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '📍', label: `${label} 대여소`,  value: `${stations.length.toLocaleString()}곳` },
              { icon: '💨', label: '공기주입기 비치',  value: `${airPumpCount.toLocaleString()}곳` },
              { icon: '🔧', label: '수리대 비치',      value: `${repairBenchCount.toLocaleString()}곳` },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '50px',
                  padding: '7px 18px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {stat.icon} {stat.label} <span style={{ opacity: 0.8 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── 대여소 목록 (지역 필터 탭 + 검색 + 카드 그리드) ──── */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px 0' }}>
        <StationList stations={stations} activeCity={city} />
      </main>
    </>
  );
}
