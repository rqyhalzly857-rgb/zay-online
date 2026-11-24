import { useEffect, useState } from 'react';
import { Menu, X, Zap, ArrowRight, LayoutDashboard, LogIn, ShieldCheck } from 'lucide-react';
import { navigate, type Page } from '../lib/router';
import { useAuth } from '../lib/auth';

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ current }: { current: Page }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page: Page) => {
    setOpen(false);
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <button onClick={() => go('home')} className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/25">
            <Zap className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            ZayTechy<span className="gradient-text">.online</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                current === l.page
                  ? 'text-white bg-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </button>
          ))}
          {session ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => go('admin')}
                  className={`ml-2 inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                    current === 'admin'
                      ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                      : 'border-amber-400/30 text-amber-300 hover:bg-amber-400/10'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin
                </button>
              )}
              <button
                onClick={() => go('dashboard')}
                className={`ml-2 inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                  current === 'dashboard'
                    ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                    : 'border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={() => go('login')}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
          <button
            onClick={() => go(session ? 'get-started' : 'contact')}
            className="ml-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-400/40 hover:brightness-110"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <button
          className="md:hidden text-slate-200 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-950/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
                current === l.page ? 'text-white bg-white/10' : 'text-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
          {session ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => go('admin')}
                  className="w-full inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-amber-300"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </button>
              )}
              <button
                onClick={() => go('dashboard')}
                className="w-full inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-cyan-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                My Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={() => go('login')}
              className="w-full inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
          <button
            onClick={() => go(session ? 'get-started' : 'contact')}
            className="mt-2 w-full inline-flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-3 text-sm font-semibold text-ink-950"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </header>
  );
}
