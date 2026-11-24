import { Zap, Mail, Phone, MapPin } from 'lucide-react';
import { navigate, type Page } from '../lib/router';

export default function Footer() {
  const go = (page: Page) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <footer className="border-t border-white/10 bg-ink-900/50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500">
                <Zap className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-bold text-white">
                ZayTechy<span className="gradient-text">.online</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Full-stack AI automation agency. We help real estate teams and service
              businesses turn raw leads into booked appointments with intelligent
              follow-up, CRM systems, and outbound calling operations.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {(
                [
                  ['About Us', 'about'],
                  ['Services', 'services'],
                  ['Client Reviews', 'reviews'],
                  ['Contact', 'contact'],
                ] as [string, Page][]
              ).map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => go(page)}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-cyan-400" />
                hello@zaytechy.online
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-cyan-400" />
                +1 (555) 013-4470
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-cyan-400" />
                Remote-first, worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ZayTechy.online. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            AI Lead Follow-Up &middot; Calling Operations &middot; Real Estate CRM
          </p>
        </div>
      </div>
    </footer>
  );
}
