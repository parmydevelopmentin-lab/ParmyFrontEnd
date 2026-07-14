import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Crown, Shield } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    login,
    loginWithGoogle,
    isAuthenticated,
    needsOtpVerification
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const demoCredentials = [
    { role: 'Admin User', email: 'admin@parmytech.com', password: 'admin123' },
    { role: 'Manager User', email: 'manager@parmytech.com', password: 'manager123' },
    { role: 'Employee User', email: 'employee@parmytech.com', password: 'employee123' }
  ];

  useEffect(() => {
    if (needsOtpVerification) {
      navigate('/verify-otp', { replace: true });
    } else if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, needsOtpVerification, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      if (!needsOtpVerification) {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (credentials: { email: string; password: string }) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => { void 0; } } as React.FormEvent);
    }, 100);
  };

  return <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-shimmer"></div>
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-400/5 rounded-full blur-3xl animate-royal-pulse"></div>

    <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <div className="h-20 w-20 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-full flex items-center justify-center shadow-royal-glow">
          <Crown className="h-10 w-10 text-white" />
        </div>
      </div>
      <h2 className="mt-8 text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 via-accent-200 to-secondary-100">
        Parmy Technologies
      </h2>
      <p className="mt-4 text-center text-lg text-white/80">
        Welcome back to your dashboard
      </p>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl py-10 px-6 shadow-royal-glow sm:rounded-2xl sm:px-12 border border-white/20 transition-all duration-300 hover:shadow-2xl">
          <div className="relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-secondary-200 to-accent-200">
                Sign Into Your Account
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Access your dashboard
              </p>
            </div>

            {error && <div className="mb-6 bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl flex items-start backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-white/20 rounded-xl placeholder-white/50 text-white/90 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 focus:z-10 sm:text-sm transition-colors"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full pl-12 pr-12 py-3 border border-white/20 rounded-xl placeholder-white/50 text-white/90 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 focus:z-10 sm:text-sm transition-colors"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/50 hover:text-white/70 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-secondary-500 focus:ring-secondary-500 border-white/20 rounded bg-white/10 backdrop-blur-sm"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-700 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Accessing Dashboard...
                    </>
                  ) : (
                    <>
                      <span>Sign Into Dashboard</span>
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Demo Credentials
            {showDemo && (
              <div className="mt-6 p-4 bg-white/5 border border-white/20 text-white/80 px-4 py-3 rounded-xl backdrop-blur-sm">
                <h4 className="text-sm font-semibold text-white/90 mb-3">Demo Accounts:</h4>
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <button
                      key={index}
                      onClick={() => handleDemoLogin(cred)}
                      className="w-full text-left p-2 text-xs bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="font-semibold text-white/90">{cred.role}</div>
                      <div className="text-white/70">{cred.email} / {cred.password}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowDemo(false)} className="mt-2 text-xs text-secondary-300 font-semibold hover:text-secondary-200 transition-colors">
                  Hide demo credentials
                </button>
              </div>
            )}

            {!showDemo && (
              <div className="mt-6 text-center">
                <button onClick={() => setShowDemo(true)} className="text-sm text-secondary-300 font-semibold hover:text-secondary-200 transition-colors">
                  Show demo credentials
                </button>
              </div>
            )} */}

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white/70 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        loginWithGoogle(credentialResponse.credential).catch((err: any) => {
                          setError(err.message || 'Google sign in failed');
                        });
                      }
                    }}
                    onError={() => {
                      setError('Google sign in failed');
                    }}
                  />
                </div>

                {/* Demo Account Button
                <button
                  type="button"
                  onClick={() => setShowDemo(!showDemo)}
                  className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/5 backdrop-blur-sm text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
                >
                  <Shield className="h-5 w-5 text-secondary-300 mr-2" />
                  <span>Use demo account</span>
                </button> */}
              </div>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white/70 font-medium">
                    New to Parmy Technologies?
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/signup" className="w-full flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm text-sm font-semibold text-white/80 bg-white/5 backdrop-blur-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/60 leading-relaxed">
          By signing in, you agree to our{' '}
          <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-semibold text-secondary-300 hover:text-secondary-200 transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </div>;
};

export default LoginPage;
