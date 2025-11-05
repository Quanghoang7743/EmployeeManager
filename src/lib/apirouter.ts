const envBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

const fallbackBaseUrl =
  typeof window !== 'undefined' && window.location.hostname.includes('192.168.')
    ? 'http://192.168.1.36:3000'
    : 'http://localhost:3000';

export const API_ROUTER = envBaseUrl || fallbackBaseUrl;
