let loadingPromise: Promise<void> | null = null;

export function loadNaverSdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.naver?.maps) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID as string | undefined;
  if (!clientId) return Promise.reject(new Error("VITE_NAVER_MAP_CLIENT_ID is missing"));

  const script = document.createElement("script");
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}&submodules=panorama`;
  script.async = true;
  script.defer = true;

  loadingPromise = new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Naver Maps SDK"));
  });

  document.head.appendChild(script);
  return loadingPromise;
}
