import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft, Sparkles, AlertCircle, CheckCircle, Loader, Shield, Key } from 'lucide-react';
import { authApi } from '../services/api';
import { ApiError } from '../services/api';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState<'verify' | 'reset' | 'success'>('verify');
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();

  // Initialize email from URL params
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  // Password strength validation
  const validatePassword = (password: string) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password),
    };

    const isValid = Object.values(requirements).every(req => req);
    return { isValid, requirements };
  };

  const passwordValidation = validatePassword(newPassword);

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !resetCode) {
      setError('Please enter your email and reset code');
      return;
    }

    if (resetCode.length !== 6) {
      setError('Reset code must be exactly 6 digits');
      return;
    }

    try {
      setIsVerifying(true);
      const response = await authApi.verifyPasswordResetCode({ email, resetCode });
      
      if (response.success) {
        setCodeVerified(true);
        setStep('reset');
        setError('');
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error('Verify code error:', err);
      if (err instanceof ApiError) {
        setError(err.data?.message || err.message || 'Invalid or expired reset code');
      } else {
        setError('Failed to verify reset code. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!passwordValidation.isValid) {
      setError('Password does not meet security requirements');
      return;
    }

    try {
      setIsLoading(true);
      const response = await authApi.resetPassword({
        email,
        resetCode,
        newPassword,
        confirmPassword
      });
      
      if (response.success) {
        setSuccess(response.message);
        setStep('success');
        // Auto-redirect to login after 5 seconds
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error('Reset password error:', err);
      if (err instanceof ApiError) {
        setError(err.data?.message || err.message || 'Failed to reset password');
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordRequirements = () => (
    <div className="mt-2 text-xs space-y-1">
      <p className="text-gray-600 dark:text-gray-400 font-medium">Password must contain:</p>
      <div className="grid grid-cols-1 gap-1">
        {Object.entries({
          'At least 8 characters': passwordValidation.requirements.minLength,
          'One uppercase letter': passwordValidation.requirements.hasUppercase,
          'One lowercase letter': passwordValidation.requirements.hasLowercase,
          'One number': passwordValidation.requirements.hasNumber,
          'One special character (@$!%*?&)': passwordValidation.requirements.hasSpecialChar,
        }).map(([requirement, met]) => (
          <div key={requirement} className={`flex items-center ${met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${met ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
            <span>{requirement}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Link
            to={step === 'success' ? '/login' : '/forgot-password'}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {step === 'success' ? 'Go to Login' : 'Back to Forgot Password'}
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="h-16 w-16 bg-gradient-to-r from-[#1A202C] to-[#2D3748] rounded-full flex items-center justify-center">
            {step === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-400" />
            ) : step === 'reset' ? (
              <Lock className="h-8 w-8 text-green-400" />
            ) : (
              <Key className="h-8 w-8 text-green-400" />
            )}
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {step === 'success' ? 'Password Reset Complete!' : 
           step === 'reset' ? 'Set New Password' : 
           'Verify Reset Code'}
        </h2>
        
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {step === 'success' ? 'Your password has been successfully changed' :
           step === 'reset' ? 'Choose a strong, secure password for your account' :
           'Enter the 6-digit code sent to your email'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
          
          {/* Step 1: Verify Code */}
          {step === 'verify' && (
            <form className="space-y-6" onSubmit={handleVerifyCode}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Reset Code Field */}
              <div>
                <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reset Code
                </label>
                <input
                  id="resetCode"
                  name="resetCode"
                  type="text"
                  required
                  maxLength={6}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-center text-lg font-mono tracking-widest"
                  placeholder="000000"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Verifying Code...
                    </>
                  ) : (
                    <>
                      <Key className="h-5 w-5 mr-2" />
                      Verify Code
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Reset Password */}
          {step === 'reset' && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              {/* New Password Field */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter your new password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {newPassword && renderPasswordRequirements()}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Confirm your new password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center p-3 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || !passwordValidation.isValid || newPassword !== confirmPassword}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Reset Password
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Password Successfully Reset!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Your password has been changed. You can now log in with your new password.
                </p>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>• You'll be redirected to login automatically in a few seconds</p>
                <p>• Make sure to keep your new password secure</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  Continue to Login
                </button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && step !== 'success' && (
            <div className="mt-4 flex items-center p-3 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Need help?{' '}
            <Link 
              to="/contact" 
              className="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;