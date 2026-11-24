import { useState } from 'react';
import { Zap, Loader2, AlertCircle, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { signIn, signUp } from '../lib/portal';
import { useAuth } from '../lib/auth';

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all';

export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session, loading: authLoading } = useAuth();

  if (session && !authLoading) {
    window.location.hash = '#/dashboard';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  const friendlyError = (msg: string) => {
    if (msg.includes('Invalid login credentials')) return 'Incorrect email or password. Please try again.';
    if (msg.includes('already registered') || msg.includes('already been registered'))
      return 'An account with this email already exists. Try signing in instead.';
    if (msg.includes('Password')) return 'Password must be at least 6 characters.';
    if (msg.includes('valid email')) return 'Please enter a valid email address.';
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (mode === 'register') {
      const { error: err } = await signUp(email.trim(), password, fullName.trim());
      if (err) setError(friendlyError(err));
    } else {
      const { error: err } = await signIn(email.trim(), password);
      if (err) setError(friendlyError(err));
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-28">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/25">
              <Zap className="h-6 w-6 text-ink-950" strokeWidth={2.5} />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold text-white">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {mode === 'login'
                ? 'Sign in to your client dashboard to track your automation progress.'
                : 'Register to get started — you\'ll fill in your company details next.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className={inputCls}
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className={inputCls}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Create a password (min 6 characters)' : 'Password'}
                className={inputCls}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => (window.location.hash = '#/register')}
                  className="font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => (window.location.hash = '#/login')}
                  className="font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
