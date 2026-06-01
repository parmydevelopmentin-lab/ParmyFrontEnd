import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sun, Moon, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../ui/ThemeProvider';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeDropdowns = () => {
        setActiveDropdown(null);
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-surface-dark via-surface-dark-secondary to-surface-dark backdrop-blur-md shadow-ocean-wave border-b border-primary-800/30' : 'bg-gradient-to-r from-surface-dark via-surface-dark-secondary to-surface-dark'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/" className="flex items-center group">
                            <span className="sr-only">Parmy Technologies</span>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <img
                                        src="/logo.png"
                                        alt="Parmy Technologies Logo"
                                        className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter brightness-110 contrast-110"
                                        style={{ imageRendering: 'crisp-edges' }}
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="-mr-2 -my-2 md:hidden">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-lg text-primary-300 hover:text-white hover:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 backdrop-blur-sm">
                            <span className="sr-only">Open menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Desktop Navigation - Hidden for authenticated users */}
                    <nav className="hidden md:flex space-x-10">
                        {!user && (
                            <>
                                {/* Services Dropdown */}
                                <div className="relative">
                                    <button onClick={() => toggleDropdown('services')} className={`group inline-flex items-center text-base font-medium focus:outline-none transition-all duration-200 ${activeDropdown === 'services' ? 'text-primary-300' : 'text-primary-200 hover:text-white'}`}>
                                        <span>Services</span>
                                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-150 ${activeDropdown === 'services' ? 'transform rotate-180 text-secondary-400' : ''}`} aria-hidden="true" />
                                    </button>
                                    {activeDropdown === 'services' && (
                                        <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-xl shadow-ocean-wave ring-1 ring-primary-800/20 overflow-hidden backdrop-blur-md">
                                                <div className="relative grid gap-6 bg-gradient-to-br from-surface-dark-secondary via-surface-dark to-surface-dark-secondary px-6 py-8 sm:gap-8 sm:p-10 border border-primary-700/30">
                                                    <Link to="/services" className="flex items-start rounded-lg hover:bg-gradient-to-r hover:from-primary-900/30 hover:to-secondary-900/30 -m-3 p-4 transition-all duration-200 group border border-transparent hover:border-primary-700/30" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-semibold text-white group-hover:text-primary-300 transition-colors">
                                                                All Services
                                                            </p>
                                                            <p className="mt-1 text-sm text-primary-200 group-hover:text-secondary-300 transition-colors">
                                                                Overview of our comprehensive service offerings
                                                            </p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/what-we-do" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">What We Do</p>
                                                            <p className="mt-1 text-sm text-gray-400">Learn about our approach and methodologies</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/industries" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Industries</p>
                                                            <p className="mt-1 text-sm text-gray-400">Specialized solutions for different sectors</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Company Dropdown */}
                                <div className="relative">
                                    <button onClick={() => toggleDropdown('company')} className={`group inline-flex items-center text-base font-medium focus:outline-none transition-all duration-200 ${activeDropdown === 'company' ? 'text-primary-300' : 'text-primary-200 hover:text-white'}`}>
                                        <span>Company</span>
                                        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-150 ${activeDropdown === 'company' ? 'transform rotate-180 text-secondary-400' : ''}`} aria-hidden="true" />
                                    </button>
                                    {activeDropdown === 'company' && (
                                        <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-surface-dark px-5 py-6 sm:gap-8 sm:p-8">
                                                    <Link to="/about" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">About Us</p>
                                                            <p className="mt-1 text-sm text-gray-400">Our story, mission, and values</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/who-we-are" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Who We Are</p>
                                                            <p className="mt-1 text-sm text-gray-400">Meet our leadership and team</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/insights" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Insights</p>
                                                            <p className="mt-1 text-sm text-gray-400">Thought leadership and industry perspectives</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/careers" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Careers</p>
                                                            <p className="mt-1 text-sm text-gray-400">Join our team of innovators</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/careers-portal" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Career Portal</p>
                                                            <p className="mt-1 text-sm text-gray-400">Advanced job search and applications</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/investors" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Investors</p>
                                                            <p className="mt-1 text-sm text-gray-400">Information for current and potential investors</p>
                                                        </div>
                                                    </Link>
                                                    <Link to="/worldwide" className="flex items-start rounded-lg hover:bg-dark-800 -m-3 p-3 transition duration-150 ease-in-out" onClick={closeDropdowns}>
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-white">Worldwide</p>
                                                            <p className="mt-1 text-sm text-gray-400">Our global presence and locations</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Individual Links */}
                                <Link to="/contact" className={`text-base font-medium transition-all duration-200 ${isActive('/contact') ? 'text-primary-400' : 'text-neutral-300 hover:text-white hover:scale-105'}`}>
                                    Contact
                                </Link>
                                <Link to="/projects" className={`text-base font-medium transition-all duration-200 ${isActive('/projects') ? 'text-primary-400' : 'text-neutral-300 hover:text-white hover:scale-105'}`}>
                                    Projects
                                </Link>
                                <Link to="/faqs" className={`text-base font-medium transition-all duration-200 ${isActive('/faqs') ? 'text-primary-400' : 'text-neutral-300 hover:text-white hover:scale-105'}`}>
                                    FAQs
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full text-primary-300 hover:text-white hover:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
                        >
                            <span className="sr-only">Toggle theme</span>
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {/* User Authentication */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('user')}
                                    className="flex items-center space-x-3 text-sm bg-primary-900/30 rounded-full p-2 hover:bg-primary-900/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
                                >
                                    <span className="sr-only">User menu</span>
                                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                                        {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-primary-300 transition-transform duration-150 ${activeDropdown === 'user' ? 'transform rotate-180' : ''}`} />
                                </button>

                                {activeDropdown === 'user' && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-surface-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-white transition-colors" onClick={closeDropdowns}>
                                                <User className="h-4 w-4 mr-3" />
                                                Dashboard
                                            </Link>
                                            <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-white transition-colors" onClick={closeDropdowns}>
                                                <Settings className="h-4 w-4 mr-3" />
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-800 hover:text-white transition-colors"
                                            >
                                                <LogOut className="h-4 w-4 mr-3" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-primary-300 hover:text-white text-sm font-medium transition-colors">
                                    Sign in
                                </Link>
                                <Link to="/signup" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-neon hover:shadow-neon-hover">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 overflow-y-auto">
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMenu}></div>
                    <div className="relative bg-surface-dark h-full w-4/5 max-w-sm overflow-y-auto">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Link to="/" className="flex items-center" onClick={toggleMenu}>
                                        <span className="text-xl font-bold">
                                            <span className="text-primary-500">Parmy</span>
                                            <span className="text-white"> Technologies</span>
                                        </span>
                                    </Link>
                                </div>
                                <div className="-mr-2">
                                    <button onClick={toggleMenu} className="bg-dark-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                                        <span className="sr-only">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Navigation - Hidden for authenticated users */}
                            {!user && (
                                <div className="mt-6">
                                    <div className="pt-2 pb-4 space-y-1">
                                        {/* Mobile Services */}
                                        <div className="py-2">
                                            <button onClick={() => toggleDropdown('mobileServices')} className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md">
                                                <span>Services</span>
                                                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-150 ${activeDropdown === 'mobileServices' ? 'transform rotate-180' : ''}`} aria-hidden="true" />
                                            </button>
                                            {activeDropdown === 'mobileServices' && (
                                                <div className="pl-4 pr-2 py-2 space-y-1">
                                                    <Link to="/services" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        All Services
                                                    </Link>
                                                    <Link to="/what-we-do" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        What We Do
                                                    </Link>
                                                    <Link to="/industries" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Industries
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile Company */}
                                        <div className="py-2">
                                            <button onClick={() => toggleDropdown('mobileCompany')} className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md">
                                                <span>Company</span>
                                                <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-150 ${activeDropdown === 'mobileCompany' ? 'transform rotate-180' : ''}`} aria-hidden="true" />
                                            </button>
                                            {activeDropdown === 'mobileCompany' && (
                                                <div className="pl-4 pr-2 py-2 space-y-1">
                                                    <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        About Us
                                                    </Link>
                                                    <Link to="/who-we-are" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Who We Are
                                                    </Link>
                                                    <Link to="/insights" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Insights
                                                    </Link>
                                                    <Link to="/careers" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Careers
                                                    </Link>
                                                    <Link to="/investors" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Investors
                                                    </Link>
                                                    <Link to="/worldwide" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                                        Worldwide
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile Individual Links */}
                                        <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            Contact
                                        </Link>
                                        <Link to="/projects" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            Projects
                                        </Link>
                                        <Link to="/faqs" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            FAQs
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Theme Toggle - Always visible */}
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-3">
                                    <button
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        className="p-1 rounded-full text-gray-400 hover:text-gray-300 focus:outline-none"
                                    >
                                        <span className="sr-only">Toggle theme</span>
                                        {theme === 'dark' ? <Sun className="h-6 w-6" aria-hidden="true" /> : <Moon className="h-6 w-6" aria-hidden="true" />}
                                    </button>
                                    <div className="ml-3 text-sm text-gray-400">
                                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                    </div>
                                </div>
                            </div>

                            {/* User Section - Authentication or User Profile */}
                            {user ? (
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="flex items-center px-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                                                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-white">
                                                {user.username}
                                            </div>
                                            <div className="text-sm font-medium text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            <div className="flex items-center">
                                                <User className="h-5 w-5 mr-2" />
                                                Dashboard
                                            </div>
                                        </Link>
                                        <Link to="/dashboard/settings" className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            <div className="flex items-center">
                                                <Settings className="h-5 w-5 mr-2" />
                                                Settings
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-dark-800 rounded-md"
                                        >
                                            <div className="flex items-center">
                                                <LogOut className="h-5 w-5 mr-2" />
                                                Sign out
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="space-y-1">
                                        <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-dark-800 rounded-md" onClick={toggleMenu}>
                                            Sign in
                                        </Link>
                                        <Link to="/signup" className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-md" onClick={toggleMenu}>
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
