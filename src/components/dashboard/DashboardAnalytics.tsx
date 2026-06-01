import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from 'lucide-react';
const DashboardAnalytics = () => {
  const metrics = [{
    name: 'Website Traffic',
    value: '24.3K',
    change: '+12%',
    changeType: 'increase'
  }, {
    name: 'Conversion Rate',
    value: '3.8%',
    change: '+0.5%',
    changeType: 'increase'
  }, {
    name: 'Average Session',
    value: '2m 45s',
    change: '+10s',
    changeType: 'increase'
  }, {
    name: 'Bounce Rate',
    value: '42%',
    change: '-3%',
    changeType: 'decrease'
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(metric => <div key={metric.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUpIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {metric.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="flex items-center">
                    {metric.changeType === 'increase' ? <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" /> : <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />}
                    <span className={`${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'} mr-2`}>
                      {metric.change}
                    </span>
                    <span className="text-gray-500">from last month</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Traffic Sources */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Traffic Sources</h2>
        <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Organic Search
                  </span>
                  <span className="text-sm font-medium text-gray-700">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: '42%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Direct
                  </span>
                  <span className="text-sm font-medium text-gray-700">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: '28%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Social Media
                  </span>
                  <span className="text-sm font-medium text-gray-700">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: '18%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Referral
                  </span>
                  <span className="text-sm font-medium text-gray-700">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: '12%'
                }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Pages */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Top Pages</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[{
            page: '/services',
            views: '4,827',
            time: '2m 12s'
          }, {
            page: '/about',
            views: '3,156',
            time: '1m 45s'
          }, {
            page: '/contact',
            views: '2,421',
            time: '1m 32s'
          }, {
            page: '/blog/seo-tips',
            views: '1,893',
            time: '3m 04s'
          }, {
            page: '/case-studies',
            views: '1,682',
            time: '2m 28s'
          }].map((item, index) => <li key={index}>
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {item.page}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">
                        {item.views} views
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className="flex items-center text-sm text-gray-500">
                      Avg. time: {item.time}
                    </p>
                    <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Details
                    </button>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>
      </div>
    </div>;
};
export default DashboardAnalytics;