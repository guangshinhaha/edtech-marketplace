'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { Filters, FilterOptions, DEFAULT_FILTERS } from '@/lib/types';

interface FilterBarProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: Filters) => void;
}

interface DropdownProps {
  label: string;
  value: string | string[] | null;
  options: { value: string; label: string }[];
  onChange: (value: string | string[] | null) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

function Dropdown({
  label,
  value,
  options,
  onChange,
  multiSelect = false,
  searchable = false,
  placeholder = 'All',
  icon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const displayValue = useMemo(() => {
    if (multiSelect && Array.isArray(value) && value.length > 0) {
      if (value.length === 1) {
        return options.find(o => o.value === value[0])?.label || value[0];
      }
      return `${value.length} selected`;
    }
    if (!multiSelect && value) {
      return options.find(o => o.value === value)?.label || value;
    }
    return null;
  }, [value, options, multiSelect]);

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const currentValues = (value as string[]) || [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter(v => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiSelect) {
      return (value as string[] || []).includes(optionValue);
    }
    return value === optionValue;
  };

  const hasValue = multiSelect
    ? Array.isArray(value) && value.length > 0
    : value !== null;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-[#1A2B4A]/60 mb-1.5 font-[family-name:var(--font-display)] uppercase tracking-wide">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full min-w-[150px] px-4 py-2.5 text-left rounded-xl
          border-2 transition-all duration-300 flex items-center justify-between gap-2
          font-[family-name:var(--font-sans)]
          ${hasValue
            ? 'bg-[#FEF2F0] border-[#E85D4C]/30 text-[#1A2B4A]'
            : 'bg-white border-[#F0F3F7] text-[#1A2B4A]/70 hover:border-[#E85D4C]/20'
          }
          ${isOpen ? 'border-[#E85D4C] shadow-[0_0_0_4px_rgba(232,93,76,0.1)]' : ''}
        `}
      >
        <span className="flex items-center gap-2 text-sm font-medium truncate">
          {icon}
          {displayValue || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#1A2B4A]/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute z-50 mt-2 w-full min-w-[220px] py-2 max-h-64 overflow-auto">
          {searchable && (
            <div className="px-3 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A2B4A]/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#F0F3F7] rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-[#E85D4C]/20 transition-all"
                  autoFocus
                />
              </div>
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#1A2B4A]/50">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-all
                  ${isSelected(option.value)
                    ? 'bg-[#FEF2F0] text-[#E85D4C] font-semibold'
                    : 'text-[#1A2B4A] hover:bg-[#F0F3F7]'
                  }
                `}
              >
                {multiSelect && (
                  <span
                    className={`
                      w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                      ${isSelected(option.value)
                        ? 'bg-[#E85D4C] border-[#E85D4C]'
                        : 'border-[#1A2B4A]/20'
                      }
                    `}
                  >
                    {isSelected(option.value) && <Check className="w-3 h-3 text-white" />}
                  </span>
                )}
                <span className="truncate">{option.label}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ filters, filterOptions, onFiltersChange }: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFiltersChange({ ...filters, search: localSearch });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, filters, onFiltersChange]);

  const handleClearFilters = () => {
    setLocalSearch('');
    onFiltersChange(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.source.length > 0 ||
    filters.subject !== null ||
    filters.level !== null ||
    filters.school_name !== null ||
    filters.theme.length > 0 ||
    filters.cluster !== null ||
    filters.search !== '';

  const activeFilterCount = [
    filters.source.length > 0,
    filters.subject !== null,
    filters.level !== null,
    filters.school_name !== null,
    filters.theme.length > 0,
    filters.cluster !== null,
  ].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-40 animate-fade-in">
      {/* Glass background */}
      <div className="glass border-b border-[#1A2B4A]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-5">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E85D4C]/10 to-[#E8A838]/10 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-[#E85D4C]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1A2B4A] font-[family-name:var(--font-display)]">
                    Filter Resources
                  </h3>
                  <p className="text-xs text-[#1A2B4A]/50">
                    {activeFilterCount > 0 ? `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active` : 'No filters applied'}
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="
                    group flex items-center gap-2 px-4 py-2 text-sm font-semibold
                    text-[#E85D4C] hover:text-white
                    bg-[#FEF2F0] hover:bg-[#E85D4C]
                    rounded-full transition-all duration-300
                    font-[family-name:var(--font-display)]
                  "
                >
                  <X className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
              )}
            </div>

            {/* Filter dropdowns grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Dropdown
                label="Source"
                value={filters.source}
                options={filterOptions.sources}
                onChange={(val) => onFiltersChange({ ...filters, source: (val as string[]) || [] })}
                multiSelect
                placeholder="All sources"
              />
              <Dropdown
                label="Subject"
                value={filters.subject}
                options={filterOptions.subjects}
                onChange={(val) => onFiltersChange({ ...filters, subject: val as string | null })}
                placeholder="All subjects"
              />
              <Dropdown
                label="Level"
                value={filters.level}
                options={filterOptions.levels}
                onChange={(val) => onFiltersChange({ ...filters, level: val as string | null })}
                placeholder="All levels"
              />
              <Dropdown
                label="School"
                value={filters.school_name}
                options={filterOptions.schools}
                onChange={(val) => onFiltersChange({ ...filters, school_name: val as string | null })}
                searchable
                placeholder="All schools"
              />
              <Dropdown
                label="Theme"
                value={filters.theme}
                options={filterOptions.themes}
                onChange={(val) => onFiltersChange({ ...filters, theme: (val as string[]) || [] })}
                multiSelect
                placeholder="All themes"
              />
              <Dropdown
                label="Cluster"
                value={filters.cluster}
                options={filterOptions.clusters}
                onChange={(val) => onFiltersChange({ ...filters, cluster: val as string | null })}
                placeholder="All clusters"
              />
            </div>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-[#E85D4C]/10">
                <Search className="w-4 h-4 text-[#E85D4C]" />
              </div>
              <input
                type="text"
                value={localSearch}
                onChange={handleSearchChange}
                placeholder="Search by topic or resource title..."
                className="
                  w-full pl-14 pr-5 py-3.5
                  bg-white rounded-xl
                  border-2 border-[#F0F3F7] hover:border-[#E85D4C]/20
                  focus:border-[#E85D4C] focus:shadow-[0_0_0_4px_rgba(232,93,76,0.1)]
                  transition-all duration-300
                  text-sm font-medium text-[#1A2B4A]
                  placeholder:text-[#1A2B4A]/40
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
