import { useEffect, useState } from 'react';
import { X, MailIcon, PhoneIcon, UserIcon, MessageSquare as MessageSquareIcon, CheckCircle as CheckCircleIcon, AlertCircle as AlertCircleIcon, Send as SendIcon } from 'lucide-react';
import { contactApi } from '../../services/api';

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
          <div className="relative z-10 w-full max-w-md mt-[60px] rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_35px_80px_rgba(15,23,42,0.45)] overflow-hidden">
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

export default EnquiryPanel;
