import {
  Bot,
  PhoneCall,
  Database,
  Workflow,
  CalendarCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { SectionHeading, CtaBand } from '../components/Shared';
import { navigate } from '../lib/router';
import type { Page } from '../lib/router';

const services = [
  {
    icon: Bot,
    title: 'AI Lead Follow-Up Automation',
    desc: 'Every new lead gets an instant, human-quality response by SMS, email, and chat — 24/7. Intelligent sequences nurture until they convert.',
  },
  {
    icon: PhoneCall,
    title: 'AI Calling & Outsourced Operations',
    desc: 'AI voice agents plus a trained human calling team for outreach, qualification, and appointment setting that never sleeps.',
  },
  {
    icon: Database,
    title: 'Real Estate CRM Specialization',
    desc: 'We build, migrate, and optimize CRMs purpose-built for real estate pipelines — from first touch to closing table.',
  },
  {
    icon: Workflow,
    title: 'End-to-End Workflow Automation',
    desc: 'Connecting your tools so data flows itself: lead routing, task creation, contract triggers, and reporting on autopilot.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Setting Engine',
    desc: 'Qualified prospects land straight on your calendar. We handle reminders, reschedules, and no-show recovery.',
  },
  {
    icon: BarChart3,
    title: 'Speed-to-Lead Analytics',
    desc: 'Full visibility into response times, conversion at every stage, and the exact revenue your automation recovers.',
  },
];

const stats = [
  { value: '< 60s', label: 'Average speed-to-lead response' },
  { value: '3.2x', label: 'More appointments booked' },
  { value: '24/7', label: 'Follow-up, never off the clock' },
  { value: '87%', label: 'Of leads re-engaged after going cold' },
];

const process = [
  {
    step: '01',
    icon: Target,
    title: 'Audit & Strategy',
    desc: 'We dissect your funnel, find where leads leak, and design your custom automation blueprint.',
  },
  {
    step: '02',
    icon: Workflow,
    title: 'Build & Integrate',
    desc: 'We wire the AI follow-up, calling systems, and CRM into your existing stack — usually live within 14 days.',
  },
  {
    step: '03',
    icon: TrendingUp,
    title: 'Optimize & Scale',
    desc: 'Conversations are reviewed, scripts sharpened, and the system compounds results month over month.',
  },
];

const trusted = [
  'Realty Groups', 'Mortgage Brokers', 'Insurance Agencies', 'Home Services',
  'Med Spas', 'Law Firms', 'Solar Installers', 'Coaching Businesses',
];

export default function Home() {
  const go = (page: Page) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute top-40 -left-40 h-72 w-72 rounded-full bg-teal-500/10 blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 animate-float-slow">
              <Zap className="h-3.5 w-3.5" />
              Full-Service AI Automation Agency
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Your leads deserve a reply in{' '}
              <span className="gradient-text text-glow">seconds</span>, not days.
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-400 max-w-2xl mx-auto">
              ZayTechy builds intelligent follow-up machines for businesses that live on
              leads — with AI calling operations and real estate CRM systems that turn
              every inquiry into a booked appointment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => go('get-started')}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5"
              >
                Automate Your Business
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => go('services')}
                className="rounded-xl border border-white/15 px-8 py-4 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                See What We Automate
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-400">
              {[
                { icon: Clock, text: 'Live in 14 days' },
                { icon: ShieldCheck, text: 'No long-term lock-in' },
                { icon: CheckCircle2, text: 'Works with your CRM' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-400" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Hero visual: mock live pipeline */}
          <div className="relative mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm font-medium text-slate-300">Follow-Up Engine — Live</span>
                </div>
                <span className="text-xs text-slate-500 font-mono">today</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { time: '0:12', text: 'New lead captured from Facebook Ads — AI replied via SMS', tag: 'Replied', tagColor: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
                  { time: '0:47', text: 'Lead question answered — qualification call booked by AI voice agent', tag: 'Booked', tagColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30' },
                  { time: '1:03', text: 'Cold lead from March re-engaged — appointment confirmed for Thursday', tag: 'Revived', tagColor: 'bg-teal-400/10 text-teal-300 border-teal-400/30' },
                  { time: '2:19', text: 'Showing request routed to CRM — agent notified, follow-up scheduled', tag: 'Routed', tagColor: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="font-mono text-xs text-cyan-400/80 sm:w-10">{row.time}</span>
                    <span className="flex-1 text-sm text-slate-300">{row.text}</span>
                    <span className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-medium ${row.tagColor}`}>
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 bg-ink-900/40 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...trusted, ...trusted].map((t, i) => (
            <span key={i} className="mx-8 font-display text-sm font-medium uppercase tracking-widest text-slate-500">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="What We Do"
            title="A complete lead-to-appointment machine"
            subtitle="Not just software — a done-for-you system combining AI, automation, and a trained calling team."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc }) => (
              <button
                key={title}
                onClick={() => go('services')}
                className="group text-left glass rounded-2xl p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 border border-cyan-400/20">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-ink-900/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl sm:text-5xl font-bold gradient-text">{s.value}</p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="From first call to compounding revenue"
            subtitle="A proven three-step rollout that respects your time and your pipeline."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {process.map(({ step, icon: Icon, title, desc }, i) => (
              <div key={step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] border-t border-dashed border-cyan-400/20" />
                )}
                <div className="glass rounded-2xl p-8 text-center transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/25">
                    <Icon className="h-7 w-7 text-ink-950" strokeWidth={2.2} />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-800 border border-white/10 font-mono text-[10px] font-bold text-cyan-300">
                      {step}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real estate spotlight */}
      <section className="py-24 bg-ink-900/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300">
              Specialty
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Real estate moves fast. Your follow-up should move{' '}
              <span className="gradient-text">faster</span>.
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              78% of buyers choose the first agent who responds. We plug AI follow-up into
              your real estate CRM so every portal lead, sign call, and ad click gets an
              instant, personal response — and your agents only touch warm, qualified,
              appointment-ready prospects.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Instant response to Zillow, Realtor.com & ad leads',
                'AI nurture across SMS, email, and voice',
                'Showing requests routed and confirmed automatically',
                'Pipeline reporting built for brokers and team leads',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 h-5 w-5 text-teal-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => go('get-started')}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-7 py-3.5 font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
            >
              Get a Free CRM Audit
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/10 rounded-3xl blur-2xl" />
            <div className="relative glass rounded-3xl p-8 space-y-4">
              {[
                { label: 'Speed to lead', before: '9h 42m', after: '< 1 min' },
                { label: 'Appointments / month', before: '38', after: '124' },
                { label: 'Cost per booked appointment', before: '$210', after: '$64' },
                { label: 'Leads followed up', before: '41%', after: '100%' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/5 px-5 py-4">
                  <span className="text-sm text-slate-300">{m.label}</span>
                  <span className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-slate-500 line-through">{m.before}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="font-semibold text-teal-300">{m.after}</span>
                  </span>
                </div>
              ))}
              <p className="text-xs text-slate-500 pt-1">Typical results across client pipelines, first 90 days.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
