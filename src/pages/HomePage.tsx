import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MailIcon, PhoneIcon, UserIcon, MessageSquareIcon, CheckCircleIcon, AlertCircleIcon, SendIcon } from 'lucide-react';
import { contactApi } from '../services/api';

const PROJECT_TYPES = [
  'Project',
  'AI/ML project',
  'Java project',
  'Development',
  'Other',
];

const EnquiryPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasClosed) {
        setOpen(true);
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [hasClosed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone || !form.projectType || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const [firstName, ...rest] = form.name.trim().split(' ');
      const res = await contactApi.submitContactForm({
        firstName,
        lastName: rest.join(' ') || '-',
        email: form.email,
        phone: form.phone,
        service: `Project Enquiry - ${form.projectType}`,
        message: `Project Type: ${form.projectType}\n\n${form.message}`,
      });
      if (res.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
      } else {
        setError(res.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-secondary-500 hover:bg-secondary-600 border border-white/20 shadow-2xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
          aria-label="Open enquiry popup"
          title="Open enquiry form"
        >
          <MessageSquareIcon className="h-6 w-6 text-white" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => { setOpen(false); setHasClosed(true); }} />
          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_35px_80px_rgba(15,23,42,0.45)] overflow-hidden">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-secondary-400">Quick enquiry</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Let&apos;s chat</h2>
                  <p className="mt-2 text-sm text-slate-400">Send a short message and we&apos;ll reply soon.</p>
                </div>
                <button
                  onClick={() => { setOpen(false); setHasClosed(true); }}
                  className="rounded-full bg-slate-900/70 p-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  aria-label="Close enquiry popup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-slate-900/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] border border-white/10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500/15 text-secondary-400">
                      <CheckCircleIcon className="h-7 w-7" />
                    </div>
                    <p className="text-lg font-semibold text-white">Message sent!</p>
                    <p className="max-w-xs text-sm text-slate-400">We appreciate your enquiry and will respond shortly.</p>
                    <button
                      onClick={() => { setSubmitted(false); setOpen(false); setHasClosed(true); }}
                      className="mt-4 rounded-full border border-secondary-500 px-5 py-2 text-sm text-secondary-400 hover:bg-secondary-500/10 transition"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="rounded-2xl bg-red-500/10 border border-red-400/25 px-4 py-3 text-sm text-red-100">
                        <div className="flex items-start gap-2">
                          <AlertCircleIcon className="mt-0.5 h-4 w-4 text-red-300" />
                          <span>{error}</span>
                        </div>
                      </div>
                    )}

                    <label className="space-y-2 text-sm text-slate-300">
                      <span className="font-semibold">Full Name <span className="text-secondary-400">*</span></span>
                      <div className="relative">
                        <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
                        />
                      </div>
                    </label>

                    <label className="space-y-2 text-sm text-slate-300">
                      <span className="font-semibold">Email Address <span className="text-secondary-400">*</span></span>
                      <div className="relative">
                        <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
                        />
                      </div>
                    </label>

                    <label className="space-y-2 text-sm text-slate-300">
                      <span className="font-semibold">Phone Number <span className="text-secondary-400">*</span></span>
                      <div className="relative">
                        <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
                        />
                      </div>
                    </label>

                    <label className="space-y-2 text-sm text-slate-300">
                      <span className="font-semibold">Project Type <span className="text-secondary-400">*</span></span>
                      <select
                        name="projectType"
                        required
                        value={form.projectType}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white focus:border-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
                      >
                        <option value="" disabled className="bg-slate-900 text-slate-400">Choose project type…</option>
                        {PROJECT_TYPES.map(type => (
                          <option key={type} value={type} className="bg-slate-900 text-white">{type}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2 text-sm text-slate-300">
                      <span className="font-semibold">Message <span className="text-secondary-400">*</span></span>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us how we can help…"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 resize-none"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 w-full rounded-2xl bg-secondary-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary-500/20 transition hover:bg-secondary-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                          Sending…
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center gap-2"><SendIcon className="h-4 w-4" />Send Enquiry</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary-900 via-gray-900 to-black min-h-screen">
      <EnquiryPanel />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-purple-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-500 opacity-20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 left-1/4 w-60 h-60 bg-secondary-500 opacity-20 rounded-full animate-float-medium"></div>
          <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-secondary-500 opacity-20 rounded-full animate-float-fast"></div>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-up">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text text-transparent">
                  Parmy Technologies
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up animation-delay-300">
                Crafting Innovative Software Solutions for a Smarter Tomorrow
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-500">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-4 border border-secondary-500 hover:bg-secondary-500/10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block animate-fade-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Team collaborating on innovative solutions"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="text-2xl font-bold text-secondary-400">100+</div>
                <div className="text-sm text-gray-300">Projects Delivered</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl">
                <div className="text-2xl font-bold text-secondary-400">5+</div>
                <div className="text-sm text-gray-300">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gradient-to-br from-gray-900 via-primary-900 to-black">
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">Our Services</h2>
              <p className="text-xl text-gray-300 animate-fade-in-up animation-delay-300">Comprehensive technology solutions for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up group">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                    alt="Web Development"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary-400">Web Development</h3>
                  <p className="text-gray-300">Modern, responsive web applications built with cutting-edge technologies.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-300 group">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
                    alt="Mobile Development"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary-400">Mobile Development</h3>
                  <p className="text-gray-300">Native and cross-platform mobile applications for iOS and Android.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-500 group">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                    alt="Cloud Solutions"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-secondary-400">Cloud Solutions</h3>
                  <p className="text-gray-300">Scalable cloud infrastructure and migration services.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-br from-black via-primary-950 to-gray-900">
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Parmy Technologies</h2>
                <p className="text-lg text-gray-300 mb-6">
                  We are a leading technology company specializing in innovative software solutions.
                  Our team of experts delivers cutting-edge applications that drive business growth
                  and digital transformation.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-400">5+</div>
                    <div className="text-gray-300">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary-400">100+</div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden animate-fade-in-right h-80">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                  alt="Our Team at Work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">Why Choose Us?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-200 text-sm"><span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 flex-shrink-0"></span>Expert team of developers</li>
                    <li className="flex items-center text-gray-200 text-sm"><span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 flex-shrink-0"></span>Cutting-edge technologies</li>
                    <li className="flex items-center text-gray-200 text-sm"><span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 flex-shrink-0"></span>24/7 support and maintenance</li>
                    <li className="flex items-center text-gray-200 text-sm"><span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 flex-shrink-0"></span>Scalable solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Work Culture Gallery */}
      <div className="bg-gradient-to-br from-black via-primary-950 to-gray-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 animate-fade-in-up">Our Work Culture</h2>
            <p className="text-gray-300 animate-fade-in-up animation-delay-300">A glimpse into how we build the future, together</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl overflow-hidden h-52 group">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80" alt="Developer at work" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-52 group">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80" alt="Team collaboration" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-52 group">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80" alt="Strategy meeting" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden h-52 group">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80" alt="Modern office" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-gray-900 via-primary-900 to-black py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">What Our Clients Say</h2>
            <p className="text-gray-300 animate-fade-in-up animation-delay-300">Trusted by businesses across industries</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-fade-in-up">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-secondary-400" />
                <div>
                  <div className="font-semibold text-white text-sm">Rahul Sharma</div>
                  <div className="text-gray-400 text-xs">CEO, TechVentures India</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"Parmy Technologies transformed our legacy systems into a modern cloud platform. Their expertise and dedication were outstanding."</p>
              <div className="flex mt-3 text-secondary-400 text-sm">★★★★★</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-fade-in-up animation-delay-300">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-secondary-400" />
                <div>
                  <div className="font-semibold text-white text-sm">Priya Nair</div>
                  <div className="text-gray-400 text-xs">CTO, FinEdge Solutions</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"The mobile app they built exceeded our expectations. Smooth, fast, and beautifully designed. Our user engagement tripled!"</p>
              <div className="flex mt-3 text-secondary-400 text-sm">★★★★★</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-fade-in-up animation-delay-500">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-secondary-400" />
                <div>
                  <div className="font-semibold text-white text-sm">Ankit Mehta</div>
                  <div className="text-gray-400 text-xs">Founder, LogiSmart</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"Their AI solutions gave us real-time analytics that saved us thousands of hours. Truly a game-changer for our operations."</p>
              <div className="flex mt-3 text-secondary-400 text-sm">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/92 via-gray-900/88 to-black/92" />
        <section className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-300">
              Let's discuss how we can help transform your business with innovative technology solutions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-secondary-500 hover:bg-secondary-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-500"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
