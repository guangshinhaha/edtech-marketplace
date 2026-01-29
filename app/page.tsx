'use client';

import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ResourceList from '@/components/ResourceList';
import PreviewModal from '@/components/PreviewModal';
import { Resource, Filters, DEFAULT_FILTERS } from '@/lib/types';
import { mockResources, mockFilterOptions, filterResources } from '@/lib/mockData';

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Filter resources based on current filters
  const filteredResources = useMemo(() => {
    return filterResources(mockResources, filters);
  }, [filters]);

  // Paginate filtered resources
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredResources.slice(start, end);
  }, [filteredResources, currentPage]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle resource click
  const handleResourceClick = useCallback((resource: Resource) => {
    setSelectedResource(resource);
  }, []);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setSelectedResource(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <Header />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        filterOptions={mockFilterOptions}
        onFiltersChange={handleFiltersChange}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 font-[var(--font-display)]">
            EdTech practices in schools
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Click on any resource to preview. Use filters above to narrow your search.
          </p>
        </div>

        {/* Resource List */}
        <ResourceList
          resources={paginatedResources}
          totalCount={filteredResources.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          onResourceClick={handleResourceClick}
        />
      </main>

      {/* Preview Modal */}
      <PreviewModal resource={selectedResource} onClose={handleCloseModal} />
    </div>
  );
}
