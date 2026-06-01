import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BuildingIcon, HeartPulseIcon, ShoppingBagIcon, PlaneIcon, LightbulbIcon, TruckIcon, GlobeIcon, CheckIcon, ArrowRightIcon, ShieldIcon } from 'lucide-react';
const industries = [{
  id: 'banking',
  title: 'Banking',
  description: 'Digital transformation solutions for modern banking institutions.',
  icon: BuildingIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our banking solutions help financial institutions navigate digital transformation, enhance customer experiences, and optimize operations. We combine industry expertise with cutting-edge technology to deliver secure, scalable, and innovative solutions that address the unique challenges of the banking sector.`,
  capabilities: ['Digital Banking Platforms', 'Payments Modernization', 'Regulatory Compliance', 'Risk Management', 'Customer Experience', 'Core Banking Transformation'],
  caseStudies: [{
    title: 'Digital Banking Transformation',
    client: 'Leading National Bank',
    result: '42% increase in digital engagement and 28% cost reduction'
  }, {
    title: 'Payment Processing Platform',
    client: 'Multinational Financial Services',
    result: '99.99% uptime with 65% improved transaction processing time'
  }],
  stats: [{
    value: '42%',
    label: 'Digital engagement',
    description: 'Increase in customer digital adoption'
  }, {
    value: '28%',
    label: 'Cost reduction',
    description: 'Operational efficiency improvements'
  }, {
    value: '65%',
    label: 'Processing speed',
    description: 'Faster transaction processing'
  }, {
    value: '99.99%',
    label: 'System uptime',
    description: 'For critical banking applications'
  }]
}, {
  id: 'healthcare',
  title: 'Healthcare',
  description: 'Technology solutions that transform patient care and healthcare operations.',
  icon: HeartPulseIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our healthcare solutions help providers, payers, and life sciences organizations leverage technology to improve patient outcomes, enhance operational efficiency, and drive innovation. We deliver end-to-end services that address the complex challenges of the healthcare ecosystem.`,
  capabilities: ['Electronic Health Records', 'Telemedicine Platforms', 'Healthcare Analytics', 'Patient Engagement', 'Clinical Decision Support', 'Healthcare Interoperability'],
  caseStudies: [{
    title: 'Telemedicine Platform Implementation',
    client: 'Regional Healthcare Network',
    result: '300% increase in virtual visits with 92% patient satisfaction'
  }, {
    title: 'Healthcare Data Analytics Solution',
    client: 'National Hospital Chain',
    result: '18% reduction in readmissions and $12M annual savings'
  }],
  stats: [{
    value: '300%',
    label: 'Virtual care growth',
    description: 'Increase in telemedicine adoption'
  }, {
    value: '92%',
    label: 'Patient satisfaction',
    description: 'For digital healthcare services'
  }, {
    value: '18%',
    label: 'Readmission reduction',
    description: 'Through predictive analytics'
  }, {
    value: '$12M',
    label: 'Annual savings',
    description: 'Through operational improvements'
  }]
}, {
  id: 'retail',
  title: 'Retail',
  description: 'Digital commerce solutions that create seamless shopping experiences.',
  icon: ShoppingBagIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our retail solutions help merchants and brands create seamless omnichannel experiences, optimize supply chains, and leverage data-driven insights. We combine industry expertise with cutting-edge technology to deliver innovative solutions that drive growth and customer loyalty.`,
  capabilities: ['Omnichannel Commerce', 'Customer Experience', 'Supply Chain Optimization', 'Retail Analytics', 'Inventory Management', 'Personalization & Loyalty'],
  caseStudies: [{
    title: 'Omnichannel Retail Transformation',
    client: 'Global Fashion Retailer',
    result: '38% increase in online sales and 24% improvement in inventory turnover'
  }, {
    title: 'Customer Data Platform Implementation',
    client: 'Specialty Retailer',
    result: '45% increase in marketing ROI with 28% higher customer retention'
  }],
  stats: [{
    value: '38%',
    label: 'Digital sales growth',
    description: 'Increase in online revenue'
  }, {
    value: '24%',
    label: 'Inventory efficiency',
    description: 'Improved turnover rate'
  }, {
    value: '45%',
    label: 'Marketing ROI',
    description: 'Through personalization'
  }, {
    value: '28%',
    label: 'Customer retention',
    description: 'Improved loyalty metrics'
  }]
}, {
  id: 'travel',
  title: 'Travel & Hospitality',
  description: 'Digital solutions that enhance guest experiences and operational efficiency.',
  icon: PlaneIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our travel and hospitality solutions help airlines, hotels, and travel companies transform guest experiences, optimize operations, and drive digital innovation. We deliver end-to-end services that address the unique challenges of the travel ecosystem.`,
  capabilities: ['Digital Guest Experience', 'Reservation Systems', 'Revenue Management', 'Loyalty Programs', 'Operations Optimization', 'Travel Analytics'],
  caseStudies: [{
    title: 'Digital Guest Experience Platform',
    client: 'International Hotel Chain',
    result: '52% increase in mobile bookings and 34% higher guest satisfaction'
  }, {
    title: 'Revenue Management System',
    client: 'Global Airline',
    result: '18% increase in revenue per available seat and 12% cost savings'
  }],
  stats: [{
    value: '52%',
    label: 'Mobile bookings',
    description: 'Increase in direct reservations'
  }, {
    value: '34%',
    label: 'Guest satisfaction',
    description: 'Improvement in NPS score'
  }, {
    value: '18%',
    label: 'Revenue growth',
    description: 'Per available capacity'
  }, {
    value: '12%',
    label: 'Cost reduction',
    description: 'In operational expenses'
  }]
}, {
  id: 'insurance',
  title: 'Insurance',
  description: 'Technology solutions that modernize insurance operations and customer engagement.',
  icon: ShieldIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our insurance solutions help carriers, brokers, and insurtechs modernize operations, enhance customer engagement, and drive digital innovation. We combine industry expertise with cutting-edge technology to deliver secure, scalable solutions that address the unique challenges of the insurance sector.`,
  capabilities: ['Policy Administration', 'Claims Management', 'Underwriting Automation', 'Customer Engagement', 'Insurance Analytics', 'Digital Insurance Platforms'],
  caseStudies: [{
    title: 'Claims Processing Automation',
    client: 'Property & Casualty Insurer',
    result: '65% reduction in claims processing time with 28% cost savings'
  }, {
    title: 'Digital Customer Portal',
    client: 'Life Insurance Provider',
    result: '48% increase in self-service adoption and 32% higher customer satisfaction'
  }],
  stats: [{
    value: '65%',
    label: 'Faster claims',
    description: 'Reduced processing time'
  }, {
    value: '28%',
    label: 'Cost savings',
    description: 'In claims operations'
  }, {
    value: '48%',
    label: 'Self-service',
    description: 'Increased digital adoption'
  }, {
    value: '32%',
    label: 'Satisfaction',
    description: 'Improved customer metrics'
  }]
}, {
  id: 'energy',
  title: 'Energy & Utilities',
  description: 'Digital solutions that modernize infrastructure and enhance sustainability.',
  icon: LightbulbIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our energy and utilities solutions help companies modernize infrastructure, enhance customer experiences, and drive sustainable operations. We deliver end-to-end services that address the complex challenges of the evolving energy landscape.`,
  capabilities: ['Smart Grid Solutions', 'Asset Management', 'Customer Experience', 'Energy Analytics', 'Sustainability Platforms', 'Field Service Optimization'],
  caseStudies: [{
    title: 'Smart Grid Implementation',
    client: 'Regional Utility Provider',
    result: '24% reduction in outage duration and 18% improvement in operational efficiency'
  }, {
    title: 'Customer Engagement Platform',
    client: 'Energy Retailer',
    result: '42% increase in digital engagement and 35% reduction in service costs'
  }],
  stats: [{
    value: '24%',
    label: 'Outage reduction',
    description: 'Decreased service disruptions'
  }, {
    value: '18%',
    label: 'Operational efficiency',
    description: 'Through digital transformation'
  }, {
    value: '42%',
    label: 'Digital engagement',
    description: 'Increased customer adoption'
  }, {
    value: '35%',
    label: 'Service cost reduction',
    description: 'Through self-service options'
  }]
}, {
  id: 'manufacturing',
  title: 'Manufacturing',
  description: 'Industry 4.0 solutions that transform production and supply chains.',
  icon: TruckIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our manufacturing solutions help companies embrace Industry 4.0, optimize operations, and create resilient supply chains. We combine industry expertise with cutting-edge technology to deliver innovative solutions that drive efficiency, quality, and growth.`,
  capabilities: ['Smart Manufacturing', 'Supply Chain Visibility', 'Predictive Maintenance', 'Quality Management', 'Industrial IoT', 'Manufacturing Analytics'],
  caseStudies: [{
    title: 'Smart Factory Transformation',
    client: 'Global Manufacturer',
    result: '32% increase in production efficiency and 28% reduction in maintenance costs'
  }, {
    title: 'Supply Chain Visibility Platform',
    client: 'Industrial Equipment Manufacturer',
    result: '45% improvement in on-time delivery and 22% inventory reduction'
  }],
  stats: [{
    value: '32%',
    label: 'Production efficiency',
    description: 'Increased output capacity'
  }, {
    value: '28%',
    label: 'Maintenance savings',
    description: 'Through predictive analytics'
  }, {
    value: '45%',
    label: 'On-time delivery',
    description: 'Improved logistics performance'
  }, {
    value: '22%',
    label: 'Inventory reduction',
    description: 'Optimized supply chain'
  }]
}, {
  id: 'government',
  title: 'Public Sector',
  description: 'Digital government solutions that enhance citizen services and operations.',
  icon: GlobeIcon,
  color: 'bg-secondary-500',
  lightColor: 'bg-secondary-50',
  textColor: 'text-secondary-600',
  borderColor: 'border-secondary-200',
  content: `Our public sector solutions help government agencies enhance citizen services, optimize operations, and drive digital transformation. We deliver secure, compliant, and accessible solutions that address the unique challenges of government organizations.`,
  capabilities: ['Digital Citizen Services', 'Government Operations', 'Public Safety & Security', 'Health & Human Services', 'Smart Cities', 'Government Analytics'],
  caseStudies: [{
    title: 'Digital Citizen Services Platform',
    client: 'State Government Agency',
    result: '65% increase in online service adoption and 42% reduction in processing time'
  }, {
    title: 'Smart City Implementation',
    client: 'Metropolitan Municipality',
    result: '28% improvement in public service efficiency and 18% energy savings'
  }],
  stats: [{
    value: '65%',
    label: 'Digital adoption',
    description: 'Increased online services usage'
  }, {
    value: '42%',
    label: 'Processing speed',
    description: 'Faster citizen service delivery'
  }, {
    value: '28%',
    label: 'Service efficiency',
    description: 'Improved public operations'
  }, {
    value: '18%',
    label: 'Energy savings',
    description: 'Through smart infrastructure'
  }]
}];
const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0].id);
  const selectedIndustry = industries.find(industry => industry.id === activeIndustry);
  
  return (
    <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 w-full text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary-500 opacity-10 rounded-full animate-float-slow"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-secondary-500 opacity-10 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-secondary-500 opacity-10 rounded-full animate-float-fast"></div>
          <div className="absolute -bottom-20 right-1/3 w-60 h-60 bg-secondary-500 opacity-5 rounded-full animate-float-medium"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in-up">
              Industry-Specific Solutions
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-300">
              Discover how our tailored technology solutions address the unique
              challenges and opportunities in your industry.
            </p>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="fill-current text-[#1A202C]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Industries Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white">
            Our Industry Expertise
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            We combine deep industry knowledge with technical expertise to
            deliver solutions that drive transformation and growth.
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Industry Navigation - Left Side */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8 animate-fade-in-left">
            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden">
              {industries.map(industry => <button key={industry.id} className={`w-full flex items-center px-4 py-3 text-left border-l-4 transition-all hover:bg-white/5 ${activeIndustry === industry.id ? `${industry.textColor} bg-white/10 border-l-4 border-l-secondary-500` : 'border-l-transparent'}`} onClick={() => setActiveIndustry(industry.id)}>
                  <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${activeIndustry === industry.id ? 'bg-secondary-500/20' : 'bg-white/10'}`}>
                    <industry.icon className={`h-5 w-5 ${activeIndustry === industry.id ? 'text-secondary-400' : 'text-gray-400'}`} />
                  </div>
                  <span className={`ml-3 font-medium ${activeIndustry === industry.id ? 'text-secondary-400' : 'text-gray-300'}`}>
                    {industry.title}
                  </span>
                </button>)}
            </div>
          </div>
          {/* Industry Content - Right Side */}
          {selectedIndustry && <div className="w-full md:w-3/4 animate-fade-in-right">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-sm overflow-hidden">
                {/* Industry Header */}
                <div className={`bg-white/5 px-6 py-6 border-b border-white/10 transition-all duration-500`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-16 w-16 rounded-lg bg-secondary-500 flex items-center justify-center text-white transform transition-transform duration-500 hover:scale-110`}>
                      <selectedIndustry.icon className="h-8 w-8" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-2xl font-bold text-white">
                        {selectedIndustry.title}
                      </h3>
                      <p className="mt-1 text-lg text-gray-300">
                        {selectedIndustry.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Industry Details */}
                <div className="p-6">
                  <div className="prose max-w-none text-gray-300 mb-8">
                    <p className="text-lg">{selectedIndustry.content}</p>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {selectedIndustry.stats.map((stat, index) => <div key={index} className={`bg-gray-700 rounded-lg p-4 border border-gray-600 transform transition-all duration-500 hover:scale-105 hover:shadow-md`}>
                        <p className={`text-3xl font-bold text-secondary-400`}>
                          {stat.value}
                        </p>
                        <p className="text-sm font-medium text-white">
                          {stat.label}
                        </p>
                        <p className="text-xs text-gray-400">
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
                      {selectedIndustry.capabilities.map((capability, index) => <li key={index} className="flex items-start group">
                            <div className={`flex-shrink-0 h-6 w-6 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-400 mt-0.5 transition-all duration-300 group-hover:scale-110`}>
                              <CheckIcon className="h-4 w-4" />
                            </div>
                            <span className="ml-2 text-gray-300">
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
                      {selectedIndustry.caseStudies.map((caseStudy, index) => <div key={index} className={`bg-gray-700 p-6 rounded-lg border border-gray-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                          <h5 className="text-lg font-semibold text-white mb-2">
                            {caseStudy.title}
                          </h5>
                          <p className="text-gray-300 mb-2">
                            <span className="font-medium">Client:</span>{' '}
                            {caseStudy.client}
                          </p>
                          <p className="text-gray-300">
                            <span className="font-medium">Result:</span>{' '}
                            {caseStudy.result}
                          </p>
                        </div>)}
                    </div>
                  </div>
                  {/* CTA */}
                  <div className="mt-8 flex justify-center">
                    <Link to="/contact" className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105`}>
                      Discuss Your {selectedIndustry.title} Needs
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>

      {/* Industry Insights Section */}
      <div className="relative bg-gray-800 py-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgb(168 85 247) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white">Industry Insights</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with our latest research, trends, and perspectives
              on industry-specific challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            {[{
            title: 'The Future of Digital Banking: Trends to Watch',
            category: 'Banking',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          }, {
            title: 'Healthcare Innovation: AI-Driven Diagnostics',
            category: 'Healthcare',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          }, {
            title: 'Supply Chain Resilience in Manufacturing',
            category: 'Manufacturing',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
          }].map((insight, index) => <div key={index} className="bg-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img src={insight.image} alt={insight.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary-500/20 text-secondary-400 mb-4">
                    {insight.category}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {insight.title}
                  </h3>
                  <Link to="/insights" className="inline-flex items-center text-secondary-400 hover:text-secondary-300 font-medium">
                    Read more
                    <ArrowRightIcon className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>)}
          </div>
          <div className="text-center mt-12">
            <Link to="/insights" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105">
              Explore All Industry Insights
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500 opacity-5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500 opacity-5 rounded-full animate-float-medium"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-fade-in-left">
            <span className="block">Ready to transform your industry?</span>
            <span className="block text-gray-300">
              Let's discuss how our solutions can address your specific
              challenges.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4 animate-fade-in-right">
            <Link to="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get in touch
            </Link>
            <Link to="/what-we-do" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Industries;