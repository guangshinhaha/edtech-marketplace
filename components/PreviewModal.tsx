'use client';

import { useEffect, useCallback } from 'react';
import { X, ExternalLink, Play, FileText, Presentation, File } from 'lucide-react';
import { Resource } from '@/lib/types';
import { getEmbedUrl, formatDate } from '@/lib/utils';
import LevelBadge from './LevelBadge';

interface PreviewModalProps {
  resource: Resource | null;
  onClose: () => void;
}

function ResourceTypeIcon({ type }: { type: Resource['resource_type'] }) {
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
    default:
      return <File {...iconProps} className="w-5 h-5 text-slate-400" />;
  }
}

export default function PreviewModal({ resource, onClose }: PreviewModalProps) {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (resource) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [resource, handleEscape]);

  if (!resource) return null;

  const embedUrl = getEmbedUrl(resource.drive_url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-slate-200">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <ResourceTypeIcon type={resource.resource_type} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#D4740C] mb-0.5">
                {resource.topic_title}
              </p>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {resource.resource_title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Preview iframe */}
          <div className="flex-1 bg-slate-100 min-h-[300px] lg:min-h-0">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full min-h-[400px] lg:min-h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={resource.resource_title}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <p>Preview not available</p>
              </div>
            )}
          </div>

          {/* Metadata sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 p-6 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto">
            <div className="space-y-4">
              {/* Level */}
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Level
                </h4>
                <LevelBadge level={resource.level} size="md" />
              </div>

              {/* Subject */}
              {resource.subject && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Subject
                  </h4>
                  <p className="text-sm text-slate-900">{resource.subject}</p>
                </div>
              )}

              {/* School */}
              {resource.school_name && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    School
                  </h4>
                  <p className="text-sm text-slate-900">{resource.school_name}</p>
                </div>
              )}

              {/* Cluster */}
              {resource.cluster && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Cluster
                  </h4>
                  <p className="text-sm text-slate-900">{resource.cluster}</p>
                </div>
              )}

              {/* Themes */}
              {resource.theme && resource.theme.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Themes
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {resource.theme.map((theme) => (
                      <span
                        key={theme}
                        className="px-2 py-0.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Source
                </h4>
                <p className="text-sm text-slate-900">{resource.source}</p>
              </div>

              {/* Date */}
              {resource.date && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Date
                  </h4>
                  <p className="text-sm text-slate-900">{formatDate(resource.date)}</p>
                </div>
              )}

              {/* Synopsis */}
              {resource.synopsis && (
                <div>
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Synopsis
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {resource.synopsis}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <a
            href={resource.drive_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#D4740C] hover:bg-[#B5620A] rounded-full transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Drive
          </a>
        </div>
      </div>
    </div>
  );
}
