import { Link } from 'react-router-dom';
import { GlobeIcon, MailIcon, PhoneIcon, ArrowRightIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/18 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/18 rounded-full blur-3xl animate-shimmer"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-2xl"></div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-royal-glow">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-400 rounded-full animate-shimmer"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  <span className="text-primary-300 drop-shadow-sm">Parmy</span>
                  <span className="text-white ml-1">Technologies</span>
                  <span className="text-primary-300 drop-shadow-sm"> Pvt. Ltd</span>
                </h3>
                <p className="text-xs text-secondary-300 tracking-wider">Innovation • Excellence • Growth</p>
              </div>
            </div>
            <p className="text-primary-200 leading-relaxed">
              Transforming businesses through cutting-edge technology solutions and innovative digital experiences worldwide.
            </p>
            <div className="flex items-center text-secondary-300">
              <GlobeIcon className="h-5 w-5 mr-2 text-primary-400" />
              <span>Empowering businesses globally</span>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/what-we-do#data-engineering" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Data Engineering</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do#web-development" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Web Development</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do#software-development" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Software Development</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do#cybersecurity" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Cybersecurity Solutions</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do#data-analytics" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Data Analytics</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do#digital-methodology" className="text-primary-200 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Digital Business Methodology</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-accent-400" />
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-primary-400 hover:text-primary-300 font-semibold transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>View All Services</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/who-we-are" className="text-neutral-300 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>About Us</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-neutral-300 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Industries</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-neutral-300 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Insights</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-300 hover:text-accent-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Careers</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                {/* <Link to="/investors" className="text-neutral-300 hover:text-secondary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Investors</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/worldwide" className="text-neutral-300 hover:text-primary-300 transition-all duration-300 hover:translate-x-1 flex items-center group">
                  <span>Worldwide</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link> */}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <PhoneIcon className="h-5 w-5 mr-2 mt-1 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">+91 81252 45777</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">info@parmytechnologies.com</span>
              </div>
              <div className="pt-4">
                <Link to="/contact" className="bg-gradient-primary hover:shadow-primary-lg text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center group">
                  <span>Contact Us</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gradient-to-r border-neutral-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 font-medium">
              © {new Date().getFullYear()} Parmy Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-primary-300 transition-all duration-300 hover:scale-105 font-medium">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-400 hover:text-secondary-300 transition-all duration-300 hover:scale-105 font-medium">
                Terms of Service
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent-300 transition-all duration-300 hover:scale-105 font-medium">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
              Crafting Innovative Software Solutions  
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
