import React from 'react';

/* ─────────────────────────────────────────────
   1. CoupangNoticeBar – 상단 고정 안내 바
───────────────────────────────────────────── */
export function CoupangNoticeBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#f5f0e8',
        borderBottom: '1px solid #e0d8c8',
        textAlign: 'center',
        padding: '6px 16px',
        fontSize: '12px',
        color: '#5a4a3a',
        lineHeight: 1.4,
      }}
    >
      이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
    </div>
  );
}

/* ─────────────────────────────────────────────
   2. CoupangTopBanner – 728×90 상단 가로 배너
───────────────────────────────────────────── */
export function CoupangTopBanner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
      <a
        href="https://link.coupang.com/a/gIBpRWdT3Y"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
      >
        <img
          src="https://ads-partners.coupang.com/banners/1013124?trackingCode=AF5508221&subId=&traceId=V0-301-bae0f72e5e59e45f-I1013124&w=728&h=90"
          alt="쿠팡 파트너스 광고"
          width={728}
          height={90}
          style={{ display: 'block', maxWidth: '100%' }}
        />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3. CoupangMidBanner – 728×90 중간 가로 배너
───────────────────────────────────────────── */
export function CoupangMidBanner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
      <a
        href="https://link.coupang.com/a/gIBiJc1uq5"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
      >
        <img
          src="https://ads-partners.coupang.com/banners/1025238?trackingCode=AF5508221&subId=&traceId=V0-301-7e6e8eb8ddfa1bfb-I1025238&w=728&h=90"
          alt="쿠팡 파트너스 광고"
          width={728}
          height={90}
          style={{ display: 'block', maxWidth: '100%' }}
        />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. CoupangBottomBanner – 600×900 반응형 세로 배너
───────────────────────────────────────────── */
export function CoupangBottomBanner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
      <a
        href="https://link.coupang.com/a/gIBfIXkaOq"
        target="_blank"
        rel="sponsored nofollow"
        referrerPolicy="unsafe-url"
        style={{ display: 'block', maxWidth: '600px', width: '100%' }}
      >
        <img
          src="https://ads-partners.coupang.com/banners/1025237?trackingCode=AF5508221&subId=&traceId=V0-301-5a8c79a76485eb21-I1025237&w=600&h=900"
          alt="쿠팡 파트너스 광고"
          width={600}
          height={900}
          style={{ display: 'block', maxWidth: '100%', width: '100%' }}
        />
      </a>
    </div>
  );
}
