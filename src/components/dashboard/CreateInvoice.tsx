import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Send,
  Calculator,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Building,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react';
import { invoiceApi } from '../../services/api';
import { InvoiceRequest } from '../../types/api';
import { formatCurrencyDisplay } from '../../utils/currencyUtils';

const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    projectName: '',
    quantity: '',
    price: '',
    discountPercentage: '',
    taxPercentage: '',
    dueDate: ''
  });

  // Calculated values
  const quantity = parseFloat(formData.quantity) || 0;
  const price = parseFloat(formData.price) || 0;
  const discountPercentage = parseFloat(formData.discountPercentage) || 0;
  const taxPercentage = parseFloat(formData.taxPercentage) || 0;

  const subtotal = quantity * price;
  const discountAmount = subtotal * (discountPercentage / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (taxPercentage / 100);
  const totalAmount = taxableAmount + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.customerName.trim()) {
      setError('Customer name is required');
      return;
    }

    if (!formData.customerEmail.trim()) {
      setError('Customer email is required');
      return;
    }

    if (!formData.projectName.trim()) {
      setError('Project name is required');
      return;
    }

    if (!formData.quantity || quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    if (!formData.price || price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (!formData.dueDate) {
      setError('Due date is required');
      return;
    }

    // Check if due date is in the future
    const dueDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dueDate <= today) {
      setError('Due date must be in the future');
      return;
    }

    try {
      setLoading(true);

      // Convert form data to API request format
      const invoiceRequest: InvoiceRequest = {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        projectName: formData.projectName.trim(),
        quantity: quantity,
        price: price,
        discountPercentage: discountPercentage,
        taxPercentage: taxPercentage,
        dueDate: formData.dueDate
      };

      const response = await invoiceApi.createInvoice(invoiceRequest);

      if (response.success) {
        setSuccess('Invoice created and sent successfully!');
        setTimeout(() => {
          navigate('/dashboard/invoices');
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to create invoice. Please try again.');
      console.error('Error creating invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set default due date to 30 days from now
  React.useEffect(() => {
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 30);
    setFormData(prev => ({
      ...prev,
      dueDate: defaultDueDate.toISOString().split('T')[0]
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/invoices')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Invoices
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Create New Invoice
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the details to create and send a new invoice
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Customer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Email *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="customer@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Project Information
              </h3>

              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Unit Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter unit price"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter discount %"
                  />
                </div>

                <div>
                  <label htmlFor="taxPercentage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tax (%)
                  </label>
                  <input
                    type="number"
                    id="taxPercentage"
                    name="taxPercentage"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.taxPercentage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter tax %"
                  />
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Due Date
              </h3>

              <div className="max-w-sm">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Due Date *
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/invoices')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create & Send Invoice
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Preview/Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Invoice Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrencyDisplay(subtotal)}
                </span>
              </div>

              {formData.discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Discount ({formData.discountPercentage}%):
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    -{formatCurrencyDisplay(discountAmount)}
                  </span>
                </div>
              )}

              {formData.taxPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tax ({formData.taxPercentage}%):
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrencyDisplay(taxAmount)}
                  </span>
                </div>
              )}

              <hr className="border-gray-200 dark:border-gray-600" />

              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Total Amount:
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrencyDisplay(totalAmount)}
                </span>
              </div>
            </div>

            {/* Preview Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Invoice Details:
              </h4>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <p>• PDF will be generated automatically</p>
                <p>• Invoice will be emailed to customer</p>
                <p>• Status will be set to "Pending"</p>
                <p>• Due date: {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;