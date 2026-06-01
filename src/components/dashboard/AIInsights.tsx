import React, { useEffect, useState } from 'react';
import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb, BarChart3, ArrowRight, ChevronRight, RefreshCw, CheckCircle, Search, Plus, Sparkles, ArrowUpRight, Calendar, FileText, PieChart, HelpCircle, X, ChevronDown, Filter, Download, Share2 } from 'lucide-react';
const AIInsights = () => {
  const [activeTab, setActiveTab] = useState('predictions');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [confidenceFilter, setConfidenceFilter] = useState(75);
  useEffect(() => {
    // Auto-hide the tip after 10 seconds
    const timer = setTimeout(() => {
      setShowTip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  const refreshInsights = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };
  const predictions = [{
    id: 1,
    title: 'Project Timeline Risk',
    project: 'Enterprise Cloud Migration',
    description: 'Based on current velocity and resource allocation, this project has a 72% chance of delay by 2-3 weeks.',
    impact: 'high',
    recommendation: 'Consider allocating 2 additional developers to the database migration phase.',
    confidence: 87,
    date: 'Generated today at 8:34 AM',
    category: 'Timeline',
    details: 'Here is the fixed string:  "The AI model has analysed historical project data, current team velocity metrics, and resource allocation patterns to identify a high probability of timeline slippage. The database migration phase is currently understaffed relative to its complexity, and the current team is showing signs of capacity constraints based on recent velocity metrics."',
    actions: ['Assign resources', 'Adjust timeline', 'Monitor closely', 'Dismiss alert']
  }, {
    id: 2,
    title: 'Budget Forecast Alert',
    project: 'AI-Powered Customer Analytics',
    description: 'Current spending trajectory indicates a potential 15% budget overrun by project completion.',
    impact: 'medium',
    recommendation: 'Review vendor contracts and optimize cloud resource allocation to reduce costs.',
    confidence: 92,
    date: 'Generated today at 8:34 AM',
    category: 'Budget',
    details: 'Predictive analysis of current expenditure patterns shows that the project is consuming budget at a rate that will exceed allocated funds by approximately 15%. The primary cost drivers are third-party vendor services and cloud computing resources, which are being utilized at higher rates than initially estimated.',
    actions: ['Review expenses', 'Optimize resources', 'Request budget increase', 'Dismiss alert']
  }, {
    id: 3,
    title: 'Resource Optimization',
    project: 'Multiple Projects',
    description: 'Team utilization analysis shows 3 team members with skills that could be better allocated across projects.',
    impact: 'medium',
    recommendation: 'Reassign resources based on the AI-generated optimization plan.',
    confidence: 89,
    date: 'Generated today at 8:34 AM',
    category: 'Resources',
    details: 'The AI resource optimisation model has identified inefficiencies in the current team allocation. Three team members have skill sets that would provide higher value if reassigned to different projects based on priority, timeline constraints, and skill requirements. The suggested reallocation could improve overall portfolio delivery by an estimated 12%.',
    actions: ['View optimization plan', 'Schedule resource meeting', 'Implement changes', 'Dismiss alert']
  }];
  const opportunities = [{
    id: 1,
    title: 'Cross-selling Opportunity',
    client: 'FinSecure Holdings',
    description: "Client's usage patterns and recent inquiries indicate high potential for cybersecurity services expansion.",
    potentialValue: '$240,000',
    probability: '73%',
    nextSteps: 'Schedule a security assessment presentation with CTO and CISO.',
    category: 'Cross-sell',
    details: "Analysis of client interactions, support tickets, and product usage reveals growing security concerns and interest in advanced threat protection. The clients' recent infrastructure expansion and regulatory compliance requirements create an ideal opportunity for our comprehensive security assessment and managed security services offerings, which include actions such as creating a proposal, scheduling a meeting, assigning an account manager, and dismissing the opportunity."
  }, {
    id: 2,
    title: 'Contract Renewal Optimization',
    client: 'GlobalRetail Inc.',
    description: 'Analytics suggest opportunity to upgrade service tier during upcoming renewal with 82% acceptance probability.',
    potentialValue: '$120,000',
    probability: '82%',
    nextSteps: 'Prepare enhanced service package proposal highlighting new features.',
    category: 'Renewal',
    details: "The client's current service utilization is approaching the limits of their current tier, and they have made several inquiries about additional capabilities. Usage pattern analysis indicates that they would benefit from our premium service tier. Historical data from similar clients suggests a high probability of conversion with a properly structured offer emphasizing the specific features they've shown interest in. They have also expressed interest in: actions ['Draft renewal proposal', 'Create comparison chart', 'Schedule discussion', 'Dismiss opportunity']."
  }, {
    id: 3,
    title: 'Strategic Partnership',
    client: 'MediHealth Solutions',
    description: "Client's expansion into APAC region aligns with our growth strategy, presenting partnership opportunity.",
    potentialValue: '$1.2M',
    probability: '64%',
    nextSteps: 'Arrange executive meeting to discuss co-development opportunities.',
    category: 'Partnership',
    details: 'MediHealth Solutions has begun its expansion into the Asia-Pacific region, which aligns with our strategic growth initiatives. Their healthcare technology needs in these new markets match our capabilities, and they lack established vendor relationships in the region. This presents an opportunity for a strategic partnership that could include co-developed solutions, preferred vendor status, and joint marketing initiatives.',
    actions: ['Prepare partnership brief', 'Schedule executive meeting', 'Develop proposal', 'Dismiss opportunity']
  }];
  const marketInsights = [{
    id: 1,
    title: 'Healthcare Tech Spending Surge',
    description: 'AI analysis of market data indicates 37% increase in healthcare technology investment in Q3, with focus on patient data platforms.',
    relevance: 'high',
    recommendation: 'Prioritize healthcare vertical in North America and Europe regions.',
    source: 'Analysis of 230+ market reports and investment data',
    category: 'Industry Trend',
    details: 'Comprehensive analysis of venture capital flows, corporate IT budget allocations, and regulatory filings shows a significant increase in healthcare technology investments. The primary focus areas are patient data platforms, interoperability solutions, and AI-powered diagnostic tools. This trend is most pronounced in North America and Western Europe, where regulatory changes are driving adoption.',
    actions: ['Download full report', 'Share with team', 'Create action plan', 'Dismiss insight']
  }, {
    id: 2,
    title: 'Regulatory Impact Alert',
    description: 'New data privacy regulations in EU and APAC will impact 43% of our financial services clients within 6 months.',
    relevance: 'high',
    recommendation: 'Develop compliance assessment offering and proactive outreach campaign.',
    source: 'Regulatory monitoring system and impact analysis',
    category: 'Regulatory',
    details: 'New data privacy regulations in the European Union (enhanced GDPR enforcement) and the Asia-Pacific regions (particularly Singapore, Japan, and Australia) will create significant compliance requirements for financial institutions. Our analysis indicates that 43% of our financial services clients will need to make substantial changes to their data handling practices within six months. This represents both a risk to existing implementations and an opportunity for compliance-focused services.',
    actions: ['View affected clients', 'Download regulatory brief', 'Create service offering', 'Dismiss insight']
  }, {
    id: 3,
    title: 'Emerging Technology Trend',
    description: 'Significant growth in zero-trust security adoption among enterprise clients, with 68% planning implementation.',
    relevance: 'medium',
    recommendation: 'Enhance zero-trust security capabilities and develop thought leadership content.',
    source: 'Client survey data and industry research analysis',
    category: 'Technology Trend',
    details: 'Analysis of client surveys, industry research, and technology adoption patterns reveals an accelerating adoption of zero-trust security architectures among enterprise organizations. Sixty-eight per cent of enterprises surveyed indicate plans to implement or expand zero-trust models in the next twelve months. This represents a significant shift from perimeter-based security approaches, and creates opportunities for advisory, implementation, and managed services.',
    actions: ['View capability assessment', 'Create content strategy', 'Develop service offering', 'Dismiss insight']
  }];
  const getImpactColor = impact => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30';
      case 'medium':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30';
      case 'low':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 border border-green-200 dark:border-green-800/30';
      default:
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/30';
    }
  };
  const getCategoryIcon = category => {
    switch (category?.toLowerCase()) {
      case 'timeline':
        return <Calendar className="h-4 w-4" />;
      case 'budget':
        return <PieChart className="h-4 w-4" />;
      case 'resources':
        return <UsersIcon className="h-4 w-4" />;
      case 'cross-sell':
        return <ArrowUpRight className="h-4 w-4" />;
      case 'renewal':
        return <RefreshCw className="h-4 w-4" />;
      case 'partnership':
        return <Handshake className="h-4 w-4" />;
      case 'industry trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'regulatory':
        return <FileText className="h-4 w-4" />;
      case 'technology trend':
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };
  const UsersIcon = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>;
  const Handshake = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
    </svg>;
  const getActiveData = () => {
    switch (activeTab) {
      case 'predictions':
        return predictions.filter(item => item.confidence >= confidenceFilter);
      case 'opportunities':
        return opportunities.filter(item => parseInt(item.probability) >= confidenceFilter);
      case 'market':
        return marketInsights;
      default:
        return [];
    }
  };
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Insight Tip */}
      {showTip && <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-blue-100 dark:border-blue-800/30">
          <button onClick={() => setShowTip(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                AI-Powered Insights
              </h3>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  These insights are generated by our AI system analyzing
                  patterns across your projects, clients, and market data. Click
                  on any insight to see detailed analysis and recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-4">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Insights
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered analysis and recommendations
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4 mr-1.5" />
            Filter
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={refreshInsights} className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Insights
          </button>
        </div>
      </div>
      {/* Filter Panel */}
      {filterOpen && <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label htmlFor="confidence-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Confidence: {confidenceFilter}%
              </label>
              <input id="confidence-filter" type="range" min="0" max="100" value={confidenceFilter} onChange={e => setConfidenceFilter(parseInt(e.target.value))} className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                  All
                </button>
                <button className="px-2 py-1 text-xs font-medium rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                  Timeline
                </button>
                <button className="px-2 py-1 text-xs font-medium rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                  Budget
                </button>
                <button className="px-2 py-1 text-xs font-medium rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                  Resources
                </button>
              </div>
            </div>
          </div>
        </div>}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'predictions' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => setActiveTab('predictions')}>
            <TrendingUp className="inline-block h-4 w-4 mr-2" />
            Predictive Alerts
          </button>
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'opportunities' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => setActiveTab('opportunities')}>
            <Lightbulb className="inline-block h-4 w-4 mr-2" />
            Business Opportunities
          </button>
          <button className={`py-4 px-6 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'market' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`} onClick={() => setActiveTab('market')}>
            <BarChart3 className="inline-block h-4 w-4 mr-2" />
            Market Intelligence
          </button>
        </nav>
      </div>
      <div className="px-6 py-4">
        {activeTab === 'predictions' && <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Predictive Project Insights
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Last updated: Today at 8:34 AM
              </div>
            </div>
            <div className="space-y-4">
              {getActiveData().length > 0 ? getActiveData().map(prediction => <div key={prediction.id} className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow ${expandedInsight === prediction.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-lg ${prediction.impact === 'high' ? 'bg-red-100 dark:bg-red-900/30' : prediction.impact === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex items-center justify-center mr-4`}>
                            {prediction.impact === 'high' ? <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" /> : <TrendingUp className={`h-5 w-5 ${prediction.impact === 'medium' ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`} />}
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                {prediction.title}
                              </h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                                {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)}{' '}
                                Impact
                              </span>
                              {prediction.category && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                  {getCategoryIcon(prediction.category)}
                                  {prediction.category}
                                </span>}
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {prediction.project}
                            </p>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              {prediction.description}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setExpandedInsight(expandedInsight === prediction.id ? null : prediction.id)} className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                          {expandedInsight === prediction.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                        <div className="flex items-start">
                          <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              AI Recommendation
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {prediction.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {expandedInsight === prediction.id && <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            <p className="font-medium text-gray-900 dark:text-white mb-2">
                              Detailed Analysis
                            </p>
                            <p>{prediction.details}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {prediction.actions.map((action, index) => <button key={index} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                {action}
                              </button>)}
                          </div>
                        </div>}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                            AI Confidence:
                          </span>
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full" style={{
                      width: `${prediction.confidence}%`
                    }}></div>
                          </div>
                          <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {prediction.confidence}%
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            Dismiss
                          </button>
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>) : <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 mb-4">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    No matching alerts
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your filter criteria or check back later
                  </p>
                </div>}
            </div>
            <div className="flex justify-center">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors">
                View All Predictions
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>}
        {activeTab === 'opportunities' && <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                AI-Identified Business Opportunities
              </h3>
              <div className="flex">
                <div className="relative mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" placeholder="Search opportunities" className="pl-10 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100" />
                </div>
                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Manually
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {getActiveData().length > 0 ? getActiveData().map(opportunity => <div key={opportunity.id} className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow ${expandedInsight === opportunity.id ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}`}>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                            <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                {opportunity.title}
                              </h4>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30">
                                {opportunity.potentialValue}
                              </span>
                              {opportunity.category && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                  {getCategoryIcon(opportunity.category)}
                                  {opportunity.category}
                                </span>}
                            </div>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              Client: {opportunity.client}
                            </p>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                              {opportunity.description}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setExpandedInsight(expandedInsight === opportunity.id ? null : opportunity.id)} className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                          {expandedInsight === opportunity.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Recommended Next Steps
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {opportunity.nextSteps}
                            </p>
                          </div>
                        </div>
                      </div>
                      {expandedInsight === opportunity.id && <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            <p className="font-medium text-gray-900 dark:text-white mb-2">
                              Opportunity Details
                            </p>
                            <p>{opportunity.details}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.actions.map((action, index) => <button key={index} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                {action}
                              </button>)}
                          </div>
                        </div>}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                            Success Probability:
                          </span>
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-600 dark:bg-green-500 h-1.5 rounded-full" style={{
                      width: opportunity.probability.replace('%', '') + '%'
                    }}></div>
                          </div>
                          <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {opportunity.probability}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            Save for Later
                          </button>
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors">
                            Pursue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>) : <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 mb-4">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    No matching opportunities
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your filter criteria or check back later
                  </p>
                </div>}
            </div>
            <div className="flex justify-center">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors">
                View All Opportunities
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>}
        {activeTab === 'market' && <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Market Intelligence Insights
              </h3>
              <div className="flex items-center">
                <select className="mr-2 text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100">
                  <option>All Regions</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                  <option>Latin America</option>
                </select>
                <select className="text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100">
                  <option>All Industries</option>
                  <option>Financial Services</option>
                  <option>Healthcare</option>
                  <option>Technology</option>
                  <option>Manufacturing</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {marketInsights.map(insight => <div key={insight.id} className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow ${expandedInsight === insight.id ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                          <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(insight.relevance)}`}>
                              {insight.relevance.charAt(0).toUpperCase() + insight.relevance.slice(1)}{' '}
                              Relevance
                            </span>
                            {insight.category && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                {getCategoryIcon(insight.category)}
                                {insight.category}
                              </span>}
                          </div>
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            {insight.description}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Source: {insight.source}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)} className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                        {expandedInsight === insight.id ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Strategic Recommendation
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {insight.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                    {expandedInsight === insight.id && <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                          <p className="font-medium text-gray-900 dark:text-white mb-2">
                            Detailed Analysis
                          </p>
                          <p>{insight.details}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {insight.actions.map((action, index) => <button key={index} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                              {action}
                            </button>)}
                        </div>
                      </div>}
                    <div className="mt-4 flex justify-end space-x-2">
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Save to Library
                      </button>
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                        <Share2 className="h-3.5 w-3.5 mr-1" />
                        Share with Team
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="flex justify-center">
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors">
                View All Market Insights
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>}
      </div>
    </div>;
};
export default AIInsights;