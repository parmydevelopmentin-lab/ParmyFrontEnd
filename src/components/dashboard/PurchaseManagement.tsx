import React, { useState, useEffect } from 'react';
import { Eye, Check, X, Loader2, Search, Filter, Calendar, User, ShoppingBag, CreditCard, ExternalLink } from 'lucide-react';
import { purchasesApi } from '../../services/api';
import { PurchaseResponse } from '../../types/api';

const PurchaseManagement = () => {
    const [purchases, setPurchases] = useState<PurchaseResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');
    const [selectedPurchase, setSelectedPurchase] = useState<PurchaseResponse | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    // Fetch all purchases on component mount
    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await purchasesApi.adminList();
            if (response.success && response.data) {
                setPurchases(response.data);
            } else {
                setError(response.message || 'Failed to load purchases');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load purchases');
        } finally {
            setLoading(false);
        }
    };

    const updatePurchaseStatus = async (purchaseId: string, status: 'VERIFIED' | 'REJECTED') => {
        setUpdatingStatus(true);
        try {
            const response = await purchasesApi.adminUpdateStatus(purchaseId, status);
            if (response.success) {
                // Update local state
                setPurchases(prev => prev.map(p =>
                    p.id === purchaseId ? { ...p, status } : p
                ));
                setShowModal(false);
                setSelectedPurchase(null);
            } else {
                setError(response.message || 'Failed to update status');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    // Filter purchases based on search and status
    const filteredPurchases = purchases.filter(purchase => {
        const matchesSearch = searchTerm === '' ||
            purchase.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || purchase.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles = {
            PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            VERIFIED: 'bg-green-100 text-green-800 border-green-200',
            REJECTED: 'bg-red-100 text-red-800 border-red-200'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.PENDING}`}>
                {status}
            </span>
        );
    };

    const openPurchaseDetails = (purchase: PurchaseResponse) => {
        setSelectedPurchase(purchase);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Purchase Management</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Review and manage user purchases</p>
                </div>
                <button
                    onClick={fetchPurchases}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Loader2 className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by user, email, or project..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as any)}
                            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none"
                        >
                            <option value="ALL">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {/* Purchases Table */}
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Project
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Proof
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredPurchases.map((purchase) => (
                                <tr key={purchase.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {purchase.username}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {purchase.userEmail}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <ShoppingBag className="h-4 w-4 text-gray-400 mr-2" />
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {purchase.projectTitle}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <CreditCard className="h-4 w-4 text-green-400 mr-2" />
                                            <div className="text-sm font-medium text-green-600">
                                                {purchase.projectCurrency} {purchase.projectPrice?.toLocaleString()}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(purchase.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {(purchase.proofUrl || purchase.proofFileName) ? (
                                            <div className="flex items-center">
                                                <img
                                                    src={`${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}${purchase.proofUrl || `/purchases/${purchase.proofFileName}`}`}
                                                    alt="Payment Proof Thumbnail"
                                                    className="h-10 w-10 rounded object-cover border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow"
                                                    onClick={() => openPurchaseDetails(purchase)}
                                                    crossOrigin="anonymous"
                                                    referrerPolicy="no-referrer"
                                                    onError={(e) => {
                                                        const finalUrl = `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}${purchase.proofUrl || `/purchases/${purchase.proofFileName}`}`;
                                                        console.error('Failed to load proof image. Details:', {
                                                            proofUrl: purchase.proofUrl,
                                                            proofFileName: purchase.proofFileName,
                                                            finalUrl: finalUrl,
                                                            purchaseId: purchase.id,
                                                            errorEvent: e
                                                        });
                                                        console.log('Try opening this URL directly:', finalUrl);
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                        (e.target as HTMLImageElement).nextElementSibling?.remove();
                                                        const fallback = document.createElement('div');
                                                        fallback.className = 'h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center cursor-pointer';
                                                        fallback.innerHTML = '📄';
                                                        fallback.title = `Click to view details - File: ${purchase.proofFileName || 'Unknown'}`;
                                                        fallback.onclick = () => openPurchaseDetails(purchase);
                                                        (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                                                    }}
                                                    onLoad={() => {
                                                        const finalUrl = `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}${purchase.proofUrl || `/purchases/${purchase.proofFileName}`}`;
                                                        console.log('Proof image loaded successfully:', {
                                                            proofFileName: purchase.proofFileName,
                                                            purchaseId: purchase.id,
                                                            url: finalUrl
                                                        });
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">No proof</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            {new Date(purchase.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => openPurchaseDetails(purchase)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPurchases.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Purchases Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchTerm || statusFilter !== 'ALL'
                                ? 'Try adjusting your search or filter criteria.'
                                : 'No purchases have been made yet.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Purchase Details Modal */}
            {showModal && selectedPurchase && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Purchase Details</h3>
                            <button
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                onClick={() => setShowModal(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* User Information */}
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">User Information</h4>
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPurchase.username}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPurchase.userEmail}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Information */}
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Project Information</h4>
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Project:</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedPurchase.projectTitle}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                                        <span className="text-sm font-medium text-green-600">
                                            {selectedPurchase.projectCurrency} {selectedPurchase.projectPrice?.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof */}
                            {(selectedPurchase.proofUrl || selectedPurchase.proofFileName) && (
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payment Proof</h4>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">File:</span>
                                            <a
                                                href={`${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}${selectedPurchase.proofUrl || `/purchases/${selectedPurchase.proofFileName}`}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                <ExternalLink className="h-4 w-4 mr-1" />
                                                {selectedPurchase.proofFileName || 'View Proof'}
                                            </a>
                                        </div>
                                        <div className="text-center">
                                            <img
                                                src={`${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}${selectedPurchase.proofUrl || `/purchases/${selectedPurchase.proofFileName}`}`}
                                                alt="Payment Proof"
                                                className="max-w-full max-h-96 mx-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                                                crossOrigin="anonymous"
                                                referrerPolicy="no-referrer"
                                                onError={(e) => {
                                                    console.error('Failed to load proof image in modal:', {
                                                        proofUrl: selectedPurchase.proofUrl,
                                                        constructedUrl: `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}/purchases/${selectedPurchase.proofFileName}`,
                                                        proofFileName: selectedPurchase.proofFileName,
                                                        purchaseId: selectedPurchase.id
                                                    });
                                                    const imgElement = e.target as HTMLImageElement;
                                                    imgElement.style.display = 'none';
                                                    // Show fallback message
                                                    const fallback = document.createElement('div');
                                                    fallback.className = 'text-center py-8 text-gray-500';
                                                    fallback.innerHTML = `
                                                        <div class="mb-2 text-4xl">📄</div>
                                                        <div class="text-sm">Unable to load image preview</div>
                                                        <div class="text-xs mt-1">File: ${selectedPurchase.proofFileName || 'Unknown'}</div>
                                                        <div class="text-xs text-blue-600 mt-2">Try opening the link above to download the file</div>
                                                    `;
                                                    imgElement.parentNode?.appendChild(fallback);
                                                }}
                                                onLoad={() => {
                                                    console.log('Proof image loaded successfully in modal:', {
                                                        proofFileName: selectedPurchase.proofFileName,
                                                        purchaseId: selectedPurchase.id,
                                                        url: selectedPurchase.proofUrl || `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'}/purchases/${selectedPurchase.proofFileName}`
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Purchase Details */}
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Purchase Details</h4>
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                                        {getStatusBadge(selectedPurchase.status)}
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Purchase Date:</span>
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            {new Date(selectedPurchase.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    {selectedPurchase.notes && (
                                        <div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Notes:</span>
                                            <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedPurchase.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {selectedPurchase.status === 'PENDING' && (
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <button
                                        onClick={() => updatePurchaseStatus(selectedPurchase.id, 'REJECTED')}
                                        disabled={updatingStatus}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {updatingStatus && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => updatePurchaseStatus(selectedPurchase.id, 'VERIFIED')}
                                        disabled={updatingStatus}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {updatingStatus && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                        <Check className="h-4 w-4 mr-2" />
                                        Verify
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseManagement;
