import React, { useState, useEffect } from 'react';
import { 
  StarIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  QuoteIcon,
  PlayIcon,
  LinkedinIcon,
  TwitterIcon,
  CheckCircleIcon,
  BuildingIcon,
  MapPinIcon,
  CalendarIcon
} from 'lucide-react';

interface TestimonialData {
  id: number;
  name: string;
  position: string;
  company: string;
  companyLogo: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  videoUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  projectType: string;
  completionDate: string;
  isVerified: boolean;
  tags: string[];
  projectValue: string;
  results: {
    metric: string;
    value: string;
  }[];
}

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      name: "Rajesh Patel",
      position: "CTO",
      company: "TechVista Solutions",
      companyLogo: "/api/placeholder/60/60",
      location: "Mumbai, India",
      avatar: "/api/placeholder/100/100",
      rating: 5,
      content: "Parmy Technologies delivered our complete digital transformation project ahead of schedule. Their blockchain-based document verification system has revolutionized our compliance processes, reducing verification time by 85% and saving us over ₹2.5 crores annually.",
      videoUrl: "https://youtube.com/watch?v=example1",
      linkedinUrl: "https://linkedin.com/in/rajeshpatel",
      twitterUrl: "https://twitter.com/rajeshpatel",
      projectType: "Blockchain Development",
      completionDate: "2024-01-15",
      isVerified: true,
      tags: ["Blockchain", "Digital Transformation", "Compliance"],
      projectValue: "₹45 Lakhs",
      results: [
        { metric: "Time Reduction", value: "85%" },
        { metric: "Cost Savings", value: "₹2.5Cr/year" },
        { metric: "Efficiency Gain", value: "300%" }
      ]
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Founder & CEO",
      company: "EduTech Innovations",
      companyLogo: "/api/placeholder/60/60",
      location: "Bangalore, India",
      avatar: "/api/placeholder/100/100",
      rating: 5,
      content: "The AI-powered learning management system developed by Parmy has transformed our educational platform. Student engagement increased by 240% and our revenue grew by 180% within the first quarter of deployment.",
      videoUrl: "https://youtube.com/watch?v=example2",
      linkedinUrl: "https://linkedin.com/in/priyasharma",
      projectType: "AI/ML Development",
      completionDate: "2024-02-20",
      isVerified: true,
      tags: ["AI/ML", "EdTech", "LMS"],
      projectValue: "₹35 Lakhs",
      results: [
        { metric: "Student Engagement", value: "+240%" },
        { metric: "Revenue Growth", value: "+180%" },
        { metric: "Platform Uptime", value: "99.9%" }
      ]
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      position: "Operations Director",
      company: "LogiFlow Systems",
      companyLogo: "/api/placeholder/60/60",
      location: "Dubai, UAE",
      avatar: "/api/placeholder/100/100",
      rating: 5,
      content: "Outstanding work on our IoT-enabled supply chain management system. The real-time tracking and predictive analytics have optimized our logistics operations, reducing delivery times by 40% and operational costs by ₹1.8 crores annually.",
      linkedinUrl: "https://linkedin.com/in/mohammedhassan",
      projectType: "IoT Development",
      completionDate: "2023-12-10",
      isVerified: true,
      tags: ["IoT", "Supply Chain", "Analytics"],
      projectValue: "₹55 Lakhs",
      results: [
        { metric: "Delivery Time", value: "-40%" },
        { metric: "Cost Reduction", value: "₹1.8Cr/year" },
        { metric: "Accuracy", value: "99.2%" }
      ]
    },
    {
      id: 4,
      name: "Sarah Mitchell",
      position: "VP Technology",
      company: "GlobalTrade Corp",
      companyLogo: "/api/placeholder/60/60",
      location: "Singapore",
      avatar: "/api/placeholder/100/100",
      rating: 5,
      content: "Parmy's team delivered an exceptional e-commerce platform with advanced analytics. The system handles over 10,000 concurrent users seamlessly and our conversion rate improved by 65%. Truly professional and innovative approach.",
      videoUrl: "https://youtube.com/watch?v=example4",
      linkedinUrl: "https://linkedin.com/in/sarahmitchell",
      projectType: "E-commerce Development",
      completionDate: "2024-03-05",
      isVerified: true,
      tags: ["E-commerce", "Analytics", "Scalability"],
      projectValue: "₹42 Lakhs",
      results: [
        { metric: "Conversion Rate", value: "+65%" },
        { metric: "Concurrent Users", value: "10,000+" },
        { metric: "Page Load Time", value: "1.2s" }
      ]
    },
    {
      id: 5,
      name: "Amit Gupta",
      position: "Head of Digital",
      company: "FinanceSecure Ltd",
      companyLogo: "/api/placeholder/60/60",
      location: "Delhi, India",
      avatar: "/api/placeholder/100/100",
      rating: 5,
      content: "The fintech application developed by Parmy has been a game-changer for our business. With advanced security features and seamless UX, we've onboarded 50,000+ users in just 6 months and processed transactions worth ₹150 crores.",
      linkedinUrl: "https://linkedin.com/in/amitgupta",
      projectType: "Fintech Development",
      completionDate: "2024-01-30",
      isVerified: true,
      tags: ["Fintech", "Security", "UX/UI"],
      projectValue: "₹48 Lakhs",
      results: [
        { metric: "User Onboarding", value: "50,000+" },
        { metric: "Transaction Volume", value: "₹150Cr" },
        { metric: "Security Score", value: "A+" }
      ]
    }
  ];

  const categories = [
    'all',
    'Blockchain',
    'AI/ML',
    'IoT',
    'E-commerce',
    'Fintech'
  ];

  const filteredTestimonials = filterCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => 
        testimonial.tags.some(tag => tag.toLowerCase().includes(filterCategory.toLowerCase()))
      );

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying === null) {
        nextTestimonial();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const currentTestimonial = filteredTestimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary-400/5 to-transparent rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-secondary-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <QuoteIcon className="h-5 w-5 text-secondary-300 mr-2" />
            <span className="text-secondary-300 font-medium">Client Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            What Our <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">Clients</span> Say
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Real testimonials from satisfied clients who have transformed their businesses with our innovative solutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setFilterCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filterCategory === category
                  ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/25'
                  : 'bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Client Info */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="relative inline-block mb-6">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-32 h-32 rounded-full mx-auto lg:mx-0 object-cover border-4 border-secondary-500/30"
                  />
                  {currentTestimonial.isVerified && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                  {currentTestimonial.videoUrl && (
                    <button
                      onClick={() => setIsPlaying(currentTestimonial.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <PlayIcon className="h-8 w-8 text-white" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentTestimonial.name}</h3>
                    <p className="text-secondary-300 font-medium">{currentTestimonial.position}</p>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 mt-2">
                      <img
                        src={currentTestimonial.companyLogo}
                        alt={currentTestimonial.company}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="text-white/80">{currentTestimonial.company}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mt-2 text-white/60">
                      <MapPinIcon className="h-4 w-4" />
                      <span className="text-sm">{currentTestimonial.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    {renderStars(currentTestimonial.rating)}
                  </div>

                  <div className="flex justify-center lg:justify-start space-x-3">
                    {currentTestimonial.linkedinUrl && (
                      <a
                        href={currentTestimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-full hover:bg-blue-500 transition-colors"
                      >
                        <LinkedinIcon className="h-5 w-5 text-white" />
                      </a>
                    )}
                    {currentTestimonial.twitterUrl && (
                      <a
                        href={currentTestimonial.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-full hover:bg-blue-400 transition-colors"
                      >
                        <TwitterIcon className="h-5 w-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <QuoteIcon className="h-16 w-16 text-secondary-500/30 absolute -top-4 -left-4" />
                  <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed pl-8">
                    "{currentTestimonial.content}"
                  </blockquote>
                </div>

                {/* Project Details */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BuildingIcon className="h-5 w-5 text-secondary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Project Type</p>
                        <p className="text-white font-medium">{currentTestimonial.projectType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-secondary-400" />
                      <div>
                        <p className="text-white/60 text-sm">Completed</p>
                        <p className="text-white font-medium">
                          {new Date(currentTestimonial.completionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">₹</span>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Project Value</p>
                        <p className="text-white font-medium">{currentTestimonial.projectValue}</p>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Results</h4>
                    <div className="space-y-2">
                      {currentTestimonial.results.map((result, index) => (
                        <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                          <span className="text-white/80 text-sm">{result.metric}</span>
                          <span className="text-secondary-400 font-bold">{result.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {currentTestimonial.tags.map(tag => (
                      <span
                        key={tag}
                        className="bg-primary-600/30 text-primary-200 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-secondary-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Satisfied Clients', value: '500+' },
              { label: 'Projects Delivered', value: '1200+' },
              { label: 'Success Rate', value: '98.5%' },
              { label: 'Years Experience', value: '12+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
