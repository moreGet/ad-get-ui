// src/shared/seo/mappers/lung-medicine-mappers.ts
import type {BuiltSEO} from "@shared/seo/builders";
import {buildCanonical, makePlaceJsonLd} from "@shared/seo/builders";
import type {LungMedicineDetail} from "@entities/listing/model/types";
import {formatUtcToKst} from "@shared/utils/date";

/** 라우트별 옵션 (도메인/이미지/추가 링크 등) */
export type LungSeoOptions = {
  siteUrl?: string;               // 정규 URL 구성용
  ogImage?: string;               // 공유 썸네일
  siteName?: string;              // og:site_name
  robots?: string;                // 기본값: index,follow
  includeJsonLd?: boolean;        // JSON-LD 포함 여부 (기본 true)
  hreflangs?: Array<{ href: string; lang: string }>; // 필요 시 hreflang
};

export function buildLungMedicineSeoProps(
  data: LungMedicineDetail,
  opts: LungSeoOptions = {}
): BuiltSEO {
  const {
    siteUrl,
    ogImage,
    siteName = "AD-GET",
    robots = "index,follow",
    includeJsonLd = true,
    hreflangs = [],
  } = opts;

  const canonical = buildCanonical(siteUrl, `/lung-medicine/${data.id}`);

  const addr = [data.provinceName, data.cityDistrictName, data.roadAddress]
    .filter(Boolean)
    .join(" ");

  const title = `${data.installationPlaceName ?? "폐의약품 수거함"} 위치 · 운영정보`;
  const description = [data.installationPlaceName, addr]
    .filter(Boolean)
    .join(" · ");

  const base: BuiltSEO = {
    title,
    description,
    canonical,
    robots,
    // Open Graph
    ogType: "article",
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage: ogImage,
    ogSiteName: siteName,
    ogLocale: "ko_KR",
    // Twitter
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    // hreflang (선택)
    extraLinks: hreflangs.map(({href, lang}) => ({
      rel: "alternate",
      href,
      hrefLang: lang,
    })),
  };

  if (!includeJsonLd) {
    return base;
  }

  // JSON-LD(Place)
  return {
    ...base,
    jsonLd: makePlaceJsonLd({
      name: data.installationPlaceName ?? "폐의약품 수거함",
      description: "지도/거리뷰, 연락처, 운영/관리 정보",
      url: canonical,
      image: ogImage,
      telephone: data.managementAgencyPhoneNumber ?? undefined,
      dateModified: data.updatedAt,                                         // ISO(UTC)
      lastReviewed: formatUtcToKst(data.updatedAt, {withSeconds: false}), // 사람이 읽는 값
      address: {
        addressCountry: "KR",
        addressRegion: data.provinceName ?? "",
        addressLocality: data.cityDistrictName ?? "",
        streetAddress: data.roadAddress ?? "",
      },
      geo: {latitude: data.latitude, longitude: data.longitude},
    }),
  };
}
