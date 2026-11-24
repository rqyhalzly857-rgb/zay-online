import { ArrowRight } from 'lucide-react';
import { navigate } from '../lib/router';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-2xl`}>
      <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950" />
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="glass rounded-3xl px-8 py-14 sm:px-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <h2 className="relative font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            Ready to <span className="gradient-text">automate your business</span>?
          </h2>
          <p className="relative mt-4 max-w-xl mx-auto text-slate-300 leading-relaxed">
            Create your account, tell us about your company, and track every step of
            your automation build in your own dashboard.
          </p>
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate('get-started');
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5"
            >
              Automate Your Business
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                navigate('services');
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
