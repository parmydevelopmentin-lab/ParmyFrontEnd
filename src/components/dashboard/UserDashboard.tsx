import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  Clock,
  MessageCircle,
  FileText,
  Settings,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  Building,
  Globe,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  const userActions = [
    {
      title: 'Update Profile',
      description: 'Manage your account settings and preferences',
      icon: User,
      href: '/dashboard/settings',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Contact Support',
      description: 'Get help with your projects or account',
      icon: MessageCircle,
      href: '/contact',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'View Projects',
      description: 'Check your assigned projects and progress',
      icon: Briefcase,
      href: '/dashboard/projects',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: 'Global Offices',
      description: 'Learn about our worldwide presence',
      icon: Globe,
      href: '/dashboard/offices',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-blue-100">
              Here's your personal dashboard. Contact your administrator for project access.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Account Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-gray-100">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
              <p className="text-gray-900 dark:text-gray-100">
                {user?.verified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Member Since</p>
              <p className="text-gray-900 dark:text-gray-100">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Building className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Type</p>
              <p className="text-gray-900 dark:text-gray-100">Standard User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Assigned to you</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Documents</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Shared with you</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Unread</p>
            </div>
          </div>
        </div>
      </div>

      {/* No Data Message */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No Project Data Available Yet
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your account is set up and ready! Please contact your administrator to get assigned to projects and access additional features.
          </p>

          <div className="space-y-3">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Administrator
            </Link>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              or email us directly at{' '}
              <a
                href="mailto:admin@parmytechnologies.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                admin@parmytechnologies.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userActions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
              className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm transition-all duration-200"
            >
              <div className={`p-2 rounded-lg ${action.bgColor} mr-4`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
            <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Need Help Getting Started?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
              Our team is here to help you get the most out of your account. Don't hesitate to reach out!
            </p>
            <div className="space-x-3">
              <Link
                to="/contact"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Contact Support →
              </Link>
              <Link
                to="/dashboard/settings"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Account Settings →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;