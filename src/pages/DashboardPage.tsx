import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Settings, Bell, Search, Plus, Menu, X, LogOut, MessageSquare, BarChart3, BookOpen, BrainCircuit, User, ChevronRight, ChevronLeft, Moon, Sun, Sparkles, LayoutDashboard, Briefcase, FileText, Receipt, AlertCircle, Calculator, TrendingUp, Mail, ShoppingBag, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../components/ui/ThemeProvider';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import AdminProjects from '../components/dashboard/AdminProjects';
import DashboardProjects from '../components/dashboard/DashboardProjects';
import DashboardSettings from '../components/dashboard/DashboardSettings';
import UserSettings from '../components/dashboard/UserSettings';

import InvoiceManagement from '../components/dashboard/InvoiceManagement';
import CreateInvoice from '../components/dashboard/CreateInvoice';
import UserDashboard from '../components/dashboard/UserDashboard';
import ExpenseManagement from '../components/dashboard/ExpenseManagement';
import CreateExpense from '../components/dashboard/CreateExpense';
import ExpenseAnalytics from '../components/dashboard/ExpenseAnalytics';
import OfferManagement from '../components/dashboard/OfferManagement';
import CreateOffer from '../components/dashboard/CreateOffer';
import PurchaseManagement from '../components/dashboard/PurchaseManagement';
import GalleryManagement from '../components/dashboard/GalleryManagement';
const DashboardPage = () => {
  const {
    user,
    isAdmin,
    logout
  } = useAuth();
  const {
    theme,
    setTheme
  } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  // Check if screen is small on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  // Close sidebar when location changes on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location]);
  // Navigation for regular users (limited)
  const userNavigation = [{
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  }, {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase
  }, {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }];

  // Full navigation for admin users
  const adminNavigation = [{
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  }, {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: Briefcase
  }, {
    name: 'Purchases',
    href: '/dashboard/purchases',
    icon: ShoppingBag
  }, {
    name: 'Invoice Management',
    href: '/dashboard/invoices',
    icon: Receipt
  }, {
    name: 'Create Invoice',
    href: '/dashboard/invoices/create',
    icon: FileText
  }, {
    name: 'Expense Management',
    href: '/dashboard/expenses',
    icon: Calculator
  }, {
    name: 'Expense Analytics',
    href: '/dashboard/expenses/analytics',
    icon: TrendingUp
  }, {
    name: 'Offer Letters',
    href: '/dashboard/offers',
    icon: Mail
  }, {
    name: 'Create Offer',
    href: '/dashboard/offers/create',
    icon: FileText
  }, {
    name: 'Gallery Management',
    href: '/dashboard/gallery',
    icon: Image
  }, {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }];

  // Use appropriate navigation based on user role
  const navigation = isAdmin ? adminNavigation : userNavigation;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };
  return <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    {/* Mobile sidebar overlay */}
    <div className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>

    {/* Sidebar */}
    <div className={`fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
        `}>
      <div className="flex items-center justify-between h-16 px-4 bg-blue-700 dark:bg-blue-900 text-white">
        <div className="flex items-center">
           <img
    src="/logomini.png"
    alt="Parmy Technologies Logo"
    className={`object-contain transition-all duration-300 ${
      sidebarCollapsed ? "w-10 h-10" : "w-10 h-10"
    }`}
  />
        </div>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:block p-1 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors">
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto bg-blue-600 dark:bg-blue-800">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map(item => {
            const isActive = location.pathname === item.href;
            return <Link key={item.name} to={item.href} className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive ? 'bg-blue-700 dark:bg-blue-900 text-white' : 'text-blue-100 hover:bg-blue-500 dark:hover:bg-blue-700 hover:text-white'}
                  `}>
              <item.icon className={`${sidebarCollapsed ? 'mr-0' : 'mr-3'} h-6 w-6 transition-colors ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
              {!sidebarCollapsed && <span>{item.name}</span>}
              {sidebarCollapsed && <span className="absolute left-12 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {item.name}
              </span>}
            </Link>;
          })}
        </nav>

        <div className="p-4 border-t border-blue-700 dark:border-blue-900">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
            </div>
            {!sidebarCollapsed && <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-blue-200">{isAdmin ? 'Administrator' : 'User'}</p>
            </div>}
            <button onClick={logout} className={`${sidebarCollapsed ? 'ml-auto' : 'ml-auto'} p-1 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors`} title="Log out">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left section: Title */}
          <div className="flex items-center w-1/4">
            <button type="button" className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
             <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div> 
          </div>

          {/* Center section: Search Bar */}
          <div className="flex-1 flex justify-center">
            <form onSubmit={handleSearch} className="hidden md:block w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="pl-10 pr-3 py-2 w-full text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 text-black dark:text-white" 
                />
              </div>
            </form>
          </div>

          {/* Right section: Spacer and commented buttons */}
          <div className="flex items-center justify-end w-1/4 space-x-4">
            {/* <button onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors" aria-label="Toggle theme">
              {theme === 'light' && <Sun className="h-5 w-5" />}
              {theme === 'dark' && <Moon className="h-5 w-5" />}
            </button> */}

            {/* <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors">
              <Plus className="h-6 w-6" />
            </button> */}

            {/* <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors relative">
              <Bell className="h-6 w-6" />
              {notifications > 0 && <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                {notifications}
              </span>}
            </button> */}

            {/* <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors relative">
              <MessageSquare className="h-6 w-6" />
              {messages > 0 && <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center rounded-full bg-blue-500 text-white">
                {messages}
              </span>}
            </button> */}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            {/* Dashboard home route - different content based on role */}
            <Route
              path="/"
              element={isAdmin ? <DashboardOverview /> : <UserDashboard />}
            />

            {/* Settings route - different for admin vs user */}
            <Route
              path="/settings"
              element={isAdmin ? <DashboardSettings /> : <UserSettings />}
            />

            {/* Admin-only routes */}
            {isAdmin ? (
              <>
                <Route path="/projects" element={<DashboardProjects />} />
                <Route path="/purchases" element={<PurchaseManagement />} />
                <Route path="/invoices" element={<InvoiceManagement />} />
                <Route path="/invoices/create" element={<CreateInvoice />} />
                <Route path="/expenses" element={<ExpenseManagement />} />
                <Route path="/expenses/create" element={<CreateExpense />} />
                <Route path="/expenses/analytics" element={<ExpenseAnalytics />} />
                <Route path="/offers" element={<OfferManagement />} />
                <Route path="/offers/create" element={<CreateOffer />} />
                <Route path="/gallery" element={<GalleryManagement />} />
              </>
            ) : (
              <>
                {/* Limited routes for regular users */}
                <Route path="/projects" element={<DashboardProjects />} />
              </>
            )}

            {/* Catch-all route */}
            <Route path="*" element={
              <div className="py-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {!isAdmin && (location.pathname.includes('/invoices') || location.pathname.includes('/expenses') || location.pathname.includes('/offers') || location.pathname.includes('/ai-insights') || location.pathname.includes('/briefing-center') || location.pathname.includes('/client-portal') || location.pathname.includes('/reports') || location.pathname.includes('/team') || location.pathname.includes('/messages'))
                      ? 'Access Denied'
                      : 'Page Under Development'
                    }
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {!isAdmin && (location.pathname.includes('/invoices') || location.pathname.includes('/expenses') || location.pathname.includes('/offers') || location.pathname.includes('/ai-insights') || location.pathname.includes('/briefing-center') || location.pathname.includes('/client-portal') || location.pathname.includes('/reports') || location.pathname.includes('/team') || location.pathname.includes('/messages'))
                      ? 'You need admin privileges to access this section. Contact your administrator for access.'
                      : 'This section is coming soon. Please check back later.'
                    }
                  </p>
                  <div className="space-x-3">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                    >
                      Return to Dashboard
                    </Link>
                    {!isAdmin && (
                      <Link
                        to="/contact"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Contact Admin
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  </div>;
};
export default DashboardPage;