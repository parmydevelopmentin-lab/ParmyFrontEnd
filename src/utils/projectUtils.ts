const DEFAULT_API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
  ? window.location.origin
  : 'http://localhost:8080';
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

/**
 * Extracts YouTube Video ID from any YouTube URL or path representation.
 * Handles:
 * - 11-char IDs: "r41YuEF6FwQ"
 * - watch?v=: "https://www.youtube.com/watch?v=r41YuEF6FwQ"
 * - share links: "https://youtu.be/r41YuEF6FwQ"
 * - embed: "https://www.youtube.com/embed/r41YuEF6FwQ"
 * - legacy paths: "/project_thumbnails/r41YuEF6FwQ.jpg"
 */
export const getYoutubeId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  
  // If it's directly an 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  
  // Parse standard YouTube video formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  // Parse /vi/ patterns (like img.youtube.com/vi/ID/hqdefault.jpg)
  const viMatch = trimmed.match(/\/vi\/([a-zA-Z0-9_-]{11})/i);
  if (viMatch) {
    return viMatch[1];
  }
  
  // Parse legacy project_thumbnails paths containing 11-character YouTube IDs
  const pathMatch = trimmed.match(/\/project_thumbnails\/([a-zA-Z0-9_-]{11})\.(?:jpg|jpeg|png)/i);
  if (pathMatch) {
    return pathMatch[1];
  }
  return null;
};

/**
 * Resolves a thumbnail source to a valid image URL.
 * Automatically converts YouTube video IDs or links to their respective
 * online hqdefault.jpg thumbnail URLs.
 */
export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return '/DigiDefense.png';
  
  const ytId = getYoutubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a relative path, resolve it against the backend API base URL
  return `${API_BASE_URL}${url}`;
};
