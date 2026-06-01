import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, TagIcon, CalendarIcon, UserIcon, ClockIcon, ChevronRightIcon, ArrowRightIcon, TrendingUpIcon, LightbulbIcon, LineChartIcon, BrainCircuitIcon, CloudIcon, ShieldIcon, DatabaseIcon, GlobeIcon, BookOpenIcon, FilterIcon } from 'lucide-react';
const Insights = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Categories
  const categories = [{
    id: 'all',
    name: 'All Insights'
  }, {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: BrainCircuitIcon
  }, {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: CloudIcon
  }, {
    id: 'security',
    name: 'Cybersecurity',
    icon: ShieldIcon
  }, {
    id: 'data',
    name: 'Data & Analytics',
    icon: DatabaseIcon
  }, {
    id: 'digital',
    name: 'Digital Transformation',
    icon: LineChartIcon
  }, {
    id: 'trends',
    name: 'Industry Trends',
    icon: TrendingUpIcon
  }];
  // Featured insights
  const featuredInsights = [{
    id: 1,
    title: 'The Future of AI in Enterprise Decision-Making',
    excerpt: 'Explore how artificial intelligence is transforming business decision processes and creating competitive advantages.',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Nikhil Yerra',
    authorRole: 'Chief Technology Officer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'June 15, 2023',
    readTime: '8 min read',
    featured: true
  }, {
    id: 2,
    title: 'Securing the Cloud: Best Practices for 2023',
    excerpt: 'Learn essential strategies to protect your cloud infrastructure against emerging security threats.',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Michael Rodriguez',
    authorRole: 'Head of Cybersecurity',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'May 28, 2023',
    readTime: '6 min read',
    featured: true
  }];
  // All insights
  const allInsights = [...featuredInsights, {
    id: 3,
    title: 'Data-Driven Culture: Building Analytics Capabilities',
    excerpt: 'How to foster a data-driven culture in your organization and develop advanced analytics capabilities.',
    category: 'data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Sarah Johnson',
    authorRole: 'Data Science Director',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'May 12, 2023',
    readTime: '10 min read'
  }, {
    id: 4,
    title: 'Multi-Cloud Strategy: Benefits and Challenges',
    excerpt: 'An in-depth look at implementing a multi-cloud strategy and how to overcome common obstacles.',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'David Chen',
    authorRole: 'Cloud Solutions Architect',
    authorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'April 30, 2023',
    readTime: '7 min read'
  }, {
    id: 5,
    title: 'The ROI of Digital Transformation',
    excerpt: 'Measuring the return on investment for digital transformation initiatives and proving business value.',
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Tarun Kumar Yerra',
    authorRole: 'Chief Executive Officer',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'April 15, 2023',
    readTime: '9 min read'
  }, {
    id: 6,
    title: 'Generative AI: Business Applications and Ethics',
    excerpt: 'Exploring the practical applications of generative AI in business while addressing ethical considerations.',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442135073-c238a8a9f5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Nikhil Yerra',
    authorRole: 'Chief Technology Officer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'March 28, 2023',
    readTime: '11 min read'
  }, {
    id: 7,
    title: 'Zero Trust Security: Implementation Framework',
    excerpt: 'A practical guide to implementing a zero trust security model in your organization.',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Michael Rodriguez',
    authorRole: 'Head of Cybersecurity',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'March 10, 2023',
    readTime: '8 min read'
  }, {
    id: 8,
    title: 'Industry 4.0: The Future of Manufacturing',
    excerpt: 'How smart technologies are revolutionizing manufacturing processes and creating new opportunities.',
    category: 'trends',
    image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: 'Priya Sharma',
    authorRole: 'Chief Product Officer',
    authorImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    date: 'February 22, 2023',
    readTime: '7 min read'
  }];
  // Filter insights based on active category and search query
  const filteredInsights = allInsights.filter(insight => {
    const matchesCategory = activeCategory === 'all' || insight.category === activeCategory;
    const matchesSearch = searchQuery === '' || insight.title.toLowerCase().includes(searchQuery.toLowerCase()) || insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  // Get category name by id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };
  // Get category icon by id
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category && category.icon ? category.icon : null;
  };
  return <div className="bg-[#1A202C] w-full text-white">
      {/* Hero Section */}
      <div className="relative bg-[#1A202C] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500 opacity-10 rounded-full animate-float-slow"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-green-500 opacity-10 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-green-500 opacity-10 rounded-full animate-float-fast"></div>
          <div className="absolute -bottom-20 right-1/3 w-60 h-60 bg-green-500 opacity-5 rounded-full animate-float-medium"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in-up">
              Insights & Perspectives
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-300">
              Expert analysis, industry trends, and thought leadership from our
              team of technology specialists
            </p>
            {/* Search bar */}
            <div className="mt-10 max-w-xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" className="block w-full bg-gray-800 border border-gray-600 rounded-md py-3 pl-10 pr-3 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Search insights..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-800 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 overflow-x-auto hide-scrollbar">
            <div className="flex space-x-4">
              {categories.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === category.id ? 'bg-green-900/30 text-green-400' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
                  {category.icon && <category.icon className="inline-block h-4 w-4 mr-1 -mt-0.5" />}
                  {category.name}
                </button>)}
            </div>
            <button className="flex items-center text-sm font-medium text-gray-300 hover:text-white">
              <FilterIcon className="h-4 w-4 mr-1" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Featured Insights */}
      {(activeCategory === 'all' || featuredInsights.some(insight => insight.category === activeCategory)) && <div className="bg-[#1A202C] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white">
                Featured Insights
              </h2>
              <Link to="#" className="text-green-400 hover:text-green-300 flex items-center text-sm font-medium">
                View all featured
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredInsights.filter(insight => activeCategory === 'all' || insight.category === activeCategory).map((insight, index) => <div key={insight.id} className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up" style={{
            animationDelay: `${index * 150}ms`
          }}>
                    <div className="h-64 overflow-hidden">
                      <img src={insight.image} alt={insight.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400">
                          {getCategoryName(insight.category)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                        {insight.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{insight.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={insight.authorImage} alt={insight.author} className="h-10 w-10 rounded-full object-cover border-2 border-gray-700" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">
                              {insight.author}
                            </p>
                            <p className="text-xs text-gray-400">
                              {insight.authorRole}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <p className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {insight.date}
                          </p>
                          <p className="flex items-center mt-1">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {insight.readTime}
                          </p>
                        </div>
                      </div>
                      <Link to={`/insights/${insight.id}`} className="absolute inset-0 z-10 aria-hidden" aria-label={`Read more about ${insight.title}`}></Link>
                    </div>
                  </div>)}
            </div>
          </div>
        </div>}

      {/* All Insights */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-white">
              {activeCategory === 'all' ? 'All Insights' : `${getCategoryName(activeCategory)} Insights`}
            </h2>
            <p className="mt-2 text-gray-300">
              {filteredInsights.length}{' '}
              {filteredInsights.length === 1 ? 'article' : 'articles'} available
            </p>
          </div>
          {filteredInsights.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((insight, index) => <div key={insight.id} className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in-up" style={{
            animationDelay: `${index * 100}ms`
          }}>
                  <div className="h-48 overflow-hidden relative">
                    <img src={insight.image} alt={insight.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400">
                        {getCategoryName(insight.category)}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
                      {insight.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <img src={insight.authorImage} alt={insight.author} className="h-6 w-6 rounded-full object-cover" />
                        <span className="ml-2 text-gray-300">
                          {insight.author}
                        </span>
                      </div>
                      <div className="text-gray-400 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {insight.readTime}
                      </div>
                    </div>
                    <Link to={`/insights/${insight.id}`} className="absolute inset-0 z-10 aria-hidden" aria-label={`Read more about ${insight.title}`}></Link>
                  </div>
                </div>)}
            </div> : <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mb-4">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-300 mb-6">
                We couldn't find any insights matching your search criteria.
              </p>
              <button onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
          }} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                Clear filters
              </button>
            </div>}
          {filteredInsights.length > 0 && <div className="mt-12 text-center animate-fade-in-up animation-delay-700">
              <button className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-md text-base font-medium text-white hover:bg-gray-800 transition-colors">
                Load More Insights
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#1A202C] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl animate-fade-in-up">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500 opacity-10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-500 opacity-10 rounded-full"></div>
            </div>
            <div className="relative p-8 md:p-12 lg:flex lg:items-center">
              <div className="lg:w-0 lg:flex-1">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 mr-4">
                    <BookOpenIcon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Stay Informed
                  </h2>
                </div>
                <p className="mt-3 max-w-lg text-lg text-gray-300">
                  Subscribe to our newsletter to receive the latest insights,
                  industry trends, and technology updates directly to your
                  inbox.
                </p>
                <div className="mt-8 sm:w-full sm:max-w-md">
                  <form className="sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter your email" />
                    <button type="submit" className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      Subscribe
                    </button>
                  </form>
                  <p className="mt-3 text-sm text-gray-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-medium text-white mb-4">
                    What you'll receive:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <LightbulbIcon className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">
                        Expert insights and thought leadership
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingUpIcon className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">
                        Industry trends and market analysis
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CalendarIcon className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-300">
                        Upcoming events and webinars
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Insights;
