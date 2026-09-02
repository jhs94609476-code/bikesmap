import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';

// ── 한글 로마자 변환 (국립국어원 표준 로마자 표기법) ─────────────────────
const INITIALS = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const VOWELS   = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const FINALS   = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];

function romanize(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const idx = code - 0xac00;
      const ini = Math.floor(idx / (21 * 28));
      const vow = Math.floor((idx % (21 * 28)) / 28);
      const fin = idx % 28;
      result += INITIALS[ini] + VOWELS[vow] + FINALS[fin];
    } else if (/[a-z0-9]/i.test(char)) {
      result += char.toLowerCase();
    }
  }
  return result || 'kr';
}

// ── 시/도 → 영문 슬러그 맵 ────────────────────────────────────────────────
const SIDO_MAP: Record<string, string> = {
  '서울특별시': 'seoul',   '서울시': 'seoul',   '서울': 'seoul',
  '부산광역시': 'busan',   '부산시': 'busan',   '부산': 'busan',
  '인천광역시': 'incheon', '인천시': 'incheon', '인천': 'incheon',
  '대구광역시': 'daegu',   '대구시': 'daegu',   '대구': 'daegu',
  '대전광역시': 'daejeon', '대전시': 'daejeon', '대전': 'daejeon',
  '광주광역시': 'gwangju', '광주시': 'gwangju', '광주': 'gwangju',
  '울산광역시': 'ulsan',   '울산시': 'ulsan',   '울산': 'ulsan',
  '세종특별자치시': 'sejong', '세종시': 'sejong', '세종': 'sejong',
  '경기도': 'gyeonggi',
  '강원특별자치도': 'gangwon', '강원도': 'gangwon',
  '충청북도': 'chungbuk', '충북': 'chungbuk',
  '충청남도': 'chungnam', '충남': 'chungnam',
  '전북특별자치도': 'jeonbuk', '전라북도': 'jeonbuk', '전북': 'jeonbuk',
  '전라남도': 'jeonnam', '전남': 'jeonnam',
  '경상북도': 'gyeongbuk', '경북': 'gyeongbuk',
  '경상남도': 'gyeongnam', '경남': 'gyeongnam',
  '제주특별자치도': 'jeju', '제주도': 'jeju', '제주': 'jeju',
};

function sidoSlug(sido: string): string {
  return SIDO_MAP[sido] ??
    romanize(sido.replace(/(특별시|광역시|특별자치시|특별자치도|시|도)$/, ''));
}

function sigunguSlug(sigungu: string): string {
  const stripped = sigungu.replace(/(특별자치시|특별시|광역시|시|군|구)$/, '');
  return romanize(stripped);
}

// ── 주소 파싱 ────────────────────────────────────────────────────────────────
interface ParsedAddress {
  sido: string;
  sigungu: string;
  eupmyeondong: string;
}

function parseAddress(addr: string): ParsedAddress {
  if (!addr) return { sido: '', sigungu: '', eupmyeondong: '' };
  const parts = addr.trim().split(/\s+/);
  const sido = parts[0] ?? '';
  let sigungu = '';
  let eupmyeondong = '';

  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (!sigungu && (p.endsWith('시') || p.endsWith('군') || p.endsWith('구'))) {
      sigungu = p;
    } else if (
      !eupmyeondong &&
      (p.endsWith('동') || p.endsWith('읍') || p.endsWith('면') || p.endsWith('리'))
    ) {
      eupmyeondong = p;
      break;
    }
  }
  return { sido, sigungu, eupmyeondong };
}

// ── BikeStation 인터페이스 ────────────────────────────────────────────────────
export interface BikeStation {
  id: string;
  slug: string;
  name: string;
  roadAddress: string;
  lotAddress: string;
  lat: number;
  lng: number;
  operatingHours: string;
  feeType: string;
  feeDetails: string;
  bikeCount: string;
  rackCount: string;
  airPump: string;
  repairBench: string;
  phoneNumber: string;
  institutionName: string;
  dataReferenceDate: string;
  // 파싱된 지역 정보
  sido: string;
  sigungu: string;
  eupmyeondong: string;
  // SEO 필드
  seoTitle: string;
  seoDescription: string;
}

// ── 캐싱 & 파싱 ───────────────────────────────────────────────────────────────
let cachedStations: BikeStation[] | null = null;

export function getBikeStations(): BikeStation[] {
  if (cachedStations !== null) return cachedStations;

  const csvPath = path.join(process.cwd(), '전국자전거대여소표준데이터.csv');
  const rawBuffer = fs.readFileSync(csvPath);
  // EUC-KR(CP949) → UTF-8 디코딩
  const fileContent = iconv.decode(rawBuffer, 'cp949');

  const rows = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  console.log('총 대여소 수:', rows.length);

  cachedStations = rows.map((row, index): BikeStation => {
    const id = String(index + 1);
    const name        = row['자전거대여소명']     ?? '';
    const roadAddress = row['소재지도로명주소']   ?? '';
    const lotAddress  = row['소재지지번주소']     ?? '';

    const { sido, sigungu, eupmyeondong } = parseAddress(roadAddress || lotAddress);

    const cityPart = sidoSlug(sido);
    const distPart = sigungu ? sigunguSlug(sigungu) : 'kr';
    const slug = `${cityPart}-${distPart}-${id}`;

    const sidoShort = sido.replace(/(특별시|광역시|특별자치시|특별자치도|도)$/, '');
    const dongPart  = eupmyeondong ? ` ${eupmyeondong}` : '';

    const seoTitle =
      `${sidoShort} ${sigungu}${dongPart} 공공자전거 대여소 - ${name} 위치·요금 안내`;
    const seoDescription =
      `${sido} ${sigungu}${dongPart}에 위치한 ${name} 공공자전거 대여소의 운영시간, ` +
      `요금, 거치대 현황, 카카오맵 길찾기 정보를 확인하세요.`;

    return {
      id,
      slug,
      name,
      roadAddress,
      lotAddress,
      lat: parseFloat(row['위도']),
      lng: parseFloat(row['경도']),
      operatingHours: `${row['운영시작시각'] ?? ''} ~ ${row['운영종료시각'] ?? ''} (${row['휴무일'] ?? ''})`,
      feeType:        row['자전거대여구분']     ?? '',
      feeDetails:     row['자전거이용료']       ?? '',
      bikeCount:      row['자전거보유대수']     ?? '',
      rackCount:      row['거치대수']           ?? '',
      airPump:        row['공기주입기비치여부'] ?? '',
      repairBench:    row['수리대비치여부']     ?? '',
      phoneNumber:    row['관리기관전화번호']   ?? '',
      institutionName: row['관리기관명']        ?? '',
      dataReferenceDate: row['데이터기준일자']  ?? '',
      sido,
      sigungu,
      eupmyeondong,
      seoTitle,
      seoDescription,
    };
  });

  return cachedStations;
}

export function getStationBySlug(slug: string): BikeStation | undefined {
  return getBikeStations().find((s) => s.slug === slug);
}

/** 하위 호환성 유지 */
export function getStationById(id: string): BikeStation | undefined {
  return getBikeStations().find((s) => s.id === id);
}
