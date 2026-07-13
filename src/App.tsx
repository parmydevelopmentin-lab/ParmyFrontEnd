import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/ui/ThemeProvider';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage_New';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage_New';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import OtpVerification from './components/auth/OtpVerification';
import WhatWeDo from './pages/WhatWeDo';
import Industries from './pages/Industries';
import WhoWeAre from './pages/WhoWeAre';
import Insights from './pages/Insights';

import ThemePreview from './pages/ThemePreview';
import ProjectPortfolio from './pages/ProjectPortfolio';
import ProjectDetail from './pages/ProjectDetail';
import OurServicesPage from './pages/OurServicesPage';
import GalleryPage from './pages/GalleryPage';
import CoursesPage from './pages/CoursesPage';

import FloatingSocials from './components/ui/FloatingSocials';
import EnquiryPanel from './components/ui/EnquiryPanel';
import './styles/animations.css';

// TODO: Add Google OAuth Client ID when ready
const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
// If you set VITE_GOOGLE_CLIENT_ID in your .env, the app will wrap with GoogleOAuthProvider
// Example .env: VITE_GOOGLE_CLIENT_ID=your-google-client-id
// Otherwise Google OAuth components will be hidden.
import { GoogleOAuthProvider } from '@react-oauth/google';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {!isDashboard && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/insights" element={<Insights />} />

          <Route path="/theme-preview" element={<ThemePreview />} />
          <Route path="/projects" element={<ProjectPortfolio />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/our-services" element={<OurServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/courses" element={<CoursesPage />} />

          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <FloatingSocials />}
      {!isDashboard && <EnquiryPanel />}
    </div>
  );
}

export function App() {
  const appTree = (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );

  // If Google client id is configured, wrap with provider so GoogleLogin works
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {appTree}
      </GoogleOAuthProvider>
    );
  }

  return appTree;
}