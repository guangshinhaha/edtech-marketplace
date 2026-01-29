'use client';

import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminResourceList from '@/components/admin/AdminResourceList';
import AdminResourceForm from '@/components/admin/AdminResourceForm';
import { Resource } from '@/lib/types';
import { mockResources } from '@/lib/mockData';

const STORAGE_KEY = 'edtech-marketplace-resources';

export default function AdminPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<Resource | null>(null);

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
      // Initialize with mock data
      setResources(mockResources);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockResources));
    }
  }, []);

  // Save to localStorage whenever resources change
  const saveResources = (newResources: Resource[]) => {
    setResources(newResources);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResources));
  };

  // Filter resources by search term
  const filteredResources = resources.filter(r =>
    r.resource_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.topic_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.school_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (resource: Resource) => {
    if (editingResource) {
      // Update existing
      const updated = resources.map(r => r.id === resource.id ? resource : r);
      saveResources(updated);
    } else {
      // Add new
      saveResources([resource, ...resources]);
    }
    setIsFormOpen(false);
    setEditingResource(null);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleDelete = (resource: Resource) => {
    setDeleteConfirm(resource);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      const updated = resources.filter(r => r.id !== deleteConfirm.id);
      saveResources(updated);
      setDeleteConfirm(null);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingResource(null);
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
                  <p className="text-sm text-slate-600">Manage EdTech resources</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingResource(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4740C] hover:bg-[#B5620A] text-white font-medium rounded-full transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Resource
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">Total Resources</p>
              <p className="text-2xl font-bold text-slate-900">{resources.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">Videos</p>
              <p className="text-2xl font-bold text-slate-900">
                {resources.filter(r => r.resource_type === 'video').length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">Documents</p>
              <p className="text-2xl font-bold text-slate-900">
                {resources.filter(r => ['pdf', 'ppt', 'doc'].includes(r.resource_type)).length}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-slate-200 focus:border-[#D4740C] focus:ring-1 focus:ring-[#D4740C] transition-colors outline-none"
              />
            </div>
          </div>

          {/* Resource List */}
          <AdminResourceList
            resources={filteredResources}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>

        {/* Form Modal */}
        {isFormOpen && (
          <AdminResourceForm
            resource={editingResource}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Resource?</h3>
              <p className="text-slate-600 mb-4">
                Are you sure you want to delete "{deleteConfirm.resource_title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminAuth>
  );
}
