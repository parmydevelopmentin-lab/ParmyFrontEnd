import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  MailIcon, 
  BriefcaseIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
  FileTextIcon,
  SendIcon
} from 'lucide-react';
import { offerApi, ApiError } from '../../services/api';
import { OfferRequest } from '../../types/api';

const CreateOffer: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<OfferRequest>({
    candidateName: '',
    candidateEmail: '',
    role: '',
    joiningDate: '',
    location: '',
    trialPeriod: '',
    address: ''
  });

  // Track custom values when "other" is selected
  const [customRole, setCustomRole] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [customTrialPeriod, setCustomTrialPeriod] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [createdOfferId, setCreatedOfferId] = useState<string>('');

  // Common predefined values
  const commonRoles = [
    'Software Development Engineer I',
    'Software Development Engineer II',
    'Senior Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Product Manager',
    'Business Analyst'
  ];

  const commonLocations = [
    'Hyderabad, India',
    'Bangalore, India',
    'Mumbai, India',
    'Delhi, India',
    'Chennai, India',
    'Pune, India',
    'Remote - India',
    'Remote - Global'
  ];

  const commonTrialPeriods = [
    '3 months',
    '6 months',
    '1 year'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle custom input fields
    if (name === 'customRole') {
      setCustomRole(value);
    } else if (name === 'customLocation') {
      setCustomLocation(value);
    } else if (name === 'customTrialPeriod') {
      setCustomTrialPeriod(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear custom values when dropdown selection changes away from "other"
      if (name === 'role' && value !== 'other') {
        setCustomRole('');
      } else if (name === 'location' && value !== 'other') {
        setCustomLocation('');
      } else if (name === 'trialPeriod' && value !== 'other') {
        setCustomTrialPeriod('');
      }
    }
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = (): boolean => {
    if (!formData.candidateName.trim()) {
      setError('Candidate name is required');
      return false;
    }
    
    if (!formData.candidateEmail.trim()) {
      setError('Candidate email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.candidateEmail)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Validate role
    const finalRole = formData.role === 'other' ? customRole.trim() : formData.role;
    if (!finalRole) {
      setError('Job role is required');
      return false;
    }
    
    if (!formData.joiningDate) {
      setError('Joining date is required');
      return false;
    }
    
    // Check if joining date is in the future
    const selectedDate = new Date(formData.joiningDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Joining date must be in the future');
      return false;
    }
    
    // Validate location
    const finalLocation = formData.location === 'other' ? customLocation.trim() : formData.location;
    if (!finalLocation) {
      setError('Work location is required');
      return false;
    }
    
    // Validate trial period
    const finalTrialPeriod = formData.trialPeriod === 'other' ? customTrialPeriod.trim() : formData.trialPeriod;
    if (!finalTrialPeriod) {
      setError('Trial period is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Prepare the final offer data with custom values if "other" was selected
      const finalOfferData: OfferRequest = {
        ...formData,
        role: formData.role === 'other' ? customRole.trim() : formData.role,
        location: formData.location === 'other' ? customLocation.trim() : formData.location,
        trialPeriod: formData.trialPeriod === 'other' ? customTrialPeriod.trim() : formData.trialPeriod
      };
      
      const response = await offerApi.createOffer(finalOfferData);
      
      if (response.success && response.data) {
        setCreatedOfferId(response.data.id);
        setSuccess('Offer letter created successfully! You can now send it to the candidate.');
        
        // Reset form
        setFormData({
          candidateName: '',
          candidateEmail: '',
          role: '',
          joiningDate: '',
          location: '',
          trialPeriod: '',
          address: ''
        });
      } else {
        setError(response.message || 'Failed to create offer');
      }
    } catch (err) {
      console.error('Error creating offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create offer. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOffer = async () => {
    if (!createdOfferId) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await offerApi.sendOffer(createdOfferId);
      
      if (response.success) {
        setSuccess('Offer letter sent successfully to the candidate!');
        setCreatedOfferId('');
        // Navigate to offers list after successful send
        setTimeout(() => {
          navigate('/dashboard/offers');
        }, 2000);
      } else {
        setError(response.message || 'Failed to send offer');
      }
    } catch (err) {
      console.error('Error sending offer:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to send offer. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToList = () => {
    navigate('/dashboard/offers');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToList}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Offer Letter</h1>
              <p className="text-gray-600 dark:text-gray-400">Generate a professional offer letter for candidates</p>
            </div>
          </div>
          <FileTextIcon className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg flex items-start">
          <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <span>{success}</span>
            {createdOfferId && (
              <div className="mt-2">
                <button
                  onClick={handleSendOffer}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/50 border border-green-200 dark:border-green-700 rounded-md hover:bg-green-200 dark:hover:bg-green-800 transition-colors disabled:opacity-50"
                >
                  <SendIcon className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send to Candidate'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-start">
          <XCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-blue-500" />
              Candidate Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="candidateName"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter candidate's full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="candidateEmail"
                  name="candidateEmail"
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="candidate@example.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Position Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-500" />
              Position Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Select a role</option>
                  {commonRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                  <option value="other">Other (specify in custom field)</option>
                </select>
                
                {formData.role === 'other' && (
                  <input
                    type="text"
                    name="customRole"
                    value={customRole}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter custom role"
                  />
                )}
              </div>
              
              <div>
                <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Joining Date *
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>
          </div>

          {/* Work Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
              Work Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Location *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Select location</option>
                  {commonLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                  <option value="other">Other (specify in custom field)</option>
                </select>
                
                {formData.location === 'other' && (
                  <input
                    type="text"
                    name="customLocation"
                    value={customLocation}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter custom location"
                  />
                )}
              </div>
              
              <div>
                <label htmlFor="trialPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trial Period *
                </label>
                <select
                  id="trialPeriod"
                  name="trialPeriod"
                  value={formData.trialPeriod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Select trial period</option>
                  {commonTrialPeriods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                  <option value="other">Other (specify in custom field)</option>
                </select>
                
                {formData.trialPeriod === 'other' && (
                  <input
                    type="text"
                    name="customTrialPeriod"
                    value={customTrialPeriod}
                    onChange={handleInputChange}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter custom trial period"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <HomeIcon className="h-5 w-5 mr-2 text-blue-500" />
              Additional Information
            </h2>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address <span className="text-gray-500">(Optional - defaults to "Hyderabad, India")</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter candidate's address (if different from default)"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                If left empty, the default address "Hyderabad, India" will be used in the offer letter.
              </p>
            </div>
          </div>

          {/* Information Note */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircleIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-2">Important Information:</p>
                <ul className="space-y-1 text-sm">
                  <li>• The offer letter will be generated as a PDF using our standard template</li>
                  <li>• You can review the offer before sending it to the candidate</li>
                  <li>• The candidate will receive the PDF via email and a copy will be sent to you</li>
                  <li>• All offer details will be stored in the system for tracking and management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleBackToList}
              className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create Offer Letter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;