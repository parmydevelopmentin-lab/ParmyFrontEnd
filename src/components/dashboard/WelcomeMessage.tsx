import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, ChevronRight } from 'lucide-react';
const WelcomeMessage = () => {
  const {
    user
  } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('');
  useEffect(() => {
    // Get time of day greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');else if (hour < 18) setTimeOfDay('afternoon');else setTimeOfDay('evening');
    // Check if welcome message was previously dismissed
    const isDismissed = localStorage.getItem('welcomeDismissed');
    if (isDismissed) setDismissed(true);
  }, []);
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('welcomeDismissed', 'true');
  };
  if (dismissed) return null;
  return <div className="bg-gradient-to-r from-[#1A202C] to-[#2D3748] rounded-lg shadow-lg overflow-hidden mb-6">
      <div className="px-6 py-5 sm:flex sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-white">
            Good {timeOfDay}, {user?.name}!
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-300">
            <p>
              Welcome to your dashboard. Here you can manage your projects,
              track progress, and access all the tools you need.
            </p>
          </div>
          <div className="mt-3">
            <a href="#" className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300">
              Take a quick tour
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
          <button type="button" onClick={handleDismiss} className="text-gray-400 hover:text-gray-200 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="px-6 py-3 bg-[#151A24] flex items-center justify-between">
        <div className="text-sm text-gray-300">
          Your account was created on{' '}
          <span className="font-medium text-white">
            {user?.createdAt || 'recently'}
          </span>
        </div>
        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user?.role === 'admin' ? 'Administrator' : 'User'}
          </span>
        </div>
      </div>
    </div>;
};
export default WelcomeMessage;