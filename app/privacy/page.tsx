import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | BikesMap',
  description: 'BikesMap 개인정보처리방침 — 비회원제, 비식별 쿠키 및 제휴 배너 관련 안내',
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px', lineHeight: 1.8, color: '#1a1a1a' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>개인정보처리방침</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '40px' }}>최종 업데이트: 2025년 9월 1일</p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제1조 (총칙)
        </h2>
        <p>
          BikesMap(이하 "서비스")은 개인정보 보호법 및 관련 법령을 준수합니다. 본 방침은 서비스가 이용자의
          개인정보를 어떻게 처리하는지 안내합니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제2조 (수집하는 개인정보 항목)
        </h2>
        <p>본 서비스는 <strong>회원 가입이 없는 비회원제</strong>로 운영되며, 이름·이메일·전화번호 등 어떠한 개인 식별 정보도 수집하지 않습니다.</p>
        <p style={{ marginTop: '12px' }}>다만, 서비스 운영을 위해 아래의 비식별 정보가 자동 수집될 수 있습니다.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>접속 IP 주소 (서버 로그, 자동 파기)</li>
          <li>브라우저 종류 및 OS 정보</li>
          <li>방문 일시 및 서비스 이용 기록</li>
          <li>쿠키 (세션 유지 및 통계 목적, 비식별 처리)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제3조 (쿠키 사용)
        </h2>
        <p>
          서비스는 이용 편의성 향상 및 통계 분석을 위해 쿠키(Cookie)를 사용합니다. 수집된 쿠키는
          개인을 식별할 수 없는 비식별 정보로만 처리되며, 제3자에게 제공되지 않습니다.
        </p>
        <p style={{ marginTop: '12px' }}>
          이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 기능이 제한될 수 있습니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제4조 (제휴 광고 배너)
        </h2>
        <p>
          본 서비스는 <strong>쿠팡 파트너스</strong> 제휴 마케팅 프로그램에 참여합니다.
          서비스 내 일부 배너 및 링크를 통해 이용자가 제품을 구매할 경우 운영자에게 일정 수수료가 지급될 수 있습니다.
        </p>
        <p style={{ marginTop: '12px' }}>
          제휴 배너는 이용자의 개인정보를 수집하지 않으며, 클릭 여부 등의 행동 데이터는 쿠팡 파트너스의
          자체 정책에 따라 처리됩니다. 자세한 내용은 쿠팡의 개인정보처리방침을 참고하시기 바랍니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제5조 (개인정보의 보유 및 이용 기간)
        </h2>
        <p>
          서비스가 수집하는 비식별 서버 로그는 운영 목적 달성 후 즉시 또는 최대 30일 이내 자동 파기됩니다.
          그 외 개인정보는 수집하지 않습니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제6조 (개인정보보호 책임자)
        </h2>
        <p>개인정보 관련 문의는 아래로 연락하시기 바랍니다.</p>
        <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
          <li>이메일: <a href="mailto:admin@bikesmap.vercel.app" style={{ color: '#2563eb' }}>admin@bikesmap.vercel.app</a></li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제7조 (방침 변경)
        </h2>
        <p>
          본 방침이 변경될 경우, 변경 사항을 본 페이지에 게시하며 시행일 7일 전부터 공지합니다.
        </p>
      </section>
    </main>
  );
}
