// src/shared/api/client.ts
type AppEnv = 'local' | 'production';

const APP_ENV = (import.meta.env.VITE_API_BASE_URL as AppEnv) ?? 'local';

// local: 프록시 사용 → baseURL 빈 문자열
// production: /api(또는 배포 환경에서 지정한 값)
const API_BASE_URL =
  APP_ENV === 'local'
    ? ''
    : (import.meta.env.VITE_API_BASE_URL ?? '/api');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {'Content-Type': 'application/json', ...(init?.headers ?? {})},
    ...init,
  });

  if (!res.ok) {
    throw new Error();
  }

  return await res.json() as Promise<T>;
}

export const api = {get: request};
