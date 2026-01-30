'use client';

import { useEffect, useCallback } from 'react';
import { X, ExternalLink, Play, FileText, Presentation, File, Calendar, Building2, MapPin, Layers, Tag } from 'lucide-react';
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
      return <Play {...iconProps} className="w-5 h-5 text-rose-500" />;
    case 'pdf':
      return <FileText {...iconProps} className="w-5 h-5 text-rose-600" />;
    case 'ppt':
      return <Presentation {...iconProps} className="w-5 h-5 text-amber-500" />;
    case 'doc':
      return <FileText {...iconProps} className="w-5 h-5 text-sky-500" />;
    default:
      return <File {...iconProps} className="w-5 h-5 text-slate-400" />;
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

export default function PreviewModal({ resource, onClose }: PreviewModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="modal-content relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-[#F0F3F7]">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FEF2F0] to-transparent rounded-bl-full opacity-50" />

          <div className="relative flex items-start gap-4 min-w-0">
            {/* Icon */}
            <div className={`
              flex-shrink-0 w-14 h-14 rounded-xl
              ${getIconBgClass(resource.resource_type)}
              flex items-center justify-center
              shadow-sm
            `}>
              <ResourceTypeIcon type={resource.resource_type} />
            </div>

            <div className="min-w-0">
              {/* Topic title */}
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E85D4C]" />
                <p className="text-xs font-semibold text-[#E85D4C] font-[family-name:var(--font-display)] uppercase tracking-wide">
                  {resource.topic_title}
                </p>
              </div>

              {/* Resource title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A2B4A] leading-snug font-[family-name:var(--font-display)]">
                {resource.resource_title}
              </h2>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="
              relative flex-shrink-0 w-10 h-10 rounded-xl
              bg-[#F0F3F7] hover:bg-[#E85D4C]
              flex items-center justify-center
              text-[#1A2B4A]/60 hover:text-white
              transition-all duration-300
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Preview iframe */}
          <div className="flex-1 bg-[#F0F3F7] min-h-[300px] lg:min-h-0 relative">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full min-h-[400px] lg:min-h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={resource.resource_title}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#1A2B4A]/50 p-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                  <File className="w-8 h-8 text-[#1A2B4A]/30" />
                </div>
                <p className="text-sm font-medium">Preview not available</p>
                <p className="text-xs mt-1">Click the button below to open in Google Drive</p>
              </div>
            )}
          </div>

          {/* Metadata sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#F0F3F7] overflow-y-auto bg-white">
            <div className="space-y-6">
              {/* Level */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-[#1A2B4A]/40" />
                  <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
                    Level
                  </h4>
                </div>
                <LevelBadge level={resource.level} size="md" />
              </div>

              {/* Subject */}
              {resource.subject && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-[#1A2B4A]/40" />
                    <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Subject
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-[#1A2B4A]">{resource.subject}</p>
                </div>
              )}

              {/* School */}
              {resource.school_name && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-[#1A2B4A]/40" />
                    <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
                      School
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-[#1A2B4A]">{resource.school_name}</p>
                </div>
              )}

              {/* Cluster */}
              {resource.cluster && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#1A2B4A]/40" />
                    <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Cluster
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-[#1A2B4A]">{resource.cluster}</p>
                </div>
              )}

              {/* Themes */}
              {resource.theme && resource.theme.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide mb-3 font-[family-name:var(--font-display)]">
                    Themes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.theme.map((theme) => (
                      <span
                        key={theme}
                        className="px-3 py-1.5 text-xs font-semibold text-[#1A2B4A]/70 bg-[#F0F3F7] rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div>
                <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide mb-2 font-[family-name:var(--font-display)]">
                  Source
                </h4>
                <span className="inline-block px-3 py-1.5 text-xs font-semibold text-[#E85D4C] bg-[#FEF2F0] rounded-full">
                  {resource.source}
                </span>
              </div>

              {/* Date */}
              {resource.date && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#1A2B4A]/40" />
                    <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
                      Date
                    </h4>
                  </div>
                  <p className="text-sm font-medium text-[#1A2B4A]">{formatDate(resource.date)}</p>
                </div>
              )}

              {/* Synopsis */}
              {resource.synopsis && (
                <div className="pt-4 border-t border-[#F0F3F7]">
                  <h4 className="text-xs font-bold text-[#1A2B4A]/60 uppercase tracking-wide mb-3 font-[family-name:var(--font-display)]">
                    Synopsis
                  </h4>
                  <p className="text-sm text-[#1A2B4A]/70 leading-relaxed">
                    {resource.synopsis}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 p-4 sm:p-6 border-t border-[#F0F3F7] bg-[#FAFBFC]">
          <button
            onClick={onClose}
            className="
              px-6 py-3 text-sm font-semibold
              text-[#1A2B4A] bg-white
              border-2 border-[#F0F3F7] hover:border-[#E85D4C]/20
              rounded-xl
              transition-all duration-300
              font-[family-name:var(--font-display)]
            "
          >
            Close
          </button>
          <a
            href={resource.drive_url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3 text-sm font-semibold
              text-white
              bg-gradient-to-r from-[#E85D4C] to-[#C94A3B]
              hover:from-[#FF7A6B] hover:to-[#E85D4C]
              rounded-xl
              shadow-[0_4px_14px_rgba(232,93,76,0.35)]
              hover:shadow-[0_6px_20px_rgba(232,93,76,0.45)]
              transition-all duration-300
              transform hover:-translate-y-0.5
              font-[family-name:var(--font-display)]
            "
          >
            <ExternalLink className="w-4 h-4" />
            Open in Google Drive
          </a>
        </div>
      </div>
    </div>
  );
}
