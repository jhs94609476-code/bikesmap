import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBikeStations, getStationBySlug } from '@/lib/bikeData';
import { CoupangTopBanner, CoupangMidBanner, CoupangBottomBanner } from '@/components/CoupangBanners';
import AddressCopyButton from '@/components/AddressCopyButton';

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBikeStations().slice(0, 30).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = getStationBySlug(slug);
  if (!station) return { title: '대여소를 찾을 수 없습니다' };
  return {
    title: station.seoTitle,
    description: station.seoDescription,
    openGraph: { title: station.seoTitle, description: station.seoDescription, type: 'website' },
  };
}

const FAQ = [
  { q: '자전거는 어떻게 대여하나요?', a: '대여소 거치대에서 자전거를 확인 후 무인 단말기 또는 앱을 통해 신청합니다. 신용카드·교통카드 결제가 가능한 곳이 많습니다.' },
  { q: '반납은 어디서 하나요?', a: '지정된 거치대에 반납 후 잠금을 확인하세요. 동일 권역 내 다른 대여소 반납이 가능한 경우도 있습니다.' },
  { q: '초과 요금은 어떻게 발생하나요?', a: '기본 대여 시간 초과 시 추가 요금이 부과될 수 있습니다. 정확한 기준은 이용료 항목 또는 관리기관에 문의하세요.' },
  { q: '헬멧(안전모)은 어디서 구하나요?', a: '도로교통법에 따라 자전거 이용 시 안전모 착용을 강력 권장합니다. 일부 대여소에서 함께 대여해 드리며, 없는 경우 개인 헬멧을 지참하세요.' },
];

export default async function BikePage({ params }: PageProps) {
  const { slug } = await params;
  const station = getStationBySlug(slug);
  if (!station) notFound();

  const hasCoords   = !isNaN(station.lat) && !isNaN(station.lng);
  const displayAddr = station.roadAddress || station.lotAddress || '주소 정보 없음';
  const sidoShort   = station.sido.replace(/(특별시|광역시|특별자치시|특별자치도|도)$/, '');

  const kakaoUrl = hasCoords
    ? `https://map.kakao.com/link/map/${encodeURIComponent(station.name)},${station.lat},${station.lng}`
    : `https://map.kakao.com/link/search/${encodeURIComponent(displayAddr)}`;
  const naverUrl = hasCoords
    ? `https://map.naver.com/v5/search/${encodeURIComponent(station.name)}?c=${station.lng},${station.lat},15,0,0,0,dh`
    : `https://map.naver.com/v5/search/${encodeURIComponent(displayAddr)}`;

  // 핵심 정보 카드 (위도/경도 제거, 요금·휴무일 추가)
  const cards = [
    { icon: '🕐', label: '운영 시간',      value: station.operatingHours || '정보 없음', bg: '#eff6ff', border: '#bfdbfe' },
    { icon: '📅', label: '휴무일',          value: station.holiday,                      bg: '#f0fdf4', border: '#bbf7d0' },
    { icon: '💰', label: '요금 구분',       value: station.feeType || '정보 없음',        bg: '#fef9c3', border: '#fde047' },
    { icon: '🪙', label: '이용 요금',       value: station.feeDetails,                   bg: '#fff7ed', border: '#fed7aa' },
    { icon: '🚲', label: '자전거 보유 대수', value: station.bikeCount ? `${station.bikeCount}대` : '정보 없음', bg: '#fdf4ff', border: '#e9d5ff' },
    { icon: '🅿️', label: '거치대 수',       value: station.rackCount ? `${station.rackCount}개` : '정보 없음', bg: '#f0f9ff', border: '#bae6fd' },
    { icon: '💨', label: '공기주입기',       value: station.airPump ? '있음' : '없음',    bg: station.airPump ? '#ecfdf5' : '#f9fafb', border: station.airPump ? '#6ee7b7' : '#e5e7eb' },
    { icon: '🔧', label: '수리대',           value: station.repairBench ? '있음' : '없음', bg: station.repairBench ? '#ecfdf5' : '#f9fafb', border: station.repairBench ? '#6ee7b7' : '#e5e7eb' },
  ];

  return (
    <>
      {/* 뒤로가기 */}
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '16px 20px 0' }}>
        <Link href="/" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }}>
          ← 대여소 목록으로
        </Link>
      </div>

      {/* ── 히어로 ─────────────────────────────────────────────── */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #06b6d4 100%)',
          color: '#fff',
          padding: '36px 24px 52px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {sidoShort && <span style={badge}>{sidoShort}</span>}
            {station.sigungu && <span style={badge}>{station.sigungu}</span>}
            {station.eupmyeondong && <span style={{ ...badge, background: 'rgba(255,255,255,0.12)' }}>{station.eupmyeondong}</span>}
          </div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', fontWeight: 800, lineHeight: 1.3, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {station.seoTitle}
          </h1>
          <p style={{ opacity: 0.88, fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
            📍 {displayAddr}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: '880px', margin: '0 auto', padding: '0 20px 72px' }}>

        {/* ── 배너 1 (공정위 고지는 layout 최상단에 이미 표시됨) ── */}
        <div style={{ marginBottom: '40px' }}>
          <CoupangTopBanner />
        </div>

        {/* ── 핵심 정보 카드 그리드 ────────────────────────────── */}
        <section aria-label="핵심 정보" style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>📋 핵심 정보</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {cards.map(({ icon, label, value, bg, border }) => (
              <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '14px', padding: '18px 20px' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{icon}</div>
                <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#111827', lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 원클릭 길찾기 ───────────────────────────────────── */}
        <section aria-label="길찾기" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>🗺️ 원클릭 길찾기</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={kakaoUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 22px', background: '#FEE500', color: '#3C1E1E', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(254,229,0,0.45)' }}>
              🗺️ 카카오맵 길찾기
            </a>
            <a href={naverUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 22px', background: '#03C75A', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(3,199,90,0.35)' }}>
              🗺️ 네이버맵 길찾기
            </a>
            <AddressCopyButton address={displayAddr} />
          </div>
          {station.phoneNumber && (
            <p style={{ marginTop: '16px', fontSize: '0.875rem', color: '#64748b', margin: '16px 0 0' }}>
              📞 관리기관({station.institutionName || '—'}): <strong>{station.phoneNumber}</strong>
            </p>
          )}
        </section>

        {/* ── 배너 2 ──────────────────────────────────────────── */}
        <div style={{ marginBottom: '40px' }}><CoupangMidBanner /></div>

        {/* ── 이용 안내 ────────────────────────────────────────── */}
        <section aria-label="이용 안내" style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>📖 이용 안내 및 안전 수칙</h2>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px 28px' }}>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 2.2, color: '#374151', fontSize: '0.95rem' }}>
              <li><strong>반납 방법:</strong> 반납 후 거치대 잠금을 확인하고 앱/단말기에서 반납 완료 처리를 하세요.</li>
              <li><strong>초과 요금 주의:</strong> 기본 대여 시간 초과 시 분 단위로 추가 요금이 발생할 수 있습니다.</li>
              <li><strong>헬멧 착용 권장:</strong> 도로교통법에 따라 자전거 운행 시 안전모 착용을 강력 권장합니다.</li>
              <li><strong>출발 전 점검:</strong> 브레이크·타이어·라이트 등 안전 상태를 반드시 확인하세요.</li>
              <li><strong>데이터 유의:</strong> 본 정보는 공공데이터 기준으로, 현장 운영 상황과 다를 수 있습니다.</li>
            </ul>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section aria-label="자주 묻는 질문" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>❓ 자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQ.map(({ q, a }) => (
              <details key={q} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', color: '#1f2937', userSelect: 'none' }}>
                  {q}
                </summary>
                <div style={{ padding: '4px 20px 18px', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.9, borderTop: '1px solid #f3f4f6' }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 배너 3 ──────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ maxWidth: '600px', width: '100%' }}>
            <CoupangBottomBanner />
          </div>
        </div>

        {/* ── 출처 ─────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.9, margin: '0 0 12px' }}>
            대여소 ID: #{station.id} · 데이터 기준일: {station.dataReferenceDate || '—'}<br />
            출처: 공공데이터포털(data.go.kr) 전국자전거대여소표준데이터 (공공누리 제1유형)<br />
            실제 운영 현황과 다를 수 있으므로 방문 전 관리기관에 직접 확인하시기 바랍니다.
          </p>
          <Link href="/" style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
            ← 다른 대여소 찾기
          </Link>
        </div>
      </main>
    </>
  );
}

const badge: React.CSSProperties = {
  background: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(8px)',
  borderRadius: '50px',
  padding: '4px 14px',
  fontSize: '0.8rem',
  fontWeight: 700,
};
