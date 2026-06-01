import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuitIcon, CloudIcon, CogIcon, LightbulbIcon, ShieldCheckIcon, DatabaseIcon, LayoutIcon, WifiIcon, NetworkIcon, LeafIcon, ChevronRightIcon, CheckIcon, ArrowRightIcon } from 'lucide-react';
const services = [{
  id: 'ai',
  title: 'Artificial Intelligence',
  description: 'Transform your business with AI-powered solutions that drive innovation, efficiency, and growth.',
  icon: BrainCircuitIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our AI solutions help businesses across industries harness the power of artificial intelligence to solve complex problems, automate processes, and gain competitive advantage. We combine deep learning, machine learning, and natural language processing to deliver intelligent systems that learn, adapt, and evolve.`,
  capabilities: ['Machine Learning & Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Conversational AI & Chatbots', 'AI Strategy & Implementation'],
  caseStudies: [{
    title: 'AI-Powered Customer Service Transformation',
    client: 'Global Financial Institution',
    result: '65% reduction in query resolution time with 89% customer satisfaction'
  }, {
    title: 'Predictive Maintenance System',
    client: 'Manufacturing Leader',
    result: '37% reduction in downtime and ₹35 crore annual savings'
  }],
  stats: [{
    value: '45%',
    label: 'Efficiency improvement',
    description: 'Average operational efficiency gains'
  }, {
    value: '3.2x',
    label: 'ROI achieved',
    description: 'Average return on AI investments'
  }, {
    value: '70%',
    label: 'Automation rate',
    description: 'For repetitive cognitive tasks'
  }, {
    value: '85%',
    label: 'Accuracy increase',
    description: 'In predictive analytics models'
  }]
}, {
  id: 'cloud',
  title: 'Cloud',
  description: 'Accelerate innovation and achieve business agility with our comprehensive cloud services.',
  icon: CloudIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our cloud services help organizations design, build, migrate, and manage applications in the cloud. We provide end-to-end solutions across major cloud platforms to help you achieve scalability, security, and cost efficiency while accelerating your digital transformation journey.`,
  capabilities: ['Cloud Strategy & Advisory', 'Cloud Migration & Modernization', 'Cloud-Native Development', 'Multi-Cloud Management', 'Cloud Security & Compliance', 'Serverless Architecture'],
  caseStudies: [{
    title: 'Enterprise-Wide Cloud Migration',
    client: 'Retail Giant',
    result: '40% reduction in IT costs and 3x faster deployment cycles'
  }, {
    title: 'Cloud-Native Application Development',
    client: 'Healthcare Provider',
    result: 'Scalable platform serving 5M+ patients with 99.99% uptime'
  }],
  stats: [{
    value: '40%',
    label: 'Cost reduction',
    description: 'Average IT infrastructure savings'
  }, {
    value: '60%',
    label: 'Faster deployment',
    description: 'Accelerated time-to-market'
  }, {
    value: '99.9%',
    label: 'Uptime',
    description: 'For mission-critical applications'
  }, {
    value: '35%',
    label: 'Resource optimization',
    description: 'Through automated scaling'
  }]
}, {
  id: 'cognitive',
  title: 'Cognitive Business Operations',
  description: 'Reimagine your business operations with AI-driven insights and intelligent automation.',
  icon: CogIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our cognitive business operations combine artificial intelligence, analytics, and automation to transform traditional business processes. We help organizations achieve unprecedented levels of efficiency, accuracy, and customer satisfaction through intelligent operations.`,
  capabilities: ['Intelligent Process Automation', 'Cognitive Analytics', 'Digital Workforce Solutions', 'Business Process Optimization', 'Cognitive Customer Experience', 'Operations Intelligence'],
  caseStudies: [{
    title: 'Cognitive Supply Chain Transformation',
    client: 'Global Consumer Goods Company',
    result: '28% inventory reduction and 45% improvement in forecast accuracy'
  }, {
    title: 'Intelligent Customer Service Operations',
    client: 'Telecommunications Provider',
    result: '52% reduction in operating costs with improved CSAT scores'
  }],
  stats: [{
    value: '52%',
    label: 'Cost reduction',
    description: 'Average operational cost savings'
  }, {
    value: '68%',
    label: 'Process efficiency',
    description: 'Improvement in process cycle times'
  }, {
    value: '43%',
    label: 'Error reduction',
    description: 'Decrease in process errors'
  }, {
    value: '75%',
    label: 'Automation rate',
    description: 'For eligible business processes'
  }]
}, {
  id: 'consulting',
  title: 'Consulting',
  description: 'Navigate complex business challenges with strategic guidance from our industry experts.',
  icon: LightbulbIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our consulting services provide strategic guidance to help organizations navigate complex business challenges, drive innovation, and achieve sustainable growth. We combine industry expertise, technology insights, and business acumen to deliver transformative solutions tailored to your unique needs.`,
  capabilities: ['Digital Strategy & Transformation', 'Technology Strategy & Innovation', 'Business Process Consulting', 'Organizational Change Management', 'IT Strategy & Roadmap', 'Digital Experience Consulting'],
  caseStudies: [{
    title: 'Digital Transformation Strategy',
    client: 'Banking Institution',
    result: 'Comprehensive 3-year roadmap leading to 32% revenue growth'
  }, {
    title: 'Post-Merger Technology Integration',
    client: 'Insurance Provider',
    result: 'Seamless integration completed 4 months ahead of schedule'
  }],
  stats: [{
    value: '32%',
    label: 'Revenue growth',
    description: 'Average increase post-transformation'
  }, {
    value: '47%',
    label: 'Faster implementation',
    description: 'Compared to industry average'
  }, {
    value: '85%',
    label: 'Client satisfaction',
    description: 'For strategic consulting engagements'
  }, {
    value: '3.8x',
    label: 'ROI delivered',
    description: 'Average return on consulting investment'
  }]
}, {
  id: 'cybersecurity',
  title: 'Cybersecurity',
  description: 'Protect your digital assets with our comprehensive security solutions and services.',
  icon: ShieldCheckIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our cybersecurity services help organizations protect their critical assets, detect and respond to threats, and recover from security incidents. We provide end-to-end security solutions that address the entire security lifecycle, from strategy and architecture to implementation and managed services.`,
  capabilities: ['Security Strategy & Architecture', 'Threat Detection & Response', 'Identity & Access Management', 'Cloud Security', 'Security Operations Center', 'Compliance & Risk Management'],
  caseStudies: [{
    title: 'Enterprise Security Transformation',
    client: 'Financial Services Leader',
    result: '75% reduction in security incidents and enhanced regulatory compliance'
  }, {
    title: 'Secure Cloud Migration',
    client: 'Healthcare Organization',
    result: 'Zero security breaches during migration of sensitive patient data'
  }],
  stats: [{
    value: '75%',
    label: 'Incident reduction',
    description: 'Fewer security incidents post-implementation'
  }, {
    value: '60%',
    label: 'Faster detection',
    description: 'Reduced threat detection time'
  }, {
    value: '85%',
    label: 'Compliance rate',
    description: 'Improved regulatory compliance'
  }, {
    value: '45%',
    label: 'Cost reduction',
    description: 'In security incident management'
  }]
}, {
  id: 'data',
  title: 'Data & Analytics',
  description: 'Unlock the value of your data with advanced analytics and insights-driven solutions.',
  icon: DatabaseIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our data and analytics services help organizations harness the power of their data to drive business value. We provide end-to-end solutions from data strategy and architecture to advanced analytics and visualization, enabling data-driven decision making across the enterprise.`,
  capabilities: ['Data Strategy & Governance', 'Data Engineering & Architecture', 'Advanced Analytics & AI', 'Business Intelligence & Visualization', 'Big Data Solutions', 'Data Modernization'],
  caseStudies: [{
    title: 'Enterprise Data Platform Implementation',
    client: 'Retail Corporation',
    result: 'Unified view of 500M+ customer interactions driving 23% sales growth'
  }, {
    title: 'Predictive Analytics Solution',
    client: 'Manufacturing Company',
    result: '42% improvement in production efficiency and quality control'
  }],
  stats: [{
    value: '23%',
    label: 'Sales growth',
    description: 'Through data-driven insights'
  }, {
    value: '42%',
    label: 'Efficiency gains',
    description: 'In operational processes'
  }, {
    value: '65%',
    label: 'Faster reporting',
    description: 'Reduced time for business insights'
  }, {
    value: '78%',
    label: 'Data utilization',
    description: 'Increased use of available data'
  }]
}, {
  id: 'enterprise',
  title: 'Enterprise Solutions',
  description: 'Optimize your business with integrated enterprise solutions tailored to your needs.',
  icon: LayoutIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our enterprise solutions help organizations streamline operations, enhance collaboration, and drive business growth through integrated technology platforms. We deliver end-to-end services for implementing, integrating, and optimizing enterprise applications to meet your specific business requirements.`,
  capabilities: ['ERP Implementation & Optimization', 'CRM Solutions', 'Supply Chain Management', 'Enterprise Integration', 'Digital Workplace Solutions', 'Business Process Management'],
  caseStudies: [{
    title: 'Global ERP Transformation',
    client: 'Manufacturing Leader',
    result: '35% improvement in operational efficiency and 28% cost reduction'
  }, {
    title: 'CRM Implementation',
    client: 'Financial Services Provider',
    result: '47% increase in sales productivity and 29% higher customer retention'
  }],
  stats: [{
    value: '35%',
    label: 'Operational efficiency',
    description: 'Improvement in business processes'
  }, {
    value: '28%',
    label: 'Cost reduction',
    description: 'In operational expenses'
  }, {
    value: '47%',
    label: 'Productivity increase',
    description: 'In sales and service teams'
  }, {
    value: '29%',
    label: 'Customer retention',
    description: 'Improved retention rates'
  }]
}, {
  id: 'iot',
  title: 'IoT Digital Engineering',
  description: 'Connect the physical and digital worlds with our IoT engineering expertise.',
  icon: WifiIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our IoT digital engineering services help organizations build connected products and solutions that bridge the physical and digital worlds. We provide end-to-end IoT capabilities from strategy and design to implementation and management, enabling new business models and improved operational efficiency.`,
  capabilities: ['IoT Strategy & Architecture', 'Connected Product Development', 'Industrial IoT Solutions', 'Edge Computing', 'IoT Analytics & AI', 'IoT Security'],
  caseStudies: [{
    title: 'Smart Manufacturing Transformation',
    client: 'Industrial Equipment Manufacturer',
    result: '34% increase in production efficiency and 45% reduction in maintenance costs'
  }, {
    title: 'Connected Healthcare Solution',
    client: 'Medical Devices Company',
    result: 'Remote monitoring platform connecting 50,000+ devices with 99.9% reliability'
  }],
  stats: [{
    value: '34%',
    label: 'Production efficiency',
    description: 'Increase in manufacturing output'
  }, {
    value: '45%',
    label: 'Maintenance reduction',
    description: 'Lower maintenance costs'
  }, {
    value: '99.9%',
    label: 'System reliability',
    description: 'For mission-critical IoT platforms'
  }, {
    value: '50k+',
    label: 'Connected devices',
    description: 'Managed on a single platform'
  }]
}, {
  id: 'network',
  title: 'Network Solutions',
  description: 'Build resilient, secure, and scalable networks to support your digital initiatives.',
  icon: NetworkIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our network solutions and services help organizations design, implement, and manage resilient, secure, and scalable networks that support their digital initiatives. We provide comprehensive services from network strategy and architecture to implementation and managed services.`,
  capabilities: ['Network Strategy & Architecture', 'Software-Defined Networking', 'Network Security', 'Cloud Networking', '5G & Edge Computing', 'Network Automation'],
  caseStudies: [{
    title: 'Global Network Transformation',
    client: 'Multinational Corporation',
    result: '60% improvement in network performance with 40% cost reduction'
  }, {
    title: 'SD-WAN Implementation',
    client: 'Retail Chain',
    result: 'Connected 500+ locations with 99.99% uptime and enhanced security'
  }],
  stats: [{
    value: '60%',
    label: 'Performance boost',
    description: 'Improved network performance'
  }, {
    value: '40%',
    label: 'Cost reduction',
    description: 'Lower network operation costs'
  }, {
    value: '99.99%',
    label: 'Network uptime',
    description: 'Reliability for business-critical systems'
  }, {
    value: '500+',
    label: 'Connected locations',
    description: 'Seamlessly integrated network'
  }]
}, {
  id: 'sustainability',
  title: 'Sustainability Services',
  description: 'Achieve your sustainability goals with technology-enabled solutions and strategies.',
  icon: LeafIcon,
  color: 'bg-gradient-to-br from-secondary-500 to-accent-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-accent-300',
  borderColor: 'border-accent-300',
  content: `Our sustainability services help organizations achieve their environmental, social, and governance (ESG) goals through technology-enabled solutions. We provide end-to-end services from sustainability strategy and assessment to implementation and reporting, enabling sustainable business practices and positive environmental impact.`,
  capabilities: ['Sustainability Strategy & Roadmap', 'Carbon Footprint Management', 'Sustainable Supply Chain', 'ESG Reporting & Analytics', 'Circular Economy Solutions', 'Green IT & Cloud Optimization'],
  caseStudies: [{
    title: 'Enterprise Carbon Management Platform',
    client: 'Energy Company',
    result: '35% reduction in carbon emissions and comprehensive ESG reporting'
  }, {
    title: 'Sustainable Supply Chain Transformation',
    client: 'Consumer Goods Manufacturer',
    result: '42% reduction in supply chain emissions and improved supplier compliance'
  }],
  stats: [{
    value: '35%',
    label: 'Carbon reduction',
    description: 'Lower carbon emissions'
  }, {
    value: '42%',
    label: 'Supply chain impact',
    description: 'Reduced environmental footprint'
  }, {
    value: '85%',
    label: 'ESG compliance',
    description: 'Improved regulatory alignment'
  }, {
    value: '28%',
    label: 'Energy savings',
    description: 'Through optimized IT operations'
  }]
}];
const WhatWeDo = () => {
  const [activeService, setActiveService] = useState(services[0].id);
  const selectedService = services.find(service => service.id === activeService);
  return <div className="bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 w-full text-white">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-shimmer"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-accent-500/5 rounded-full animate-float-slow"></div>
      <div className="absolute top-20 right-20 w-60 h-60 bg-secondary-500/5 rounded-full animate-float-medium"></div>
      <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-accent-500/5 rounded-full animate-float-fast"></div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100">
            Transform Your Business with Advanced Technologies
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-white/80 animate-fade-in-up animation-delay-300 leading-relaxed">
            Discover how our comprehensive technology solutions can drive
            innovation, efficiency, and growth for your organization.
          </p>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="fill-current text-primary-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
    {/* Services Section */}
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary-600/20 to-accent-600/20 border border-accent-300/30 text-accent-300 text-sm font-medium mb-4 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-accent-300 mr-2"></span>
          Our Services
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100">Our Services</h2>
        <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          We offer a comprehensive range of technology services to help you
          navigate the digital landscape and achieve your business objectives.
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Service Navigation - Left Side */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8 animate-fade-in-left">
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-royal-glow overflow-hidden">
            {services.map(service => <button key={service.id} className={`w-full flex items-center px-4 py-3 text-left border-l-4 transition-all hover:bg-white/10 ${activeService === service.id ? `text-accent-300 bg-white/10 border-l-4 border-l-accent-300` : 'border-l-transparent text-white/70'}`} onClick={() => setActiveService(service.id)}>
              <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${activeService === service.id ? 'bg-accent-300/20' : 'bg-white/10'}`}>
                <service.icon className={`h-5 w-5 ${activeService === service.id ? 'text-accent-300' : 'text-white/60'}`} />
              </div>
              <span className={`ml-3 font-medium ${activeService === service.id ? 'text-accent-300' : 'text-white/70'}`}>
                {service.title}
              </span>
            </button>)}
          </div>
        </div>
        {/* Service Content - Right Side */}
        {selectedService && <div className="w-full md:w-3/4 animate-fade-in-right">
          <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-royal-glow overflow-hidden">
            {/* Service Header */}
            <div className={`bg-gradient-to-r from-secondary-600/20 to-primary-600/20 px-6 py-6 border-b border-white/20 transition-all duration-500`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-16 w-16 rounded-lg bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center text-white transform transition-transform duration-500 hover:scale-110 shadow-lg`}>
                  <selectedService.icon className="h-8 w-8" />
                </div>
                <div className="ml-5">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                  <p className="mt-1 text-lg text-white/80">
                    {selectedService.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Service Details */}
            <div className="p-6">
              <div className="prose max-w-none text-white/80 mb-8">
                <p className="text-lg leading-relaxed">{selectedService.content}</p>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {selectedService.stats.map((stat, index) => <div key={index} className={`bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-royal-glow`}>
                  <p className={`text-3xl font-bold text-accent-300`}>
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-white">
                    {stat.label}
                  </p>
                  <p className="text-xs text-white/60">
                    {stat.description}
                  </p>
                </div>)}
              </div>
              {/* Key Capabilities */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Key Capabilities
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.capabilities.map((capability, index) => <li key={index} className="flex items-start group">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full bg-accent-300/20 flex items-center justify-center text-accent-300 mt-0.5 transition-all duration-300 group-hover:scale-110`}>
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span className="ml-2 text-white/80">
                      {capability}
                    </span>
                  </li>)}
                </ul>
              </div>
              {/* Case Studies */}
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">
                  Case Studies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedService.caseStudies.map((caseStudy, index) => <div key={index} className={`bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-royal-glow transform hover:-translate-y-1`}>
                    <h5 className="text-lg font-semibold text-white mb-2">
                      {caseStudy.title}
                    </h5>
                    <p className="text-white/80 mb-2">
                      <span className="font-medium">Client:</span>{' '}
                      {caseStudy.client}
                    </p>
                    <p className="text-white/80">
                      <span className="font-medium">Result:</span>{' '}
                      {caseStudy.result}
                    </p>
                  </div>)}
                </div>
              </div>
              {/* CTA */}
              <div className="mt-8 flex justify-center">
                <Link to="/contact" className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-royal-glow text-white bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 transition-all duration-300 transform hover:scale-105`}>
                  Discuss Your {selectedService.title} Needs
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
    {/* CTA Section */}
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500/5 rounded-full animate-float-slow blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/5 rounded-full animate-float-medium blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-fade-in-left">
          <span className="block">Ready to transform your business?</span>
          <span className="block text-white/80">
            Let's discuss how our services can help you achieve your goals.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4 animate-fade-in-right">
          <Link to="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-primary-600 bg-white hover:bg-accent-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get in touch
          </Link>
          <Link to="/industries" className="inline-flex items-center justify-center px-5 py-3 border border-white/30 text-base font-medium rounded-full text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            Explore Industries
          </Link>
        </div>
      </div>
    </div>
  </div>;
};
export default WhatWeDo;