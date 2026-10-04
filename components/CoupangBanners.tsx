import React from 'react';

/* ── SNS 피드형 커스텀 카드 (쿠팡 파트너스) ─────────────────────────────────
   외부 스크립트/다이내믹 배너 제거. 순수 JSX + CSS.
   카드 내용 수정: 아래 CARDS 데이터만 교체하면 됩니다.
──────────────────────────────────────────────────────────────────────────── */

const CARD_CSS = `
  .cp-insta-card {
    margin: 0 auto;
    max-width: 480px;
    background: #ffffff;
    border: 1px solid #fecdd3;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 12px 30px -8px rgba(244, 63, 94, 0.12), 0 4px 10px rgba(0, 0, 0, 0.03);
    font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .cp-insta-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -8px rgba(244, 63, 94, 0.2);
  }
  .cp-insta-link { text-decoration: none; color: inherit; display: block; }
  .cp-insta-img-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #fdf2f8;
    overflow: hidden;
  }
  .cp-insta-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s ease;
  }
  .cp-insta-card:hover .cp-insta-img-box img { transform: scale(1.04); }
  .cp-insta-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(17, 24, 39, 0.72);
    backdrop-filter: blur(6px);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  .cp-insta-body {
    padding: 22px;
    background: linear-gradient(180deg, #ffffff 0%, #fffbfb 100%);
  }
  .cp-insta-tag {
    display: inline-block;
    color: #e11d48;
    background: #ffe4e6;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  .cp-insta-title {
    margin: 0 0 6px 0;
    font-size: 19px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.35;
    word-break: keep-all;
  }
  .cp-insta-desc {
    margin: 0 0 18px 0;
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    word-break: keep-all;
  }
  .cp-insta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px;
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
    background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(225, 29, 72, 0.28);
    box-sizing: border-box;
    transition: opacity 0.2s ease;
  }
  .cp-insta-card:hover .cp-insta-btn { opacity: 0.92; }
`;

interface CardData {
  href: string;
  img: string;
  alt: string;
  badge?: string;
  tag: string;
  tagStyle?: React.CSSProperties;
  title: string;
  desc: string;
  cta: string;
  btnStyle?: React.CSSProperties;
}

const CARDS: Record<'top' | 'mid' | 'bottom', CardData> = {
  /* 상단: 몽실구름 키링 */
  top: {
    href: 'https://link.coupang.com/a/hzxzJ4YTC0',
    img: '/images/products/cloud-keyring.jpg.png',
    alt: '다다랜드 몽실구름 복슬 인형 데일리 키링',
    tag: '🔥 SNS 화제의 백꾸템',
    title: '다다랜드 몽실구름 복슬 인형 데일리 키링',
    desc: '가방·파우치에 달아두면 다들 어디서 샀냐고 물어보는 몽글몽글 뽀글이 키링',
    cta: '실물 디테일 & 최저가 보러가기 ➔',
  },
  /* 중단: 짱구 규조토 발매트 */
  mid: {
    href: 'https://link.coupang.com/a/hzDSpGI48i',
    img: '/images/products/shinchan-mat.jpg.png',
    alt: '짱구 규조토 발매트',
    badge: '뽀송 흡수 꿀템',
    tag: '🛁 욕실·자취 필수템',
    tagStyle: { color: '#0284c7', background: '#e0f2fe' },
    title: '짱구는 못말려 초흡수 소프트 규조토 발매트',
    desc: '발 닿자마자 물기 싹 흡수! 딱딱하지 않고 부드러운 관리 편한 귀여운 짱구 매트',
    cta: '실물 디자인 & 최저가 보러가기 ➔',
    btnStyle: {
      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      boxShadow: '0 6px 16px rgba(3, 105, 161, 0.28)',
    },
  },
  /* 하단: 말랑 쿠션 뱃살 스티커 */
  bottom: {
    href: 'https://link.coupang.com/a/hzDUgYJeN2',
    img: '/images/products/belly-sticker.jpg.png',
    alt: '말랑 쿠션 뱃살스티커',
    badge: '스트레스 해소',
    tag: '🐾 말랑쫀득 손맛템',
    tagStyle: { color: '#ea580c', background: '#ffedd5' },
    title: '말랑 쿠션 뱃살스티커 귀여운 입체 스티커',
    desc: '자꾸만 만지작거리게 되는 중독적인 말랑함! 폰케이스, 문콕 방지, 모니터 데코용',
    cta: '말랑한 실물 & 특가 보러가기 ➔',
    btnStyle: {
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      boxShadow: '0 6px 16px rgba(234, 88, 12, 0.28)',
    },
  },
};

function CoupangCard({ data }: { data: CardData }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CARD_CSS }} />
      <div className="cp-insta-card">
        <a
          href={data.href}
          target="_blank"
          rel="sponsored nofollow"
          referrerPolicy="unsafe-url"
          className="cp-insta-link"
        >
          <div className="cp-insta-img-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.img} alt={data.alt} loading="lazy" />
            {data.badge && <span className="cp-insta-badge">{data.badge}</span>}
          </div>
          <div className="cp-insta-body">
            <span className="cp-insta-tag" style={data.tagStyle}>{data.tag}</span>
            <h3 className="cp-insta-title">{data.title}</h3>
            <p className="cp-insta-desc">{data.desc}</p>
            <div className="cp-insta-btn" style={data.btnStyle}>{data.cta}</div>
          </div>
        </a>
      </div>
    </>
  );
}

export function CoupangTopBanner() {
  return <CoupangCard data={CARDS.top} />;
}

export function CoupangMidBanner() {
  return <CoupangCard data={CARDS.mid} />;
}

export function CoupangBottomBanner() {
  return <CoupangCard data={CARDS.bottom} />;
}
