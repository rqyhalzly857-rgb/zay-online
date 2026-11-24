import { useEffect, useState } from 'react';
import { Star, Quote, Send, CheckCircle2, AlertCircle, Loader2, PenLine, BadgeCheck, MapPin } from 'lucide-react';
import { SectionHeading, CtaBand } from '../components/Shared';
import { fetchApprovedReviews, submitReview, type Review } from '../lib/supabase';

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchApprovedReviews().then(({ data, error }) => {
      setReviews(data);
      setLoadError(error);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await submitReview({
      name: name.trim(),
      role: role.trim() || undefined,
      rating,
      content: content.trim(),
    });
    setSubmitting(false);
    if (error) {
      setSubmitError('Something went wrong while sending your review. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  const average =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[700px] rounded-full bg-cyan-500/15 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              Client Reviews
            </p>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Results our clients <span className="gradient-text">talk about</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Real feedback from real estate teams and lead-driven businesses across the
              globe running our follow-up systems — from Austin to Dubai to Sydney.
            </p>
          </div>
          {average && (
            <div className="mt-10 inline-flex items-center gap-4 glass rounded-2xl px-6 py-4">
              <span className="font-display text-4xl font-bold gradient-text">{average}</span>
              <div>
                <Stars rating={5} className="h-5 w-5" />
                <p className="mt-1 text-xs text-slate-400">based on {reviews.length} client review{reviews.length === 1 ? '' : 's'}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
            </div>
          ) : loadError ? (
            <div className="glass rounded-2xl px-6 py-10 text-center max-w-xl mx-auto">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto" />
              <p className="mt-3 text-sm text-slate-300">Reviews couldn't load right now. Please check back shortly.</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="glass rounded-2xl px-6 py-14 text-center max-w-xl mx-auto">
              <Quote className="h-8 w-8 text-cyan-400 mx-auto" />
              <p className="mt-4 text-slate-300">Be the first to share your experience with ZayTechy.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="glass rounded-2xl p-7 flex flex-col transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <Quote className="h-5 w-5 text-cyan-400/40" />
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">"{r.content}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                    <span className="relative shrink-0">
                      {r.avatar_url ? (
                        <img
                          src={r.avatar_url}
                          alt={r.name}
                          loading="lazy"
                          className="h-11 w-11 rounded-full object-cover border-2 border-cyan-400/30"
                        />
                      ) : (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-teal-400/30 border border-cyan-400/30 font-display text-sm font-bold text-cyan-300">
                          {initials(r.name)}
                        </span>
                      )}
                      {r.verified && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950">
                          <BadgeCheck className="h-4 w-4 text-cyan-400" />
                        </span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        {r.name}
                        {r.verified && <span className="rounded-full bg-cyan-400/10 border border-cyan-400/30 px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-cyan-300">Verified</span>}
                      </p>
                      {r.role && <p className="text-xs text-slate-500 truncate">{r.role}</p>}
                      {r.location && (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {r.location}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Write a review */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          {!showForm && !submitted && (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-xl shadow-cyan-500/30 transition-all duration-200 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5"
              >
                <PenLine className="h-5 w-5" />
                Write a Review
              </button>
            </div>
          )}

          {submitted ? (
            <div className="glass rounded-2xl px-8 py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Thank you.</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-sm mx-auto">
                Your review was received and will appear on this page once it's been
                approved.
              </p>
            </div>
          ) : showForm ? (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 sm:p-10">
              <SectionHeading
                align="left"
                eyebrow="Your Experience"
                title="Write a review"
                subtitle="Shared after a quick approval to keep this space genuine."
              />
              <div className="mt-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Smith"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Role / company</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Broker-Owner, Smith Realty"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className="p-1 transition-transform hover:scale-110"
                        aria-label={`${n} star${n === 1 ? '' : 's'}`}
                      >
                        <Star className={`h-7 w-7 ${n <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-amber-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your review *</label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell us about the results you saw..."
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  />
                </div>
                {submitError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-4 font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
