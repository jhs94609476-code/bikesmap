'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BikeStation } from '@/lib/bikeData';

interface Props {
  stations: BikeStation[];
}

const PAGE_SIZE = 24;

const REGIONS = [
  { label: '전체', value: '' },
  { label: '서울', value: '서울' },
  { label: '경기', value: '경기' },
  { label: '인천', value: '인천' },
  { label: '강원', value: '강원' },
  { label: '충북', value: '충청북도' },
  { label: '충남', value: '충청남도' },
  { label: '대전', value: '대전' },
  { label: '세종', value: '세종' },
  { label: '전북', value: '전라북도' },
  { label: '전남', value: '전라남도' },
  { label: '광주', value: '광주' },
  { label: '경북', value: '경상북도' },
  { label: '경남', value: '경상남도' },
  { label: '대구', value: '대구' },
  { label: '울산', value: '울산' },
  { label: '부산', value: '부산' },
  { label: '제주', value: '제주' },
];

export default function StationList({ stations }: Props) {
  const [query, setQuery]   = useState('');
  const [region, setRegion] = useState('');
  const [page, setPage]     = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stations.filter((s) => {
      const matchRegion = !region || s.sido.includes(region);
      const matchQuery  = !q || (
        s.name.toLowerCase().includes(q) ||
        s.roadAddress.toLowerCase().includes(q) ||
        s.lotAddress.toLowerCase().includes(q) ||
        s.institutionName.toLowerCase().includes(q) ||
        s.sigungu.includes(q) ||
        s.eupmyeondong.includes(q)
      );
      return matchRegion && matchQuery;
    });
  }, [query, region, stations]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => { setQuery(v); setPage(1); };
  const handleRegion = (v: string) => { setRegion(v); setPage(1); };

  return (
    <>
      {/* ── 지역 필터 탭 ────────────────────────────────────────── */}
      <div
        style={{
          overflowX: 'auto',
          paddingBottom: '4px',
          marginBottom: '28px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content', padding: '0 16px' }}>
          {REGIONS.map(({ label, value }) => {
            const active = region === value;
            return (
              <button
                key={value}
                onClick={() => handleRegion(value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  border: active ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  background: active ? '#3b82f6' : '#fff',
                  color: active ? '#fff' : '#374151',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  boxShadow: active ? '0 2px 8px rgba(59,130,246,0.3)' : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 검색 바 ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: '600px', margin: '0 auto 36px', padding: '0 16px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', color: '#9ca3af', pointerEvents: 'none' }}>
            🔍
          </span>
          <input
            type="search"
            placeholder="대여소명, 주소, 지역, 관리기관 검색…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 20px 14px 48px',
              fontSize: '1rem', borderRadius: '50px',
              border: '2px solid #e5e7eb', outline: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              transition: 'border-color 0.2s', boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
            onBlur={(e)  => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.85rem', color: '#6b7280' }}>
          {filtered.length.toLocaleString()}개 대여소
          {region && ` · ${REGIONS.find((r) => r.value === region)?.label}`}
          {query && ` · "${query}" 검색`}
        </p>
      </div>

      {/* ── 카드 그리드 ─────────────────────────────────────────── */}
      {paged.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {paged.map((station) => (
            <Link key={station.id} href={`/bike/${station.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article
                style={{
                  background: '#fff', borderRadius: '14px',
                  border: '1px solid #f0f0f0', padding: '20px',
                  height: '100%', boxSizing: 'border-box',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(59,130,246,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                    🚲
                  </span>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4, margin: 0, color: '#111827' }}>
                    {station.name}
                  </h2>
                </div>

                {(station.sigungu || station.eupmyeondong) && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {station.sigungu && <span style={tagStyle('#eff6ff', '#1d4ed8')}>{station.sigungu}</span>}
                    {station.eupmyeondong && <span style={tagStyle('#f3f4f6', '#4b5563')}>{station.eupmyeondong}</span>}
                  </div>
                )}

                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 12px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {station.roadAddress || station.lotAddress || '주소 정보 없음'}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {station.bikeCount && <span style={tagStyle('#eff6ff', '#1d4ed8')}>🚲 {station.bikeCount}대</span>}
                  {station.feeType && <span style={tagStyle('#f0fdf4', '#15803d')}>{station.feeType}</span>}
                  {station.airPump && <span style={tagStyle('#fff7ed', '#c2410c')}>💨 공기주입기</span>}
                  {station.repairBench && <span style={tagStyle('#fdf4ff', '#7e22ce')}>🔧 수리대</span>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* ── 페이지네이션 ─────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <PBtn disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>← 이전</PBtn>
          {buildPages(page, totalPages).map((n) => (
            <PBtn key={n} active={page === n} onClick={() => setPage(n)}>{n}</PBtn>
          ))}
          <PBtn disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>다음 →</PBtn>
        </div>
      )}
    </>
  );
}

// ── 헬퍼 ─────────────────────────────────────────────────────────────────────
function tagStyle(bg: string, color: string): React.CSSProperties {
  return { display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, background: bg, color };
}

function buildPages(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, current - 1, current, current + 1, total].filter((p) => p >= 1 && p <= total));
  return [...set].sort((a, b) => a - b);
}

function PBtn({ children, onClick, disabled = false, active = false }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; active?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '8px 14px', borderRadius: '8px',
      border: active ? '2px solid #3b82f6' : '1px solid #e5e7eb',
      background: active ? '#3b82f6' : disabled ? '#f9fafb' : '#fff',
      color: active ? '#fff' : disabled ? '#d1d5db' : '#374151',
      fontWeight: active ? 700 : 400, fontSize: '0.875rem',
      cursor: disabled ? 'default' : 'pointer', transition: 'all 0.15s',
    }}>
      {children}
    </button>
  );
}
