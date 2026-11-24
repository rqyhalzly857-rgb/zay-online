import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck, CalendarCheck } from 'lucide-react';
import { SectionHeading } from '../components/Shared';
import { submitLead } from '../lib/supabase';

const serviceOptions = [
  'AI Lead Follow-Up Automation',
  'AI Calling / Outsourced Calling Agency',
  'Real Estate CRM Setup & Optimization',
  'Workflow Automation',
  'Appointment Setting',
  'Not sure yet — help me choose',
];

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: serviceOptions[0],
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: err } = await submitLead({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || undefined,
      phone: form.phone.trim() || undefined,
      service: form.service,
      message: form.message.trim() || undefined,
    });
    setSubmitting(false);
    if (err) {
      setError("Your request didn't go through. Please try again or email us directly.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Book a Strategy Call
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Let's build your <span className="gradient-text">follow-up machine</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Tell us about your business and lead flow. We'll come to the call with a
              custom automation blueprint — free, whether you hire us or not.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-5">
          {/* Left: pitch */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Clock,
                title: 'Responds in minutes, not days',
                desc: 'We reply to your request the same business day — often within the hour. Fitting, right?',
              },
              {
                icon: CalendarCheck,
                title: 'A real plan, not a sales pitch',
                desc: "On the call we map your funnel live and show you exactly what we'd automate first and why.",
              },
              {
                icon: ShieldCheck,
                title: 'No pressure, no lock-in',
                desc: 'Most clients start with one system and expand. Month-to-month after onboarding.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 border border-cyan-400/20">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass rounded-3xl px-8 py-16 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle2 className="h-14 w-14 text-emerald-400" />
                <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-white">
                  Request received.
                </h2>
                <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-slate-400">
                  Thank you, {form.name.split(' ')[0]}. Your strategy call request is in —
                  we'll reach out at <span className="text-cyan-300">{form.email}</span>{' '}
                  shortly to schedule a time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full name *</label>
                    <input type="text" required value={form.name} onChange={set('name')} placeholder="Jordan Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Work email *</label>
                    <input type="email" required value={form.email} onChange={set('email')} placeholder="jordan@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                    <input type="text" value={form.company} onChange={set('company')} placeholder="Smith Realty Group" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">What do you need help with?</label>
                    <select value={form.service} onChange={set('service')} className={`${inputCls} appearance-none bg-ink-800`}>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-ink-800">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tell us about your lead flow</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Where do your leads come from, roughly how many per month, and what happens after they come in today?"
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Request My Free Strategy Call
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  No spam, ever. Your details are only used to schedule your call.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
