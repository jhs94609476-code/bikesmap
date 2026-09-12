// ── 슬러그 → 시/도 정식 명칭 ────────────────────────────────────────────────
export const SLUG_TO_SIDO: Record<string, string> = {
  seoul:     '서울특별시',
  busan:     '부산광역시',
  incheon:   '인천광역시',
  daegu:     '대구광역시',
  daejeon:   '대전광역시',
  gwangju:   '광주광역시',
  ulsan:     '울산광역시',
  sejong:    '세종특별자치시',
  gyeonggi:  '경기도',
  gangwon:   '강원특별자치도',
  chungbuk:  '충청북도',
  chungnam:  '충청남도',
  jeonbuk:   '전북특별자치도',
  jeonnam:   '전라남도',
  gyeongbuk: '경상북도',
  gyeongnam: '경상남도',
  jeju:      '제주특별자치도',
};

// ── 슬러그 → 짧은 표시 레이블 (뱃지·h1 등) ─────────────────────────────────
export const SLUG_TO_LABEL: Record<string, string> = {
  seoul:     '서울',
  busan:     '부산',
  incheon:   '인천',
  daegu:     '대구',
  daejeon:   '대전',
  gwangju:   '광주',
  ulsan:     '울산',
  sejong:    '세종',
  gyeonggi:  '경기',
  gangwon:   '강원',
  chungbuk:  '충북',
  chungnam:  '충남',
  jeonbuk:   '전북',
  jeonnam:   '전남',
  gyeongbuk: '경북',
  gyeongnam: '경남',
  jeju:      '제주',
};

/** slug → 짧은 표시명 (예: 'gyeongbuk' → '경북') */
export function getRegionLabel(slug: string): string {
  return SLUG_TO_LABEL[slug] ?? slug;
}

/** slug → 정식 시/도명 (예: 'gyeongbuk' → '경상북도') */
export function getRegionFullName(slug: string): string {
  return SLUG_TO_SIDO[slug] ?? slug;
}

/** 알려진 모든 시/도 슬러그 목록 */
export const ALL_REGION_SLUGS = Object.keys(SLUG_TO_SIDO);

// ── StationList용 REGIONS 배열 ─────────────────────────────────────────────
// label: 표시명, value: sido 매칭용 한글 값, slug: URL 경로용 영문 슬러그
export const REGION_NAV = [
  { label: '전체',   value: '',        slug: ''         },
  { label: '서울',   value: '서울',    slug: 'seoul'    },
  { label: '경기',   value: '경기',    slug: 'gyeonggi' },
  { label: '인천',   value: '인천',    slug: 'incheon'  },
  { label: '강원',   value: '강원',    slug: 'gangwon'  },
  { label: '충북',   value: '충청북도', slug: 'chungbuk' },
  { label: '충남',   value: '충청남도', slug: 'chungnam' },
  { label: '대전',   value: '대전',    slug: 'daejeon'  },
  { label: '세종',   value: '세종',    slug: 'sejong'   },
  { label: '전북',   value: '전라북도', slug: 'jeonbuk'  },
  { label: '전남',   value: '전라남도', slug: 'jeonnam'  },
  { label: '광주',   value: '광주',    slug: 'gwangju'  },
  { label: '경북',   value: '경상북도', slug: 'gyeongbuk'},
  { label: '경남',   value: '경상남도', slug: 'gyeongnam'},
  { label: '대구',   value: '대구',    slug: 'daegu'    },
  { label: '울산',   value: '울산',    slug: 'ulsan'    },
  { label: '부산',   value: '부산',    slug: 'busan'    },
  { label: '제주',   value: '제주',    slug: 'jeju'     },
] as const;
