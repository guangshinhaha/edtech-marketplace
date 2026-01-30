'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ResourceList from '@/components/ResourceList';
import PreviewModal from '@/components/PreviewModal';
import { Resource, Filters, DEFAULT_FILTERS } from '@/lib/types';
import { mockResources, mockFilterOptions, filterResources } from '@/lib/mockData';
import { Sparkles } from 'lucide-react';

const ITEMS_PER_PAGE = 10;
const STORAGE_KEY = 'edtech-marketplace-resources';

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load resources from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setResources(JSON.parse(stored));
      } catch {
        setResources(mockResources);
      }
    } else {
      setResources(mockResources);
    }
    setIsLoading(false);
  }, []);

  // Filter resources based on current filters
  const filteredResources = useMemo(() => {
    return filterResources(resources, filters);
  }, [resources, filters]);

  // Paginate filtered resources
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredResources.slice(start, end);
  }, [filteredResources, currentPage]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
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
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        filterOptions={mockFilterOptions}
        onFiltersChange={handleFiltersChange}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D4C]/10 to-[#E8A838]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#E85D4C]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2B4A] font-[family-name:var(--font-display)]">
              EdTech Practices
            </h2>
          </div>
          <p className="text-[#1A2B4A]/60 max-w-2xl">
            Click on any resource to preview. Use the filters above to narrow your search and discover innovative teaching practices.
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
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F0F3F7] bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D4C] to-[#C94A3B] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-[family-name:var(--font-display)]">ETD</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A2B4A] font-[family-name:var(--font-display)]">
                  EdTech Marketplace
                </p>
                <p className="text-xs text-[#1A2B4A]/50">
                  Supporting digital transformation
                </p>
              </div>
            </div>
            <p className="text-xs text-[#1A2B4A]/40">
              Built for Singapore educators
            </p>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      <PreviewModal resource={selectedResource} onClose={handleCloseModal} />
    </div>
  );
}
