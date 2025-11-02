import {Helmet} from "react-helmet-async";

/** any 없이 JSON-LD 안전 전달 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | { [k: string]: JsonValue | undefined }
  | JsonValue[];

/** 메타/링크 타입 */
export type MetaTag =
  | { name: string; content: string; property?: never }
  | { property: string; content: string; name?: never };

export type LinkTag =
  | { rel: "canonical"; href: string }
  | { rel: "alternate"; href: string; hrefLang?: string }
  | { rel: string; href: string }; // 필요시 확장용

export type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;               // 기본: index,follow…
  locale?: string;               // 기본: ko_KR

  /** OG 기본 */
  ogType?: "article" | "website";
  ogTitle?: string;              // 기본: title
  ogDescription?: string;        // 기본: description
  ogUrl?: string;                // 기본: canonical
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogSiteName?: string;           // 서비스명
  ogLocale?: string;             // 기본: locale
  ogLocaleAlternate?: string[];  // ["en_US","ja_JP"] 등

  /** Twitter 카드 */
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;         // 기본: title
  twitterDescription?: string;   // 기본: description
  twitterImage?: string;         // 기본: ogImage
  twitterSite?: string;          // @site
  twitterCreator?: string;       // @creator

  /** 구조화데이터/기타 */
  jsonLd?: JsonValue | JsonValue[];
  extraMeta?: MetaTag[];         // 자유 확장 메타
  extraLinks?: LinkTag[];        // hreflang 등
};

export default function SEO(props: SEOProps) {
  const {
    title,
    description,
    canonical,
    robots = "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    locale = "ko_KR",

    ogType = "article",
    ogTitle,
    ogDescription,
    ogUrl,
    ogImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogSiteName,
    ogLocale,
    ogLocaleAlternate,

    twitterCard = "summary_large_image",
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterSite,
    twitterCreator,

    jsonLd,
    extraMeta = [],
    extraLinks = [],
  } = props;

  const jsonLdList = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  const _title = title;
  const _desc = typeof description === "string" ? description.trim() : undefined;
  const _ogTitle = ogTitle ?? _title;
  const _ogDesc = ogDescription ?? _desc;
  const _ogUrl = ogUrl ?? canonical;
  const _ogLocale = ogLocale ?? locale;
  const _twTitle = twitterTitle ?? _title;
  const _twDesc = twitterDescription ?? _desc;
  const _twImg = twitterImage ?? ogImage;

  return (
    <Helmet>
      {/* === 기본 SEO === */}
      {_title && <title>{_title}</title>}
      {_desc && <meta name="description" content={_desc}/>}
      <meta name="robots" content={robots}/>
      {/* canonical 기본 링크 */}
      {canonical && <link rel="canonical" href={canonical}/>}
      <meta name="viewport" content="width=device-width, initial-scale=1"/>

      {/* === Open Graph (공유 미리보기) === */}
      <meta property="og:type" content={ogType}/>
      {_ogTitle && <meta property="og:title" content={_ogTitle}/>}
      {_ogDesc && <meta property="og:description" content={_ogDesc}/>}
      {_ogUrl && <meta property="og:url" content={_ogUrl}/>}
      <meta property="og:locale" content={_ogLocale}/>
      {ogSiteName && <meta property="og:site_name" content={ogSiteName}/>}
      {ogImage && <meta property="og:image" content={ogImage}/>}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt}/>}
      {typeof ogImageWidth === "number" && (
        <meta property="og:image:width" content={String(ogImageWidth)}/>
      )}
      {typeof ogImageHeight === "number" && (
        <meta property="og:image:height" content={String(ogImageHeight)}/>
      )}
      {ogLocaleAlternate?.map((l, i) => (
        <meta key={`og:locale:alt:${i}`} property="og:locale:alternate" content={l}/>
      ))}

      {/* === Twitter Card === */}
      <meta name="twitter:card" content={twitterCard}/>
      {_twTitle && <meta name="twitter:title" content={_twTitle}/>}
      {_twDesc && <meta name="twitter:description" content={_twDesc}/>}
      {_twImg && <meta name="twitter:image" content={_twImg}/>}
      {twitterSite && <meta name="twitter:site" content={twitterSite}/>}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator}/>}

      {/* === 자유 확장 메타 === */}
      {extraMeta.map((m, i) =>
        "property" in m ? (
          <meta key={`m:${i}`} property={m.property} content={m.content}/>
        ) : (
          <meta key={`m:${i}`} name={m.name} content={m.content}/>
        )
      )}

      {/* === 자유 링크(hreflang 등) === */}
      {extraLinks.map((l, i) => (
        <link key={`l:${i}`} rel={l.rel} href={l.href} {...("hrefLang" in l ? {hrefLang: l.hrefLang} : {})} />
      ))}

      {/* === JSON-LD === */}
      {jsonLdList.map((obj, i) => (
        <script
          key={`ld:${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(obj)}}
        />
      ))}

      {/*
        ====== 🔧 주석 해제만 하면 바로 쓸 수 있는 프리셋 예시 ======

        // 1) 검증 메타 (네이버/구글/빙)
        // <meta name="naver-site-verification" content="토큰" />
        // <meta name="google-site-verification" content="토큰" />
        // <meta name="msvalidate.01" content="토큰" />

        // 2) PWA/모바일 톤업
        // <meta name="theme-color" content="#111827" />
        // <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        // <link rel="manifest" href="/manifest.webmanifest" />

        // 3) 다국어 hreflang (아래처럼 extraLinks로 넣는 걸 권장)
        // <link rel="alternate" href="https://example.com/ko" hrefLang="ko" />
        // <link rel="alternate" href="https://example.com/en" hrefLang="en" />
      */}
    </Helmet>
  );
}
