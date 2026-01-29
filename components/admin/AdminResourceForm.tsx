'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Resource, ResourceLevel, ResourceType } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface AdminResourceFormProps {
  resource?: Resource | null;
  onSave: (resource: Resource) => void;
  onCancel: () => void;
}

const LEVELS: ResourceLevel[] = ['PRIMARY', 'SECONDARY', 'JC/CI', 'MIXED'];
const RESOURCE_TYPES: ResourceType[] = ['video', 'pdf', 'ppt', 'doc', 'link'];

const SOURCES = [
  'SgLDC Virtual Meets',
  'KOPI Time',
  'ETD Webinar Series',
  'School Sharing',
];

const SUBJECTS = [
  'Mathematics',
  'English Language',
  'Science',
  'Mother Tongue Languages',
  'Humanities',
  'Physical Education',
  'Art',
  'Music',
  'Computing',
];

const THEMES = [
  'Gamification',
  'e-Pedagogy',
  'AI in Education',
  'Differentiated Instruction',
  'Virtual Labs',
  'Inquiry-Based Learning',
  'Student Engagement',
  'Flipped Classroom',
  'Self-Directed Learning',
  'Data Literacy',
  'Critical Thinking',
  'Assessment',
  'Video Analysis',
  'Digital Art',
  'Creativity',
  'Computational Thinking',
  'Programming',
  'Digital Music',
];

const CLUSTERS = ['North', 'South', 'East', 'West', 'Central'];

export default function AdminResourceForm({ resource, onSave, onCancel }: AdminResourceFormProps) {
  const [formData, setFormData] = useState<Partial<Resource>>({
    source: '',
    subject: '',
    level: 'PRIMARY',
    school_name: '',
    theme: [],
    cluster: '',
    topic_title: '',
    resource_title: '',
    synopsis: '',
    resource_type: 'video',
    drive_url: '',
    date: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    }
  }, [resource]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedResource: Resource = {
      id: resource?.id || generateId(),
      source: formData.source || '',
      subject: formData.subject || null,
      level: formData.level as ResourceLevel,
      school_name: formData.school_name || null,
      theme: formData.theme || null,
      cluster: formData.cluster || null,
      topic_title: formData.topic_title || '',
      resource_title: formData.resource_title || '',
      synopsis: formData.synopsis || null,
      resource_type: formData.resource_type as ResourceType,
      drive_url: formData.drive_url || '',
      drive_file_id: null,
      date: formData.date || null,
    };

    onSave(savedResource);
  };

  const handleThemeToggle = (theme: string) => {
    const currentThemes = formData.theme || [];
    if (currentThemes.includes(theme)) {
      setFormData({ ...formData, theme: currentThemes.filter(t => t !== theme) });
    } else {
      setFormData({ ...formData, theme: [...currentThemes, theme] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {resource ? 'Edit Resource' : 'Add New Resource'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Resource Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resource Title *
              </label>
              <input
                type="text"
                required
                value={formData.resource_title || ''}
                onChange={(e) => setFormData({ ...formData, resource_title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                placeholder="e.g., Using AI Tools for Differentiated Writing"
              />
            </div>

            {/* Topic Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Topic Title *
              </label>
              <input
                type="text"
                required
                value={formData.topic_title || ''}
                onChange={(e) => setFormData({ ...formData, topic_title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                placeholder="e.g., AI-Powered Writing Support"
              />
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Source *
                </label>
                <select
                  required
                  value={formData.source || ''}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                >
                  <option value="">Select source</option>
                  {SOURCES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Resource Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Resource Type *
                </label>
                <select
                  required
                  value={formData.resource_type || 'video'}
                  onChange={(e) => setFormData({ ...formData, resource_type: e.target.value as ResourceType })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                >
                  {RESOURCE_TYPES.map(t => (
                    <option key={t} value={t}>{t.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Level *
                </label>
                <select
                  required
                  value={formData.level || 'PRIMARY'}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as ResourceLevel })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                >
                  {LEVELS.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject || ''}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                >
                  <option value="">Select subject</option>
                  {SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-2 gap-4">
              {/* School Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={formData.school_name || ''}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                  placeholder="e.g., Meridian Secondary School"
                />
              </div>

              {/* Cluster */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cluster
                </label>
                <select
                  value={formData.cluster || ''}
                  onChange={(e) => setFormData({ ...formData, cluster: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                >
                  <option value="">Select cluster</option>
                  {CLUSTERS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Drive URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Google Drive URL *
              </label>
              <input
                type="url"
                required
                value={formData.drive_url || ''}
                onChange={(e) => setFormData({ ...formData, drive_url: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                placeholder="https://drive.google.com/file/d/..."
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none"
                placeholder="e.g., 2024"
              />
            </div>

            {/* Synopsis */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Synopsis
              </label>
              <textarea
                rows={3}
                value={formData.synopsis || ''}
                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                className="w-full px-4 py-2 bg-slate-100 rounded-lg border border-transparent focus:border-[#D4740C] focus:bg-white transition-colors outline-none resize-none"
                placeholder="Brief description of the resource..."
              />
            </div>

            {/* Themes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Themes
              </label>
              <div className="flex flex-wrap gap-2">
                {THEMES.map(theme => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => handleThemeToggle(theme)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      (formData.theme || []).includes(theme)
                        ? 'bg-[#D4740C] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#D4740C] hover:bg-[#B5620A] rounded-full transition-colors"
          >
            {resource ? 'Save Changes' : 'Add Resource'}
          </button>
        </div>
      </div>
    </div>
  );
}
