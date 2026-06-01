import React, { useState, useRef } from 'react';
import { CheckCircleIcon, PaperclipIcon, XIcon, UploadIcon, BriefcaseIcon, UserIcon, MailIcon, PhoneIcon, MapPinIcon, LinkIcon, CalendarIcon, ClockIcon } from 'lucide-react';
interface JobApplicationFormProps {
  jobTitle: string;
  jobLocation: string;
  jobType: string;
  jobDepartment: string;
  onClose?: () => void;
}
const JobApplicationForm = ({
  jobTitle = 'Software Engineer',
  jobLocation = 'Hyderabad, India',
  jobType = 'Full-time',
  jobDepartment = 'Engineering',
  onClose
}: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    coverLetter: '',
    startDate: '',
    referral: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPortfolioFile(e.target.files[0]);
    }
  };
  const removeResumeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const removePortfolioFile = () => {
    setPortfolioFile(null);
    if (portfolioInputRef.current) {
      portfolioInputRef.current.value = '';
    }
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };
  return <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <BriefcaseIcon className="h-5 w-5 mr-2" />
            Apply for {jobTitle}
          </h2>
          <div className="mt-1 flex items-center space-x-4 text-green-100 text-sm">
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {jobLocation}
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {jobType}
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              {jobDepartment}
            </div>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="text-white hover:text-green-200 transition-colors duration-200">
            <XIcon className="h-6 w-6" />
          </button>}
      </div>
      {/* Progress Indicator */}
      {!isSubmitted && <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Step {currentStep} of 3
            </div>
            <div className="text-sm font-medium text-gray-500">
              {currentStep === 1 ? 'Personal Information' : currentStep === 2 ? 'Professional Details' : 'Additional Information'}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500 ease-in-out" style={{
          width: `${currentStep / 3 * 100}%`
        }}></div>
          </div>
        </div>}
      {/* Form Content */}
      <div className="p-6">
        {isSubmitted ? <div className="text-center py-16">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Application Submitted Successfully!
            </h3>
            <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
              Thank you for applying for the {jobTitle} position. Our team will
              review your application and get back to you soon.
            </p>
            <div className="mt-8 space-y-4">
              <div className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-600 to-green-600">
                Application Reference: APP-
                {Math.floor(100000 + Math.random() * 900000)}
              </div>
              <p className="text-sm text-gray-500">
                You'll receive a confirmation email shortly with more details.
              </p>
              <div className="mt-6">
                {onClose ? <button type="button" onClick={onClose} className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Close
                  </button> : <a href="/careers" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Back to Careers
                  </a>}
              </div>
            </div>
          </div> : <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="John" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="+1 (555) 987-6543" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="City, Country" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={nextStep} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Next Step
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>}
            {/* Step 2: Professional Details */}
            {currentStep === 2 && <div className="space-y-6">
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    {resumeFile ? <div className="flex items-center justify-between bg-green-50 p-3 rounded-md border border-green-100">
                        <div className="flex items-center">
                          <PaperclipIcon className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {resumeFile.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({Math.round(resumeFile.size / 1024)} KB)
                          </span>
                        </div>
                        <button type="button" onClick={removeResumeFile} className="text-gray-400 hover:text-gray-500">
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div> : <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-green-400 transition-colors duration-300">
                        <div className="space-y-1 text-center">
                          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload a file</span>
                              <input id="resume-upload" name="resume-upload" type="file" ref={fileInputRef} onChange={handleResumeChange} className="sr-only" accept=".pdf,.doc,.docx" required />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </div>
                      </div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                    Portfolio / Work Samples (Optional)
                  </label>
                  <div className="mt-1">
                    {portfolioFile ? <div className="flex items-center justify-between bg-green-50 p-3 rounded-md border border-green-100">
                        <div className="flex items-center">
                          <PaperclipIcon className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm text-gray-700">
                            {portfolioFile.name}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            ({Math.round(portfolioFile.size / 1024)} KB)
                          </span>
                        </div>
                        <button type="button" onClick={removePortfolioFile} className="text-gray-400 hover:text-gray-500">
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div> : <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-green-400 transition-colors duration-300">
                        <div className="space-y-1 text-center">
                          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="portfolio-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
                              <span>Upload a file</span>
                              <input id="portfolio-upload" name="portfolio-upload" type="file" ref={portfolioInputRef} onChange={handlePortfolioChange} className="sr-only" accept=".pdf,.zip,.doc,.docx" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, ZIP, DOC, DOCX up to 20MB
                          </p>
                        </div>
                      </div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile (Optional)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="url" name="linkedin" id="linkedin" value={formData.linkedin} onChange={handleChange} className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Next Step
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>}
            {/* Step 3: Additional Information */}
            {currentStep === 3 && <div className="space-y-6">
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                    Cover Letter / Why are you interested in this role?{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea id="coverLetter" name="coverLetter" rows={5} value={formData.coverLetter} onChange={handleChange} required className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border border-gray-300 rounded-md" placeholder="Tell us why you're interested in this position and what makes you a great fit..."></textarea>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Earliest Start Date{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className="py-3 pl-10 pr-3 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
                      How did you hear about us?
                    </label>
                    <div className="mt-1">
                      <select id="referral" name="referral" value={formData.referral} onChange={handleChange} className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md">
                        <option value="">Please select</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="indeed">Indeed</option>
                        <option value="glassdoor">Glassdoor</option>
                        <option value="referral">Employee Referral</option>
                        <option value="website">Company Website</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <input id="privacy-policy" name="privacy-policy" type="checkbox" required className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <a href="#" className="text-green-600 hover:underline">
                          privacy policy
                        </a>{' '}
                        and consent to the processing of my personal data for
                        the purpose of the recruitment process.{' '}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={prevStep} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </> : 'Submit Application'}
                  </button>
                </div>
              </div>}
          </form>}
      </div>
    </div>;
};
export default JobApplicationForm;