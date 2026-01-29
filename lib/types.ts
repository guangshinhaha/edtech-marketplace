export type ResourceLevel = 'PRIMARY' | 'SECONDARY' | 'JC/CI' | 'MIXED';
export type ResourceType = 'video' | 'pdf' | 'ppt' | 'doc' | 'link';

export interface Resource {
  id: string;
  source: string;
  subject: string | null;
  level: ResourceLevel;
  school_name: string | null;
  theme: string[] | null;
  cluster: string | null;
  topic_title: string;
  resource_title: string;
  synopsis: string | null;
  resource_type: ResourceType;
  drive_url: string;
  drive_file_id: string | null;
  date: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Filters {
  source: string[];
  subject: string | null;
  level: string | null;
  school_name: string | null;
  theme: string[];
  cluster: string | null;
  search: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterOptions {
  sources: FilterOption[];
  subjects: FilterOption[];
  levels: FilterOption[];
  schools: FilterOption[];
  themes: FilterOption[];
  clusters: FilterOption[];
}

export const DEFAULT_FILTERS: Filters = {
  source: [],
  subject: null,
  level: null,
  school_name: null,
  theme: [],
  cluster: null,
  search: '',
};
