import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { CalendarIcon, ArrowLeftIcon, HeartIcon, ShareIcon } from 'lucide-react';
import { projectsApi, purchasesApi } from '../services/api';
import type { ProjectResponse } from '../types/api';
import { useAuth } from '../context/AuthContext';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPurchase, setShowPurchase] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [purchaseMsg, setPurchaseMsg] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        if (!slug) return;
        const res = await projectsApi.getBySlug(slug);
        if (res.success && res.data) setProject(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

const handleShare = async () => {
  const url = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: project?.title,
        text: project?.description,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Project link copied to clipboard!");
    }
  } catch (error) {
    console.log("Share cancelled");
  }
};




  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <Link to="/projects" className="bg-secondary-500 px-6 py-3 rounded-xl hover:bg-secondary-600 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-surface-dark via-surface-dark-secondary to-surface-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/projects"
              className="flex items-center text-primary-200 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Projects
            </Link>
            <div className="flex items-center space-x-4">
              <button
                   onClick={() => { /* placeholder wishlist */ }}
                    className="p-2 rounded-xl bg-black/10 text-white/60 hover:text-red-500 transition-colors"
                  >
                   <HeartIcon className="h-5 w-5" />
                  </button>
              <button 
               onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 text-white/60 hover:bg-black/20 transition-colors">
                <ShareIcon className="h-5 w-5" />
              </button> 
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Media */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={project.thumbnailUrl || '/DigiDefense.png'}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2"></div>
              </div>
              {/* no gallery in v1 */}
            </div>

            {/* Project Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-fit">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100/20 text-white`}>
                  Project
                </span>
                <div className="flex items-center text-white/60 text-sm">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">{project.title}</h1>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-white/80"></div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-3xl font-bold text-secondary-300">{project.price} {project.currency}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                  onClick={() => {
                    if (!isAuthenticated) {
                      localStorage.setItem('postLoginRedirect', location.pathname);
                      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
                    } else {
                      setShowPurchase(true);
                    }
                  }}
                >
                  Buy Now
                </button>
                <div className="grid grid-cols-2 gap-3"></div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
          <p className="text-white/80 mb-8 leading-relaxed">{project.description || ''}</p>

          {isAuthenticated && showPurchase && (
            <div className="mt-10 p-6 rounded-xl border border-white/20 bg-white/5">
              <h3 className="text-xl font-semibold text-white mb-4">Complete Purchase</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <p className="text-white/80 mb-3">Scan this QR to pay the amount. Then upload the payment proof (screenshot or PDF).</p>
                  <img src="/payment-qr.jpg" alt="Payment QR" className="w-64 h-64 object-contain rounded-lg border border-white/10" />
                </div>
                <div>
                  <label className="block text-white mb-2">Upload payment proof</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full text-white/90 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary-600 file:text-white hover:file:bg-secondary-500"
                  />
                  <button
                    disabled={!file || submitting}
                    onClick={async () => {
                      if (!file || !project) return;
                      try {
                        setSubmitting(true);
                        setPurchaseMsg('');
                        const res = await purchasesApi.create(project.id, file, 'Purchase from project detail');
                        if (res.success) {
                          setPurchaseMsg('Payment proof submitted. We\'ll verify and notify you.');
                          setShowPurchase(false);
                          setFile(null);
                        }
                      } catch (e: any) {
                        setPurchaseMsg(e?.message || 'Failed to submit. Try again.');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className={`mt-4 px-5 py-3 rounded-lg font-medium ${(!file || submitting) ? 'bg-white/20 text-white/50' : 'bg-secondary-600 text-white hover:bg-secondary-500'}`}
                  >
                    {submitting ? 'Submitting…' : 'Submit Payment Proof'}
                  </button>
                  {purchaseMsg && <p className="mt-3 text-secondary-200">{purchaseMsg}</p>}
                </div>
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold text-white mb-4">Category</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.category && (
              <span className="bg-primary-600/50 text-primary-200 px-3 py-1 rounded-lg">
                {project.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
