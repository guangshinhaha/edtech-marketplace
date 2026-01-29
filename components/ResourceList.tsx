'use client';

import { Resource } from '@/lib/types';
import ResourceCard from './ResourceCard';
import Pagination from './Pagination';

interface ResourceListProps {
  resources: Resource[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onResourceClick: (resource: Resource) => void;
  isLoading?: boolean;
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
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-200" />
              <div className="flex-1">
                <div className="h-3 bg-slate-200 rounded w-24 mb-2" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No resources found</h3>
        <p className="text-slate-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div>
      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-slate-600">
          {totalCount} resource{totalCount !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Level legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <span className="text-slate-600">Levels:</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-700">Primary</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <span className="text-slate-700">Secondary</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-slate-700">JC/CI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-slate-700">Mixed</span>
        </div>
      </div>

      {/* Resource cards */}
      <div className="flex flex-col gap-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => onResourceClick(resource)}
          />
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
