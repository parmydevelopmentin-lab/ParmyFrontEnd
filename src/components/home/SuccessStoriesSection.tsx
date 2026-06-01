import React from 'react';
import CaseStudyCard from './CaseStudyCard';
const SuccessStoriesSection = () => {
  const caseStudies = [{
    title: 'Royal Financial Empire Corp',
    subtitle: 'Elite Software Development',
    icon: 'https://cdn-icons-png.flaticon.com/512/2942/2942789.png',
    iconBg: 'bg-secondary-900/30',
    challenge: 'Transform legacy trading platform with 20+ year old royal codebase into modern architecture',
    solution: 'Premium microservices architecture with phased royal migration approach by Parmy Technologies',
    results: [{
      text: '67% reduction in transaction processing time',
      highlight: true
    }, {
      text: '99.99% royal system availability',
      highlight: true
    }, {
      text: '$4.2M annual operational cost savings',
      highlight: true
    }],
    slug: 'royal-financial-empire'
  }, {
    title: 'Elite HealthTech Innovations',
    subtitle: 'Royal AI & Machine Learning',
    icon: 'https://cdn-icons-png.flaticon.com/512/2376/2376199.png',
    iconBg: 'bg-primary-900/30',
    challenge: 'Enhance early disease detection accuracy while eliminating false positives for premium healthcare',
    solution: 'Custom elite ML algorithm trained on 1.2M anonymized medical records by Parmy Technologies',
    results: [{
      text: '93% detection accuracy (up from 76%)',
      highlight: true
    }, {
      text: '68% reduction in false positives',
      highlight: true
    }, {
      text: 'Early detection improved by average of 4.3 months',
      highlight: true
    }],
    slug: 'elite-healthtech-innovations'
  }, {
    title: 'Luxury RetailTech Enterprises',
    subtitle: 'Premium Cloud Transformation',
    icon: 'https://cdn-icons-png.flaticon.com/512/8686/8686205.png',
    iconBg: 'bg-accent-900/30',
    challenge: 'Scale premium e-commerce platform to handle 10x traffic during royal shopping seasons',
    solution: 'Elite containerized microservices with auto-scaling royal infrastructure by Parmy Technologies',
    results: [{
      text: 'Zero downtime during Black Friday (5M concurrent users)',
      highlight: true
    }, {
      text: '78% reduction in infrastructure costs',
      highlight: true
    }, {
      text: 'Deployment time reduced from days to minutes',
      highlight: true
    }],
    slug: 'luxury-retailtech-enterprises'
  }];
  return <section className="py-20 bg-gradient-to-b from-primary-900 via-secondary-900 to-primary-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent"></div>
      {/* Royal decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-secondary-500/15 rounded-full filter blur-3xl animate-shimmer"></div>
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary-500/15 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-400/10 rounded-full filter blur-3xl animate-royal-pulse"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-secondary-500/30 to-primary-500/30 text-white backdrop-blur-sm mb-6 border border-secondary-400/30 shadow-royal-glow">
            <span className="text-sm font-bold tracking-wide uppercase">👑 Royal Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100 mb-6">
            Elite Transformation Chronicles
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Discover how <span className="text-secondary-300 font-semibold">Parmy Technologies</span> has empowered visionary organizations to achieve 
            extraordinary digital transformation and royal-level success
          </p>
        </div>
        {/* Royal grid layout with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => <div key={index} className="flex">
              <CaseStudyCard {...study} />
            </div>)}
        </div>
        {/* Royal CTA button */}
        <div className="mt-12 text-center">
          <a href="/case-studies" className="inline-flex items-center px-8 py-4 border-2 border-secondary-400/50 text-base font-semibold rounded-xl text-white hover:bg-secondary-600/20 hover:border-secondary-400 transition-all duration-300 transform hover:scale-105 shadow-royal-glow backdrop-blur-sm">
            <span>Explore More Royal Success Stories</span>
            <svg className="ml-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>;
};
export default SuccessStoriesSection;