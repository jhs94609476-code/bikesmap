import React from 'react';

const NOTICE = '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';

const noticeStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '11px',
  color: '#9ca3af',
  marginTop: '6px',
  lineHeight: 1.4,
};

const centerBox: React.CSSProperties = {
  textAlign: 'center',
  margin: '0 auto',
};

/* ── 상단 가로형 728×90 ─────────────────────────────────────────────────── */
export function CoupangTopBanner() {
  return (
    <div style={centerBox}>
      <a
        href="https://link.coupang.com/a/gIBpRWdT3Y"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ads-partners.coupang.com/banners/1013124?trackingCode=AF5508221&subId=&traceId=V0-301-bae0f72e5e59e45f-I1013124&w=728&h=90"
          alt="쿠팡 특가 기획전"
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </a>
      <p style={noticeStyle}>{NOTICE}</p>
    </div>
  );
}

/* ── 중단 가로형 728×90 ─────────────────────────────────────────────────── */
export function CoupangMidBanner() {
  return (
    <div style={centerBox}>
      <a
        href="https://link.coupang.com/a/gIBiJc1uq5"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ads-partners.coupang.com/banners/1025238?trackingCode=AF5508221&subId=&traceId=V0-301-7e6e8eb8ddfa1bfb-I1025238&w=728&h=90"
          alt="쿠팡 추천 기획전"
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
        />
      </a>
      <p style={noticeStyle}>{NOTICE}</p>
    </div>
  );
}

/* ── 하단 빅배너 600×900 (반응형) ────────────────────────────────────────── */
export function CoupangBottomBanner() {
  return (
    <div style={{ ...centerBox, maxWidth: '600px', width: '100%' }}>
      <a
        href="https://link.coupang.com/a/gIBfIXkaOq"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
        style={{ display: 'block' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ads-partners.coupang.com/banners/1025237?trackingCode=AF5508221&subId=&traceId=V0-301-5a8c79a76485eb21-I1025237&w=600&h=900"
          alt="쿠팡 베스트 기획전"
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', width: '100%' }}
        />
      </a>
      <p style={noticeStyle}>{NOTICE}</p>
    </div>
  );
}

/* ── 상단 고정 공지 바 ───────────────────────────────────────────────────── */
export function CoupangNoticeBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        backgroundColor: '#f5f0e8',
        borderBottom: '1px solid #e0d8c8',
        textAlign: 'center',
        padding: '6px 16px',
        fontSize: '11px',
        color: '#9ca3af',
        lineHeight: 1.4,
      }}
    >
      {NOTICE}
    </div>
  );
}
