import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, CheckCircleIcon, ChevronDownIcon, ArrowRightIcon, ClockIcon, CalendarIcon, MessageSquare as MessageSquareIcon, Users as UsersIcon, Building as BuildingIcon, Globe as GlobeAltIcon, AlertCircleIcon } from 'lucide-react';
import { contactApi, ContactFormData, ApiError } from '../services/api';
const ContactPage = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash === "#form") {
      document.getElementById("form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [activeLocation, setActiveLocation] = useState<keyof typeof locations>('hyderabad');
  const locations = {
    hyderabad: {
      name: 'Hyderabad',
      country: 'India',
      address: 'Hyderabad, India',
      phone: '+91 81252 45777',
      email: 'info@parmytechnologies.com',
      timezone: 'GMT+5:30',
      workingHours: '9:00 AM - 6:00 PM IST',
      teamSize: 'Expert Team',
      specializations: ['Data Engineering', 'Web Development', 'Software Development', 'Cybersecurity Solutions', 'Data Analytics', 'Digital Business Methodology'],
      coordinates: {
        lat: 17.4435,
        lng: 78.3772
      },
      image: '/office.png'
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        setError('Please fill in all required fields.');
        return;
      }

      // Submit to backend
      const response = await contactApi.submitContactForm(formData as ContactFormData);

      if (response.success) {
        setSuccessMessage(response.message);
        setIsSubmitted(true);

        // Reset form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: '',
          location: ''
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Contact form submission error:', err);

      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to send message. Please try again or contact us directly at info@parmytechnologies.com');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const selectedLocation = locations[activeLocation as keyof typeof locations];
  return <div className="bg-surface-dark text-white w-full">
    {/* Hero Section */}
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-purple-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-500 opacity-20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-secondary-500 opacity-20 rounded-full animate-float-medium"></div>
        <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-secondary-500 opacity-20 rounded-full animate-float-fast"></div>
      </div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-white animate-fade-in-up">
            <span className="block">Get In Touch With</span>
            <span className="block text-secondary-400 mt-2">
              Parmy Technologies
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 animate-fade-in-up animation-delay-300">
            Let's turn your vision into reality! Our team is ready to collaborate, innovate, and bring your ideas to life with powerful software solutions tailored to your needs.
          </p>
          <div className="mt-10 flex justify-center space-x-6 animate-fade-in-up animation-delay-500">
            <a href="#form" className="inline-flex items-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-secondary-900/30">
              Contact Form
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
            <a href="#locations" className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Our Location
              <ChevronDownIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div id="form" className="bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            We're here to help you with your project needs
          </p>
        </div>
        <div className="relative bg-gray-900 shadow-2xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Contact information */}
            <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-br from-[#1A202C] via-[#1E293B] to-[#2D3748] lg:col-span-2 xl:p-12">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-500 opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-green-600 opacity-20 blur-3xl"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-white">
                  Contact information
                </h3>
                <p className="mt-6 text-base text-gray-300 max-w-3xl">
                  Our team is ready to assist you with any questions about our
                  services or to discuss your project needs.
                </p>
                <div className="mt-12">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-300">
                        <MessageSquareIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          Talk to Our Team
                        </h4>
                        <p className="mt-1 text-gray-300">
                          Interested in our services? Let's discuss your
                          project needs.
                        </p>
                        <p className="mt-2 text-white font-medium">
                          +91 81252 45777
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-300">
                        <BuildingIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          Our Office
                        </h4>
                        <p className="mt-1 text-gray-300">
                          Hyderabad, India
                        </p>
                        <p className="mt-2 text-white">
                          info@parmytechnologies.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-300">
                        <GlobeAltIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          Our Services
                        </h4>
                        <p className="mt-1 text-gray-300">
                          Data Engineering, Web Development, Software Development, Cybersecurity & Analytics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-all duration-300">
                        <CalendarIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          Schedule a Meeting
                        </h4>
                        <p className="mt-1 text-gray-300">
                          Book a time with our experts to discuss your software solution needs
                        </p>
                        <a href="#" className="mt-2 text-white font-medium flex items-center hover:underline">
                          Book a call
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h4 className="text-white font-medium mb-4">
                    Connect with us
                  </h4>
                  <div className="flex space-x-5">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-3 xl:p-12 bg-gray-800">
              {isSubmitted ? <div className="text-center py-16">
                <div className="h-24 w-24 rounded-full bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="h-12 w-12 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Thank you for reaching out!
                </h3>
                <p className="mt-3 text-lg text-gray-300">
                  {successMessage || "We've received your message and will get back to you shortly."}
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuccessMessage('');
                      setError('');
                    }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                  >
                    Send another message
                  </button>
                </div>
              </div> : <>
                <h3 className="text-2xl font-bold text-white">
                  Send us a message
                </h3>
                <p className="mt-3 text-lg text-gray-300">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md flex items-start">
                    <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                      First name
                    </label>
                    <div className="mt-1">
                      <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" required className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name" required className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <div className="mt-1">
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                        Phone
                      </label>
                      <span id="phone-optional" className="text-sm text-gray-500">
                        Optional
                      </span>
                    </div>
                    <div className="mt-1">
                      <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg" aria-describedby="phone-optional" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                      Company
                    </label>
                    <div className="mt-1">
                      <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} autoComplete="organization" className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300">
                      What service are you interested in?
                    </label>
                    <div className="mt-1">
                      <select id="service" name="service" value={formData.service} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg">
                        <option value="">Please select</option>
                        <option value="software-development">
                          Software Development
                        </option>
                        <option value="software-maintenance">
                          Software Maintenance
                        </option>
                        <option value="seo">SEO Services</option>
                        <option value="digital-marketing">
                          Digital Marketing
                        </option>
                        <option value="ai-ml">AI & Machine Learning</option>
                        <option value="cloud">Cloud Services</option>
                        <option value="consultancy">Consultancy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300">
                      Preferred office location
                    </label>
                    <div className="mt-1">
                      <select id="location" name="location" value={formData.location} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border-gray-600 rounded-lg">
                        <option value="">No preference</option>
                        <option value="hyderabad">Hyderabad, India</option>
                        <option value="seattle">Seattle, USA</option>
                        <option value="portland">Portland, USA</option>
                        <option value="jeddah">Jeddah, Saudi Arabia</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <span id="message-max" className="text-sm text-gray-500">
                        Max. 500 characters
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="py-3 px-4 block w-full shadow-sm bg-gray-700 text-white focus:ring-green-500 focus:border-green-500 border border-gray-600 rounded-lg" aria-describedby="message-max" maxLength={500} required />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button type="submit" disabled={isSubmitting} className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto disabled:bg-green-800 disabled:text-green-100 disabled:cursor-not-allowed transition-all duration-300">
                      {isSubmitting ? <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </> : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>}
            </div>
          </div>
        </div>
      </div>
    </div>
      <div id="locations" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Our Office</h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
            Strategic locations to serve clients around the world with local expertise
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="bg-surface-dark-secondary/80 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-700/30 overflow-hidden h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Select Location</h3>
                <div className="space-y-4">
                  {Object.entries(locations).map(([key, location]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveLocation(key as keyof typeof locations)}
                      className={`flex items-center w-full p-4 rounded-xl text-left transition-all duration-300 ${activeLocation === key ? 'bg-primary-500/20 border-primary-500/50 border shadow-primary backdrop-blur-sm' : 'hover:bg-surface-dark-tertiary/50 border border-transparent'}`}>
                      <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeLocation === key ? 'bg-primary-500 text-white shadow-primary' : 'bg-neutral-700 text-neutral-300'}`}>
                        <MapPinIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-white">{location.name}</div>
                        <div className="text-sm text-neutral-400">{location.country}</div>
                      </div>
                      {activeLocation === key && (
                        <ArrowRightIcon className="ml-auto h-5 w-5 text-primary-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface-dark-secondary/80 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-700/30 overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src={locations[activeLocation].image}
                  alt={`${locations[activeLocation].name} office`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{locations[activeLocation].name}</h3>
                    <p className="text-gray-400">{locations[activeLocation].country}</p>
                  </div>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                    {locations[activeLocation].teamSize}
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-neutral-300">
                      <MapPinIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                      <span>{locations[activeLocation].address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <PhoneIcon className="h-5 w-5 text-secondary-400 flex-shrink-0" />
                      <span>{locations[activeLocation].phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <MailIcon className="h-5 w-5 text-accent-400 flex-shrink-0" />
                      <span>{locations[activeLocation].email}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-neutral-300">
                      <GlobeIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{locations[activeLocation].timezone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <ClockIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{locations[activeLocation].workingHours}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-300">
                      <UsersIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{locations[activeLocation].teamSize} professionals</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden border border-neutral-700/30">
                  <iframe
                    title="Parmy Technologies Office Location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].address)}&output=embed&z=17`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
};
export default ContactPage;
