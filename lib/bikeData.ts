import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import iconv from 'iconv-lite';

export interface BikeStation {
  id: string;
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
}

let cachedStations: BikeStation[] | null = null;

export function getBikeStations(): BikeStation[] {
  if (cachedStations !== null) {
    return cachedStations;
  }

  const csvPath = path.join(process.cwd(), '전국자전거대여소표준데이터.csv');

  // EUC-KR(CP949) 인코딩 대응: Buffer를 그대로 읽은 뒤 iconv-lite로 UTF-8 변환
  const rawBuffer = fs.readFileSync(csvPath);
  const fileContent = iconv.decode(rawBuffer, 'cp949');

  const rows = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  }) as Record<string, string>[];

  console.log('총 대여소 수:', rows.length);

  cachedStations = rows.map((row, index): BikeStation => ({
    id: String(index + 1),
    name: row['자전거대여소명'] ?? '',
    roadAddress: row['소재지도로명주소'] ?? '',
    lotAddress: row['소재지지번주소'] ?? '',
    lat: parseFloat(row['위도']),
    lng: parseFloat(row['경도']),
    operatingHours: `${row['운영시작시각'] ?? ''} ~ ${row['운영종료시각'] ?? ''} (${row['휴무일'] ?? ''})`,
    feeType: row['자전거대여구분'] ?? '',
    feeDetails: row['자전거이용료'] ?? '',
    bikeCount: row['자전거보유대수'] ?? '',
    rackCount: row['거치대수'] ?? '',
    airPump: row['공기주입기비치여부'] ?? '',
    repairBench: row['수리대비치여부'] ?? '',
    phoneNumber: row['관리기관전화번호'] ?? '',
    institutionName: row['관리기관명'] ?? '',
    dataReferenceDate: row['데이터기준일자'] ?? '',
  }));

  return cachedStations;
}

export function getStationById(id: string): BikeStation | undefined {
  return getBikeStations().find((station) => station.id === id);
}
