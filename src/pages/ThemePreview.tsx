import { useState } from 'react';
import { ArrowRight, Star, Zap, Shield, Globe } from 'lucide-react';

const ThemePreview = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);

  const themes = [
    {
      name: "Royal Purple & Gold",
      description: "Luxury, Premium, Corporate Excellence",
      primary: "from-indigo-600 to-indigo-800",
      secondary: "from-amber-500 to-amber-600", 
      accent: "text-white",
      bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800",
      cardBg: "bg-white/10 backdrop-blur-lg border-white/20",
      textPrimary: "text-white",
      textSecondary: "text-indigo-100",
      button: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
      colors: {
        primary: "#6366f1",
        secondary: "#f59e0b",
        accent: "#ffffff"
      }
    },
    {
      name: "Ocean Blue & Teal", 
      description: "Trust, Innovation, Reliability",
      primary: "from-sky-500 to-blue-600",
      secondary: "from-teal-500 to-teal-600",
      accent: "text-orange-500",
      bg: "bg-gradient-to-br from-blue-900 via-sky-800 to-teal-700",
      cardBg: "bg-white/10 backdrop-blur-lg border-white/20",
      textPrimary: "text-white",
      textSecondary: "text-sky-100", 
      button: "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      colors: {
        primary: "#0ea5e9",
        secondary: "#14b8a6", 
        accent: "#f97316"
      }
    },
    {
      name: "Crimson Red & Charcoal",
      description: "Power, Dynamic, Bold",
      primary: "from-red-600 to-red-700",
      secondary: "from-gray-700 to-gray-800",
      accent: "text-blue-400",
      bg: "bg-gradient-to-br from-red-900 via-gray-900 to-red-800",
      cardBg: "bg-white/10 backdrop-blur-lg border-white/20", 
      textPrimary: "text-white",
      textSecondary: "text-red-100",
      button: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      colors: {
        primary: "#dc2626",
        secondary: "#374151",
        accent: "#3b82f6"
      }
    },
    {
      name: "Forest Green & Warm Gray",
      description: "Growth, Stability, Innovation", 
      primary: "from-emerald-600 to-emerald-700",
      secondary: "from-gray-600 to-gray-700",
      accent: "text-orange-500",
      bg: "bg-gradient-to-br from-emerald-900 via-gray-800 to-emerald-700",
      cardBg: "bg-white/10 backdrop-blur-lg border-white/20",
      textPrimary: "text-white", 
      textSecondary: "text-emerald-100",
      button: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      colors: {
        primary: "#059669",
        secondary: "#6b7280",
        accent: "#ea580c"
      }
    },
    {
      name: "Midnight Blue & Silver",
      description: "Professional, Sleek, Modern",
      primary: "from-blue-800 to-blue-900", 
      secondary: "from-slate-500 to-slate-600",
      accent: "text-emerald-400",
      bg: "bg-gradient-to-br from-blue-900 via-slate-800 to-blue-800",
      cardBg: "bg-white/10 backdrop-blur-lg border-white/20",
      textPrimary: "text-white",
      textSecondary: "text-blue-100",
      button: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
      colors: {
        primary: "#1e3a8a", 
        secondary: "#94a3b8",
        accent: "#10b981"
      }
    }
  ];

  const currentTheme = themes[selectedTheme];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Theme Selector */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Parmy Technologies - Theme Preview</h1>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme, index) => (
              <button
                key={index}
                onClick={() => setSelectedTheme(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedTheme === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Preview */}
      <div className={`min-h-screen ${currentTheme.bg}`}>
        {/* Header Preview */}
        <header className="relative">
          <div className={`${currentTheme.cardBg} border-b border-white/10`}>
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${currentTheme.primary} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <div>
                    <h1 className={`text-xl font-bold ${currentTheme.textPrimary}`}>Parmy Technologies</h1>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>Innovation • Excellence • Growth</p>
                  </div>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="#" className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}>Services</a>
                  <a href="#" className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}>About</a>
                  <a href="#" className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors`}>Contact</a>
                  <button className={`${currentTheme.button} px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105`}>
                    Get Started
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${currentTheme.textPrimary}`}>
                Transform Your
                <span className={`block bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent`}>
                  Digital Future
                </span>
              </h1>
              <p className={`text-xl md:text-2xl ${currentTheme.textSecondary} max-w-3xl mx-auto mb-8`}>
                Parmy Technologies delivers cutting-edge solutions that drive innovation, 
                enhance efficiency, and accelerate your business growth in the digital age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className={`${currentTheme.button} px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2`}>
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className={`${currentTheme.cardBg} border border-white/20 px-8 py-4 rounded-lg ${currentTheme.textPrimary} font-semibold text-lg transition-all duration-200 hover:bg-white/20`}>
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${currentTheme.textPrimary} mb-4`}>
                Why Choose Parmy Technologies?
              </h2>
              <p className={`text-xl ${currentTheme.textSecondary} max-w-2xl mx-auto`}>
                We combine expertise, innovation, and dedication to deliver exceptional results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast Solutions", 
                  description: "Rapid deployment and implementation of cutting-edge technologies."
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Enterprise Security",
                  description: "Bank-grade security measures to protect your valuable data and systems."
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Reach",
                  description: "Worldwide presence with local expertise in every major market."
                }
              ].map((feature, index) => (
                <div key={index} className={`${currentTheme.cardBg} border border-white/20 rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-105`}>
                  <div className={`${currentTheme.accent} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-3`}>
                    {feature.title}
                  </h3>
                  <p className={`${currentTheme.textSecondary}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`${currentTheme.cardBg} border border-white/20 rounded-2xl p-12`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "500+", label: "Projects Delivered" },
                  { number: "98%", label: "Client Satisfaction" },
                  { number: "50+", label: "Countries Served" },
                  { number: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-bold ${currentTheme.textPrimary} mb-2`}>
                      {stat.number}
                    </div>
                    <div className={`${currentTheme.textSecondary}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className={`${currentTheme.cardBg} border border-white/20 rounded-2xl p-12`}>
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${currentTheme.accent} fill-current`} />
                ))}
              </div>
              <blockquote className={`text-2xl font-medium ${currentTheme.textPrimary} mb-6`}>
                "Parmy Technologies transformed our entire digital infrastructure. 
                Their expertise and dedication resulted in a 300% increase in our operational efficiency."
              </blockquote>
              <div className={`${currentTheme.textSecondary}`}>
                <p className="font-semibold">Sarah Johnson</p>
                <p>CTO, TechCorp Industries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className={`text-4xl font-bold ${currentTheme.textPrimary} mb-6`}>
              Ready to Transform Your Business?
            </h2>
            <p className={`text-xl ${currentTheme.textSecondary} mb-8`}>
              Let's discuss how Parmy Technologies can accelerate your digital transformation journey.
            </p>
            <button className={`${currentTheme.button} px-12 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto`}>
              <span>Contact Us Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Color Palette Display */}
        <section className="py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className={`text-2xl font-bold ${currentTheme.textPrimary} mb-8 text-center`}>Color Palette</h3>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mb-2 shadow-lg"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                ></div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>Primary</p>
                <p className={`text-xs ${currentTheme.textSecondary} opacity-75`}>{currentTheme.colors.primary}</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mb-2 shadow-lg"
                  style={{ backgroundColor: currentTheme.colors.secondary }}
                ></div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>Secondary</p>
                <p className={`text-xs ${currentTheme.textSecondary} opacity-75`}>{currentTheme.colors.secondary}</p>
              </div>
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mb-2 shadow-lg"
                  style={{ backgroundColor: currentTheme.colors.accent }}
                ></div>
                <p className={`text-sm ${currentTheme.textSecondary}`}>Accent</p>
                <p className={`text-xs ${currentTheme.textSecondary} opacity-75`}>{currentTheme.colors.accent}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Info */}
        <div className="text-center py-8 border-t border-white/10">
          <h4 className={`text-xl font-semibold ${currentTheme.textPrimary} mb-2`}>
            {currentTheme.name}
          </h4>
          <p className={`${currentTheme.textSecondary}`}>
            {currentTheme.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
