import React, { useState } from 'react';
import { BookOpenIcon, FileTextIcon, DownloadIcon, BookmarkIcon, ShareIcon, StarIcon, SearchIcon, FilterIcon, ArrowRightIcon, ClockIcon, BarChart3Icon, TrendingUpIcon, GlobeIcon, BuildingIcon, LayoutGridIcon, LayoutListIcon } from 'lucide-react';
const ExecutiveBriefingCenter = () => {
  const [activeTab, setActiveTab] = useState('industry');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const industryReports = [{
    id: 1,
    title: 'Financial Services Technology Outlook 2024',
    description: 'Comprehensive analysis of emerging technologies and trends shaping the financial services industry.',
    type: 'Industry Report',
    date: 'November 15, 2023',
    author: 'Parmy Technologies Research',
    readTime: '25 min read',
    rating: 4.8,
    downloads: 1247,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Financial Services', 'Digital Transformation', 'AI', 'Blockchain']
  }, {
    id: 2,
    title: 'Healthcare Innovation: Digital Transformation in Medical Services',
    description: 'Analysis of how digital technologies are revolutionizing patient care, operations, and healthcare business models.',
    type: 'Industry Report',
    date: 'October 23, 2023',
    author: 'Parmy Technologies Research',
    readTime: '22 min read',
    rating: 4.7,
    downloads: 985,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Healthcare', 'Digital Transformation', 'Telemedicine', 'Data Analytics']
  }, {
    id: 3,
    title: 'Manufacturing 4.0: The Future of Smart Factories',
    description: 'Exploring the evolution of manufacturing with IoT, automation, and AI-driven production systems.',
    type: 'Industry Report',
    date: 'September 8, 2023',
    author: 'Parmy Technologies Research',
    readTime: '18 min read',
    rating: 4.6,
    downloads: 723,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Manufacturing', 'IoT', 'Automation', 'Industry 4.0']
  }];
  const marketAnalysis = [{
    id: 1,
    title: 'Global Technology Investment Trends Q4 2023',
    description: 'Analysis of venture capital and private equity investments in technology sectors worldwide.',
    type: 'Market Analysis',
    date: 'December 5, 2023',
    author: 'Parmy Technologies Markets Team',
    readTime: '20 min read',
    rating: 4.9,
    downloads: 1562,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Investment Trends', 'Venture Capital', 'Market Analysis', 'Global']
  }, {
    id: 2,
    title: 'APAC Technology Market Outlook 2024',
    description: 'Comprehensive forecast of technology adoption and market growth across Asia-Pacific regions.',
    type: 'Market Analysis',
    date: 'November 28, 2023',
    author: 'Parmy Technologies APAC Research',
    readTime: '23 min read',
    rating: 4.7,
    downloads: 1105,
    image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['APAC', 'Market Forecast', 'Regional Analysis', 'Growth Trends']
  }, {
    id: 3,
    title: 'Enterprise Software Market Dynamics',
    description: 'Analysis of shifting enterprise software landscape, including SaaS adoption, consolidation trends, and emerging players.',
    type: 'Market Analysis',
    date: 'October 17, 2023',
    author: 'Parmy Technologies Software Practice',
    readTime: '19 min read',
    rating: 4.6,
    downloads: 876,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Enterprise Software', 'SaaS', 'Market Analysis', 'Technology Trends']
  }];
  const whitepapers = [{
    id: 1,
    title: 'Zero Trust Architecture: Implementation Framework',
    description: 'Comprehensive guide to implementing zero trust security models in enterprise environments.',
    type: 'Whitepaper',
    date: 'December 10, 2023',
    author: 'Parmy Technologies Cybersecurity Practice',
    readTime: '15 min read',
    rating: 4.9,
    downloads: 2341,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['Cybersecurity', 'Zero Trust', 'Enterprise Security', 'Implementation Guide']
  }, {
    id: 2,
    title: 'AI Governance: Ethical Frameworks for Enterprise AI',
    description: 'Exploring governance models, ethical considerations, and regulatory compliance for AI systems.',
    type: 'Whitepaper',
    date: 'November 22, 2023',
    author: 'Parmy Technologies AI Ethics Committee',
    readTime: '18 min read',
    rating: 4.8,
    downloads: 1876,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['AI Ethics', 'Governance', 'Regulatory Compliance', 'Enterprise AI']
  }, {
    id: 3,
    title: 'Cloud Cost Optimization Strategies',
    description: 'Tactical and strategic approaches to managing and optimizing cloud infrastructure costs.',
    type: 'Whitepaper',
    date: 'October 5, 2023',
    author: 'Parmy Technologies Cloud Practice',
    readTime: '14 min read',
    rating: 4.7,
    downloads: 1543,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['Cloud Computing', 'Cost Optimization', 'Infrastructure', 'FinOps']
  }];
  const getActiveReports = () => {
    switch (activeTab) {
      case 'industry':
        return industryReports;
      case 'market':
        return marketAnalysis;
      case 'whitepapers':
        return whitepapers;
      default:
        return [...industryReports, ...marketAnalysis, ...whitepapers];
    }
  };
  const filteredReports = getActiveReports().filter(report => report.title.toLowerCase().includes(searchQuery.toLowerCase()) || report.description.toLowerCase().includes(searchQuery.toLowerCase()) || report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
  return <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-blue-600 mr-4">
            <BookOpenIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Executive Briefing Center
            </h2>
            <p className="text-sm text-gray-500">
              Industry reports, market analysis, and strategic insights
            </p>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'industry' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('industry')}>
            <BuildingIcon className="inline-block h-4 w-4 mr-2" />
            Industry Reports
          </button>
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'market' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('market')}>
            <BarChart3Icon className="inline-block h-4 w-4 mr-2" />
            Market Analysis
          </button>
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'whitepapers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('whitepapers')}>
            <FileTextIcon className="inline-block h-4 w-4 mr-2" />
            Whitepapers
          </button>
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => setActiveTab('all')}>
            <GlobeIcon className="inline-block h-4 w-4 mr-2" />
            All Resources
          </button>
        </nav>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search resources..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('grid')} title="Grid view">
                <LayoutGridIcon className="h-5 w-5" />
              </button>
              <button className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setViewMode('list')} title="List view">
                <LayoutListIcon className="h-5 w-5" />
              </button>
            </div>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
        {/* Featured Report (only show if we have a featured report and in grid view) */}
        {viewMode === 'grid' && filteredReports.some(r => r.featured) && <div className="mb-8">
            {filteredReports.filter(r => r.featured).slice(0, 1).map(report => <div key={report.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-md border border-blue-100">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-2/5 h-48 md:h-auto overflow-hidden">
                      <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Featured
                        </span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {report.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {report.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{report.description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{report.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>{report.date}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{report.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {report.tags.map((tag, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                            {tag}
                          </span>)}
                      </div>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <BookmarkIcon className="h-4 w-4 mr-1.5" />
                          Save
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <ShareIcon className="h-4 w-4 mr-1.5" />
                          Share
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                          <DownloadIcon className="h-4 w-4 mr-1.5" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
          </div>}
        {/* Grid View */}
        {viewMode === 'grid' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.filter(r => !r.featured || viewMode !== 'grid').map(report => <div key={report.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {report.type}
                      </span>
                      <div className="flex items-center ml-auto">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {report.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <ClockIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{report.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{report.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {report.tags.slice(0, 3).map((tag, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {tag}
                        </span>)}
                      {report.tags.length > 3 && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600">
                          +{report.tags.length - 3} more
                        </span>}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {report.downloads.toLocaleString()} downloads
                      </div>
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                        <DownloadIcon className="h-3.5 w-3.5 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>)}
          </div>}
        {/* List View */}
        {viewMode === 'list' && <div className="space-y-4">
            {filteredReports.map(report => <div key={report.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-48 sm:h-32 overflow-hidden">
                    <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center mb-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {report.type}
                      </span>
                      {report.featured && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Featured
                        </span>}
                      <div className="flex items-center ml-auto">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {report.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1 sm:line-clamp-2">
                      {report.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <ClockIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{report.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{report.date}</span>
                      <span className="mx-2">•</span>
                      <span>{report.downloads.toLocaleString()} downloads</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {report.tags.slice(0, 4).map((tag, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                          {tag}
                        </span>)}
                      {report.tags.length > 4 && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600">
                          +{report.tags.length - 4} more
                        </span>}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-center space-y-2 border-l border-gray-100">
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700">
                      <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
                      Download
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <BookmarkIcon className="h-3.5 w-3.5 mr-1.5" />
                      Save
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <ShareIcon className="h-3.5 w-3.5 mr-1.5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>)}
          </div>}
        {filteredReports.length === 0 && <div className="text-center py-12">
            <FileTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button onClick={() => setSearchQuery('')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
              Clear search
            </button>
          </div>}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900">
            Browse All Resources
            <ArrowRightIcon className="ml-1 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>;
};
export default ExecutiveBriefingCenter;