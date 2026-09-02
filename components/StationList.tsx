'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BikeStation } from '@/lib/bikeData';

interface Props {
  stations: BikeStation[];
}

const PAGE_SIZE = 24;

export default function StationList({ stations }: Props) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stations;
    return stations.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.roadAddress.toLowerCase().includes(q) ||
        s.lotAddress.toLowerCase().includes(q) ||
        s.institutionName.toLowerCase().includes(q),
    );
  }, [query, stations]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  return (
    <>
      {/* ── 검색 바 ── */}
      <div style={{ maxWidth: '600px', margin: '0 auto 48px', padding: '0 16px' }}>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.1rem',
              color: '#9ca3af',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="search"
            placeholder="대여소명, 주소, 관리기관 검색…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 48px',
              fontSize: '1rem',
              borderRadius: '50px',
              border: '2px solid #e5e7eb',
              outline: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.85rem', color: '#6b7280' }}>
          {filtered.length.toLocaleString()}개 대여소
          {query && ` — "${query}" 검색 결과`}
        </p>
      </div>

      {/* ── 카드 그리드 ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        {paged.map((station) => (
          <Link
            key={station.id}
            href={`/bike/${station.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article
              style={{
                background: '#fff',
                borderRadius: '14px',
                border: '1px solid #f0f0f0',
                padding: '20px',
                height: '100%',
                boxSizing: 'border-box',
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
                <span
                  style={{
                    flexShrink: 0,
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                  }}
                >
                  🚲
                </span>
                <h2
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    margin: 0,
                    color: '#111827',
                  }}
                >
                  {station.name}
                </h2>
              </div>

              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#6b7280',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {station.roadAddress || station.lotAddress || '주소 정보 없음'}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {station.bikeCount && (
                  <span style={tagStyle('#eff6ff', '#1d4ed8')}>
                    🚲 {station.bikeCount}대
                  </span>
                )}
                {station.feeType && (
                  <span style={tagStyle('#f0fdf4', '#15803d')}>
                    {station.feeType}
                  </span>
                )}
                {station.airPump === '있음' && (
                  <span style={tagStyle('#fff7ed', '#c2410c')}>💨 공기주입기</span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* ── 페이지네이션 ── */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '64px' }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={pageBtn(page === 1)}
          >
            ← 이전
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const pageNum = totalPages <= 7 ? i + 1 : getPageNum(i, page, totalPages);
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                style={pageBtn(false, page === pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={pageBtn(page === totalPages)}
          >
            다음 →
          </button>
        </div>
      )}
    </>
  );
}

function tagStyle(bg: string, color: string): React.CSSProperties {
  return {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '0.72rem',
    fontWeight: 600,
    background: bg,
    color,
  };
}

function pageBtn(disabled: boolean, active = false): React.CSSProperties {
  return {
    padding: '8px 14px',
    borderRadius: '8px',
    border: active ? '2px solid #3b82f6' : '1px solid #e5e7eb',
    background: active ? '#3b82f6' : disabled ? '#f9fafb' : '#fff',
    color: active ? '#fff' : disabled ? '#d1d5db' : '#374151',
    fontWeight: active ? 700 : 400,
    fontSize: '0.875rem',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 0.15s',
  };
}

function getPageNum(i: number, current: number, total: number): number {
  if (total <= 7) return i + 1;
  const pages = [1, current - 1, current, current + 1, total].filter(
    (p) => p >= 1 && p <= total,
  );
  const unique = [...new Set(pages)].sort((a, b) => a - b);
  return unique[i] ?? i + 1;
}
