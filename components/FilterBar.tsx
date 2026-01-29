'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';
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
}

function Dropdown({
  label,
  value,
  options,
  onChange,
  multiSelect = false,
  searchable = false,
  placeholder = 'Select...',
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

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-w-[140px] px-3 py-2 text-left bg-slate-100 rounded-lg border border-transparent hover:border-slate-300 focus:border-[#D4740C] focus:bg-white transition-colors flex items-center justify-between gap-2"
      >
        <span className={`text-sm truncate ${displayValue ? 'text-slate-900' : 'text-slate-500'}`}>
          {displayValue || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[200px] bg-white rounded-lg shadow-lg border border-slate-200 py-1 max-h-60 overflow-auto">
          {searchable && (
            <div className="px-2 pb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm bg-slate-100 rounded-md border-0 focus:bg-white focus:ring-1 focus:ring-[#D4740C]"
                autoFocus
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${
                  isSelected(option.value) ? 'text-[#D4740C] font-medium' : 'text-slate-700'
                }`}
              >
                {multiSelect && (
                  <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isSelected(option.value)
                      ? 'bg-[#D4740C] border-[#D4740C]'
                      : 'border-slate-300'
                  }`}>
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

  // Debounced search update
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

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3">
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

          {/* Search bar and clear button */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-medium text-slate-600 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder="Search by topic or resource title..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg border border-transparent hover:border-slate-300 focus:border-[#D4740C] focus:bg-white transition-colors text-sm"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
