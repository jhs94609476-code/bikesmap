import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBikeStations, getStationById } from '@/lib/bikeData';

// 빌드 시 동적 params 허용하지 않음 (generateStaticParams 외 접근 차단)
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const stations = getBikeStations();
  return stations.map((station) => ({ slug: station.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const station = getStationById(slug);
  if (!station) return { title: '대여소를 찾을 수 없습니다 | BikesMap' };

  return {
    title: `${station.name} | 자전거 대여소 정보 - BikesMap`,
    description: `${station.name} 자전거 대여소 위치, 운영시간, 보유 대수 등 상세 정보. 주소: ${station.roadAddress || station.lotAddress}`,
  };
}

export default async function BikePage({ params }: PageProps) {
  const { slug } = await params;
  const station = getStationById(slug);
  if (!station) notFound();

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    color: '#6b7280',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '2px',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#111827',
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px 24px',
  };

  const rows: { label: string; value: string }[] = [
    { label: '도로명 주소', value: station.roadAddress || '—' },
    { label: '지번 주소', value: station.lotAddress || '—' },
    { label: '운영 시간', value: station.operatingHours || '—' },
    { label: '대여 구분', value: station.feeType || '—' },
    { label: '이용료', value: station.feeDetails || '—' },
    { label: '자전거 보유 대수', value: station.bikeCount ? `${station.bikeCount}대` : '—' },
    { label: '거치대 수', value: station.rackCount ? `${station.rackCount}개` : '—' },
    { label: '공기주입기', value: station.airPump || '—' },
    { label: '수리대', value: station.repairBench || '—' },
    { label: '관리 기관', value: station.institutionName || '—' },
    { label: '관리 기관 전화', value: station.phoneNumber || '—' },
    { label: '데이터 기준일', value: station.dataReferenceDate || '—' },
  ];

  return (
    <main style={{ maxWidth: '820px', margin: '0 auto', padding: '48px 24px', color: '#1a1a1a' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '6px' }}>
          자전거 대여소 #{station.id}
        </p>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px' }}>
          {station.name}
        </h1>
        {station.roadAddress && (
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>{station.roadAddress}</p>
        )}
      </div>

      {/* 지도 링크 */}
      {!isNaN(station.lat) && !isNaN(station.lng) && (
        <div style={{ marginBottom: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={`https://map.naver.com/v5/search/${encodeURIComponent(station.name)}?c=${station.lng},${station.lat},15,0,0,0,dh`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              background: '#03C75A',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            네이버 지도에서 보기
          </a>
          <a
            href={`https://map.kakao.com/link/map/${encodeURIComponent(station.name)},${station.lat},${station.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              background: '#FEE500',
              color: '#3C1E1E',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            카카오맵에서 보기
          </a>
        </div>
      )}

      {/* 상세 정보 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '12px',
          marginBottom: '40px',
        }}
      >
        {rows.map(({ label, value }) => (
          <div key={label} style={cardStyle}>
            <p style={labelStyle}>{label}</p>
            <p style={valueStyle}>{value}</p>
          </div>
        ))}
      </div>

      {/* 좌표 */}
      {!isNaN(station.lat) && !isNaN(station.lng) && (
        <div
          style={{
            ...cardStyle,
            background: '#f9fafb',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={labelStyle}>위도</p>
            <p style={valueStyle}>{station.lat}</p>
          </div>
          <div>
            <p style={labelStyle}>경도</p>
            <p style={valueStyle}>{station.lng}</p>
          </div>
        </div>
      )}

      {/* 출처 */}
      <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#9ca3af' }}>
        출처: 공공데이터포털(data.go.kr) 전국자전거대여소표준데이터 | 데이터 기준일: {station.dataReferenceDate || '—'}
      </p>
    </main>
  );
}
