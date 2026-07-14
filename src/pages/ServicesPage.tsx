import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CodeIcon, ServerIcon, SearchIcon, BarChartIcon, UsersIcon, CheckIcon, ArrowRightIcon, ZapIcon, ShieldIcon, GlobeIcon, ChevronDownIcon, ChevronUpIcon, DatabaseIcon, CloudIcon, BrainIcon, TrendingUpIcon, LightbulbIcon, TargetIcon, AwardIcon, HeartIcon, ClockIcon, ArrowUpRightIcon, MessageSquareIcon, PhoneIcon, MailIcon, MapPinIcon, StarIcon } from 'lucide-react';
import '../styles/animations.css';
const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [animatedElements, setAnimatedElements] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    // Initialize intersection observer for scroll animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimatedElements(prev => [...prev, entry.target.id]);
        }
      });
    }, {
      threshold: 0.1
    });
    // Observe all animatable elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
  const isAnimated = id => animatedElements.includes(id);
  const toggleFaq = id => {
    setActiveFaq(activeFaq === id ? null : id);
  };
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };
  const services = [{
    id: 1,
    name: 'Enterprise Software Development',
    description: 'Custom enterprise-grade software solutions engineered for scalability and performance',
    icon: CodeIcon,
    category: 'technology',
    gradient: 'from-green-500 to-green-600',
    features: ['Microservices architecture', 'Cloud-native applications', 'Enterprise API development', 'Legacy system modernization', 'DevOps integration', 'Continuous delivery pipelines'],
    caseStudy: {
      client: 'Global Financial Services Corp',
      challenge: 'Modernize legacy trading platform with 20+ year old codebase',
      solution: 'Microservices architecture with phased migration approach',
      results: ['67% reduction in transaction processing time', '99.99% system availability', '$4.2M annual operational cost savings']
    }
  }, {
    id: 2,
    name: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to automate processes and gain predictive insights',
    icon: BrainIcon,
    category: 'technology',
    gradient: 'from-emerald-500 to-emerald-600',
    features: ['Predictive analytics models', 'Natural language processing', 'Computer vision solutions', 'Recommendation engines', 'Anomaly detection systems', 'AI-powered process automation'],
    caseStudy: {
      client: 'HealthTech Innovations',
      challenge: 'Improve early disease detection accuracy while reducing false positives',
      solution: 'Custom ML algorithm trained on 1.2M anonymized medical records',
      results: ['93% detection accuracy (up from 76%)', '68% reduction in false positives', 'Early detection improved by average of 4.3 months']
    }
  }, {
    id: 3,
    name: 'Cloud Transformation',
    description: 'Strategic cloud migration and optimization services to maximize performance and minimize costs',
    icon: CloudIcon,
    category: 'technology',
    gradient: 'from-teal-500 to-teal-600',
    features: ['Cloud migration strategy', 'Multi-cloud architecture', 'Containerization & orchestration', 'Cloud-native development', 'Infrastructure as code', 'Cost optimization & governance'],
    caseStudy: {
      client: 'RetailTech Enterprises',
      challenge: 'Scale e-commerce platform to handle 10x traffic during peak seasons',
      solution: 'Containerized microservices with auto-scaling on AWS',
      results: ['Zero downtime during Black Friday (5M+ concurrent users)', '72% reduction in infrastructure costs', '8x faster deployment cycles']
    }
  }, {
    id: 4,
    name: 'Advanced Data Analytics',
    description: 'Transform raw data into actionable intelligence with our comprehensive analytics solutions',
    icon: DatabaseIcon,
    category: 'technology',
    gradient: 'from-cyan-500 to-cyan-600',
    features: ['Big data architecture', 'Real-time analytics pipelines', 'Data warehousing & lakes', 'Business intelligence dashboards', 'Predictive modeling', 'Data governance frameworks'],
    caseStudy: {
      client: 'Global Logistics Corporation',
      challenge: 'Optimize supply chain with real-time visibility across 23 countries',
      solution: 'Integrated data platform with real-time analytics and ML-powered forecasting',
      results: ['22% reduction in inventory costs', '35% improvement in delivery time accuracy', '$12.7M annual savings from optimized routing']
    }
  }, {
    id: 5,
    name: 'Next-Gen SEO & Content Marketing',
    description: 'Data-driven SEO strategies that drive qualified traffic and boost your organic search presence',
    icon: SearchIcon,
    category: 'marketing',
    gradient: 'from-amber-500 to-amber-600',
    features: ['AI-powered keyword research', 'Semantic content optimization', 'Technical SEO automation', 'Content strategy intelligence', 'Competitor gap analysis', 'Voice search optimization'],
    caseStudy: {
      client: 'E-commerce Fashion Retailer',
      challenge: 'Declining organic traffic and conversion rates in highly competitive market',
      solution: 'Comprehensive SEO strategy with AI-driven content optimization',
      results: ['215% increase in organic traffic within 6 months', '87% growth in non-branded keyword rankings', '43% improvement in conversion rate']
    }
  }, {
    id: 6,
    name: 'Performance Marketing',
    description: 'Results-focused digital marketing campaigns that maximize ROI across all channels',
    icon: TargetIcon,
    category: 'marketing',
    gradient: 'from-orange-500 to-orange-600',
    features: ['Multi-channel campaign strategy', 'Advanced audience targeting', 'A/B testing frameworks', 'Attribution modeling', 'Conversion rate optimization', 'Marketing automation'],
    caseStudy: {
      client: 'SaaS Platform Provider',
      challenge: 'High customer acquisition costs with unclear attribution',
      solution: 'Multi-touch attribution model with integrated marketing dashboard',
      results: ['42% reduction in customer acquisition cost', '156% increase in qualified leads', '3.2x marketing ROI improvement']
    }
  }, {
    id: 7,
    name: 'Cybersecurity Solutions',
    description: 'Comprehensive security services to protect your digital assets and ensure business continuity',
    icon: ShieldIcon,
    category: 'technology',
    gradient: 'from-red-500 to-red-600',
    features: ['Penetration testing', 'Security architecture design', 'Threat intelligence & monitoring', 'Incident response planning', 'Compliance frameworks', 'Security awareness training'],
    caseStudy: {
      client: 'Financial Services Provider',
      challenge: 'Strengthen security posture against sophisticated cyber threats',
      solution: 'End-to-end security program with continuous monitoring and automated response',
      results: ['Zero successful breaches since implementation', '94% reduction in vulnerability remediation time', 'Passed regulatory audits with zero findings']
    }
  }, {
    id: 8,
    name: 'Digital Transformation Consulting',
    description: 'Strategic guidance to navigate complex digital transformation initiatives with confidence',
    icon: LightbulbIcon,
    category: 'consulting',
    gradient: 'from-purple-500 to-purple-600',
    features: ['Digital maturity assessment', 'Transformation roadmapping', 'Technology stack optimization', 'Change management', 'Digital culture development', 'Innovation workshops'],
    caseStudy: {
      client: 'Manufacturing Industry Leader',
      challenge: 'Transition from traditional manufacturing to Industry 4.0',
      solution: 'Comprehensive 3-year digital transformation roadmap',
      results: ['28% improvement in operational efficiency', '$32M in new revenue from digital products', 'Successfully transformed organizational culture']
    }
  }, {
    id: 9,
    name: 'User Experience Design',
    description: 'Human-centered design that creates intuitive, engaging digital experiences',
    icon: HeartIcon,
    category: 'design',
    gradient: 'from-pink-500 to-pink-600',
    features: ['UX research & testing', 'Information architecture', 'Interaction design', 'Usability optimization', 'Accessibility compliance', 'Design systems'],
    caseStudy: {
      client: 'Healthcare Technology Provider',
      challenge: 'Complex clinical workflow causing user frustration and errors',
      solution: 'Complete UX redesign based on extensive clinician research',
      results: ['87% reduction in user errors', '42% decrease in training time', '96% user satisfaction (up from 34%)']
    }
  }, {
    id: 10,
    name: 'IoT & Connected Systems',
    description: 'End-to-end IoT solutions that connect the physical and digital worlds',
    icon: GlobeIcon,
    category: 'technology',
    gradient: 'from-blue-500 to-blue-600',
    features: ['IoT architecture design', 'Sensor integration', 'Edge computing solutions', 'Real-time data processing', 'Predictive maintenance', 'IoT security frameworks'],
    caseStudy: {
      client: 'Industrial Equipment Manufacturer',
      challenge: 'No visibility into equipment performance leading to unexpected downtime',
      solution: 'IoT-enabled predictive maintenance system across 12,000 devices',
      results: ['76% reduction in unplanned downtime', '$18.5M annual maintenance cost savings', 'New service-based revenue stream worth $42M annually']
    }
  }];
  const filteredServices = activeTab === 'all' ? services : services.filter(service => service.category === activeTab);
  const categories = [{
    id: 'all',
    name: 'All Services',
    icon: AwardIcon
  }, {
    id: 'technology',
    name: 'Technology',
    icon: CodeIcon
  }, {
    id: 'marketing',
    name: 'Marketing',
    icon: TrendingUpIcon
  }, {
    id: 'consulting',
    name: 'Consulting',
    icon: LightbulbIcon
  }, {
    id: 'design',
    name: 'Design',
    icon: HeartIcon
  }];

  const stats = [{
    id: 1,
    value: '97%',
    label: 'Client retention rate'
  }, {
    id: 2,
    value: '22+',
    label: 'Projects delivered'
  }, {
    id: 3,
    value: '4+',
    label: 'Countries served'
  }, {
    id: 4,
    value: '150+',
    label: 'Technology experts Network'
  }];

  return <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-shimmer"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-3xl animate-royal-pulse"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Premium Technology</span>
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100">
                Solutions & Services
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-white/80 sm:text-2xl leading-relaxed">
              Transforming businesses with cutting-edge technology solutions designed for the digital future
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border-0 rounded-xl text-base font-semibold shadow-lg text-white bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                Start Your Journey <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/industries" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 rounded-xl text-base font-semibold text-white/90 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                Explore Industries
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl shadow-royal-glow border border-white/20 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(stat => <div key={stat.id} className="flex flex-col items-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 to-accent-200 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Service Categories */}
      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div id="categories-section" className={`animate-on-scroll transition-all duration-700 transform ${isAnimated('categories-section') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100 sm:text-4xl">
              Our Premium Service Portfolio
            </h2>
            <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technology solutions designed to accelerate your digital transformation journey
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => <button key={category.id} onClick={() => setActiveTab(category.id)} className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center ${activeTab === category.id ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow-lg' : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 backdrop-blur-sm'}`}>
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </button>)}
          </div>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service, index) => <div key={service.id} id={`service-card-${service.id}`} className={`animate-on-scroll bg-white dark:bg-surface-dark-secondary rounded-2xl overflow-hidden shadow-royal-glow border border-secondary-100 dark:border-secondary-800 transition-all duration-500 transform hover:scale-105 hover:shadow-secondary-lg group ${isAnimated(`service-card-${service.id}`) ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{
          transitionDelay: `${index * 100}ms`
        }}>
              <div className="h-3 bg-gradient-to-r from-secondary-600 to-primary-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-600 to-primary-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-secondary">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-primary-200 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-secondary-600 dark:text-secondary-400" />
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-primary-300 text-sm">
                        {feature}
                      </span>
                    </div>)}
                </div>
                <Link to={`/services/${service.id}`} className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 transition-all duration-300 shadow-secondary transform hover:scale-105">
                  Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>)}
        </div>
      </div>
      {/* Case Study Showcase */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="case-study-section" className={`animate-on-scroll text-center mb-16 transition-all duration-700 transform ${isAnimated('case-study-section') ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100 sm:text-4xl">
              Success Stories & Case Studies
            </h2>
            <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              See how we've helped organizations transform their businesses with innovative technology solutions
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div id="case-study-featured" className={`animate-on-scroll transition-all duration-700 transform ${isAnimated('case-study-featured') ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
              <div className="relative rounded-2xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={toggleVideo}>
                    <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=800" src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-surrounded-by-graphics-34283-large.mp4">
                      Your browser does not support the video tag.
                    </video>
                    {!isVideoPlaying && <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">
                      Global Financial Services Transformation
                    </h3>
                    <p className="text-gray-200 mt-2">
                      See how we helped a leading financial institution
                      modernize their legacy systems and embrace digital
                      transformation
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {services.slice(0, 3).map((service, index) => <div key={`case-${service.id}`} id={`case-study-item-${service.id}`} className={`animate-on-scroll bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl shadow-royal-glow border border-white/20 transition-all duration-500 transform hover:shadow-2xl hover:scale-[1.02] ${isAnimated(`case-study-item-${service.id}`) ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{
              transitionDelay: `${index * 150}ms`
            }}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">
                          {service.caseStudy.client}
                        </h3>
                        <p className="text-sm text-white/70">
                          {service.name}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start mb-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-red-400/20 flex items-center justify-center">
                            <span className="text-red-400 text-xs">
                              !
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-white">
                            Challenge
                          </h4>
                          <p className="text-sm text-white/80">
                            {service.caseStudy.challenge}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start mb-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                            <span className="text-green-400 text-xs">
                              ✓
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-white">
                            Solution
                          </h4>
                          <p className="text-sm text-white/80">
                            {service.caseStudy.solution}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full bg-accent-300/20 flex items-center justify-center">
                            <span className="text-accent-300 text-xs">
                              ★
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-white">
                            Results
                          </h4>
                          <ul className="mt-1 space-y-1">
                            {service.caseStudy.results.map((result, i) => <li key={i} className="text-sm text-white/80 flex items-center">
                                <CheckIcon className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                                {result}
                              </li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link to={`/case-studies/${service.id}`} className="inline-flex items-center text-sm font-medium text-accent-300 hover:text-accent-200 transition-colors duration-300">
                        Read full case study{' '}
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>)}
              <div className="text-center pt-4">
                <Link to="/case-studies" className="inline-flex items-center px-5 py-2 border border-accent-300/50 rounded-lg text-sm font-medium text-accent-300 hover:bg-accent-300/10 backdrop-blur-sm transition-all duration-300">
                  View all case studies{' '}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/90 to-primary-600/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=800')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
          <div id="cta-section" className={`animate-on-scroll flex flex-col lg:flex-row items-center justify-between gap-10 transition-all duration-700 transform ${isAnimated('cta-section') ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to transform your business?</span>
                <span className="block text-accent-200 mt-1">
                  Let's build your digital future together.
                </span>
              </h2>
              <p className="mt-4 text-lg text-white/90 max-w-xl leading-relaxed">
                Our team of experts is ready to understand your unique
                challenges and create tailored solutions that drive real
                results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border-0 rounded-full text-base font-medium shadow-royal-glow text-primary-600 bg-white hover:bg-accent-50 transition-all duration-300 transform hover:scale-105">
                Get in touch
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 border border-white/30 rounded-full text-base font-medium text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ServicesPage;