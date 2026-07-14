import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Plus, Pencil, Trash2, X, Loader2, ArrowLeftIcon, HeartIcon, ShareIcon, ShoppingCart, Eye, Download, CreditCard, QrCode, Smartphone } from 'lucide-react';
import { projectsApi, purchasesApi } from '../../services/api';
import type { ProjectResponse, ProjectRequest, ApiResponse } from '../../types/api';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl, getYoutubeId } from '../../utils/projectUtils';

// Admin Form Modal Component
const emptyForm: ProjectRequest = { title: '', shortDescription: '', description: '', price: 0, currency: 'INR', category: '', tags: [], thumbnailUrl: '', active: true };

const AdminFormModal: React.FC<{
  form: ProjectRequest;
  setForm: React.Dispatch<React.SetStateAction<ProjectRequest>>;
  editing: ProjectResponse | null;
  setShowForm: (show: boolean) => void;
  save: () => void;
  loading: boolean;
  error: string;
  abstractFile: File | null;
  setAbstractFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploading: boolean;
}> = ({ form, setForm, editing, setShowForm, save, loading, error, abstractFile, setAbstractFile, uploading }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-900 dark:text-gray-100">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">{editing ? 'Edit Project' : 'Create Project'}</h3>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400" onClick={() => setShowForm(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black dark:text-white">
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Title *</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter project title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Category</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.category || ''}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select Category</option>
            <option value="Blockchain">Blockchain</option>
            <option value="AI/ML">AI/ML</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="IoT">IoT</option>
            <option value="FinTech">FinTech</option>
            <option value="Analytics">Analytics</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Short Description</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.shortDescription || ''}
            onChange={e => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
            placeholder="Brief description for project card"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Description</label>
          <textarea
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            rows={4}
            value={form.description || ''}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Detailed project description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.price ?? ''}
            onChange={e => {
              const v = e.target.value;
              setForm(prev => ({ ...prev, price: v === '' ? undefined : Number(v) }));
            }}
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Currency</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.currency || 'INR'}
            onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))}
          >
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">Thumbnail URL</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            value={form.thumbnailUrl || ''}
            onChange={e => setForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
            placeholder="YouTube link, Video ID, or direct image URL"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Accepts: YouTube video URLs, 11-char Video IDs (e.g. <code>dQw4w9WgXcQ</code>), or standard image URLs.
          </p>
          <div className="mt-3">
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Live Thumbnail Preview</span>
            <div className="relative w-full h-36 bg-gray-100 dark:bg-gray-900/50 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {form.thumbnailUrl ? (
                <img
                  src={getImageUrl(form.thumbnailUrl)}
                  alt="Live Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/DigiDefense.png';
                  }}
                />
              ) : (
                <span className="text-xs text-gray-400 dark:text-gray-500 font-light">No image URL specified</span>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-black dark:text-white">
            Project Abstract File
            <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">(PDF, DOC, DOCX, TXT - Max 500MB)</span>
          </label>
          <input
            type="file"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            accept=".pdf,.doc,.docx,.txt"
            onChange={e => setAbstractFile(e.target.files?.[0] || null)}
          />
          {abstractFile && (
            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              Selected: {abstractFile.name} ({(abstractFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          {editing?.hasAbstract && (
            <div className="mt-1 text-sm text-green-600 dark:text-green-400">
              Current abstract: {editing.abstractFileName}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center text-black dark:text-white">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))}
              className="mr-2 bg-white dark:bg-gray-700 text-blue-600 border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm font-medium">Active (visible to users)</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          onClick={() => setShowForm(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          onClick={save}
          disabled={loading || uploading || !form.title}
        >
          {(loading || uploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {loading ?
            (editing ? 'Updating...' : 'Creating...') :
            uploading ? 'Uploading Abstract...' :
              (editing ? 'Update' : 'Create') + ' Project'
          }
        </button>
      </div>
    </div>
  </div>
);

// Purchase Modal Component
const PurchaseModal: React.FC<{
  project: ProjectResponse;
  onClose: () => void;
  onPurchase: (file: File) => Promise<void>;
  loading: boolean;
}> = ({ project, onClose, onPurchase, loading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi' | 'card'>('qr');

  // Zoom state for QR code
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  // Debit Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UPI state
  const [upiTransactionId, setUpiTransactionId] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardCvv(value);
  };

  const handleSubmit = async () => {
    if (paymentMethod === 'card') {
      if (!cardName.trim() || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
        alert('Please fill out all card details correctly.');
        return;
      }
      const receiptContent = `
=========================================
        PARMY TECHNOLOGIES RECEIPT       
=========================================
Project: ${project.title}
Amount Paid: ${project.currency} ${project.price?.toLocaleString() || '0'}
Payment Method: Debit Card
Card Number: **** **** **** ${cardNumber.slice(-4)}
Cardholder: ${cardName}
Date: ${new Date().toLocaleString()}
Transaction Status: SUCCESS (Simulated)
=========================================
`;
      const mockFile = new File([receiptContent], "debit_card_receipt.txt", { type: "text/plain" });
      await onPurchase(mockFile);
    } else {
      if (!file) {
        alert('Please select a payment proof screenshot/file.');
        return;
      }
      await onPurchase(file);
    }
  };

  const isSubmitDisabled = () => {
    if (loading) return true;
    if (paymentMethod === 'card') {
      return !cardName.trim() || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3;
    }
    return !file;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-gray-900 dark:text-gray-100">
      {/* Full screen QR zoom overlay */}
      {isQrZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[100] cursor-zoom-out p-4"
          onClick={() => setIsQrZoomed(false)}
        >
          <div className="relative max-w-lg w-full max-h-[85vh] flex items-center justify-center">
            <img
              src="/payment-qr.jpg"
              alt="Payment QR Code Zoomed"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border-4 border-white bg-white shadow-2xl"
            />
          </div>
          <p className="text-white text-center mt-4 text-sm font-semibold bg-black/60 px-4 py-2 rounded-full">
            Click anywhere to close preview
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto text-black dark:text-white">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">Purchase Project</h3>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold text-black dark:text-white">{project.title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.shortDescription}</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">
            {project.currency} {project.price?.toLocaleString() || '0'}
          </p>
        </div>

        {/* Payment Method Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-5">
          <button
            onClick={() => setPaymentMethod('qr')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              paymentMethod === 'qr'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <QrCode className="h-4 w-4" />
            QR Code
          </button>
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              paymentMethod === 'upi'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            UPI ID
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
              paymentMethod === 'card'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Debit Card
          </button>
        </div>

        {/* QR Code Tab Content */}
        {paymentMethod === 'qr' && (
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <h5 className="font-semibold text-center mb-3 text-black dark:text-white">Scan QR to Pay</h5>
              <div className="flex flex-col items-center justify-center mb-3">
                <img
                  src="/payment-qr.jpg"
                  alt="Payment QR Code"
                  className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white cursor-zoom-in transition-all duration-300 hover:scale-105 shadow-md"
                  onClick={() => setIsQrZoomed(true)}
                  onError={(e) => {
                    console.error('QR code image failed to load');
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-2 font-medium">🔍 Click QR code to expand</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                Scan this QR code using GPay, PhonePe, Paytm, or any UPI app.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-black dark:text-white">Upload Payment Proof *</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Upload screenshot or receipt of payment</p>
            </div>
          </div>
        )}

        {/* UPI Tab Content */}
        {paymentMethod === 'upi' && (
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <h5 className="font-semibold mb-2 text-black dark:text-white">Pay via UPI ID</h5>
              <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2.5 rounded border border-gray-200 dark:border-gray-700 mb-2">
                <span className="font-mono text-sm select-all text-black dark:text-white">parmytechnologies@okaxis</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('parmytechnologies@okaxis');
                    alert('UPI ID copied to clipboard!');
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Transfer the exact amount to the UPI ID above from your UPI App.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-black dark:text-white">Transaction Reference Number (Optional)</label>
              <input
                type="text"
                placeholder="12-digit UPI Ref No."
                value={upiTransactionId}
                onChange={(e) => setUpiTransactionId(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white mb-3 text-sm"
              />

              <label className="block text-sm font-semibold mb-1.5 text-black dark:text-white">Upload Payment Proof *</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Upload payment screenshot or receipt</p>
            </div>
          </div>
        )}

        {/* Debit Card Tab Content */}
        {paymentMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              <h5 className="font-semibold mb-3 flex items-center gap-2 text-black dark:text-white">
                <CreditCard className="h-5 w-5 text-blue-500" />
                Enter Card Details
              </h5>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-black dark:text-white">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="w-full p-2.5 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold mb-1 text-black dark:text-white">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full p-2.5 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-black dark:text-white">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full p-2.5 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-black dark:text-white">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={handleCvvChange}
                      className="w-full p-2.5 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Your payment will be processed securely. A simulated card receipt will be generated automatically.
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-3 border-t border-gray-100 dark:border-gray-700 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-semibold"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center text-sm font-semibold"
            onClick={handleSubmit}
            disabled={isSubmitDisabled()}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            <ShoppingCart className="h-4 w-4 mr-2" />
            {paymentMethod === 'card' ? 'Pay & Purchase' : 'Submit Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Thumbnail component with skeleton and robust fallback
const Thumb: React.FC<{
  src?: string | null;
  alt?: string;
  imgClass?: string;
  wrapperClass?: string;
  fallback?: string;
}> = ({ src, alt = '', imgClass = '', wrapperClass = '', fallback = '/DigiDefense.png' }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = (e: any) => {
    if (!errored) {
      setErrored(true);
      e.target.src = fallback;
    }
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${wrapperClass}`}>
      {!loaded && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />}
      <img
        src={errored ? fallback : getImageUrl(src)}
        alt={alt}
        className={`${imgClass} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const DashboardProjects = () => {
  const { isAdmin, user } = useAuth();
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // User browsing state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProjects, setFilteredProjects] = useState<ProjectResponse[]>(projects);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Admin state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProjectRequest>(emptyForm);
  const [editing, setEditing] = useState<ProjectResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = ['All', 'Blockchain', 'AI/ML', 'E-Commerce', 'IoT', 'FinTech', 'Analytics', 'Mobile Apps', 'DevOps', 'Software Development', 'Cloud Services', 'SEO Services'];

  // Fetch projects based on user role
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        const res = isAdmin
          ? await projectsApi.adminList()
          : await projectsApi.listPublic();

        if (res.success && res.data) {
          setProjects(res.data);
        } else {
          setError(res.message || 'Failed to load projects');
        }
      } catch (e: any) {
        setError(e.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [isAdmin]);

  //heart-btn
   const [liked, setLiked] = useState(false);

  // Filter projects for users
  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => (project.category || '') === selectedCategory);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(q) ||
        (project.shortDescription || '').toLowerCase().includes(q) ||
        (project.description || '').toLowerCase().includes(q)
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  // Admin functions
  const openCreateForm = () => {
    setForm(emptyForm);
    setAbstractFile(null);
    setEditing(null);
    setShowForm(true);
  };

  const openEditForm = (project: ProjectResponse) => {
    setForm({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription || '',
      description: project.description || '',
      price: project.price,
      currency: project.currency || 'INR',
      category: project.category || '',
      tags: project.tags || [],
      thumbnailUrl: project.thumbnailUrl || '',
      active: project.active
    });
    setAbstractFile(null); // Clear any selected file when editing
    setEditing(project);
    setShowForm(true);
  };

  const saveProject = async () => {
    if (!form.title) return;

    setSubmitting(true);
    setError('');
    try {
      const res: ApiResponse<ProjectResponse> = editing
        ? await projectsApi.adminUpdate(editing.id.toString(), form)
        : await projectsApi.adminCreate(form);

      if (res.success && res.data) {
        // Upload abstract file if provided
        if (abstractFile && res.data.id) {
          setUploading(true);
          try {
            const uploadRes = await projectsApi.uploadAbstract(res.data.id.toString(), abstractFile);
            if (!uploadRes.success) {
              setError(uploadRes.message || 'Project saved but failed to upload abstract file');
            }
          } catch (e: any) {
            setError('Project saved but failed to upload abstract file: ' + e.message);
          } finally {
            setUploading(false);
          }
        }


        // Refresh projects
        const refreshRes = await projectsApi.adminList();
        if (refreshRes.success && refreshRes.data) {
          setProjects(refreshRes.data);
        }
        setShowForm(false);
        setForm(emptyForm);
        setAbstractFile(null);
        setEditing(null);
      } else {
        setError(res.message || 'Failed to save project');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await projectsApi.adminDelete(id);
      if (res.success) {
        setProjects(prev => prev.filter(p => p.id.toString() !== id));
      } else {
        setError(res.message || 'Failed to delete project');
      }
    } catch (e: any) {
      setError(e.message || 'Failed to delete project');
    }
  };

  const downloadAbstract = async (project: ProjectResponse) => {
    try {
      await projectsApi.downloadAbstract(project.id.toString());
    } catch (e: any) {
      setError('Failed to download abstract: ' + e.message);
    }
  };

  // User functions
  const handlePurchase = async (file: File) => {
    if (!selectedProject || !user) return;

    setSubmitting(true);
    try {
      const res = await purchasesApi.create(
        selectedProject.id.toString(),
        file,
        `Purchase request for ${selectedProject.title}`
      );

      if (res.success) {
        setShowPurchaseModal(false);
        setSelectedProject(null);
        alert('Purchase request submitted successfully! We will review and contact you soon.');
      } else {
        alert(res.message || 'Failed to submit purchase request');
      }
    } catch (e: any) {
      alert(e.message || 'Failed to submit purchase request');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async () => {
  const url = window.location.href;

  if (navigator.share) {
    await navigator.share({
      title: document.title,
      url,
    });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }
};

  const openProjectDetail = (project: ProjectResponse) => {
    setSelectedProject(project);
  };

  const openPurchaseModal = (project: ProjectResponse) => {
    setSelectedProject(project);
    setShowPurchaseModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Admin View
  if (isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Projects</h1>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Thumb
                            src={project.thumbnailUrl}
                            alt={project.title}
                            imgClass="h-10 w-10 rounded-lg object-cover"
                            wrapperClass=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {project.shortDescription}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {project.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {project.currency} {project.price?.toLocaleString() || '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs leading-5 font-semibold rounded-full ${project.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {project.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditForm(project)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id.toString())}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <AdminFormModal
            form={form}
            setForm={setForm}
            editing={editing}
            setShowForm={setShowForm}
            save={saveProject}
            loading={submitting}
            error={error}
            abstractFile={abstractFile}
            setAbstractFile={setAbstractFile}
            uploading={uploading}
          />
        )}
      </div>
    );
  }

  // User View - Project Details
  if (selectedProject && !showPurchaseModal) {
    const youtubeId = getYoutubeId(selectedProject.thumbnailUrl);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Projects
          </button>
          <div className="flex items-center space-x-4">
               <button
                  onClick={() => setLiked(!liked)}
                   className="p-2 rounded-xl bg-transparent transition-colors group"
              >
                <HeartIcon
                  className={`h-5 w-5 transition-all duration-200 ${
                   liked
                   ? "text-red-500 fill-red-500"
                   : "text-gray-700 dark:text-white group-hover:text-red-500 group-hover:fill-red-500"
                    }`}
                    />
                </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-xl bg-transparent text-gray-600 hover:text-blue-500 transition-colors">
              <ShareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Media */}
          <div className="lg:col-span-2">
           <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-fit border border-white/20">
              <Thumb
                src={selectedProject.thumbnailUrl}
                alt={selectedProject.title}
                imgClass="w-full h-96 object-cover"
                wrapperClass=""
              />
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {selectedProject.category || 'Project'}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedProject.title}
            </h1>

            <p className="text-gray-600 mb-4">
              {selectedProject.shortDescription}
            </p>

            <div className="flex items-center justify-between mb-6">
              <div className="text-3xl font-bold text-green-600">
                {selectedProject.currency} {selectedProject.price?.toLocaleString() || '0'}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => openPurchaseModal(selectedProject)}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Purchase Project
              </button>
              {youtubeId && (
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch Demo Video
                </a>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {selectedProject.hasAbstract && user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">Project Abstract</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download the detailed project abstract to learn more about this project.
                </p>
                <button
                  onClick={() => downloadAbstract(selectedProject)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Abstract ({selectedProject.abstractFileName})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User View - Project Portfolio
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1> */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px] pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className=" w-[70px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <Thumb
                  src={project.thumbnailUrl}
                  alt={project.title}
                  imgClass="w-full h-48 object-cover"
                  wrapperClass=""
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {project.category || 'Project'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {project.currency} {project.price?.toLocaleString() || '0'}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openProjectDetail(project)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  {project.hasAbstract && user && (
                    <button
                      onClick={() => downloadAbstract(project)}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      title="Download Abstract"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => openPurchaseModal(project)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-6 flex items-center space-x-4">
                <Thumb
                  src={project.thumbnailUrl}
                  alt={project.title}
                  imgClass="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  wrapperClass=""
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {project.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {project.category || 'Project'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                    {project.shortDescription}
                  </p>
                  <div className="text-lg font-bold text-green-600 mt-2">
                    {project.currency} {project.price?.toLocaleString() || '0'}
                  </div>
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  <button
                    onClick={() => openProjectDetail(project)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </button>
                  {project.hasAbstract && user && (
                    <button
                      onClick={() => downloadAbstract(project)}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                      title="Download Abstract"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => openPurchaseModal(project)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No projects found</div>
          {searchTerm || selectedCategory !== 'All' ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedProject && (
        <PurchaseModal
          project={selectedProject}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedProject(null);
          }}
          onPurchase={handlePurchase}
          loading={submitting}
        />
      )}
    </div>
  );
};

export default DashboardProjects;