import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  SendIcon,
  RefreshCcwIcon,
  TrashIcon,
  EyeIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  FileTextIcon,
  ChevronDownIcon
} from 'lucide-react';
import { offerApi, ApiError } from '../../services/api';
import { OfferResponse, OfferStatus } from '../../types/api';

const OfferManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<OfferResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OfferStatus | 'ALL'>('ALL');
  const [dateFilter, setDateFilter] = useState('all'); // all, today, week, month
  
  // Operations
  const [operationLoading, setOperationLoading] = useState<string>(''); // offer ID that's being operated on
  const [openDropdown, setOpenDropdown] = useState<string>(''); // offer ID of open status dropdown

  const statusColors = {
    DRAFT: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    SENT: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
    ACCEPTED: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
    REJECTED: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200',
    EXPIRED: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200'
  };

  const statusIcons = {
    DRAFT: ClockIcon,
    SENT: MailIcon,
    ACCEPTED: CheckCircleIcon,
    REJECTED: XCircleIcon,
    EXPIRED: AlertCircleIcon
  };

  useEffect(() => {
    loadOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, statusFilter, dateFilter]);

  const loadOffers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await offerApi.getAllOffers();
      
      if (response.success && response.data) {
        setOffers(response.data);
      } else {
        setError(response.message || 'Failed to load offers');
      }
    } catch (err) {
      console.error('Error loading offers:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load offers');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    let filtered = [...offers];

    // Text search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(offer =>
        offer.candidateName.toLowerCase().includes(search) ||
        offer.candidateEmail.toLowerCase().includes(search) ||
        offer.role.toLowerCase().includes(search) ||
        offer.location.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(offer => offer.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setDate(now.getDate() - 30);
          break;
      }
      
      filtered = filtered.filter(offer => 
        new Date(offer.createdAt) >= filterDate
      );
    }

    setFilteredOffers(filtered);
  };

  const handleSendOffer = async (offerId: string) => {
    try {
      setOperationLoading(offerId);
      setError('');
      setSuccess('');
      
      const response = await offerApi.sendOffer(offerId);
      
      if (response.success) {
        setSuccess('Offer sent successfully to candidate!');
        loadOffers(); // Reload to get updated status
      } else {
        setError(response.message || 'Failed to send offer');
      }
    } catch (err) {
      console.error('Error sending offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to send offer');
      }
    } finally {
      setOperationLoading('');
    }
  };

  const handleResendOffer = async (offerId: string) => {
    try {
      setOperationLoading(offerId);
      setError('');
      setSuccess('');
      
      const response = await offerApi.resendOffer(offerId);
      
      if (response.success) {
        setSuccess('Offer resent successfully to candidate!');
        loadOffers(); // Reload to get updated status
      } else {
        setError(response.message || 'Failed to resend offer');
      }
    } catch (err) {
      console.error('Error resending offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to resend offer');
      }
    } finally {
      setOperationLoading('');
    }
  };

  const handleDownloadOffer = async (offerId: string, candidateName: string) => {
    try {
      setOperationLoading(offerId);
      
      const blob = await offerApi.downloadOffer(offerId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `offer_letter_${candidateName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Error downloading offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to download offer');
      }
    } finally {
      setOperationLoading('');
    }
  };

  const handleDeleteOffer = async (offerId: string, candidateName: string) => {
    if (!window.confirm(`Are you sure you want to delete the offer for ${candidateName}? This action cannot be undone.`)) {
      return;
    }
    
    try {
      setOperationLoading(offerId);
      setError('');
      setSuccess('');
      
      const response = await offerApi.deleteOffer(offerId);
      
      if (response.success) {
        setSuccess('Offer deleted successfully!');
        loadOffers(); // Reload list
      } else {
        setError(response.message || 'Failed to delete offer');
      }
    } catch (err) {
      console.error('Error deleting offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to delete offer');
      }
    } finally {
      setOperationLoading('');
    }
  };

  const handleUpdateStatus = async (offerId: string, newStatus: OfferStatus) => {
    try {
      setOperationLoading(offerId);
      setError('');
      setSuccess('');
      setOpenDropdown(''); // Close dropdown
      
      const response = await offerApi.updateOfferStatus(offerId, newStatus);
      
      if (response.success) {
        setSuccess('Offer status updated successfully!');
        loadOffers(); // Reload to get updated status
      } else {
        setError(response.message || 'Failed to update offer status');
      }
    } catch (err) {
      console.error('Error updating offer status:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update offer status');
      }
    } finally {
      setOperationLoading('');
    }
  };

  const toggleDropdown = (offerId: string) => {
    setOpenDropdown(openDropdown === offerId ? '' : offerId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown('');
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Offer Letters</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage job offers and track candidate responses</p>
        </div>
        <Link
          to="/dashboard/offers/create"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Offer
        </Link>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg flex items-start">
          <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start">
          <XCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OfferStatus | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
              <option value="EXPIRED">Expired</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          {/* Refresh Button */}
          <div>
            <button
              onClick={loadOffers}
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              <RefreshCcwIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['ALL', 'DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'].map((status) => {
          const count = status === 'ALL' 
            ? offers.length 
            : offers.filter(offer => offer.status === status).length;
          const Icon = status === 'ALL' ? FileTextIcon : statusIcons[status as OfferStatus];
          
          return (
            <div key={status} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  status === 'ALL' 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : statusColors[status as OfferStatus]
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {status === 'ALL' ? 'Total' : status.charAt(0) + status.slice(1).toLowerCase()}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Offers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCcwIcon className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading offers...</span>
          </div>
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No offers found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {offers.length === 0 
                ? "You haven't created any offers yet."
                : "No offers match your current filters."
              }
            </p>
            {offers.length === 0 && (
              <Link
                to="/dashboard/offers/create"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Your First Offer
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOffers.map((offer) => {
                  const StatusIcon = statusIcons[offer.status];
                  const isOperating = operationLoading === offer.id;
                  
                  return (
                    <tr key={offer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {offer.candidateName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <MailIcon className="h-3 w-3 mr-1" />
                              {offer.candidateEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {offer.role}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {offer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[offer.status]}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {offer.status}
                          </span>
                        </div>
                        {offer.emailSent && offer.emailSentAt && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Sent: {formatDateTime(offer.emailSentAt)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        <div className="flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                          {formatDate(offer.joiningDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(offer.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {/* Download PDF */}
                          <button
                            onClick={() => handleDownloadOffer(offer.id, offer.candidateName)}
                            disabled={isOperating}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
                            title="Download PDF"
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </button>

                          {/* Send/Resend */}
                          {offer.status === 'DRAFT' ? (
                            <button
                              onClick={() => handleSendOffer(offer.id)}
                              disabled={isOperating}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 disabled:opacity-50"
                              title="Send Offer"
                            >
                              <SendIcon className="h-4 w-4" />
                            </button>
                          ) : offer.status === 'SENT' && (
                            <button
                              onClick={() => handleResendOffer(offer.id)}
                              disabled={isOperating}
                              className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 disabled:opacity-50"
                              title="Resend Offer"
                            >
                              <RefreshCcwIcon className="h-4 w-4" />
                            </button>
                          )}

                          {/* Status Update Dropdown */}
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(offer.id);
                              }}
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600" 
                              title="Update Status"
                            >
                              <ChevronDownIcon className="h-4 w-4" />
                            </button>
                            {openDropdown === offer.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
                                <div className="py-1">
                                  {(['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED'] as OfferStatus[])
                                    .filter(status => status !== offer.status)
                                    .map(status => (
                                      <button
                                        key={status}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleUpdateStatus(offer.id, status);
                                        }}
                                        disabled={isOperating}
                                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                                      >
                                        {status}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteOffer(offer.id, offer.candidateName)}
                            disabled={isOperating}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50"
                            title="Delete Offer"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferManagement;