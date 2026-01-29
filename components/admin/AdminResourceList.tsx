'use client';

import { Resource } from '@/lib/types';
import { Play, FileText, Presentation, ExternalLink, File, Pencil, Trash2 } from 'lucide-react';
import LevelBadge from '@/components/LevelBadge';

interface AdminResourceListProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

function ResourceIcon({ type }: { type: Resource['resource_type'] }) {
  const iconProps = { className: 'w-5 h-5' };

  switch (type) {
    case 'video':
      return <Play {...iconProps} className="w-5 h-5 text-red-500" />;
    case 'pdf':
      return <FileText {...iconProps} className="w-5 h-5 text-red-600" />;
    case 'ppt':
      return <Presentation {...iconProps} className="w-5 h-5 text-orange-500" />;
    case 'doc':
      return <FileText {...iconProps} className="w-5 h-5 text-blue-500" />;
    case 'link':
      return <ExternalLink {...iconProps} className="w-5 h-5 text-slate-500" />;
    default:
      return <File {...iconProps} className="w-5 h-5 text-slate-400" />;
  }
}

export default function AdminResourceList({ resources, onEdit, onDelete }: AdminResourceListProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No resources yet</h3>
        <p className="text-slate-600">Add your first resource to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <ResourceIcon type={resource.resource_type} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#D4740C] mb-0.5">
                    {resource.topic_title}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                    {resource.resource_title}
                  </h3>
                </div>
                <LevelBadge level={resource.level} />
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                {resource.school_name && <span>{resource.school_name}</span>}
                {resource.subject && (
                  <>
                    {resource.school_name && <span className="text-slate-300">•</span>}
                    <span>{resource.subject}</span>
                  </>
                )}
                <span className="text-slate-300">•</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-full">{resource.source}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(resource)}
                className="p-2 text-slate-400 hover:text-[#D4740C] hover:bg-slate-100 rounded-lg transition-colors"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(resource)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
