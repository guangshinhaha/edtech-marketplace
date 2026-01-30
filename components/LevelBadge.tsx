'use client';

import { ResourceLevel } from '@/lib/types';

interface LevelBadgeProps {
  level: ResourceLevel;
  size?: 'sm' | 'md';
}

function getLevelStyles(level: ResourceLevel) {
  switch (level) {
    case 'PRIMARY':
      return {
        bg: 'bg-[#D1FAE5]',
        text: 'text-[#059669]',
        border: 'border-[#10B981]/20',
        dot: 'bg-[#10B981]'
      };
    case 'SECONDARY':
      return {
        bg: 'bg-[#E0F2FE]',
        text: 'text-[#0284C7]',
        border: 'border-[#0EA5E9]/20',
        dot: 'bg-[#0EA5E9]'
      };
    case 'JC/CI':
      return {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#D97706]',
        border: 'border-[#F59E0B]/20',
        dot: 'bg-[#F59E0B]'
      };
    case 'MIXED':
      return {
        bg: 'bg-[#EDE9FE]',
        text: 'text-[#7C3AED]',
        border: 'border-[#8B5CF6]/20',
        dot: 'bg-[#8B5CF6]'
      };
    default:
      return {
        bg: 'bg-[#F0F3F7]',
        text: 'text-[#1A2B4A]/70',
        border: 'border-[#1A2B4A]/10',
        dot: 'bg-[#1A2B4A]/40'
      };
  }
}

export default function LevelBadge({ level, size = 'sm' }: LevelBadgeProps) {
  const styles = getLevelStyles(level);
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-[10px] gap-1.5'
    : 'px-3 py-1.5 text-xs gap-2';

  return (
    <span
      className={`
        inline-flex items-center
        font-bold uppercase tracking-wide
        rounded-full border
        font-[family-name:var(--font-display)]
        ${styles.bg} ${styles.text} ${styles.border}
        ${sizeClasses}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {level}
    </span>
  );
}
