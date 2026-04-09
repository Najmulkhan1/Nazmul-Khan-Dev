import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getYoutubeEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    return null;
  }
  return null;
};

export const getDriveEmbedUrl = (url) => {
  if (url.includes('drive.google.com/file/d/')) {
    const id = url.match(/d\/(.*?)\//)?.[1];
    if (id) return `https://drive.google.com/file/d/${id}/preview`;
  }
  return null;
};
