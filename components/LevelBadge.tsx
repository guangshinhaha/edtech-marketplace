'use client';

import { ResourceLevel } from '@/lib/types';
import { getLevelColorClasses } from '@/lib/utils';

interface LevelBadgeProps {
  level: ResourceLevel;
  size?: 'sm' | 'md';
}

export default function LevelBadge({ level, size = 'sm' }: LevelBadgeProps) {
  const colorClasses = getLevelColorClasses(level);
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${colorClasses} ${sizeClasses}`}
    >
      {level}
    </span>
  );
}
