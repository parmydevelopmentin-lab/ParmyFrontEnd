import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-purple-900 to-black text-white">
      {/* Simple Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
              Parmy Technologies
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Crafting Innovative Software Solutions for a Smarter Tomorrow
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold transition-all duration-300"
            >
              Get Started
            </Link>
            <Link 
              to="/services" 
              className="inline-flex items-center px-8 py-4 border border-secondary-500 hover:bg-secondary-500/10 rounded-lg font-semibold transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-300">Comprehensive technology solutions for your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-secondary-400">Web Development</h3>
              <p className="text-gray-300">Modern, responsive web applications built with cutting-edge technologies.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-secondary-400">Mobile Development</h3>
              <p className="text-gray-300">Native and cross-platform mobile applications for iOS and Android.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-secondary-400">Cloud Solutions</h3>
              <p className="text-gray-300">Scalable cloud infrastructure and migration services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Parmy Technologies</h2>
              <p className="text-lg text-gray-300 mb-6">
                We are a leading technology company specializing in innovative software solutions. 
                Our team of experts delivers cutting-edge applications that drive business growth 
                and digital transformation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-400">5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-400">100+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                  Expert team of developers
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                  Cutting-edge technologies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                  24/7 support and maintenance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></span>
                  Scalable solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold transition-all duration-300"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
