import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  X,
  DollarSign,
  Calendar,
  FileText,
  Tag,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { expenseApi, ApiError } from '../../services/api';
import { ExpenseRequest, ExpenseCategory } from '../../types/api';

const CreateExpense: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState<ExpenseRequest>({
    title: '',
    category: 'MISCELLANEOUS' as ExpenseCategory,
    amount: 0,
    expenseDate: new Date().toISOString().split('T')[0], // Today's date
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Category display mapping
  const categoryDisplayMap: Record<ExpenseCategory, string> = {
    'SALARY': 'Salary',
    'HARDWARE': 'Hardware',
    'SOFTWARE': 'Software',
    'OFFICE_RENT': 'Office Rent',
    'UTILITIES': 'Utilities',
    'TRAVEL': 'Travel',
    'MARKETING': 'Marketing',
    'TRAINING': 'Training',
    'LEGAL': 'Legal',
    'INSURANCE': 'Insurance',
    'MAINTENANCE': 'Maintenance',
    'MISCELLANEOUS': 'Miscellaneous'
  };

  // Load available categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await expenseApi.getAvailableCategories();
        if (response.success) {
          setAvailableCategories(response.data);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Use default categories if API fails
        setAvailableCategories(Object.values(categoryDisplayMap));
      }
    };

    loadCategories();
  }, []);

  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Expense title is required';
    } else if (formData.title.length > 200) {
      errors.title = 'Title cannot exceed 200 characters';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (formData.amount > 999999999.99) {
      errors.amount = 'Amount is too large';
    }

    if (!formData.expenseDate) {
      errors.expenseDate = 'Expense date is required';
    } else {
      const selectedDate = new Date(formData.expenseDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today

      if (selectedDate > today) {
        errors.expenseDate = 'Expense date cannot be in the future';
      }
    }

    if (formData.notes && formData.notes.length > 1000) {
      errors.notes = 'Notes cannot exceed 1000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await expenseApi.createExpense(formData);

      if (response.success) {
        setSuccessMessage('Expense created successfully!');

        // Reset form
        setFormData({
          title: '',
          category: 'MISCELLANEOUS' as ExpenseCategory,
          amount: 0,
          expenseDate: new Date().toISOString().split('T')[0],
          notes: ''
        });
        setFormErrors({});

        // Redirect to expense management after 2 seconds
        setTimeout(() => {
          navigate('/dashboard/expenses');
        }, 2000);
      } else {
        setError(response.message || 'Failed to create expense');
      }
    } catch (err) {
      console.error('Error creating expense:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ExpenseRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Calculate amount display
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Create New Expense
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new company expense to the system
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/expenses')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="h-4 w-4 inline mr-2" />
              Expense Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 ${formErrors.title
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
                }`}
              placeholder="e.g., Employee Salary - July, Office Supplies"
              maxLength={200}
            />
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.title}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Category and Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="h-4 w-4 inline mr-2" />
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value as ExpenseCategory)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 ${formErrors.category
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                  }`}
              >
                {Object.entries(categoryDisplayMap).map(([key, display]) => (
                  <option key={key} value={key}>
                    {display}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.category}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="h-4 w-4 inline mr-2" />
                Amount *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  step="0.01"
                  min="0.01"
                  max="999999999.99"
                  value={formData.amount || ''}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                  className={`w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 ${formErrors.amount
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                    }`}
                  placeholder="0.00"
                />
              </div>
              {formErrors.amount && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.amount}</p>
              )}
              {formData.amount > 0 && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Amount: {formatCurrency(formData.amount)}
                </p>
              )}
            </div>
          </div>

          {/* Expense Date */}
          <div>
            <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Expense Date *
            </label>
            <input
              type="date"
              id="expenseDate"
              value={formData.expenseDate}
              onChange={(e) => handleInputChange('expenseDate', e.target.value)}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 ${formErrors.expenseDate
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
                }`}
            />
            {formErrors.expenseDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.expenseDate}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 ${formErrors.notes
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
                }`}
              placeholder="Additional details about this expense..."
              maxLength={1000}
            />
            {formErrors.notes && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.notes}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {(formData.notes?.length || 0)}/1000 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={() => navigate('/dashboard/expenses')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Expense
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExpense;