import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';

// ── 대여소명 앞 관리번호 제거 (예: "4427. 동일하이빌" → "동일하이빌") ────────
function cleanStationName(raw: string): string {
  return raw.replace(/^\d+[.\s\-]+/, '').trim();
}

// ── 한글 로마자 변환 (국립국어원 표준) ──────────────────────────────────────
const INITIALS = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
const VOWELS   = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
const FINALS   = ['','k','k','k','n','n','n','t','l','k','m','l','l','l','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'];

function romanize(text: string): string {
  let result = '';
  for (const char of text) {
    const code = char.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const idx = code - 0xac00;
      result += INITIALS[Math.floor(idx / (21 * 28))]
              + VOWELS[Math.floor((idx % (21 * 28)) / 28)]
              + FINALS[idx % 28];
    } else if (/[a-z0-9]/i.test(char)) {
      result += char.toLowerCase();
    }
  }
  return result || 'kr';
}

// ── 시/도 → 영문 슬러그 ─────────────────────────────────────────────────────
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

// ── 3글자 잘림 시/도 정규화 ──────────────────────────────────────────────────
const SIDO_NORMALIZE: Record<string, string> = {
  '경상남': '경상남도', '경상북': '경상북도',
  '충청북': '충청북도', '충청남': '충청남도',
  '전라북': '전라북도', '전라남': '전라남도',
  '강원특별자치': '강원특별자치도',
  '전북특별자치': '전북특별자치도',
};

function normalizeSido(sido: string): string {
  return SIDO_NORMALIZE[sido] ?? sido;
}

export function sidoSlug(sido: string): string {
  return SIDO_MAP[sido] ??
    romanize(sido.replace(/(특별시|광역시|특별자치시|특별자치도|시|도)$/, ''));
}

export function sigunguSlug(sigungu: string): string {
  return romanize(sigungu.replace(/(특별자치시|특별시|광역시|시|군|구)$/, ''));
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
  const sido = normalizeSido(parts[0] ?? '');
  let sigungu = '';
  let eupmyeondong = '';
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    if (!sigungu && (p.endsWith('시') || p.endsWith('군') || p.endsWith('구'))) {
      sigungu = p;
    } else if (!eupmyeondong && (p.endsWith('동') || p.endsWith('읍') || p.endsWith('면') || p.endsWith('리'))) {
      eupmyeondong = p;
      break;
    }
  }
  return { sido, sigungu, eupmyeondong };
}

// ── Y/N 정규화 (Y·y·있음·1 → true) ─────────────────────────────────────────
function isTruthy(val: string | undefined): boolean {
  const v = (val ?? '').trim().toLowerCase();
  return v === 'y' || v === '있음' || v === '1' || v === 'yes' || v === 'true';
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
  /** 요금구분 (유료/무료) */
  feeType: string;
  /** 자전거이용요금 (상세 요금) */
  feeDetails: string;
  /** 휴무일 */
  holiday: string;
  bikeCount: string;
  rackCount: string;
  /** Y/N 정규화된 boolean */
  airPump: boolean;
  /** Y/N 정규화된 boolean */
  repairBench: boolean;
  phoneNumber: string;
  institutionName: string;
  dataReferenceDate: string;
  sido: string;
  sigungu: string;
  eupmyeondong: string;
  seoTitle: string;
  seoDescription: string;
}

// ── 캐싱 & 파싱 ───────────────────────────────────────────────────────────────
let cachedStations: BikeStation[] | null = null;

export function getBikeStations(): BikeStation[] {
  if (cachedStations !== null) return cachedStations;

  const csvPath = path.join(process.cwd(), '전국자전거대여소표준데이터.csv');
  const rawBuffer = fs.readFileSync(csvPath);
  const fileContent = iconv.decode(rawBuffer, 'cp949');

  const rows = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  console.log('총 대여소 수:', rows.length);

  cachedStations = rows.map((row, index): BikeStation => {
    const id          = String(index + 1);
    const name        = cleanStationName(row['자전거대여소명'] ?? '');
    const roadAddress = row['소재지도로명주소'] ?? '';
    const lotAddress  = row['소재지지번주소']   ?? '';

    const { sido, sigungu, eupmyeondong } = parseAddress(roadAddress || lotAddress);

    const slug = `${sidoSlug(sido)}-${sigungu ? sigunguSlug(sigungu) : 'kr'}-${id}`;

    const sidoShort = sido.replace(/(특별시|광역시|특별자치시|특별자치도|도)$/, '');
    const dongPart  = eupmyeondong ? ` ${eupmyeondong}` : '';
    const seoTitle  = `${sidoShort} ${sigungu}${dongPart} 공공자전거 대여소 - ${name} 위치·요금 안내`;
    const seoDescription =
      `${sido} ${sigungu}${dongPart}에 위치한 ${name} 공공자전거 대여소의 운영시간, ` +
      `요금, 거치대 현황, 카카오맵 길찾기 정보를 확인하세요.`;

    // 요금
    const rawFee = (row['자전거이용요금'] ?? '').trim();
    const feeDetails = rawFee || '현장 확인 필요';

    // 휴무일
    const rawHoliday = (row['휴무일'] ?? '').trim();
    const holiday = rawHoliday || '연중무휴';

    return {
      id,
      slug,
      name,
      roadAddress,
      lotAddress,
      lat: parseFloat(row['위도']),
      lng: parseFloat(row['경도']),
      operatingHours: `${row['운영시작시각'] ?? ''} ~ ${row['운영종료시각'] ?? ''}`,
      feeType:    (row['요금구분']       ?? '').trim(),
      feeDetails,
      holiday,
      bikeCount:  (row['자전거보유대수'] ?? '').trim(),
      rackCount:  (row['거치대수']       ?? '').trim(),
      airPump:    isTruthy(row['공기주입기비치여부']),
      repairBench: isTruthy(row['수리대설치여부']),
      phoneNumber:    (row['관리기관전화번호'] ?? '').trim(),
      institutionName: (row['관리기관명']     ?? '').trim(),
      dataReferenceDate: (row['데이터기준일자'] ?? '').trim(),
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

export function getStationById(id: string): BikeStation | undefined {
  return getBikeStations().find((s) => s.id === id);
}
