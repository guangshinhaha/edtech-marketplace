'use client';

import { Resource } from '@/lib/types';
import { truncateText } from '@/lib/utils';
import { Play, FileText, Presentation, ExternalLink, File, ArrowUpRight } from 'lucide-react';
import LevelBadge from './LevelBadge';

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
  index?: number;
}

function ResourceIcon({ type }: { type: Resource['resource_type'] }) {
  const baseClasses = 'w-6 h-6';

  switch (type) {
    case 'video':
      return <Play className={`${baseClasses} text-rose-500`} />;
    case 'pdf':
      return <FileText className={`${baseClasses} text-rose-600`} />;
    case 'ppt':
      return <Presentation className={`${baseClasses} text-amber-500`} />;
    case 'doc':
      return <FileText className={`${baseClasses} text-sky-500`} />;
    case 'link':
      return <ExternalLink className={`${baseClasses} text-indigo-500`} />;
    default:
      return <File className={`${baseClasses} text-slate-400`} />;
  }
}

function getIconBgClass(type: Resource['resource_type']) {
  switch (type) {
    case 'video':
      return 'icon-bg-video';
    case 'pdf':
      return 'icon-bg-pdf';
    case 'ppt':
      return 'icon-bg-ppt';
    case 'doc':
      return 'icon-bg-doc';
    case 'link':
      return 'icon-bg-link';
    default:
      return 'bg-slate-100';
  }
}

export default function ResourceCard({ resource, onClick, index = 0 }: ResourceCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full text-left
        bg-white rounded-2xl
        border-2 border-[#F0F3F7] hover:border-[#E85D4C]/20
        p-5 sm:p-6
        shadow-[0_2px_8px_rgba(26,43,74,0.04)]
        hover:shadow-[0_12px_32px_rgba(232,93,76,0.12)]
        transition-all duration-500 ease-out
        transform hover:-translate-y-1
        relative overflow-hidden
      "
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* Hover gradient overlay */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-[#FEF2F0]/50 via-transparent to-transparent
        transition-opacity duration-500
        pointer-events-none
      " />

      {/* Corner accent */}
      <div className="
        absolute top-0 right-0 w-24 h-24
        bg-gradient-to-bl from-[#E85D4C]/5 to-transparent
        rounded-bl-[80px]
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      " />

      <div className="relative flex gap-4 sm:gap-5">
        {/* Icon container */}
        <div className="flex-shrink-0">
          <div className={`
            w-14 h-14 sm:w-16 sm:h-16 rounded-xl
            ${getIconBgClass(resource.resource_type)}
            flex items-center justify-center
            transform group-hover:scale-110 group-hover:rotate-3
            transition-all duration-500 ease-out
            shadow-sm
          `}>
            <ResourceIcon type={resource.resource_type} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Topic title */}
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E85D4C]" />
                <p className="text-xs font-semibold text-[#E85D4C] font-[family-name:var(--font-display)] uppercase tracking-wide">
                  {resource.topic_title}
                </p>
              </div>

              {/* Resource title */}
              <h3 className="
                text-base sm:text-lg font-bold text-[#1A2B4A]
                leading-snug
                group-hover:text-[#E85D4C]
                transition-colors duration-300
                font-[family-name:var(--font-display)]
              ">
                {resource.resource_title}
              </h3>
            </div>

            {/* Level badge and arrow */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <LevelBadge level={resource.level} />
              <div className="
                w-8 h-8 rounded-lg
                bg-[#F0F3F7] group-hover:bg-[#E85D4C]
                flex items-center justify-center
                transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                transition-all duration-300
              ">
                <ArrowUpRight className="w-4 h-4 text-[#1A2B4A]/40 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {resource.school_name && (
              <span className="
                px-3 py-1 text-xs font-medium
                bg-[#F0F3F7] text-[#1A2B4A]/70
                rounded-full
                group-hover:bg-[#1A2B4A]/5
                transition-colors
              ">
                {resource.school_name}
              </span>
            )}
            {resource.subject && (
              <span className="
                px-3 py-1 text-xs font-medium
                bg-[#F0F3F7] text-[#1A2B4A]/70
                rounded-full
                group-hover:bg-[#1A2B4A]/5
                transition-colors
              ">
                {resource.subject}
              </span>
            )}
            {resource.source && (
              <span className="
                px-3 py-1 text-xs font-semibold
                bg-[#FEF2F0] text-[#E85D4C]
                rounded-full
                font-[family-name:var(--font-display)]
              ">
                {resource.source}
              </span>
            )}
          </div>

          {/* Synopsis preview */}
          {resource.synopsis && (
            <p className="
              mt-3 text-sm text-[#1A2B4A]/60 leading-relaxed
              hidden sm:line-clamp-2
              group-hover:text-[#1A2B4A]/80
              transition-colors duration-300
            ">
              {truncateText(resource.synopsis, 150)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
