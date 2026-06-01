import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ExternalLink, Calendar } from 'lucide-react';
import { projectsApi } from '../services/api';
import type { ProjectResponse } from '../types/api';

const ProjectPortfolio: React.FC = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProjects, setFilteredProjects] = useState<ProjectResponse[]>(projects);

  const categories = ['All', 'Blockchain', 'AI/ML', 'E-Commerce', 'IoT', 'FinTech', 'Analytics', 'Mobile Apps', 'DevOps'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await projectsApi.listPublic();
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
  }, []);

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
  }, [searchTerm, selectedCategory, projects]);

  const ProjectCard: React.FC<{ project: ProjectResponse }> = ({ project }) => (
    <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-secondary-400/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={project.thumbnailUrl || '/DigiDefense.png'}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="mb-3">
        {project.category && (
          <span className="inline-block px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm font-medium mb-2">
            {project.category}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary-300 transition-colors">
        {project.title}
      </h3>

      <p className="text-gray-300 mb-4 line-clamp-2">
        {project.shortDescription || project.description || ''}
      </p>

      <div className="flex gap-2">
        <Link to={`/projects/${project.slug}`} className="w-full text-center bg-primary-900/20 hover:bg-primary-900/30 text-primary-300 px-4 py-2 rounded-lg transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );

  const ProjectListItem: React.FC<{ project: ProjectResponse }> = ({ project }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-secondary-400/50 transition-all duration-300">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img
            src={project.thumbnailUrl || '/DigiDefense.png'}
            alt={project.title}
            className="w-32 h-24 object-cover rounded-xl"
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              {project.category && (
                <span className="inline-block px-3 py-1 bg-secondary-500/20 text-secondary-300 rounded-full text-sm font-medium mb-2">
                  {project.category}
                </span>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
              Project
            </span>
          </div>

          <p className="text-gray-300 mb-3">{project.shortDescription || project.description || ''}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/projects/${project.slug}`} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Project <span className="text-secondary-400">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our innovative projects built by Parmy Technologies.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-secondary-400/50"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary-400/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-primary-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-secondary-500/20 text-secondary-300' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-secondary-500/20 text-secondary-300' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center text-white/80 py-6">Loading projects...</div>
        )}
        {error && (
          <div className="text-center py-6">
            <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-2xl p-4 border border-red-200 dark:border-red-800 max-w-md mx-auto">
              {error}
            </div>
          </div>
        )}

        {/* Projects Grid/List */}
        <div className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
          }`}>
          {filteredProjects.map(project => (
            viewMode === 'grid'
              ? <ProjectCard key={project.id} project={project} />
              : <ProjectListItem key={project.id} project={project} />
          ))}
        </div>

        {!loading && filteredProjects.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-300">Try adjusting your search terms or category filter.</p>
            </div>
          </div>
        )}

        {/* Stats (lightweight) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-secondary-400 mb-2">{projects.length}</div>
            <div className="text-gray-300">Total Projects</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{projects.length}</div>
            <div className="text-gray-300">Active</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{0}</div>
            <div className="text-gray-300">Upcoming</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">{Array.from(new Set(projects.map(p => p.category || ''))).filter(Boolean).length}</div>
            <div className="text-gray-300">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPortfolio;
