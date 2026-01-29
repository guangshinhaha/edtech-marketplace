import { ResourceType, ResourceLevel } from './types';

/**
 * Extract Google Drive file ID from various URL formats and return embed URL
 */
export function getEmbedUrl(driveUrl: string): string | null {
  if (!driveUrl) return null;

  // Match various Google Drive URL patterns
  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,           // /d/{fileId}/
    /id=([a-zA-Z0-9_-]+)/,             // ?id={fileId}
    /\/file\/d\/([a-zA-Z0-9_-]+)/,     // /file/d/{fileId}
  ];

  for (const pattern of patterns) {
    const match = driveUrl.match(pattern);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  // If it's a direct link or YouTube, return as-is
  if (driveUrl.includes('youtube.com') || driveUrl.includes('youtu.be')) {
    const videoId = driveUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  return driveUrl;
}

/**
 * Get the appropriate icon name for a resource type
 */
export function getResourceIconName(type: ResourceType): string {
  const iconMap: Record<ResourceType, string> = {
    video: 'Play',
    pdf: 'FileText',
    ppt: 'Presentation',
    doc: 'FileText',
    link: 'ExternalLink',
  };
  return iconMap[type] || 'File';
}

/**
 * Get Tailwind classes for level badge colors
 */
export function getLevelColorClasses(level: ResourceLevel): string {
  const colorMap: Record<ResourceLevel, string> = {
    PRIMARY: 'bg-green-100 text-green-700',
    SECONDARY: 'bg-teal-100 text-teal-700',
    'JC/CI': 'bg-orange-100 text-orange-700',
    MIXED: 'bg-purple-100 text-purple-700',
  };
  return colorMap[level] || 'bg-gray-100 text-gray-700';
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Format date string for display
 */
export function formatDate(date: string | null): string {
  if (!date) return '';
  // If it's just a year, return as-is
  if (/^\d{4}$/.test(date)) return date;

  try {
    return new Date(date).toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return date;
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
