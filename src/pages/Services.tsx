import { useState } from 'react';
import {
  Bot,
  PhoneCall,
  Database,
  Workflow,
  CalendarCheck,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Building2,
  Home,
  Wrench,
  Briefcase,
  Stethoscope,
  Scale,
} from 'lucide-react';
import { SectionHeading, CtaBand } from '../components/Shared';
import { navigate } from '../lib/router';
import type { Page } from '../lib/router';

const services = [
  {
    id: 'followup',
    icon: Bot,
    name: 'AI Lead Follow-Up Automation',
    tagline: 'Speed-to-lead that never blinks',
    desc: 'The moment a lead arrives — from ads, portals, your website, or a call — our AI responds instantly across SMS, email, web chat, and social DMs. It answers questions, qualifies budget and timeline, and keeps the conversation alive through 90 days of intelligent nurture. No lead sits untouched, ever.',
    features: [
      'Instant first response in under 60 seconds, 24/7/365',
      'AI qualification: budget, timeline, motivation, financing',
      '90-day multi-channel nurture sequences that adapt to behavior',
      'Dead-lead resurrection campaigns for your existing database',
      'Seamless handoff to your team when a lead turns hot',
    ],
  },
  {
    id: 'calling',
    icon: PhoneCall,
    name: 'AI Calling & Outsourced Calling Agency',
    tagline: 'A calling floor with an AI brain',
    desc: 'Our flagship. AI voice agents make and take calls around the clock — while our trained human calling team handles the high-touch conversations that close. Inbound missed calls get answered instantly. Outbound lists get worked systematically. Every call is logged, transcribed, and scored.',
    features: [
      'AI voice agents for instant inbound & outbound calling',
      'Human calling team for list mining, qualification & appointment setting',
      'Every call transcribed, scored, and synced to your CRM',
      'Warm transfer: qualified prospect connected live to your closer',
      'Compliant dialing, local caller ID, and voicemail drop built in',
    ],
  },
  {
    id: 'crm',
    icon: Database,
    name: 'Real Estate CRM Specialization',
    tagline: 'Your pipeline, engineered',
    desc: "Real estate CRMs fail when they're generic. We architect your CRM around how property deals actually move — buyer and seller pipelines, showing coordination, lender handoffs, and long-term nurture. Whether you're on Follow Up Boss, GoHighLevel, HubSpot, or starting fresh, we build the system your agents will actually use.",
    features: [
      'Pipeline architecture for buyers, sellers, and investors',
      'Portal lead integration: Zillow, Realtor.com, RedPipe, IDX sites',
      'Automated showing requests, confirmations & agent routing',
      'Lender/agent co-marketing handoffs and drip campaigns',
      'Broker-level reporting: speed to lead, conversion, agent scorecards',
    ],
  },
  {
    id: 'workflow',
    icon: Workflow,
    name: 'End-to-End Workflow Automation',
    tagline: 'Your ops, on autopilot',
    desc: 'Beyond follow-up: we connect the tools you already use so data moves itself. New lead creates the contact, the task, the notification, and the report — automatically. Your team stops copy-pasting and starts closing.',
    features: [
      'Lead routing & round-robin assignment by rule or territory',
      'Document, contract & e-signature trigger workflows',
      'Review requests, referrals & post-close campaigns',
      'Custom internal dashboards and Slack/email alerting',
    ],
  },
  {
    id: 'appointments',
    icon: CalendarCheck,
    name: 'Appointment Setting Engine',
    tagline: 'Calendars that fill themselves',
    desc: 'Every qualified conversation ends at your calendar. We handle scheduling, confirmations, reminders, reschedules, and no-show recovery across time zones — so your team walks into prepared, expected meetings instead of chasing maybes.',
    features: [
      'AI scheduling directly into your calendar with smart availability',
      'SMS + email reminder sequences proven to cut no-shows by 60%',
      'No-show recovery: automatic re-engagement within the hour',
      'Pre-appointment briefings so your team walks in prepared',
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'Speed-to-Lead Analytics & Reporting',
    tagline: 'See exactly where revenue leaks',
    desc: "You can't fix what you can't see. We instrument every stage — capture, response, qualification, appointment, close — and show you your true speed-to-lead, cost per appointment, and the dollar value of every automation we run.",
    features: [
      'Live speed-to-lead and response-time dashboards',
      'Full-funnel conversion reporting down to the source',
      'Cost-per-appointment and revenue-recovered attribution',
      'Monthly strategy review with your success manager',
    ],
  },
];

const industries = [
  { icon: Building2, label: 'Real Estate Teams & Brokerages' },
  { icon: Home, label: 'Mortgage & Lending' },
  { icon: Wrench, label: 'Home Services & Contractors' },
  { icon: Briefcase, label: 'Insurance & Financial Services' },
  { icon: Stethoscope, label: 'Med Spas & Clinics' },
  { icon: Scale, label: 'Law Firms' },
];

export default function Services() {
  const [openId, setOpenId] = useState<string | null>('calling');
  const go = (page: Page) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Services
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Everything a lead touches, <span className="gradient-text">engineered to convert</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Pick one system or hand us the whole funnel. Every service is
              done-for-you, integrated with your stack, and measured in booked
              appointments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-5">
          {services.map(({ id, icon: Icon, name, tagline, desc, features }) => {
            const open = openId === id;
            return (
              <div
                key={id}
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  open ? 'border-cyan-400/40 shadow-xl shadow-cyan-500/10' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenId(open ? null : id)}
                  className="w-full flex items-center gap-5 px-6 sm:px-8 py-6 text-left"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      open
                        ? 'bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/25'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${open ? 'text-ink-950' : 'text-cyan-300'}`} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-lg font-semibold text-white">{name}</span>
                    <span className="block text-sm text-cyan-300/80 mt-0.5">{tagline}</span>
                  </span>
                  <ArrowRight
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      open ? 'rotate-90 text-cyan-300' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-8 pt-1 border-t border-white/5">
                      <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-300">{desc}</p>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => go('contact')}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-400/20"
                      >
                        Discuss this service
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Built for businesses that run on leads"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="glass rounded-2xl px-6 py-7 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
              >
                <Icon className="h-7 w-7 text-cyan-300" />
                <span className="text-sm font-medium text-slate-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
