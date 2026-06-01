import React, { useEffect, useState, createContext, useContext } from 'react';
import { authApi, tokenUtils, ApiError } from '../services/api';
import { User } from '../types/api';
// import { extractEmailFromGoogleCredential } from '../utils/googleAuth'; // TODO: Uncomment when Google OAuth is configured

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  // loginWithGoogle: (credential: string) => Promise<void>; // TODO: Uncomment when Google OAuth is configured
  loginWithGoogle?: (credential: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  // signupWithGoogle: (credential: string) => Promise<void>; // TODO: Uncomment when Google OAuth is configured
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  needsOtpVerification: boolean;
  setNeedsOtpVerification: (value: boolean) => void;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [needsOtpVerification, setNeedsOtpVerification] = useState(false);
    const [pendingEmail, setPendingEmail] = useState('');

    // Check if user is already logged in from localStorage
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = tokenUtils.getToken();

      if (storedUser && storedToken) {
        // Validate token
        if (tokenUtils.isTokenValid(storedToken)) {
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('user');
          tokenUtils.removeToken();
        }
      }
      setIsLoading(false);
    }, []);

    // Login with email and password
    const login = async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authApi.login({ email, password });

        if (response.success) {
          // Backend always requires OTP verification for login
          setNeedsOtpVerification(true);
          setPendingEmail(email);
        } else {
          throw new ApiError(response.message, 400, null);
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    // TODO: Uncomment when Google OAuth is configured
    // Login with Google
    // const loginWithGoogle = async (credential: string) => {
    //   setIsLoading(true);
    //   try {
    //     // Extract email from Google credential for pending email
    //     const email = extractEmailFromGoogleCredential(credential);
    //     
    //     const response = await authApi.loginWithGoogle({ token: credential });
    //     
    //     if (response.success) {
    //       // Backend always requires OTP verification for Google login
    //       setNeedsOtpVerification(true);
    //       setPendingEmail(email || '');
    //     } else {
    //       throw new ApiError(response.message, 400, null);
    //     }
    //   } catch (error) {
    //     console.error('Google login error:', error);
    //     throw error;
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // Provide a safe stub for loginWithGoogle so the UI can call it even when Google OAuth
    // isn't configured. This avoids runtime/type errors; when called it returns a rejected promise.
    const loginWithGoogle = async (_credential: string) => {
      // Keep behavior consistent: return a rejected promise with helpful message
      return Promise.reject(new Error('Google OAuth is not configured in this environment'));
    };

    // Register with email and password
    const signup = async (username: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await authApi.register({ username, email, password });

        if (response.success) {
          // Backend always requires OTP verification for registration
          setNeedsOtpVerification(true);
          setPendingEmail(email);
        } else {
          throw new ApiError(response.message, 400, null);
        }
      } catch (error) {
        console.error('Signup error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    // TODO: Uncomment when Google OAuth is configured
    // Register with Google
    // const signupWithGoogle = async (credential: string) => {
    //   setIsLoading(true);
    //   try {
    //     // Extract email from Google credential for pending email
    //     const email = extractEmailFromGoogleCredential(credential);
    //     
    //     const response = await authApi.registerWithGoogle({ token: credential });
    //     
    //     if (response.success) {
    //       // Backend always requires OTP verification for Google registration
    //       setNeedsOtpVerification(true);
    //       setPendingEmail(email || '');
    //     } else {
    //       throw new ApiError(response.message, 400, null);
    //     }
    //   } catch (error) {
    //     console.error('Google signup error:', error);
    //     throw error;
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // Verify OTP
    const verifyOtp = async (email: string, otp: string) => {
      setIsLoading(true);
      try {
        const response = await authApi.verifyOTP({ email, otp });

        if (response.success && response.data) {
          // Extract token and user data from response
          const { token, user: userResponse } = response.data;

          // Create user object with token
          const userData: User = {
            id: userResponse.id,
            email: userResponse.email,
            username: userResponse.username,
            verified: userResponse.verified,
            authProvider: userResponse.authProvider,
            roles: userResponse.roles,
            createdAt: userResponse.createdAt,
            token: token
          };

          // Store token and user data
          tokenUtils.setToken(token);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          setNeedsOtpVerification(false);
          setPendingEmail('');
        } else {
          throw new ApiError(response.message, 400, null);
        }
      } catch (error) {
        console.error('OTP verification error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      tokenUtils.removeToken();
      setNeedsOtpVerification(false);
      setPendingEmail('');
    };

    const value = {
      user,
      isAuthenticated: !!user,
      isAdmin: Array.isArray(user?.roles) && user.roles.includes('ADMIN'),
      login,
      loginWithGoogle,
      signup,
      // signupWithGoogle, // TODO: Uncomment when Google OAuth is configured
      verifyOtp,
      logout,
      isLoading,
      needsOtpVerification,
      setNeedsOtpVerification,
      pendingEmail,
      setPendingEmail
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }