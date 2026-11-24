import { useState } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  BarChart3,
  Database,
  Workflow,
  LogIn,
} from 'lucide-react';
import { SectionHeading } from '../components/Shared';
import { submitCompanyIntake } from '../lib/portal';
import { useAuth } from '../lib/auth';

const serviceOptions = [
  'AI Lead Follow-Up Automation',
  'AI Calling / Outsourced Calling Agency',
  'Real Estate CRM Setup & Optimization',
  'Workflow Automation',
  'Appointment Setting',
  'Analytics & Reporting',
  'Not sure yet — help me choose',
];

const leadVolumeOptions = ['Under 50 / month', '50 – 200 / month', '200 – 500 / month', '500 – 1,000 / month', '1,000+ / month'];

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all';

export default function GetStarted() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    monthly_leads: leadVolumeOptions[1],
    current_crm: '',
    services_needed: serviceOptions[0],
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: err } = await submitCompanyIntake({
      company_name: form.company_name.trim(),
      contact_name: form.contact_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      website: form.website.trim() || undefined,
      industry: form.industry.trim() || undefined,
      monthly_leads: form.monthly_leads,
      current_crm: form.current_crm.trim() || undefined,
      services_needed: form.services_needed,
      message: form.message.trim() || undefined,
    });
    setSubmitting(false);
    if (err) {
      setError('Something went wrong while submitting. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  if (!user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-6 py-28">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative glass rounded-3xl p-8 sm:p-12 max-w-md text-center">
          <Building2 className="h-12 w-12 text-cyan-400 mx-auto" />
          <h1 className="mt-5 font-display text-2xl font-bold text-white">Tell us about your company</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Create a free account first — then you can fill in your company details and
            track your automation progress in your own dashboard.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <button
              onClick={() => (window.location.hash = '#/register')}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3.5 font-semibold text-ink-950 transition-all hover:brightness-110"
            >
              Create Free Account
            </button>
            <button
              onClick={() => (window.location.hash = '#/login')}
              className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              Already have an account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Get Started
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Tell us about your <span className="gradient-text">business</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              The more we know about your company and lead flow, the faster we can build
              your automation blueprint. This becomes your client file — you'll track
              every step in your dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {submitted ? (
            <div className="glass rounded-3xl px-8 py-16 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto" />
              <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-white">
                You're all set, {form.contact_name.split(' ')[0]}.
              </h2>
              <p className="mt-3 max-w-md mx-auto text-sm sm:text-base leading-relaxed text-slate-400">
                Your company details are in. Our team is reviewing{' '}
                <span className="text-cyan-300">{form.company_name}</span> and will kick
                off your onboarding shortly. Watch your dashboard — progress updates
                will appear there as we build.
              </p>
              <button
                onClick={() => (window.location.hash = '#/dashboard')}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all hover:brightness-110"
              >
                <BarChart3 className="h-5 w-5" />
                Go to My Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 sm:p-10">
              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Company name *</label>
                    <input type="text" required value={form.company_name} onChange={set('company_name')} placeholder="Smith Realty Group" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your name *</label>
                    <input type="text" required value={form.contact_name} onChange={set('contact_name')} placeholder="Jordan Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Work email *</label>
                    <input type="email" required value={form.email} onChange={set('email')} placeholder="jordan@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                    <input type="url" value={form.website} onChange={set('website')} placeholder="https://yourcompany.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                    <input type="text" value={form.industry} onChange={set('industry')} placeholder="Real estate, insurance, home services..." className={inputCls} />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <BarChart3 className="h-4 w-4 text-cyan-400" />
                      Monthly lead volume
                    </label>
                    <select value={form.monthly_leads} onChange={set('monthly_leads')} className={`${inputCls} appearance-none bg-ink-800`}>
                      {leadVolumeOptions.map((o) => (
                        <option key={o} value={o} className="bg-ink-800">{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Database className="h-4 w-4 text-cyan-400" />
                      Current CRM / tools
                    </label>
                    <input type="text" value={form.current_crm} onChange={set('current_crm')} placeholder="Follow Up Boss, HubSpot, spreadsheets..." className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                      <Workflow className="h-4 w-4 text-cyan-400" />
                      What do you need automated?
                    </label>
                    <select value={form.services_needed} onChange={set('services_needed')} className={`${inputCls} appearance-none bg-ink-800`}>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-ink-800">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Anything else we should know?</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Where do your leads come from? What's your biggest follow-up bottleneck today?"
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Company Details
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
