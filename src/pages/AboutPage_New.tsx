import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  ChevronRightIcon,
  PhoneIcon,
  MailIcon,
  ExternalLinkIcon
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-black min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-purple-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-500 opacity-20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-secondary-500 opacity-20 rounded-full animate-float-medium"></div>
          <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-secondary-500 opacity-20 rounded-full animate-float-fast"></div>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
              About{' '}
              <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
                Parmy Technologies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-100">
              Crafting Innovative Software Solutions for a Smarter Tomorrow
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 border border-secondary-500 text-base font-medium rounded-md shadow-sm text-white hover:bg-secondary-500/10 transition-all duration-300 transform hover:scale-105"
              >
                Our Services
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Company Visual Banner */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Parmy Technologies Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/40 to-primary-900/80 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Building Tomorrow, Today</h2>
            <p className="text-gray-200 mt-2 text-lg drop-shadow">A modern workspace driven by passion and innovation</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-white/5 backdrop-blur-lg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 animate-fade-in-left">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                At Parmy Technologies, our mission is to provide innovative, agile software solutions
                that empower businesses to achieve their digital transformation goals. We are dedicated
                to delivering high-quality, scalable technology solutions that drive efficiency, growth,
                and competitive advantage for our clients worldwide.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 animate-fade-in-right">
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be the leading provider of comprehensive digital business services, transforming
                how organizations operate and compete in the digital age. We envision a future where
                technology seamlessly integrates with business processes to create unprecedented
                value and innovation opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-secondary-400 mb-2">5+</div>
                <div className="text-lg text-gray-300">Years of Excellence</div>
              </div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-100">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-secondary-400 mb-2">100+</div>
                <div className="text-lg text-gray-300">Projects Completed</div>
              </div>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-secondary-400 mb-2">25+</div>
                <div className="text-lg text-gray-300">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="bg-white/5 backdrop-blur-lg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-300">
              Experienced leaders driving innovation and excellence at Parmy Technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Director & CEO - Paramesh Godugu */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in-up">
              <div className="aspect-w-1 aspect-h-1 bg-gray-700">
                <img
                  src="/public/ceo.jpeg"
                  alt="Director & CEO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">
                  Paramesh Godugu
                </h3>
                <p className="text-secondary-400 font-medium mb-3">
                  Director & CEO
                </p>
                <p className="text-gray-300 text-sm">
                  With extensive experience in technology leadership and business strategy,
                  Paramesh leads Parmy Technologies with a vision for innovation and
                  sustainable growth in the digital transformation space.
                </p>
              </div>
            </div>

            {/* CTO */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in-up animation-delay-100">
              <div className="aspect-w-1 aspect-h-1 bg-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="CTO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">
                  Nikhil Yerra
                </h3>
                <p className="text-secondary-400 font-medium mb-3">
                  Chief Technology Officer
                </p>
                <p className="text-gray-300 text-sm">
                  A recognized expert in AI and cloud computing, Nikhil leads our
                  technology strategy and innovation initiatives, ensuring we
                  remain at the cutting edge of digital transformation.
                </p>
              </div>
            </div>

            {/* COO */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in-up animation-delay-200">
              <div className="aspect-w-1 aspect-h-1 bg-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="COO"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">
                  Ushaswi Samala
                </h3>
                <p className="text-secondary-400 font-medium mb-3">
                  Chief Operations Officer
                </p>
                <p className="text-gray-300 text-sm">
                  Ushaswi oversees our global operations, ensuring efficient
                  delivery of services to clients while maintaining our high
                  standards of quality and excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/careers"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
            >
              Join Our Team
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Life at Parmy — Culture Photo Grid */}
      <div className="py-16 px-4 bg-gradient-to-br from-black via-primary-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3 animate-fade-in-up">Life at Parmy Technologies</h2>
            <p className="text-gray-300 animate-fade-in-up animation-delay-300">Where great minds come to create, collaborate, and grow</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden h-56 group md:col-span-1 col-span-2">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80" alt="Team environment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-56 group">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80" alt="Developer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-56 group">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80" alt="Workspace" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-56 group">
              <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80" alt="Technology" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-56 group">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80" alt="Team meeting" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-56 group">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80" alt="Coding" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white/5 backdrop-blur-lg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Get in Touch
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Ready to transform your business with innovative software solutions?
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-6 w-6 text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-300">+91 81252 45777</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon className="h-6 w-6 text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-300">info@parmytechnologies.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLinkIcon className="h-6 w-6 text-secondary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Website</h3>
              <a
                href="https://parmytechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-400 hover:text-secondary-300 transition-colors"
              >
                parmytechnologies.com
              </a>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="mb-12 lg:mb-0 animate-fade-in-left">
              <h3 className="text-2xl font-bold text-white mb-6">
                Ready to Start Your Digital Journey?
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Let's turn your vision into reality! Our team at Parmy Technologies is ready to
                collaborate, innovate, and bring your ideas to life with powerful software
                solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-6 py-3 border border-secondary-500 text-base font-medium rounded-md shadow-sm text-white hover:bg-secondary-500/10 transition-all duration-300 transform hover:scale-105"
                >
                  Our Services
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="animate-fade-in-right">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Send us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="py-3 px-4 block w-full bg-white/10 border-white/20 rounded-md text-white placeholder-gray-400 focus:ring-secondary-500 focus:border-secondary-500"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="py-3 px-4 block w-full bg-white/10 border-white/20 rounded-md text-white placeholder-gray-400 focus:ring-secondary-500 focus:border-secondary-500"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="py-3 px-4 block w-full bg-white/10 border-white/20 rounded-md text-white placeholder-gray-400 focus:ring-secondary-500 focus:border-secondary-500"
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
