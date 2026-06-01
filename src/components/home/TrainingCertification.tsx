import { useState, useEffect } from 'react';
import { 
  BookOpenIcon,
  PlayIcon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
  StarIcon,
  DownloadIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  CalendarIcon,
  GlobeIcon,
  CodeIcon,
  DatabaseIcon,
  ShieldIcon,
  SmartphoneIcon,
  BrainIcon,
  CloudIcon
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: string;
  originalPrice?: string;
  rating: number;
  students: number;
  lessons: number;
  projects: number;
  certificate: boolean;
  image: string;
  instructor: {
    name: string;
    avatar: string;
    expertise: string;
    experience: string;
  };
  skills: string[];
  curriculum: {
    module: string;
    lessons: string[];
  }[];
  isPopular?: boolean;
  isFeatured?: boolean;
  startDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
}

interface Certification {
  id: number;
  title: string;
  description: string;
  badge: string;
  issuer: string;
  validityPeriod: string;
  requirements: string[];
  benefits: string[];
}

const TrainingCertification = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const courses: Course[] = [
    {
      id: 1,
      title: "Complete Blockchain Development Bootcamp",
      description: "Master blockchain technology with hands-on projects in Ethereum, smart contracts, DeFi, and NFTs. Build real-world applications and get job-ready skills.",
      category: "Blockchain",
      level: "Intermediate",
      duration: "12 weeks",
      price: "₹45,000",
      originalPrice: "₹65,000",
      rating: 4.9,
      students: 1250,
      lessons: 95,
      projects: 8,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Dr. Vikram Singh",
        avatar: "/api/placeholder/80/80",
        expertise: "Blockchain Architect",
        experience: "8+ years"
      },
      skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi", "NFTs"],
      curriculum: [
        {
          module: "Blockchain Fundamentals",
          lessons: ["Introduction to Blockchain", "Cryptography Basics", "Consensus Mechanisms"]
        },
        {
          module: "Ethereum Development",
          lessons: ["Setting up Environment", "Smart Contract Development", "Web3 Integration"]
        },
        {
          module: "Advanced Topics",
          lessons: ["DeFi Protocols", "NFT Development", "Layer 2 Solutions"]
        }
      ],
      isPopular: true,
      startDate: "2024-02-15",
      mode: "Online"
    },
    {
      id: 2,
      title: "AI & Machine Learning Mastery Program",
      description: "Comprehensive AI/ML program covering Python, TensorFlow, deep learning, computer vision, and NLP. Build intelligent applications from scratch.",
      category: "AI/ML",
      level: "Advanced",
      duration: "16 weeks",
      price: "₹55,000",
      originalPrice: "₹80,000",
      rating: 4.8,
      students: 980,
      lessons: 120,
      projects: 12,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Priya Sharma",
        avatar: "/api/placeholder/80/80",
        expertise: "AI Research Scientist",
        experience: "10+ years"
      },
      skills: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning"],
      curriculum: [
        {
          module: "Python for AI",
          lessons: ["Python Basics", "NumPy & Pandas", "Data Visualization"]
        },
        {
          module: "Machine Learning",
          lessons: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"]
        },
        {
          module: "Deep Learning",
          lessons: ["Neural Networks", "CNN", "RNN", "Transformers"]
        }
      ],
      isFeatured: true,
      startDate: "2024-02-20",
      mode: "Hybrid"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      description: "Complete web development course covering MERN stack, databases, deployment, and modern development practices. Build production-ready applications.",
      category: "Web Development",
      level: "Beginner",
      duration: "14 weeks",
      price: "₹35,000",
      originalPrice: "₹50,000",
      rating: 4.7,
      students: 2100,
      lessons: 110,
      projects: 10,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Rahul Kumar",
        avatar: "/api/placeholder/80/80",
        expertise: "Senior Full Stack Developer",
        experience: "12+ years"
      },
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript"],
      curriculum: [
        {
          module: "Frontend Development",
          lessons: ["HTML/CSS", "JavaScript ES6+", "React Fundamentals", "State Management"]
        },
        {
          module: "Backend Development",
          lessons: ["Node.js", "Express.js", "Database Design", "API Development"]
        },
        {
          module: "Deployment & DevOps",
          lessons: ["Cloud Deployment", "Docker", "CI/CD", "Monitoring"]
        }
      ],
      startDate: "2024-02-10",
      mode: "Online"
    },
    {
      id: 4,
      title: "Cybersecurity Professional Program",
      description: "Comprehensive cybersecurity training covering ethical hacking, penetration testing, security architecture, and compliance frameworks.",
      category: "Cybersecurity",
      level: "Intermediate",
      duration: "10 weeks",
      price: "₹40,000",
      originalPrice: "₹60,000",
      rating: 4.9,
      students: 750,
      lessons: 85,
      projects: 6,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Suresh Patel",
        avatar: "/api/placeholder/80/80",
        expertise: "Cybersecurity Consultant",
        experience: "15+ years"
      },
      skills: ["Ethical Hacking", "Penetration Testing", "Security Analysis", "Compliance"],
      curriculum: [
        {
          module: "Security Fundamentals",
          lessons: ["Security Principles", "Risk Assessment", "Threat Modeling"]
        },
        {
          module: "Ethical Hacking",
          lessons: ["Reconnaissance", "Vulnerability Assessment", "Exploitation"]
        },
        {
          module: "Security Management",
          lessons: ["Incident Response", "Compliance", "Security Architecture"]
        }
      ],
      isPopular: true,
      startDate: "2024-02-25",
      mode: "Hybrid"
    },
    {
      id: 5,
      title: "Mobile App Development (iOS & Android)",
      description: "Learn to build native and cross-platform mobile applications using React Native, Flutter, and native development tools.",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "12 weeks",
      price: "₹42,000",
      originalPrice: "₹65,000",
      rating: 4.6,
      students: 890,
      lessons: 100,
      projects: 8,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Anjali Mehta",
        avatar: "/api/placeholder/80/80",
        expertise: "Mobile App Developer",
        experience: "9+ years"
      },
      skills: ["React Native", "Flutter", "iOS Development", "Android Development"],
      curriculum: [
        {
          module: "Cross-Platform Development",
          lessons: ["React Native", "Flutter Basics", "State Management"]
        },
        {
          module: "Native Development",
          lessons: ["iOS Swift", "Android Kotlin", "Platform APIs"]
        },
        {
          module: "App Deployment",
          lessons: ["App Store", "Google Play", "App Analytics"]
        }
      ],
      startDate: "2024-03-01",
      mode: "Online"
    },
    {
      id: 6,
      title: "Cloud Computing & DevOps",
      description: "Master cloud platforms (AWS, Azure, GCP) and DevOps practices including CI/CD, containerization, and infrastructure as code.",
      category: "Cloud/DevOps",
      level: "Advanced",
      price: "₹48,000",
      originalPrice: "₹70,000",
      duration: "14 weeks",
      rating: 4.8,
      students: 650,
      lessons: 115,
      projects: 10,
      certificate: true,
      image: "/api/placeholder/400/250",
      instructor: {
        name: "Arjun Reddy",
        avatar: "/api/placeholder/80/80",
        expertise: "Cloud Solutions Architect",
        experience: "11+ years"
      },
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Monitoring"],
      curriculum: [
        {
          module: "Cloud Fundamentals",
          lessons: ["Cloud Computing Concepts", "AWS Services", "Azure & GCP"]
        },
        {
          module: "DevOps Practices",
          lessons: ["CI/CD Pipelines", "Infrastructure as Code", "Containerization"]
        },
        {
          module: "Advanced Topics",
          lessons: ["Microservices", "Monitoring & Logging", "Security Best Practices"]
        }
      ],
      startDate: "2024-03-05",
      mode: "Hybrid"
    }
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      title: "Certified Blockchain Developer",
      description: "Industry-recognized certification for blockchain developers with practical project experience.",
      badge: "/api/placeholder/100/100",
      issuer: "Parmy Technologies",
      validityPeriod: "3 years",
      requirements: [
        "Complete Blockchain Development Bootcamp",
        "Pass final assessment with 80% score",
        "Submit 3 practical projects",
        "Complete peer review process"
      ],
      benefits: [
        "Industry recognition",
        "Career advancement opportunities",
        "Access to exclusive job portal",
        "Continuous learning resources"
      ]
    },
    {
      id: 2,
      title: "AI/ML Professional Certificate",
      description: "Advanced certification for artificial intelligence and machine learning professionals.",
      badge: "/api/placeholder/100/100",
      issuer: "Parmy Technologies",
      validityPeriod: "3 years",
      requirements: [
        "Complete AI & ML Mastery Program",
        "Pass comprehensive assessment",
        "Complete capstone project",
        "Industry mentor evaluation"
      ],
      benefits: [
        "Professional credibility",
        "Higher salary potential",
        "Alumni network access",
        "Lifetime learning updates"
      ]
    }
  ];

  const categories = ['all', 'Blockchain', 'AI/ML', 'Web Development', 'Cybersecurity', 'Mobile Development', 'Cloud/DevOps'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Blockchain': return <DatabaseIcon className="h-5 w-5" />;
      case 'AI/ML': return <BrainIcon className="h-5 w-5" />;
      case 'Web Development': return <CodeIcon className="h-5 w-5" />;
      case 'Cybersecurity': return <ShieldIcon className="h-5 w-5" />;
      case 'Mobile Development': return <SmartphoneIcon className="h-5 w-5" />;
      case 'Cloud/DevOps': return <CloudIcon className="h-5 w-5" />;
      default: return <BookOpenIcon className="h-5 w-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-white/80">({rating})</span>
      </div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === filteredCourses.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredCourses.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-secondary-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <BookOpenIcon className="h-5 w-5 text-secondary-300 mr-2" />
            <span className="text-secondary-300 font-medium">Learn & Grow</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Training & <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">Certification</span>
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Advance your career with industry-leading training programs and certifications in cutting-edge technologies
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            {[
              { id: 'courses', label: 'Training Courses', icon: BookOpenIcon },
              { id: 'certifications', label: 'Certifications', icon: AwardIcon },
              { id: 'stats', label: 'Success Stats', icon: TrendingUpIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-8 py-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-secondary-500 text-white shadow-lg' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex flex-wrap gap-2">
                <span className="text-white/80 mr-2">Category:</span>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-secondary-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {category !== 'all' && getCategoryIcon(category)}
                    <span className={category !== 'all' ? 'ml-2' : ''}>
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-white/80 mr-2">Level:</span>
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedLevel === level
                        ? 'bg-secondary-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="relative mb-6">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {course.isPopular && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                          Popular
                        </span>
                      )}
                      {course.isFeatured && (
                        <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayIcon className="h-12 w-12 text-white" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(course.category)}
                        <span className="text-secondary-300 text-sm">{course.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">{course.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <UsersIcon className="h-4 w-4 mr-1" />
                          {course.students}+
                        </div>
                      </div>
                      <div className="flex items-center">
                        <GlobeIcon className="h-4 w-4 mr-1" />
                        {course.mode}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {renderStars(course.rating)}
                      <div className="flex items-center text-white/60 text-sm">
                        <BookOpenIcon className="h-4 w-4 mr-1" />
                        {course.lessons} lessons
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {course.originalPrice && (
                          <span className="text-white/60 line-through text-sm">{course.originalPrice}</span>
                        )}
                        <span className="text-2xl font-bold text-secondary-300">{course.price}</span>
                      </div>
                      {course.certificate && (
                        <div className="flex items-center text-green-400 text-sm">
                          <AwardIcon className="h-4 w-4 mr-1" />
                          Certificate
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium text-sm">{course.instructor.name}</div>
                          <div className="text-white/60 text-xs">{course.instructor.expertise}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-primary-600/30 text-primary-200 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 3 && (
                          <span className="bg-primary-600/30 text-primary-200 px-2 py-1 rounded text-xs">
                            +{course.skills.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-secondary-500 text-white py-3 rounded-xl hover:bg-secondary-600 transition-colors font-semibold">
                          Enroll Now
                        </button>
                        <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                          <DownloadIcon className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map(cert => (
                <div key={cert.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <img
                      src={cert.badge}
                      alt={cert.title}
                      className="w-24 h-24 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-white/70">{cert.description}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="text-white/80 text-sm flex items-start">
                            <ChevronRightIcon className="h-4 w-4 text-secondary-400 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <AwardIcon className="h-5 w-5 text-yellow-400 mr-2" />
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {cert.benefits.map((benefit, index) => (
                          <li key={index} className="text-white/80 text-sm flex items-start">
                            <ChevronRightIcon className="h-4 w-4 text-secondary-400 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80">Issuer:</span>
                        <span className="text-white font-medium">{cert.issuer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Valid for:</span>
                        <span className="text-white font-medium">{cert.validityPeriod}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                      Start Certification Path
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { label: 'Students Trained', value: '25,000+', icon: UsersIcon },
                { label: 'Courses Available', value: '150+', icon: BookOpenIcon },
                { label: 'Certifications Issued', value: '18,500+', icon: AwardIcon },
                { label: 'Success Rate', value: '94%', icon: TrendingUpIcon }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="flex justify-center mb-4">
                    <div className="bg-secondary-500/20 p-4 rounded-full">
                      <stat.icon className="h-8 w-8 text-secondary-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-secondary-400 mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-8">Why Choose Our Training Programs?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Industry Expert Instructors",
                    description: "Learn from professionals with real-world experience and industry insights",
                    icon: AwardIcon
                  },
                  {
                    title: "Hands-on Projects",
                    description: "Build portfolio-worthy projects that demonstrate your skills to employers",
                    icon: CodeIcon
                  },
                  {
                    title: "Job Placement Support",
                    description: "Get career guidance, resume reviews, and job placement assistance",
                    icon: TrendingUpIcon
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-secondary-500/20 p-4 rounded-full">
                        <feature.icon className="h-8 w-8 text-secondary-400" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingCertification;
