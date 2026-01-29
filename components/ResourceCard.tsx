'use client';

import { Resource } from '@/lib/types';
import { truncateText } from '@/lib/utils';
import { Play, FileText, Presentation, ExternalLink, File } from 'lucide-react';
import LevelBadge from './LevelBadge';

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
}

function ResourceIcon({ type }: { type: Resource['resource_type'] }) {
  const iconProps = { className: 'w-6 h-6' };

  switch (type) {
    case 'video':
      return <Play {...iconProps} className="w-6 h-6 text-red-500" />;
    case 'pdf':
      return <FileText {...iconProps} className="w-6 h-6 text-red-600" />;
    case 'ppt':
      return <Presentation {...iconProps} className="w-6 h-6 text-orange-500" />;
    case 'doc':
      return <FileText {...iconProps} className="w-6 h-6 text-blue-500" />;
    case 'link':
      return <ExternalLink {...iconProps} className="w-6 h-6 text-slate-500" />;
    default:
      return <File {...iconProps} className="w-6 h-6 text-slate-400" />;
  }
}

export default function ResourceCard({ resource, onClick }: ResourceCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
          <ResourceIcon type={resource.resource_type} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {/* Topic title */}
              <p className="text-xs font-medium text-[#D4740C] mb-0.5">
                {resource.topic_title}
              </p>

              {/* Resource title */}
              <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-[#D4740C] transition-colors">
                {resource.resource_title}
              </h3>
            </div>

            {/* Level badge */}
            <LevelBadge level={resource.level} />
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-slate-500">
            {resource.school_name && (
              <span>{resource.school_name}</span>
            )}
            {resource.subject && (
              <>
                {resource.school_name && <span className="text-slate-300">•</span>}
                <span>{resource.subject}</span>
              </>
            )}
            {resource.source && (
              <>
                {(resource.school_name || resource.subject) && <span className="text-slate-300">•</span>}
                <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full">
                  {resource.source}
                </span>
              </>
            )}
          </div>

          {/* Synopsis preview on hover (visible on larger screens) */}
          {resource.synopsis && (
            <p className="mt-2 text-sm text-slate-600 hidden sm:line-clamp-2">
              {truncateText(resource.synopsis, 150)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
