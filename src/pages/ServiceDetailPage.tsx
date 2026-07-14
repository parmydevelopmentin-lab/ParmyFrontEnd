import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  CheckIcon, 
  SendIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  CodeIcon, 
  DatabaseIcon, 
  ShieldIcon, 
  TrendingUpIcon, 
  CpuIcon, 
  GlobeIcon, 
  BrainIcon, 
  CloudIcon, 
  CogIcon, 
  LightbulbIcon, 
  LayoutIcon, 
  UsersIcon, 
  SparklesIcon,
  HelpCircleIcon
} from 'lucide-react';
import { contactApi } from '../services/api';

// Detailed mapping of services and their content
interface ServiceDetail {
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  gradient: string;
  accentColor: string;
  description: string;
  technologies: string[];
  capabilities: string[];
  benefits: string[];
  stats: { value: string; label: string }[];
  caseStudy?: {
    client: string;
    challenge: string;
    solution: string;
    result: string;
  };
}

const SERVICES_DATA: Record<string, ServiceDetail> = {
  // Footer Services
  'data-engineering': {
    title: 'Data Engineering & Architecture',
    subtitle: 'Build robust, scalable data pipelines to ingest, transform, and store enterprise data.',
    icon: DatabaseIcon,
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    accentColor: 'text-blue-400',
    description: 'We design and implement custom, high-performance data architectures that streamline data ingestion and storage. Our systems ensure clean, reliable, and accessible data to feed downstream machine learning models and business intelligence platforms.',
    technologies: ['Apache Spark', 'Python & SQL', 'Apache Kafka', 'Airflow', 'Snowflake', 'AWS Glue', 'Google Cloud Dataflow', 'Hadoop'],
    capabilities: [
      'ETL / ELT Pipeline Automation',
      'Data Warehousing & Data Lakes',
      'Real-time Data Stream Ingestion',
      'Data Governance & Quality Control',
      'Cloud Data Migration (AWS, GCP, Azure)',
      'Schema Design & Optimization'
    ],
    benefits: [
      'Eliminate operational data silos across departments',
      'Enable real-time business decision making',
      'Substantially reduce cloud storage and compute costs',
      'Ensure high reliability with self-healing data pipelines'
    ],
    stats: [
      { value: '99.9%', label: 'Pipeline Uptime' },
      { value: '5x', label: 'Faster Processing' },
      { value: '40%', label: 'Storage Cost Saved' }
    ],
    caseStudy: {
      client: 'LogiGlobal Transports',
      challenge: 'Fragmented operational data across 15 legacy systems causing logistics delays.',
      solution: 'Re-architected data ingestion pipeline with Apache Kafka and Snowflake.',
      result: 'Unified operations dashboard with real-time routing updates and 22% delay reduction.'
    }
  },
  'web-development': {
    title: 'Full-Stack Web Development',
    subtitle: 'High-performance, secure, and responsive web applications built for the modern internet.',
    icon: CodeIcon,
    gradient: 'from-emerald-600 via-teal-600 to-green-500',
    accentColor: 'text-emerald-400',
    description: 'We build modern web applications leveraging industry-leading technologies. From client-side user interfaces that prioritize speed and responsive layout to reliable backend APIs, we ensure your brand stands out with a flawless user experience.',
    technologies: ['React.js & Next.js', 'TypeScript', 'Node.js & Express', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker', 'GraphQL'],
    capabilities: [
      'Custom Web Application Engineering',
      'Single Page Applications (SPAs)',
      'SaaS Platform Development',
      'E-Commerce & Payment Gateways',
      'Headless CMS Integrations',
      'Responsive Mobile-First UI/UX'
    ],
    benefits: [
      'Improve user engagement with lightning-fast page loading',
      'Scale horizontally to support sudden spikes in traffic',
      'Robust SEO optimization to drive organic customer acquisition',
      'Ensure complete security with token-based authentication'
    ],
    stats: [
      { value: '60%', label: 'Faster Load Times' },
      { value: '98+', label: 'Lighthouse Score' },
      { value: '2.5x', label: 'Conversion Lift' }
    ],
    caseStudy: {
      client: 'Apex Retailers',
      challenge: 'Slow e-commerce storefront leading to checkout cart abandonment.',
      solution: 'Developed a headless storefront using Next.js, React, and GraphQL.',
      result: 'Page loading speed improved by 60% and checkout conversion increased by 38%.'
    }
  },
  'software-development': {
    title: 'Custom Software Development',
    subtitle: 'Bespoke enterprise-grade systems engineered for scalability and performance.',
    icon: CpuIcon,
    gradient: 'from-purple-600 via-indigo-600 to-pink-500',
    accentColor: 'text-purple-400',
    description: 'Our software engineering teams build scalable, custom applications that automate workflow processes and modernize legacy systems. We focus on resilient system architectures, comprehensive test coverage, and clean codebase practices.',
    technologies: ['Java & Spring Boot', 'Python & Django', 'C# & .NET Core', 'Kubernetes', 'Docker', 'PostgreSQL & MySQL', 'CI/CD Pipelines'],
    capabilities: [
      'Enterprise Software Architecture',
      'Microservices Design & Migration',
      'API Design & Integration Services',
      'Legacy System Modernization',
      'Automated Testing & QA',
      'DevOps & Infrastructure-as-Code'
    ],
    benefits: [
      'Tailored systems mapped directly to your unique business workflow',
      'Increase release frequency with automated CI/CD pipelines',
      'Reduce downtime through fault-tolerant microservice patterns',
      'Easily scale systems as your customer base expands'
    ],
    stats: [
      { value: '99.99%', label: 'System Availability' },
      { value: '45%', label: 'Efficiency Increase' },
      { value: '10x', label: 'Traffic Scaling' }
    ],
    caseStudy: {
      client: 'Fidelity Mutual Insurance',
      challenge: 'Monolithic legacy policy system failing during peak seasonal enrollment.',
      solution: 'Decomposed monolith into containerized Spring Boot microservices.',
      result: 'Achieved zero downtime during peak season and reduced operational overhead by 34%.'
    }
  },
  'cybersecurity': {
    title: 'Cybersecurity Solutions',
    subtitle: 'Safeguard your enterprise systems, intellectual property, and client data.',
    icon: ShieldIcon,
    gradient: 'from-red-600 via-rose-600 to-orange-500',
    accentColor: 'text-red-400',
    description: 'We offer robust end-to-end information security services to protect your digital assets. From penetration testing and security audits to implementing identity management and firewalls, we ensure compliance and peace of mind.',
    technologies: ['Firewalls & WAF', 'SIEM Tools', 'IAM Systems', 'Penetration Testing', 'Data Encryption', 'ISO 27001 / SOC 2'],
    capabilities: [
      'Vulnerability Assessment & Penetration Testing',
      'Security Audits & Compliance Reviews',
      'Identity & Access Management (IAM)',
      'Threat Detection & Security Operations',
      'Cloud Environment Audits',
      'Data Loss Prevention (DLP)'
    ],
    benefits: [
      'Protect brand reputation from destructive data breaches',
      'Comply with strict regulatory mandates (GDPR, HIPAA, SOC 2)',
      'Discover and patch security bugs before bad actors exploit them',
      'Continuous peace of mind with real-time threat reporting'
    ],
    stats: [
      { value: '0', label: 'Breaches Post-Audit' },
      { value: '75%', label: 'Incident Reduction' },
      { value: '90%', label: 'Faster Vulnerability Patching' }
    ],
    caseStudy: {
      client: 'Prime Health Partners',
      challenge: 'Unsecured API endpoints risking leak of sensitive patient health data.',
      solution: 'Conducted comprehensive penetration testing and set up OAuth2 with dynamic WAF.',
      result: 'Fully patched all API flaws, passed SOC 2 audit with flying colors.'
    }
  },
  'data-analytics': {
    title: 'Data Analytics & Business Intelligence',
    subtitle: 'Turn raw datasets into actionable insights to drive strategic business growth.',
    icon: TrendingUpIcon,
    gradient: 'from-cyan-600 via-sky-600 to-indigo-500',
    accentColor: 'text-cyan-400',
    description: 'We convert complex corporate data into easy-to-read, visual business dashboards and predictive models. By identifying patterns and market trends, we empower your leadership to make confident, data-driven decisions.',
    technologies: ['Power BI', 'Tableau', 'Python (Pandas/NumPy)', 'R Programming', 'SQL', 'Google Analytics', 'Excel Analytics'],
    capabilities: [
      'Interactive Dashboard Engineering',
      'Predictive Business Models',
      'Customer Behavior Analytics',
      'Financial Modeling & Forecasting',
      'Data Warehousing Integration',
      'Automated Reporting Dashboards'
    ],
    benefits: [
      'Empower leadership with instant access to operational KPIs',
      'Understand and anticipate customer behavior trends',
      'Discover new optimization pathways to increase profit margins',
      'Automate time-consuming manual spreadsheet calculations'
    ],
    stats: [
      { value: '30%', label: 'Decision Speedup' },
      { value: '23%', label: 'Sales Growth' },
      { value: '80%', label: 'Faster Reporting' }
    ],
    caseStudy: {
      client: 'Nova Consumer Brands',
      challenge: 'Leadership spending 15+ hours weekly compiling manual sales spreadsheets.',
      solution: 'Developed an automated real-time Power BI reporting suite.',
      result: 'Replaced manual spreadsheets, saving 15 hours weekly and increasing sales efficiency.'
    }
  },
  'digital-business-methodology': {
    title: 'Digital Business Methodology & Consulting',
    subtitle: 'Align your business processes, team structure, and culture with digital excellence.',
    icon: LightbulbIcon,
    gradient: 'from-amber-500 via-orange-600 to-yellow-500',
    accentColor: 'text-amber-400',
    description: 'Technology is only as good as the methodology running it. We consult with businesses to implement Agile and DevOps processes that accelerate product delivery speed and cultivate a collaborative, digital-first company culture.',
    technologies: ['Agile / Scrum Frameworks', 'DevOps Methodologies', 'Jira & Confluence', 'Lean Operations', 'Design Thinking', 'Change Management'],
    capabilities: [
      'Agile / Scrum Transformation',
      'DevOps Alignment Consulting',
      'Business Process Re-engineering',
      'Organizational Change Management',
      'Technology Stack Evaluation',
      'Corporate Methodology Bootcamps'
    ],
    benefits: [
      'Drastically reduce time-to-market for new products',
      'Bridge the operational gap between engineering and business teams',
      'Boost employee productivity with streamlined, lean processes',
      'Ensure high product quality with iterative development loops'
    ],
    stats: [
      { value: '50%', label: 'Faster Delivery' },
      { value: '95%', label: 'Process Alignment' },
      { value: '3x', label: 'More Releases' }
    ],
    caseStudy: {
      client: 'Vanguard Industrial Corp',
      challenge: 'Traditional software delivery cycles taking 9+ months with high defect rates.',
      solution: 'Coached teams through comprehensive Agile and CI/CD DevOps transformation.',
      result: 'Delivery cycles cut down to 2 weeks, with product defects dropping by 48%.'
    }
  },

  // Mapped numeric IDs from ServicesPage.tsx
  '1': {
    title: 'Enterprise Software Development',
    subtitle: 'Custom enterprise-grade software solutions engineered for scalability and performance.',
    icon: CodeIcon,
    gradient: 'from-green-500 via-emerald-600 to-teal-500',
    accentColor: 'text-green-400',
    description: 'Custom enterprise-grade software solutions engineered for scalability and performance. We modernize legacy codebases and integrate microservice architectures to drive digital agility.',
    technologies: ['Microservices', 'Cloud-Native', 'Enterprise APIs', 'Legacy Modernization', 'DevOps', 'CI/CD Pipelines'],
    capabilities: ['Scalable Architecture', 'API Management', 'Legacy System Upgrades', 'CI/CD Pipelines', 'Cloud Deployments'],
    benefits: ['67% reduction in processing time', '99.99% system availability', '$4.2M annual operational cost savings'],
    stats: [{ value: '67%', label: 'Downtime reduction' }, { value: '99.99%', label: 'Uptime' }],
    caseStudy: {
      client: 'Global Financial Services Corp',
      challenge: 'Modernize legacy trading platform with 20+ year old codebase.',
      solution: 'Microservices architecture with phased migration approach.',
      result: '67% reduction in transaction processing time, 99.99% system availability, $4.2M annual operational cost savings.'
    }
  },
  '2': {
    title: 'AI & Machine Learning',
    subtitle: 'Harness the power of artificial intelligence to automate processes and gain predictive insights.',
    icon: BrainIcon,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-500',
    accentColor: 'text-emerald-400',
    description: 'Harness the power of artificial intelligence to automate processes and gain predictive insights. We build custom algorithms, predictive models, and NLP systems that scale with your data.',
    technologies: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Predictive Models', 'TensorFlow'],
    capabilities: ['Predictive Modeling', 'NLP', 'Computer Vision', 'Process Automation', 'AI Strategy'],
    benefits: ['Improve diagnostic/detection accuracy', 'Optimize cognitive workloads', 'Data-driven foresight'],
    stats: [{ value: '93%', label: 'Accuracy Rate' }, { value: '68%', label: 'Errors Reduced' }],
    caseStudy: {
      client: 'HealthTech Innovations',
      challenge: 'Improve early disease detection accuracy while reducing false positives.',
      solution: 'Custom ML algorithm trained on 1.2M anonymized medical records.',
      result: '93% detection accuracy (up from 76%), 68% reduction in false positives, early detection improved by 4.3 months.'
    }
  },
  '3': {
    title: 'Cloud Transformation',
    subtitle: 'Strategic cloud migration and optimization services to maximize performance and minimize costs.',
    icon: CloudIcon,
    gradient: 'from-teal-500 via-cyan-600 to-blue-500',
    accentColor: 'text-teal-400',
    description: 'Strategic cloud migration and optimization services to maximize performance and minimize costs. We help enterprises migrate workflows to leading cloud platforms securely.',
    technologies: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'Multi-cloud Strategy'],
    capabilities: ['Cloud Migration', 'Multi-cloud Management', 'Containerization', 'Infrastructure as Code', 'Cost Optimization'],
    benefits: ['Handle 10x traffic scaling', 'Reduce monthly hosting costs', 'Speed up release cycles'],
    stats: [{ value: '72%', label: 'Cost Reduction' }, { value: '8x', label: 'Faster Deployment' }],
    caseStudy: {
      client: 'RetailTech Enterprises',
      challenge: 'Scale e-commerce platform to handle 10x traffic during peak seasons.',
      solution: 'Containerized microservices with auto-scaling on AWS.',
      result: 'Zero downtime during Black Friday (5M+ concurrent users), 72% reduction in infrastructure costs, 8x faster deployment cycles.'
    }
  },
  '4': {
    title: 'Advanced Data Analytics',
    subtitle: 'Transform raw data into actionable intelligence with our comprehensive analytics solutions.',
    icon: DatabaseIcon,
    gradient: 'from-cyan-500 via-sky-600 to-indigo-500',
    accentColor: 'text-cyan-400',
    description: 'Transform raw data into actionable intelligence with our comprehensive analytics solutions. We implement robust data pipelines, analytics lakes, and visual dashboards.',
    technologies: ['Big Data Architecture', 'Real-time Pipelines', 'Data Warehousing', 'BI Dashboards', 'Predictive Analytics'],
    capabilities: ['BI Dashboards', 'Real-Time Streaming Pipelines', 'Big Data Strategy', 'Data Warehousing'],
    benefits: ['Improve inventory costs', 'Optimized routing and logistics', 'Data transparency across countries'],
    stats: [{ value: '22%', label: 'Inventory Cost Cut' }, { value: '$12.7M', label: 'Annual Savings' }],
    caseStudy: {
      client: 'Global Logistics Corporation',
      challenge: 'Optimize supply chain with real-time visibility across 23 countries.',
      solution: 'Integrated data platform with real-time analytics and ML-powered forecasting.',
      result: '22% reduction in inventory costs, 35% improvement in delivery time accuracy, $12.7M annual savings.'
    }
  },
  '7': {
    title: 'Cybersecurity Solutions',
    subtitle: 'Comprehensive security services to protect your digital assets and ensure business continuity.',
    icon: ShieldIcon,
    gradient: 'from-red-500 via-rose-600 to-orange-500',
    accentColor: 'text-red-400',
    description: 'Comprehensive security services to protect your digital assets and ensure business continuity. We conduct penetration tests and build zero-trust security postures.',
    technologies: ['Penetration Testing', 'Security Architecture', 'Threat Intelligence', 'Incident Response', 'Compliance Frameworks'],
    capabilities: ['Pen Testing', 'Incident Response', 'IAM Configs', 'Compliance Audits'],
    benefits: ['Ensure zero successful breaches', 'Reduce vulnerability patch time', 'Pass complex regulatory audits'],
    stats: [{ value: '100%', label: 'Breach Prevention' }, { value: '94%', label: 'Patch Time Cut' }],
    caseStudy: {
      client: 'Financial Services Provider',
      challenge: 'Strengthen security posture against sophisticated cyber threats.',
      solution: 'End-to-end security program with continuous monitoring and automated response.',
      result: 'Zero successful breaches since implementation, 94% reduction in vulnerability remediation time.'
    }
  }
};

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    location: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Find pre-defined service or generate dynamic content
  const id = serviceId ? serviceId.toLowerCase() : '';
  const service = SERVICES_DATA[id] || SERVICES_DATA[serviceId || ''] || null;

  // Generate dynamic content if the service is not in predefined data
  const getDynamicService = (): ServiceDetail => {
    const formattedTitle = (serviceId || '')
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: formattedTitle || 'Technology Service',
      subtitle: `Enterprise solutions in ${formattedTitle || 'modern technologies'}.`,
      icon: SparklesIcon,
      gradient: 'from-slate-600 via-slate-700 to-slate-800',
      accentColor: 'text-secondary-400',
      description: `We offer custom consulting, deployment, and integration services for ${formattedTitle || 'this technology'}. Reach out to discuss how we can customize this for your business.`,
      technologies: ['Modern Web Standards', 'API Integration', 'Cloud Platforms', 'Security Practices'],
      capabilities: [
        'Custom Architecture Design',
        'System Integration',
        'Legacy Migration',
        '24/7 Support and Maintenance'
      ],
      benefits: [
        'Boost team agility and project turnaround speeds',
        'Build on top of secure, vetted infrastructures',
        'Achieve superior performance and scaling'
      ],
      stats: [
        { value: '100%', label: 'Client Focus' },
        { value: '24/7', label: 'System Support' },
        { value: 'Custom', label: 'Deployment Specs' }
      ]
    };
  };

  const displayService = service || getDynamicService();
  const Icon = displayService.icon;

  useEffect(() => {
    // Set the pre-filled service name when page loads
    setFormData(prev => ({
      ...prev,
      service: displayService.title
    }));
    window.scrollTo(0, 0);
  }, [displayService.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        setError('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }

      const response = await contactApi.submitContactForm(formData);

      if (response.success) {
        setSuccessMessage(response.message || 'Enquiry submitted successfully!');
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: displayService.title,
          location: ''
        });
      } else {
        setError(response.message || 'An error occurred. Please try again.');
      }
    } catch (err: any) {
      console.error('Service page enquiry submission error:', err);
      setError(err?.message || 'Failed to submit form. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white relative overflow-hidden pb-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-0 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-3xl"></div>

      {/* Navigation & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200 group mb-12"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        {/* Hero Section Banner */}
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-r ${displayService.gradient} p-8 md:p-14 mb-16`}>
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <span className="text-white/80 text-xs font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Parmy Technologies
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {displayService.title}
            </h1>
            <p className="mt-4 text-white/90 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
              {displayService.subtitle}
            </p>
          </div>
        </div>

        {/* Content & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Service Details Column */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Description Block */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <SparklesIcon className={`h-6 w-6 ${displayService.accentColor}`} />
                Service Overview
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {displayService.description}
              </p>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-4">
              {displayService.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 text-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                  <div className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r ${displayService.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Technologies Block */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Core Technologies & Stack</h3>
              <div className="flex flex-wrap gap-2">
                {displayService.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 border border-slate-700/60 text-slate-300 hover:border-slate-500/80 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Capabilities */}
            <div className="space-y-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white">Our Capabilities</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {displayService.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className={`mt-0.5 rounded-full p-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`}>
                      <CheckIcon className="h-3 w-3" />
                    </div>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Key Business Benefits</h3>
              <div className="space-y-3">
                {displayService.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-xl shrink-0">🎯</span>
                    <p className="text-gray-300 text-sm md:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study Block */}
            {displayService.caseStudy && (
              <div className="bg-slate-950/60 border border-indigo-500/20 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/30">
                    Featured Success Story
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Client: {displayService.caseStudy.client}</h4>
                  <div className="mt-4 space-y-3 text-sm text-gray-300">
                    <p><strong className="text-white">Challenge:</strong> {displayService.caseStudy.challenge}</p>
                    <p><strong className="text-white">Solution:</strong> {displayService.caseStudy.solution}</p>
                    <p className={`p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-medium`}><strong className="text-emerald-300">Result:</strong> {displayService.caseStudy.result}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 bg-slate-900/90 border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              
              {isSubmitted ? (
                <div className="text-center py-10 space-y-5">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircleIcon className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Received</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {successMessage || "Thank you for reaching out! We've received your inquiry and will respond within 24 hours."}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="w-full py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Request a Consultation</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Ready to start? Fill in the details below to schedule a call with our experts.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-2 text-sm">
                      <AlertCircleIcon className="h-5 w-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                        First Name *
                        <input 
                          type="text" 
                          name="firstName" 
                          required 
                          value={formData.firstName} 
                          onChange={handleChange}
                          placeholder="Jane"
                          className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </label>
                      <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                        Last Name *
                        <input 
                          type="text" 
                          name="lastName" 
                          required 
                          value={formData.lastName} 
                          onChange={handleChange}
                          placeholder="Doe"
                          className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </label>
                    </div>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Email Address *
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="jane.doe@company.com"
                        className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Phone Number (Optional)
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Company Name (Optional)
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange}
                        placeholder="Enterprise Inc."
                        className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Selected Service
                      <input 
                        type="text" 
                        name="service" 
                        disabled
                        value={formData.service} 
                        className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                      />
                    </label>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Office Location Preference
                      <select 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="">No Preference</option>
                        <option value="hyderabad">Hyderabad, India</option>
                        <option value="seattle">Seattle, USA</option>
                        <option value="portland">Portland, USA</option>
                        <option value="jeddah">Jeddah, Saudi Arabia</option>
                      </select>
                    </label>

                    <label className="space-y-1.5 text-xs text-gray-300 font-semibold block">
                      Describe your requirements *
                      <textarea 
                        name="message" 
                        required 
                        rows={4}
                        value={formData.message} 
                        onChange={handleChange}
                        placeholder="Please detail your scope, technologies required, and timelines..."
                        className="w-full bg-slate-950 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      />
                    </label>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting Enquiry...
                        </>
                      ) : (
                        <>
                          <SendIcon className="h-4 w-4" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
