const envBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim();

const fallbackBaseUrl =
  typeof window !== 'undefined' && window.location.hostname.includes('192.168.')
    ? 'https://employeemanager-nxe9.onrender.com'
    : 'http://localhost:3000';

export const API_ROUTER = envBaseUrl || fallbackBaseUrl;
