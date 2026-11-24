import {
  Building2,
  Bot,
  Users,
  Target,
  ShieldCheck,
  Lightbulb,
  HeartHandshake,
  ArrowRight,
  PhoneCall,
  Database,
} from 'lucide-react';
import { SectionHeading, CtaBand } from '../components/Shared';
import { navigate } from '../lib/router';
import type { Page } from '../lib/router';

const values = [
  {
    icon: Target,
    title: 'Revenue-first thinking',
    desc: 'Every automation we ship is measured by one thing: appointments booked and deals closed. Vanity metrics don’t pay your team.',
  },
  {
    icon: ShieldCheck,
    title: 'White-glove, done-for-you',
    desc: 'You never touch a flowchart or a script. We build, monitor, and optimize — your team just shows up to appointments.',
  },
  {
    icon: Lightbulb,
    title: 'Human + AI, not human vs AI',
    desc: 'AI handles speed and scale; trained humans handle nuance. Our calling operations blend both so no lead feels like a robot.',
  },
  {
    icon: HeartHandshake,
    title: 'Partners, not vendors',
    desc: 'We plug into your weekly rhythm, review the numbers together, and tell you the truth about what’s working.',
  },
];

const team = [
  {
    icon: Bot,
    title: 'AI & Automation Engineers',
    desc: 'Design the follow-up engines, voice agents, and integrations that run your pipeline around the clock.',
  },
  {
    icon: PhoneCall,
    title: 'Calling Operations Team',
    desc: 'Trained outreach specialists who handle high-touch conversations, qualification, and appointment setting at scale.',
  },
  {
    icon: Database,
    title: 'Real Estate CRM Specialists',
    desc: 'Deep specialists in real estate pipelines, portals, and CRMs — from lead capture to the closing table.',
  },
  {
    icon: Users,
    title: 'Strategy & Success Managers',
    desc: 'Your point of contact. They audit the numbers weekly and keep the whole machine compounding.',
  },
];

export default function About() {
  const go = (page: Page) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              About ZayTechy
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We exist because <span className="gradient-text">speed wins deals</span> — and most businesses are slow.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              ZayTechy was founded on a simple, painful observation: businesses spend
              fortunes generating leads, then let them sit unanswered for hours — or
              forever. We build the systems that fix that gap permanently.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2 items-start">
          <div className="glass rounded-3xl p-8 sm:p-10">
            <Building2 className="h-10 w-10 text-cyan-400" />
            <h2 className="mt-5 font-display text-2xl font-bold text-white">
              Born inside the lead game
            </h2>
            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-400">
              <p>
                We started as an outsourced calling agency for real estate teams —
                grinding through lead lists, calling fast, qualifying hard. We saw
                exactly where deals died: not in the pitch, but in the hours of silence
                before anyone picked up.
              </p>
              <p>
                So we built machines to end the silence. AI that responds in seconds,
                nurtures for months, and hands your team only conversations worth having.
                Today we're a full AI automation agency serving real estate teams,
                mortgage brokers, home services, and any business that lives and dies by
                its lead flow.
              </p>
              <p>
                The calling floor is still here. It's smarter now — and it's backed by
                software most agencies can't touch.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { value: '500+', label: 'AI follow-up systems deployed' },
              { value: '1.4M+', label: 'Lead conversations handled per year' },
              { value: '60+ team', label: 'Calling operations & automation specialists' },
              { value: '14 days', label: 'Average time from kickoff to live system' },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-7 py-6 flex items-center justify-between transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-0.5"
              >
                <span className="text-sm text-slate-300 max-w-[55%]">{s.label}</span>
                <span className="font-display text-2xl sm:text-3xl font-bold gradient-text">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="How We Operate"
            title="Principles that run every account"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-8 transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 border border-cyan-400/20">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team capability */}
      <section className="py-24 bg-ink-900/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="The Team Behind the Machine"
            title="Four specialists, one integrated system"
            subtitle="You get a complete department — engineering, calling operations, CRM expertise, and strategy — without hiring any of it."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-2xl p-7 text-center transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/25">
                  <Icon className="h-7 w-7 text-ink-950" strokeWidth={2.2} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            The businesses that win aren't the ones with the most leads.
            <span className="gradient-text"> They're the ones who answer.</span>
          </h2>
          <button
            onClick={() => {
              go('contact');
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5"
          >
            Work With Us
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
