import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 소개 | 전국 자전거 대여소 지도 - BikesMap',
  description:
    '공공데이터포털(data.go.kr) 전국자전거대여소표준데이터 기반의 자전거 대여소 정보 서비스입니다.',
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px', lineHeight: 1.8, color: '#1a1a1a' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>서비스 소개</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '40px' }}>BikesMap — 전국 자전거 대여소 지도</p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          서비스 취지
        </h2>
        <p>
          BikesMap은 행정안전부 및 각 지방자치단체가 공공데이터포털(<a href="https://www.data.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>data.go.kr</a>)을 통해
          공개한 <strong>전국자전거대여소표준데이터</strong>를 기반으로 운영되는 자전거 대여소 정보 서비스입니다.
        </p>
        <p style={{ marginTop: '12px' }}>
          자전거 이용자가 가까운 대여소 위치, 운영 시간, 보유 대수 등의 정보를 손쉽게 확인할 수 있도록
          지도 기반 UI로 제공합니다. 별도의 회원 가입 없이 누구나 무료로 이용 가능합니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          데이터 출처
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>출처: 공공데이터포털 (data.go.kr)</li>
          <li>데이터셋: 전국자전거대여소표준데이터</li>
          <li>제공 기관: 행정안전부 및 각 시·군·구</li>
          <li>라이선스: 공공누리 제1유형 (출처 표시)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          주요 제공 정보
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>대여소 위치 (지도 마커)</li>
          <li>도로명 주소 / 지번 주소</li>
          <li>운영 시간 및 휴무일</li>
          <li>자전거 보유 대수 / 거치대 수</li>
          <li>대여 구분 및 이용료 정보</li>
          <li>공기주입기 · 수리대 비치 여부</li>
          <li>관리 기관 연락처</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          운영 주체
        </h2>
        <p>본 서비스는 개인 개발자가 비영리 목적으로 운영합니다.</p>
        <p style={{ marginTop: '8px' }}>
          데이터 오류 신고 및 문의:{' '}
          <a href="mailto:admin@bikesmap.vercel.app" style={{ color: '#2563eb' }}>
            admin@bikesmap.vercel.app
          </a>
        </p>
      </section>
    </main>
  );
}
