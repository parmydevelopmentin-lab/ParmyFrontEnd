import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserIcon, LockIcon, MailIcon, EyeIcon, EyeOffIcon, CheckCircleIcon, AlertCircleIcon, ArrowRightIcon } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {
    signup,
    signupWithGoogle,
    isAuthenticated,
    needsOtpVerification
  } = useAuth();
  const navigate = useNavigate();
  // Redirect if already authenticated or needs OTP verification
  useEffect(() => {
    if (needsOtpVerification) {
      navigate('/verify-otp', { replace: true });
    } else if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, needsOtpVerification, navigate]);
  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 1;
    // Contains number
    if (/\d/.test(password)) strength += 1;
    // Contains special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    // Contains uppercase and lowercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);
  const getPasswordStrengthLabel = () => {
    if (!password) return '';
    if (passwordStrength === 0) return 'Very weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Medium';
    if (passwordStrength === 3) return 'Strong';
    return 'Very strong';
  };
  const getPasswordStrengthColor = () => {
    if (!password) return 'bg-white/20';
    if (passwordStrength === 0) return 'bg-red-500';
    if (passwordStrength === 1) return 'bg-orange-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-secondary-500';
    return 'bg-secondary-400';
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      setIsLoading(true);
      await signup(username, email, password);

      // If OTP verification is needed, the redirect will happen in the useEffect
      // Otherwise, navigate to the dashboard
      if (!needsOtpVerification) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create an account');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Royal background elements */}
    <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-shimmer"></div>
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-3xl animate-royal-pulse"></div>

    <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="mt-8 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100">
        Join Parmy Technologies
      </h2>
      <p className="mt-4 text-center text-lg text-white/80">
        Create your account with{' '}
        <span className="text-secondary-300 font-semibold">Parmy Technologies</span>
      </p>
      <p className="mt-2 text-center text-sm text-white/60">
        Or{' '}
        <Link to="/login" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
          sign in to your existing account
        </Link>
      </p>
    </div>
    <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl py-10 px-6 shadow-royal-glow sm:rounded-2xl sm:px-12 border border-white/20 transition-all duration-300 hover:shadow-2xl">
        {error && <div className="mb-6 bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl flex items-start backdrop-blur-sm">
          <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-white/90 mb-2">
              Username
            </label>
            <div className="relative rounded-xl shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-secondary-300" />
              </div>
              <input id="username" name="username" type="text" autoComplete="username" required value={username} onChange={e => setUsername(e.target.value)} className="block w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/50 text-sm transition-all duration-300" placeholder="Choose your username" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
              Email Address
            </label>
            <div className="relative rounded-xl shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-secondary-300" />
              </div>
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="block w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/50 text-sm transition-all duration-300" placeholder="your-email@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
              Password
            </label>
            <div className="relative rounded-xl shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-secondary-300" />
              </div>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} className="block w-full pl-12 pr-14 py-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/50 text-sm transition-all duration-300" placeholder="Create a strong password" />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-secondary-300 hover:text-secondary-200 focus:outline-none transition-colors">
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {password && <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-white/70">
                  Password Strength
                </div>
                <div className={`text-xs font-semibold ${passwordStrength < 2 ? 'text-red-300' : passwordStrength < 3 ? 'text-yellow-300' : 'text-secondary-300'}`}>
                  {getPasswordStrengthLabel()}
                </div>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} style={{
                  width: `${passwordStrength / 4 * 100}%`
                }}></div>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-white/60">
                <li className="flex items-center">
                  <span className={`mr-2 ${password.length >= 8 ? 'text-secondary-300' : 'text-white/40'}`}>
                    {password.length >= 8 ? '✓' : '○'}
                  </span>
                  At least 8 characters
                </li>
                <li className="flex items-center">
                  <span className={`mr-2 ${/\d/.test(password) ? 'text-secondary-300' : 'text-white/40'}`}>
                    {/\d/.test(password) ? '✓' : '○'}
                  </span>
                  Contains a number
                </li>
                <li className="flex items-center">
                  <span className={`mr-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-secondary-300' : 'text-white/40'}`}>
                    {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '○'}
                  </span>
                  Contains a special character
                </li>
              </ul>
            </div>}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-semibold text-white/90 mb-2">
              Confirm Password
            </label>
            <div className="relative rounded-xl shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-secondary-300" />
              </div>
              <input id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="block w-full pl-12 pr-4 py-4 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent bg-white/10 backdrop-blur-sm text-white placeholder-white/50 text-sm transition-all duration-300" placeholder="Confirm your password" />
            </div>
            {confirmPassword && password !== confirmPassword && <p className="mt-2 text-xs text-red-300 flex items-center">
              <AlertCircleIcon className="h-3 w-3 mr-1" />
              Passwords do not match
            </p>}
            {confirmPassword && password === confirmPassword && <p className="mt-2 text-xs text-secondary-300 flex items-center">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Passwords match perfectly
            </p>}
          </div>
          <div className="flex items-start">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-white/30 rounded bg-white/10 backdrop-blur-sm mt-1" />
            <label htmlFor="terms" className="ml-3 block text-sm text-white/80 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>
          <div>
            <button type="submit" disabled={isLoading || Boolean(confirmPassword && password !== confirmPassword)} className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-royal-glow text-sm font-bold text-white bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:from-secondary-400/50 disabled:to-primary-400/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
              {isLoading ? <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining Parmy Technologies...
              </> : <>
                <span>Join Parmy Technologies</span>
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </>}
            </button>
          </div>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-r from-transparent via-white/10 to-transparent text-white/70 backdrop-blur-sm">
                Already have an account?
              </span>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/login" className="w-full flex justify-center py-4 px-6 border-2 border-white/30 rounded-xl shadow-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              SignIn To Account
            </Link>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-white/60 leading-relaxed">
        By joining the royal elite, you accept our{' '}
        <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
          Royal Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
          Elite Privacy Policy
        </a>
      </p>
    </div>
  </div>;
};
export default SignupPage;