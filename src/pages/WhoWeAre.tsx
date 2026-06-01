import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, GlobeIcon, RocketIcon, TargetIcon, AwardIcon, CheckCircleIcon, ArrowRightIcon, LightbulbIcon, HeartIcon, ClockIcon, BriefcaseIcon, StarIcon, MapPinIcon } from 'lucide-react';

const WhoWeAre = () => {
  // Core values
  const coreValues = [{
    title: 'Innovation',
    description: 'We constantly explore new technologies and approaches to deliver cutting-edge software solutions.',
    icon: LightbulbIcon
  }, {
    title: 'Quality',
    description: 'Quality is at the core of everything we do, ensuring impactful software solutions that exceed expectations.',
    icon: AwardIcon
  }, {
    title: 'Customer Satisfaction',
    description: 'Customer satisfaction drives our success. We build trust through reliable, tailored technology solutions.',
    icon: HeartIcon
  }, {
    title: 'Expertise',
    description: 'Our team of skilled professionals brings years of experience to address complex challenges.',
    icon: UsersIcon
  }, {
    title: 'Digital Transformation',
    description: 'We help businesses innovate and thrive in an increasingly digital world.',
    icon: RocketIcon
  }, {
    title: 'Security',
    description: 'Security is central to our approach, ensuring businesses are safeguarded against evolving threats.',
    icon: ShieldIcon
  }];

  // Company facts based on the website
  const companyFacts = [{
    value: '0+',
    label: 'Years Experience'
  }, {
    value: '0+',
    label: 'Happy Clients'
  }, {
    value: '0%',
    label: 'Satisfaction'
  }, {
    value: '6',
    label: 'Core Services'
  }, {
    value: '24/7',
    label: 'Support Available'
  }, {
    value: '100%',
    label: 'Commitment'
  }];

  // Services offered
  const services = [{
    title: 'Data Engineering',
    description: 'We provide data engineering services to help businesses efficiently manage and analyze their data with robust data pipelines.'
  }, {
    title: 'Digital Business Methodology',
    description: 'Structured approach to digital transformation, optimizing processes and enhancing customer experiences.'
  }, {
    title: 'Web Development',
    description: 'Custom web development solutions that showcase your brand\'s unique identity with seamless user experience.'
  }, {
    title: 'Software Development',
    description: 'High-quality software tailored to specific business requirements using modern technologies and agile methodologies.'
  }, {
    title: 'Cybersecurity Solutions',
    description: 'Comprehensive security measures including risk assessment and vulnerability management to protect your operations.'
  }, {
    title: 'Data Analytics',
    description: 'Advanced analytics tools to turn complex data sets into clear, actionable insights for data-driven decisions.'
  }];

  return <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-black min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-purple-900 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary-500 opacity-10 rounded-full animate-float-slow"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-secondary-500 opacity-10 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-secondary-500 opacity-10 rounded-full animate-float-fast"></div>
          <div className="absolute -bottom-20 right-1/3 w-60 h-60 bg-secondary-500 opacity-5 rounded-full animate-float-medium"></div>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-900/30 text-secondary-400 text-sm font-medium mb-6 animate-fade-in-up">
              <span className="h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Crafting Innovative Software Solutions for a Smarter Tomorrow
            </div>
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in-up">
              <span className="block text-white">About</span>
              <span className="block text-secondary-400 mt-2">Parmy Technologies</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-300">
              A leading software development company dedicated to transforming businesses through cutting-edge technology solutions. 
              We are committed to helping organizations innovate and thrive in an increasingly digital world.
            </p>
            <div className="mt-10 flex justify-center gap-6 animate-fade-in-up animation-delay-500">
              <a href="#our-story" className="inline-flex items-center px-8 py-4 bg-secondary-600 text-white rounded-lg font-medium hover:bg-secondary-700 transition-all duration-300 shadow-lg shadow-secondary-900/30">
                Our Story
              </a>
              <a href="#services" className="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Company Facts Section */}
      <div className="bg-gradient-to-br from-gray-900 via-primary-950 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What You Need To Know About Our Company</h2>
            <p className="text-xl text-gray-300">
              Parmy Technologies is a leading software development company dedicated to transforming businesses through cutting-edge technology solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {companyFacts.map((fact, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{
                animationDelay: `${index * 100}ms`
              }}>
                <div className="text-3xl font-bold text-secondary-400">
                  {fact.value}
                </div>
                <div className="mt-1 text-gray-300">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div id="our-story" className="bg-gradient-to-br from-black via-primary-950 to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-900/30 text-secondary-400 text-sm font-medium mb-6">
                <span className="h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
                Our Story
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Transforming Businesses Through Technology
              </h2>
              <div className="prose prose-lg text-gray-300 max-w-none">
                <p>
                  Parmy Technologies is a leading software development company dedicated to transforming businesses through cutting-edge technology solutions. 
                  We are committed to helping organizations innovate and thrive in an increasingly digital world.
                </p>
                <p className="mt-4">
                  Our team of skilled professionals brings together years of expertise to deliver impactful software solutions that address complex challenges across various industries. 
                  We specialize in creating robust data pipelines, custom web applications, and comprehensive cybersecurity solutions.
                </p>
                <p className="mt-4">
                  Innovation, quality, and customer satisfaction are at the core of everything we do. 
                  We empower businesses with technology that transforms challenges into opportunities, 
                  helping them accelerate growth and achieve sustainable success.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 animate-fade-in-right">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary-500 opacity-10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary-500 opacity-10 rounded-full"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 text-secondary-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <div className="text-2xl font-bold text-white">
                        Our Mission
                      </div>
                    </div>
                    <p className="text-gray-200 mt-2">
                      Empowering businesses with technology that transforms challenges into opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Our Foundation
            </div>
            <h2 className="text-3xl font-extrabold text-white">Core Values</h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              The principles that guide our decisions, actions, and interactions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="h-16 w-16 rounded-full bg-green-900/30 flex items-center justify-center mb-6 text-green-400">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>)}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="bg-gradient-to-br from-primary-900 via-gray-900 to-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-900/30 text-secondary-400 text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Our Services
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Services We Offer For You
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Discover our wide range of services designed to empower your business with innovative technology and expert solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{
                animationDelay: `${index * 100}ms`
              }}>
                <h3 className="text-xl font-bold text-secondary-400 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
                <div className="mt-6">
                  <a href="#" className="inline-flex items-center text-secondary-400 hover:text-secondary-300 transition-colors duration-300">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div id="core-values" className="bg-gradient-to-br from-black via-primary-950 to-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-900/30 text-secondary-400 text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-secondary-500 mr-2"></span>
              Our Values
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              What Drives Us Forward
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              The core values that shape our approach to technology and business transformation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{
                  animationDelay: `${index * 100}ms`
                }}>
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-secondary-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Presence Section */}
      <div className="bg-[#1A202C] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Global Reach
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Our Global Presence
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Serving clients worldwide with local expertise and global
              capabilities
            </p>
          </div>
          <div className="relative h-96 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            {/* World map background - simplified representation */}
            <div className="absolute inset-0 bg-gray-700 opacity-50">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" alt="World map" className="w-full h-full object-cover opacity-30" />
            </div>
            {/* Location markers - simplified for this example */}
            <div className="absolute inset-0">
              {/* North America */}
              <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="h-4 w-4 bg-green-500 rounded-full absolute top-0"></div>
              </div>
              {/* Europe */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="h-4 w-4 bg-green-500 rounded-full absolute top-0"></div>
              </div>
              {/* Asia */}
              <div className="absolute top-1/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="h-4 w-4 bg-green-500 rounded-full absolute top-0"></div>
              </div>
              {/* Australia */}
              <div className="absolute top-2/3 left-4/5 transform -translate-x-1/2 -translate-y-1/2">
                <div className="h-4 w-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="h-4 w-4 bg-green-500 rounded-full absolute top-0"></div>
              </div>
            </div>
            {/* Overlay info */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl max-w-lg text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Global Delivery Network
                </h3>
                <p className="text-gray-300 mb-6">
                  With offices across North America, Europe, Asia, and
                  Australia, we provide 24/7 service delivery and local
                  expertise with global capabilities.
                </p>
                <Link to="/worldwide" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                  View Our Locations
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-300">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 text-green-400">
                <GlobeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Global Delivery Model
              </h3>
              <p className="text-gray-300">
                Our global delivery model combines onshore, nearshore, and
                offshore capabilities to provide optimal solutions for our
                clients' needs.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">
                    24/7 service availability
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Multi-timezone coverage</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Cost-effective scaling</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 text-green-400">
                <UsersIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Diverse Team
              </h3>
              <p className="text-gray-300">
                Our diverse team brings together different perspectives,
                experiences, and skills to deliver innovative solutions for our
                global client base.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">40+ nationalities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">25+ languages spoken</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Inclusive culture</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <div className="h-12 w-12 rounded-lg bg-green-900/30 flex items-center justify-center mb-6 text-green-400">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Social Responsibility
              </h3>
              <p className="text-gray-300">
                We're committed to making a positive impact in the communities
                where we live and work through technology education and
                sustainability initiatives.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Tech education programs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">
                    Carbon-neutral operations
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-300">Community partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-[#1A202C] overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 opacity-5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-green-500 opacity-5 rounded-full animate-float-medium"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl animate-fade-in-left">
            <span className="block">Want to learn more about us?</span>
            <span className="block text-gray-300">
              Connect with our team to explore partnership opportunities.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4 animate-fade-in-right">
            <Link to="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Get in touch
            </Link>
            <Link to="/careers" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
              Join Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
// Custom icon component
const ShieldIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>;
export default WhoWeAre;
