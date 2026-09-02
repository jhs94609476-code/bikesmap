import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '문의하기 | BikesMap',
  description: '자전거 대여소 데이터 오류 정정 및 서비스 문의 안내 — admin@bikesmap.vercel.app',
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px', lineHeight: 1.8, color: '#1a1a1a' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>문의하기</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '40px' }}>데이터 오류 신고 및 서비스 문의</p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          데이터 오류 정정 접수
        </h2>
        <p>
          BikesMap에 표시된 자전거 대여소 정보가 실제와 다를 경우, 아래 이메일로 오류 내용을 신고해 주세요.
          접수된 내용은 검토 후 공공데이터포털에 정정 요청하거나 자체적으로 반영합니다.
        </p>
        <div
          style={{
            display: 'inline-block',
            marginTop: '20px',
            background: '#f0f4ff',
            border: '1px solid #c7d7fd',
            borderRadius: '8px',
            padding: '16px 24px',
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: '#1d4ed8', fontSize: '1.1rem' }}>
            📧{' '}
            <a href="mailto:admin@bikesmap.vercel.app" style={{ color: '#1d4ed8', textDecoration: 'underline' }}>
              admin@bikesmap.vercel.app
            </a>
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          오류 신고 시 포함할 내용
        </h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li>대여소 이름 또는 페이지 URL</li>
          <li>잘못된 정보 항목 (예: 주소, 운영시간, 위치 등)</li>
          <li>올바른 정보 (가능한 경우 출처 포함)</li>
          <li>신고 일시</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          처리 절차
        </h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li>이메일 접수 확인 (영업일 기준 1~3일)</li>
          <li>데이터 오류 여부 검토</li>
          <li>공공데이터포털 정정 요청 또는 서비스 내 즉시 반영</li>
          <li>처리 결과 회신 (필요 시)</li>
        </ol>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          기타 문의
        </h2>
        <p>
          광고·제휴 문의, 서비스 개선 제안, 저작권 관련 문의도 동일한 이메일로 보내주세요.
        </p>
        <p style={{ marginTop: '12px' }}>
          <a href="mailto:admin@bikesmap.vercel.app" style={{ color: '#2563eb' }}>
            admin@bikesmap.vercel.app
          </a>
        </p>
      </section>

      <section
        style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '8px',
          padding: '16px 20px',
          fontSize: '0.9rem',
          color: '#92400e',
        }}
      >
        <strong>⚠️ 안내</strong>
        <p style={{ margin: '8px 0 0' }}>
          본 서비스의 데이터는 공공데이터포털(data.go.kr)에서 제공하는 원본 데이터를 표시합니다.
          원본 데이터의 오류는 해당 지자체가 공공데이터포털에 반영한 이후 서비스에 적용됩니다.
          즉각적인 수정이 어려울 수 있는 점 양해 부탁드립니다.
        </p>
      </section>
    </main>
  );
}
