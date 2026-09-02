import { getBikeStations } from '@/lib/bikeData';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://bikesmap.vercel.app';

/** XML 특수문자를 CDATA로 안전하게 감쌉니다. */
function cdata(str: string): string {
  // CDATA 종료 시퀀스 ]]> 가 포함된 경우에만 이스케이프
  const safe = str.replace(/]]>/g, ']]]]><![CDATA[>');
  return `<![CDATA[${safe}]]>`;
}

/** RFC 822 형식의 pubDate 문자열을 반환합니다. */
function rfcDate(dateStr?: string): string {
  if (dateStr) {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toUTCString();
  }
  return new Date().toUTCString();
}

export async function GET(): Promise<Response> {
  const stations = getBikeStations();

  // 최신/상위 100개 항목
  const items = stations.slice(0, 100);

  const itemsXml = items
    .map((station) => {
      const link = `${BASE_URL}/bike/${station.slug}`;
      const title = cdata(station.seoTitle);
      const description = cdata(station.seoDescription);
      const pubDate = rfcDate(station.dataReferenceDate);

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[전국 공공자전거 대여소 정보 - BikesMap]]></title>
    <link>${BASE_URL}</link>
    <description><![CDATA[전국 공공자전거 대여소의 위치, 운영시간, 요금 정보를 제공합니다.]]></description>
    <language>ko</language>
    <copyright><![CDATA[© ${new Date().getFullYear()} BikesMap. All rights reserved.]]></copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // 하루 캐시 (CDN/검색봇 재방문 최적화)
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
