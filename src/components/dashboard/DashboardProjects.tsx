import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Plus, Pencil, Trash2, X, Loader2, ArrowLeftIcon, HeartIcon, ShareIcon, ShoppingCart, Eye, Download } from 'lucide-react';
import { projectsApi, purchasesApi } from '../../services/api';
import type { ProjectResponse, ProjectRequest, ApiResponse } from '../../types/api';
import { useAuth } from '../../context/AuthContext';

// Admin Form Modal Component
const emptyForm: ProjectRequest = { title: '', shortDescription: '', description: '', price: 0, currency: 'INR', category: '', tags: [], thumbnailUrl: '', active: true };

const AdminFormModal: React.FC<{
  form: ProjectRequest;
  setForm: React.Dispatch<React.SetStateAction<ProjectRequest>>;
  editing: ProjectResponse | null;
  setShowForm: (show: boolean) => void;
  save: () => void;
  loading: boolean;
  error: string;
  abstractFile: File | null;
  setAbstractFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploading: boolean;
}> = ({ form, setForm, editing, setShowForm, save, loading, error, abstractFile, setAbstractFile, uploading }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{editing ? 'Edit Project' : 'Create Project'}</h3>
        <button className="p-2 hover:bg-gray-100 rounded" onClick={() => setShowForm(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.category || ''}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select Category</option>
            <option value="Blockchain">Blockchain</option>
            <option value="AI/ML">AI/ML</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="IoT">IoT</option>
            <option value="FinTech">FinTech</option>
            <option value="Analytics">Analytics</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.shortDescription || ''}
            onChange={e => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Brief description for project card"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={form.description || ''}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Detailed project description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.price ?? ''}
            onChange={e => {
              const v = e.target.value;
              setForm(prev => ({ ...prev, price: v === '' ? undefined : Number(v) }));
            }}
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.currency || 'INR'}
            onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))}
          >
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.thumbnailUrl || ''}
            onChange={e => setForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Project Abstract File
            <span className="text-gray-500 text-xs ml-1">(PDF, DOC, DOCX, TXT - Max 500MB)</span>
          </label>
          <input
            type="file"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            accept=".pdf,.doc,.docx,.txt"
            onChange={e => setAbstractFile(e.target.files?.[0] || null)}
          />
          {abstractFile && (
            <div className="mt-1 text-sm text-gray-600">
              Selected: {abstractFile.name} ({(abstractFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          {editing?.hasAbstract && (
            <div className="mt-1 text-sm text-green-600">
              Current abstract: {editing.abstractFileName}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))}
              className="mr-2"
            />
            <span className="text-sm font-medium">Active (visible to users)</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
        <button
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          onClick={() => setShowForm(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          onClick={save}
          disabled={loading || uploading || !form.title}
        >
          {(loading || uploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {loading ?
            (editing ? 'Updating...' : 'Creating...') :
            uploading ? 'Uploading Abstract...' :
              (editing ? 'Update' : 'Create') + ' Project'
          }
        </button>
      </div>
    </div>
  </div>
);

// Purchase Modal Component
const PurchaseModal: React.FC<{
  project: ProjectResponse;
  onClose: () => void;
  onPurchase: (file: File) => Promise<void>;
  loading: boolean;
}> = ({ project, onClose, onPurchase, loading }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (file) {
      await onPurchase(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Purchase Project</h3>
          <button className="p-2 hover:bg-gray-100 rounded" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-medium">{project.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{project.shortDescription}</p>
          <p className="text-lg font-bold text-green-600 mt-2">
            {project.currency} {project.price?.toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Payment QR Code</h4>
          <div className="flex justify-center mb-3">
            <img
              src="/payment-qr.jpg"
              alt="Payment QR Code"
              className="w-48 h-48 object-contain border-2 border-gray-200 rounded-lg"
              onError={(e) => {
                console.error('QR code image failed to load');
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Scan this QR code to make payment, then upload proof below
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Payment Proof *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Upload screenshot or receipt of payment</p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            onClick={handleSubmit}
            disabled={loading || !file}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardProjects = () => {
  const { isAdmin, user } = useAuth();
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // User browsing state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProjects, setFilteredProjects] = useState<ProjectResponse[]>(projects);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Admin state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectRequest>(emptyForm);
  const [editing, setEditing] = useState<ProjectResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = ['All', 'Blockchain', 'AI/ML', 'E-Commerce', 'IoT', 'FinTech', 'Analytics', 'Mobile Apps', 'DevOps'];

  // Fetch projects based on user role
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const res = isAdmin
          ? await projectsApi.adminList()
          : await projectsApi.listPublic();

        if (res.success && res.data) {
          setProjects(res.data);
        } else {
          setError(res.message || 'Failed to load projects');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [isAdmin]);

  // Filter projects for users
  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => (project.category || '') === selectedCategory);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(q) ||
        (project.shortDescription || '').toLowerCase().includes(q) ||
        (project.description || '').toLowerCase().includes(q)
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  // Admin functions
  const openCreateForm = () => {
    setForm(emptyForm);
    setAbstractFile(null);
    setEditing(null);
    setShowForm(true);
  };

  const openEditForm = (project: ProjectResponse) => {
    setForm({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription || '',
      description: project.description || '',
      price: project.price,
      currency: project.currency || 'INR',
      category: project.category || '',
      tags: project.tags || [],
      thumbnailUrl: project.thumbnailUrl || '',
      active: project.active
    });
    setAbstractFile(null); // Clear any selected file when editing
    setEditing(project);
    setShowForm(true);
  };

  const saveProject = async () => {
    if (!form.title) return;

    setSubmitting(true);
    setError('');
    try {
      const res: ApiResponse<ProjectResponse> = editing
        ? await projectsApi.adminUpdate(editing.id.toString(), form)
        : await projectsApi.adminCreate(form);

      if (res.success && res.data) {
        // Upload abstract file if provided
        if (abstractFile && res.data.id) {
          setUploading(true);
          try {
            const uploadRes = await projectsApi.uploadAbstract(res.data.id.toString(), abstractFile);
            if (!uploadRes.success) {
              setError(uploadRes.message || 'Project saved but failed to upload abstract file');
            }
          } catch (e: any) {
            setError('Project saved but failed to upload abstract file: ' + e.message);
          } finally {
            setUploading(false);
          }
        }

        // Refresh projects
        const refreshRes = await projectsApi.adminList();
        if (refreshRes.success && refreshRes.data) {
          setProjects(refreshRes.data);
        }
        setShowForm(false);
        setForm(emptyForm);
        setAbstractFile(null);
        setEditing(null);
      } else {
        setError(res.message || 'Failed to save project');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await projectsApi.adminDelete(id);
      if (res.success) {
        setProjects(prev => prev.filter(p => p.id.toString() !== id));
      } else {
        setError(res.message || 'Failed to delete project');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to delete project');
    }
  };

  const downloadAbstract = async (project: ProjectResponse) => {
    try {
      await projectsApi.downloadAbstract(project.id.toString());
    } catch (e: any) {
      setError('Failed to download abstract: ' + e.message);
    }
  };

  // User functions
  const handlePurchase = async (file: File) => {
    if (!selectedProject || !user) return;

    setSubmitting(true);
    try {
      const res = await purchasesApi.create(
        selectedProject.id.toString(),
        file,
        `Purchase request for ${selectedProject.title}`
      );

      if (res.success) {
        setShowPurchaseModal(false);
        setSelectedProject(null);
        alert('Purchase request submitted successfully! We will review and contact you soon.');
      } else {
        alert(res.message || 'Failed to submit purchase request');
      }
    } catch (e: any) {
      alert(e.message || 'Failed to submit purchase request');
    } finally {
      setSubmitting(false);
    }
  };

  const openProjectDetail = (project: ProjectResponse) => {
    setSelectedProject(project);
  };

  const openPurchaseModal = (project: ProjectResponse) => {
    setSelectedProject(project);
    setShowPurchaseModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Admin View
  if (isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Projects</h1>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={project.thumbnailUrl || '/DigiDefense.png'}
                            alt={project.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {project.shortDescription}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {project.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {project.currency} {project.price?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full ${project.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {project.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditForm(project)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id.toString())}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <AdminFormModal
            form={form}
            setForm={setForm}
            editing={editing}
            setShowForm={setShowForm}
            save={saveProject}
            loading={submitting}
            error={error}
            abstractFile={abstractFile}
            setAbstractFile={setAbstractFile}
            uploading={uploading}
          />
        )}
      </div>
    );
  }

  // User View - Project Details
  if (selectedProject && !showPurchaseModal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Projects
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors">
              <HeartIcon className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Media */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={selectedProject.thumbnailUrl || '/DigiDefense.png'}
                alt={selectedProject.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {selectedProject.category || 'Project'}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedProject.title}
            </h1>

            <p className="text-gray-600 mb-4">
              {selectedProject.shortDescription}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="text-3xl font-bold text-green-600">
                {selectedProject.currency} {selectedProject.price?.toLocaleString() || '0'}
              </div>
            </div>

            <button
              onClick={() => openPurchaseModal(selectedProject)}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Purchase Project
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {selectedProject.hasAbstract && user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">Project Abstract</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download the detailed project abstract to learn more about this project.
                </p>
                <button
                  onClick={() => downloadAbstract(selectedProject)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Abstract ({selectedProject.abstractFileName})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User View - Project Portfolio
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={project.thumbnailUrl || '/DigiDefense.png'}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {project.category || 'Project'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {project.currency} {project.price?.toLocaleString() || '0'}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openProjectDetail(project)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {project.hasAbstract && user && (
                    <button
                      onClick={() => downloadAbstract(project)}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      title="Download Abstract"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => openPurchaseModal(project)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-6 flex items-center space-x-4">
                <img
                  src={project.thumbnailUrl || '/DigiDefense.png'}
                  alt={project.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {project.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {project.category || 'Project'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                    {project.shortDescription}
                  </p>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    {project.currency} {project.price?.toLocaleString() || '0'}
                  </div>
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  <button
                    onClick={() => openProjectDetail(project)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </button>
                  {project.hasAbstract && user && (
                    <button
                      onClick={() => downloadAbstract(project)}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      title="Download Abstract"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => openPurchaseModal(project)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No projects found</div>
          {searchTerm || selectedCategory !== 'All' ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedProject && (
        <PurchaseModal
          project={selectedProject}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedProject(null);
          }}
          onPurchase={handlePurchase}
          loading={submitting}
        />
      )}
    </div>
  );
};

export default DashboardProjects;