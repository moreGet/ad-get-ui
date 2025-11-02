import type {JsonValue, LinkTag, MetaTag} from "@shared/ui/seo/seo";

export type BuiltSEO = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  locale?: string;
  ogType?: "article" | "website";
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogSiteName?: string;
  ogLocale?: string;
  ogLocaleAlternate?: string[];
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  jsonLd?: JsonValue | JsonValue[];
  extraMeta?: MetaTag[];
  extraLinks?: LinkTag[];
};

/** siteUrl + path → canonical */
export function buildCanonical(siteUrl: string | undefined, path: string): string | undefined {
  if (!siteUrl) return undefined;
  return `${siteUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** (옵션) 장소용 JSON-LD 생성기 */
export type PlaceJsonLdInput = {
  name: string;
  description?: string;
  url?: string;
  image?: string;
  telephone?: string;
  lastReviewed?: string;   // 페이지에서 포맷 후 전달
  dateModified?: string;   // ISO 등
  address?: {
    addressCountry?: string;
    addressRegion?: string;
    addressLocality?: string;
    streetAddress?: string;
  };
  geo?: { latitude: number; longitude: number };
  sameAs?: string[];
};

export function makePlaceJsonLd(input: PlaceJsonLdInput): JsonValue {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    telephone: input.telephone,
    lastReviewed: input.lastReviewed,
    dateModified: input.dateModified,
    address: input.address
      ? {
        "@type": "PostalAddress",
        addressCountry: input.address.addressCountry,
        addressRegion: input.address.addressRegion,
        addressLocality: input.address.addressLocality,
        streetAddress: input.address.streetAddress,
      }
      : undefined,
    geo: input.geo
      ? {
        "@type": "GeoCoordinates",
        latitude: input.geo.latitude,
        longitude: input.geo.longitude,
      }
      : undefined,
    sameAs: input.sameAs,
  };
}

/** 완전 공통: 필요한 값만 넣어 넘긴다 */
export function buildSeo(input: BuiltSEO): BuiltSEO {
  return {...input};
}
