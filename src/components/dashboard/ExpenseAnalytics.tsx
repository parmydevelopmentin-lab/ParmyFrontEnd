import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  Download,
  Filter,
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { expenseApi, ApiError } from '../../services/api';
import { ExpenseAnalyticsResponse } from '../../types/api';
import { formatCurrency, formatCurrencyDetailed } from '../../utils/currencyUtils';

const ExpenseAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<ExpenseAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [dateRange, setDateRange] = useState<'all' | '3months' | '6months' | '1year'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Colors for charts
  const CHART_COLORS = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280',
    '#14B8A6', '#F59E0B'
  ];

  // Load analytics on component mount and when date range changes
  useEffect(() => {
    loadAnalytics();
  }, [dateRange, startDate, endDate]);

  // Load analytics data
  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (dateRange === 'all') {
        response = await expenseApi.getExpenseAnalytics();
      } else {
        const dates = getDateRangeForFilter(dateRange);
        response = await expenseApi.getExpenseAnalyticsByDateRange(dates.start, dates.end);
      }

      if (startDate && endDate) {
        response = await expenseApi.getExpenseAnalyticsByDateRange(startDate, endDate);
      }

      if (response.success) {
        setAnalytics(response.data);
      } else {
        setError(response.message || 'Failed to load analytics');
      }
    } catch (err) {
      console.error('Error loading analytics:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load analytics. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Get date range for predefined filters
  const getDateRangeForFilter = (range: '3months' | '6months' | '1year') => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case '3months':
        start.setMonth(start.getMonth() - 3);
        break;
      case '6months':
        start.setMonth(start.getMonth() - 6);
        break;
      case '1year':
        start.setFullYear(start.getFullYear() - 1);
        break;
    }

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  // Prepare data for category pie chart
  const prepareCategoryData = () => {
    if (!analytics?.categoryBreakdown) return [];

    return Object.entries(analytics.categoryBreakdown)
      .map(([category, amount]) => ({
        name: category,
        value: amount,
        percentage: ((amount / analytics.totalExpenses) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);
  };

  // Prepare data for monthly trends chart
  const prepareMonthlyTrendsData = () => {
    if (!analytics?.monthlyTrends) return [];

    return analytics.monthlyTrends.map(trend => ({
      month: new Date(trend.month + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit'
      }),
      amount: trend.amount,
      count: trend.count
    }));
  };

  // Calculate growth percentage
  const calculateGrowth = () => {
    if (!analytics?.currentMonth || !analytics?.lastMonth) return null;

    const current = analytics.currentMonth.total;
    const previous = analytics.lastMonth.total;

    if (previous === 0) return null;

    const growth = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(growth).toFixed(1),
      isPositive: growth > 0,
      isNegative: growth < 0
    };
  };

  const growth = calculateGrowth();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">No analytics data available</p>
        </div>
      </div>
    );
  }

  const categoryData = prepareCategoryData();
  const monthlyTrendsData = prepareMonthlyTrendsData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Expense Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your company expenses with detailed insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value as 'all' | '3months' | '6months' | '1year');
              setStartDate('');
              setEndDate('');
            }}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          >
            <option value="all">All Time</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Range:</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setDateRange('all');
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(analytics.totalExpenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Transactions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {analytics.totalTransactions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(analytics.currentMonth?.total || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${growth?.isPositive
                ? 'bg-red-100 dark:bg-red-900/30'
                : growth?.isNegative
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
              {growth?.isPositive ? (
                <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
              ) : growth?.isNegative ? (
                <TrendingDown className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <BarChart3 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Month Growth</p>
              <p className={`text-2xl font-semibold ${growth?.isPositive
                  ? 'text-red-600 dark:text-red-400'
                  : growth?.isNegative
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                {growth ? `${growth.isPositive ? '+' : '-'}${growth.percentage}%` : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown - Pie Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2" />
              Category Breakdown
            </h3>
          </div>

          {categoryData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [formatCurrencyDetailed(value), 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No category data available
            </div>
          )}
        </div>

        {/* Monthly Trends - Bar Chart */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Monthly Trends
            </h3>
          </div>

          {monthlyTrendsData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="month"
                    className="text-sm"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    className="text-sm"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === 'amount' ? formatCurrencyDetailed(value) : value,
                      name === 'amount' ? 'Amount' : 'Transactions'
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#3B82F6" name="Amount" />
                  <Bar dataKey="count" fill="#10B981" name="Count" yAxisId="right" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No monthly data available
            </div>
          )}
        </div>
      </div>

      {/* Category Details Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Category Details
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {categoryData.map((category, index) => (
                <tr key={category.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded mr-3"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {formatCurrencyDetailed(category.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {category.percentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;