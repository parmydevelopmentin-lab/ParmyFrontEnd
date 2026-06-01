import React from 'react';
import { ArrowUpRight, ArrowDownRight, Users, FileText, Clock, Activity, Calendar, BarChart, TrendingUp, AlertCircle, CheckCircle, BellRing } from 'lucide-react';
import WelcomeMessage from './WelcomeMessage';
const DashboardOverview = () => {
  return <div>
      <WelcomeMessage />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Active Projects
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      12
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                View all
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Pending Tasks
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      24
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                View all
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Hours Logged
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      142.5
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                View report
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Performance
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                      98.5%
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600 dark:text-green-400">
                      <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      <span className="sr-only">Increased by</span>
                      4.1%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
                View details
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
              Recent Activity
            </h3>
          </div>
          <div className="px-6 py-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                      Project Milestone Completed
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      E-commerce Website Redesign - Phase 1
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                      New Team Member Added
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      Sarah Johnson joined Development Team
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    Yesterday
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                      Project Deadline Approaching
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      Mobile App Development - 3 days remaining
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    2 days ago
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">
                      New Document Shared
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      Q3 Marketing Strategy.pdf
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    3 days ago
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                View all activity
              </a>
            </div>
          </div>
        </div>
        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
              Upcoming Tasks
            </h3>
          </div>
          <div className="px-6 py-5">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3">
                <div className="flex items-center">
                  <input id="task-1" name="task-1" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="task-1" className="ml-3 block">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Client Meeting
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Today, 2:00 PM
                    </span>
                  </label>
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    High
                  </span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <input id="task-2" name="task-2" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="task-2" className="ml-3 block">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Project Proposal
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Tomorrow, 10:00 AM
                    </span>
                  </label>
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Medium
                  </span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <input id="task-3" name="task-3" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="task-3" className="ml-3 block">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Team Sync
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Wednesday, 9:30 AM
                    </span>
                  </label>
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Low
                  </span>
                </div>
              </li>
              <li className="py-3">
                <div className="flex items-center">
                  <input id="task-4" name="task-4" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <label htmlFor="task-4" className="ml-3 block">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Project Review
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Friday, 3:00 PM
                    </span>
                  </label>
                  <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Medium
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <a href="#" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                View all tasks
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default DashboardOverview;