'use client';

import { Resource } from '@/lib/types';
import ResourceCard from './ResourceCard';
import Pagination from './Pagination';
import { Package, SearchX } from 'lucide-react';

interface ResourceListProps {
  resources: Resource[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onResourceClick: (resource: Resource) => void;
  isLoading?: boolean;
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="bg-white rounded-2xl border-2 border-[#F0F3F7] p-5 sm:p-6 animate-fade-in-up"
      style={{ animationDelay: `${index * 75}ms`, opacity: 0 }}
    >
      <div className="flex gap-4 sm:gap-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl skeleton" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="h-3 w-20 skeleton rounded-full mb-2" />
              <div className="h-5 w-3/4 skeleton rounded-lg" />
            </div>
            <div className="h-6 w-20 skeleton rounded-full" />
          </div>
          <div className="flex gap-2 mt-3">
            <div className="h-6 w-24 skeleton rounded-full" />
            <div className="h-6 w-16 skeleton rounded-full" />
          </div>
          <div className="h-4 w-full skeleton rounded-lg mt-3 hidden sm:block" />
        </div>
      </div>
    </div>
  );
}

export default function ResourceList({
  resources,
  totalCount,
  currentPage,
  itemsPerPage,
  onPageChange,
  onResourceClick,
  isLoading = false,
}: ResourceListProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        {/* Empty state illustration */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E85D4C]/20 to-[#E8A838]/20 rounded-3xl rotate-6" />
          <div className="absolute inset-0 bg-white rounded-3xl shadow-lg flex items-center justify-center">
            <SearchX className="w-10 h-10 text-[#E85D4C]" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#1A2B4A] mb-2 font-[family-name:var(--font-display)]">
          No resources found
        </h3>
        <p className="text-[#1A2B4A]/60 max-w-md mx-auto">
          Try adjusting your filters or search terms to discover more EdTech resources
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 flex items-center justify-center">
            <Package className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A2B4A] font-[family-name:var(--font-display)]">
              {totalCount} resource{totalCount !== 1 ? 's' : ''} found
            </p>
            <p className="text-xs text-[#1A2B4A]/50">
              Browse and click to preview
            </p>
          </div>
        </div>

        {/* Level legend */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-xs font-semibold text-[#1A2B4A]/60 uppercase tracking-wide font-[family-name:var(--font-display)]">
            Levels:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs text-[#1A2B4A]/70">Primary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
            <span className="text-xs text-[#1A2B4A]/70">Secondary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-xs text-[#1A2B4A]/70">JC/CI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-xs text-[#1A2B4A]/70">Mixed</span>
          </div>
        </div>
      </div>

      {/* Resource cards with staggered animation */}
      <div className="flex flex-col gap-4">
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
          >
            <ResourceCard
              resource={resource}
              onClick={() => onResourceClick(resource)}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
