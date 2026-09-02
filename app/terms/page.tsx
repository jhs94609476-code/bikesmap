import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | BikesMap',
  description: 'BikesMap 이용약관 — 공공데이터 기반 서비스 이용 조건 및 면책 조항',
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px', lineHeight: 1.8, color: '#1a1a1a' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>이용약관</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '40px' }}>최종 업데이트: 2025년 9월 1일</p>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제1조 (목적)
        </h2>
        <p>
          본 약관은 BikesMap(이하 "서비스")의 이용 조건 및 절차, 운영자와 이용자 간의 권리·의무 관계를 규정함을 목적으로 합니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제2조 (서비스 내용)
        </h2>
        <p>
          서비스는 공공데이터포털(data.go.kr)에서 제공하는 <strong>전국자전거대여소표준데이터</strong>를 기반으로
          자전거 대여소의 위치, 운영 시간, 보유 현황 등을 지도 형태로 제공합니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제3조 (데이터 정확성 면책)
        </h2>
        <p>
          본 서비스가 제공하는 모든 정보는 각 지방자치단체가 공공데이터포털에 등록한 원본 데이터를 그대로 표시합니다.
          이에 따라 아래와 같은 사유로 발생하는 오차 또는 손해에 대해 운영자는 책임을 지지 않습니다.
        </p>
        <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
          <li>지자체 데이터 미갱신 또는 갱신 지연으로 인한 정보 오류</li>
          <li>폐쇄·이전·신설 대여소 정보가 원본 데이터에 반영되지 않은 경우</li>
          <li>운영 시간, 휴무일, 이용료 등의 현장 정보와 데이터 간 불일치</li>
          <li>좌표(위도·경도) 오기재로 인한 지도 위치 오차</li>
          <li>공공데이터포털 API 장애 또는 서비스 중단으로 인한 데이터 미제공</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          실제 이용 전 현장 방문 또는 관리 기관에 직접 확인하시기 바랍니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제4조 (서비스 변경 및 중단)
        </h2>
        <p>
          운영자는 서비스 내용 변경 또는 중단에 대해 사전 고지를 원칙으로 하나, 기술적 사유·데이터 공급 중단 등
          불가피한 경우 사전 고지 없이 변경하거나 중단할 수 있습니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제5조 (저작권)
        </h2>
        <p>
          서비스의 UI·코드 등 독자적 저작물은 운영자에게 귀속됩니다.
          데이터는 공공누리 제1유형 라이선스에 따라 출처 표시 조건으로 이용 가능합니다.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제6조 (제휴 마케팅)
        </h2>
        <p>
          서비스 내 일부 배너는 쿠팡 파트너스 제휴 마케팅 링크를 포함합니다.
          해당 링크를 통한 구매 시 운영자에게 수수료가 지급될 수 있으며, 이용자의 구매가에는 영향을 주지 않습니다.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
          제7조 (준거법)
        </h2>
        <p>
          본 약관은 대한민국 법령에 따라 해석되며, 분쟁 발생 시 운영자 소재지 관할 법원을 제1심 법원으로 합니다.
        </p>
      </section>
    </main>
  );
}
