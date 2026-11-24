import { useEffect, useState } from 'react';
import {
  Loader2,
  AlertCircle,
  Building2,
  Rocket,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flag,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import {
  fetchMyCompany,
  fetchMyProjects,
  fetchProjectUpdates,
  type Company,
  type Project,
  type ProgressUpdate,
} from '../lib/portal';

const statusSteps = ['planning', 'in_progress', 'testing', 'live'] as const;
const statusLabels: Record<string, string> = {
  planning: 'Planning',
  in_progress: 'In Progress',
  testing: 'Testing',
  live: 'Live',
};
const statusColors: Record<string, string> = {
  planning: 'bg-slate-400',
  in_progress: 'bg-cyan-400',
  testing: 'bg-amber-400',
  live: 'bg-emerald-400',
};
const intakeStatusColors: Record<string, string> = {
  new: 'bg-slate-400/10 text-slate-300 border-slate-400/30',
  contacted: 'bg-sky-400/10 text-sky-300 border-sky-400/30',
  onboarding: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  active: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-700 ${color === '' ? '' : ''}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updatesByProject, setUpdatesByProject] = useState<Record<string, ProgressUpdate[]>>({});
  const [refreshing, setRefreshing] = useState(false);

  const load = async (userId: string, showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    const [companyRes, projectsRes] = await Promise.all([
      fetchMyCompany(userId),
      fetchMyProjects(userId),
    ]);
    if (companyRes.error || projectsRes.error) {
      setError(companyRes.error || projectsRes.error);
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setCompany(companyRes.data);
    setProjects(projectsRes.data);
    const updateLists = await Promise.all(
      projectsRes.data.map(async (p) => {
        const { data } = await fetchProjectUpdates(p.id);
        return [p.id, data] as const;
      })
    );
    setUpdatesByProject(Object.fromEntries(updateLists));
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    if (user) load(user.id);
  }, [user?.id]);

  if (!user) {
    window.location.hash = '#/login';
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-40 pb-24 px-6 max-w-xl mx-auto text-center">
        <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
        <p className="mt-4 text-slate-300">We couldn't load your dashboard. Please try again shortly.</p>
      </div>
    );
  }

  const firstName = (profile?.full_name || 'there').split(' ')[0];
  const hasIntake = Boolean(company);
  const primary = projects[0];

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Welcome back, <span className="gradient-text">{firstName}</span>
            </h1>
            <p className="mt-2 text-slate-400">Your automation command center.</p>
          </div>
          <button
            onClick={() => user && load(user.id, true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 self-start"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {!hasIntake ? (
          /* No intake yet */
          <div className="mt-10 glass rounded-3xl p-8 sm:p-12 text-center">
            <Building2 className="h-12 w-12 text-cyan-400 mx-auto" />
            <h2 className="mt-5 font-display text-2xl font-bold text-white">
              One more step: tell us about your company
            </h2>
            <p className="mt-3 max-w-md mx-auto text-sm sm:text-base leading-relaxed text-slate-400">
              Fill in your company details so our team can design your automation
              blueprint. Your progress will appear right here.
            </p>
            <button
              onClick={() => (window.location.hash = '#/get-started')}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-cyan-500/25 transition-all hover:brightness-110"
            >
              Fill In Company Details
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Building2, label: 'Company', value: company.company_name },
                { icon: Activity, label: 'Active projects', value: String(projects.length) },
                {
                  icon: BarChart3,
                  label: 'Overall progress',
                  value: primary ? `${primary.progress}%` : '—',
                },
                {
                  icon: Rocket,
                  label: 'Project status',
                  value: primary ? statusLabels[primary.status] : '—',
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-2xl p-5">
                  <Icon className="h-5 w-5 text-cyan-400" />
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-white truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="mt-10 space-y-8">
              {projects.length === 0 && (
                <div className="glass rounded-2xl p-10 text-center text-slate-400">
                  Your onboarding project is being set up — check back shortly.
                </div>
              )}
              {projects.map((project) => {
                const updates = updatesByProject[project.id] ?? [];
                const stepIndex = statusSteps.indexOf(project.status as typeof statusSteps[number]);
                return (
                  <div key={project.id} className="glass rounded-3xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="font-display text-xl font-bold text-white">{project.title}</h2>
                        <p className="mt-1 text-sm text-cyan-300/90">{project.service}</p>
                      </div>
                      <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                          intakeStatusColors[project.status === 'live' ? 'active' : project.status === 'testing' ? 'onboarding' : project.status === 'in_progress' ? 'onboarding' : 'new']
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusColors[project.status]}`} />
                        {statusLabels[project.status]}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">
                          {project.current_phase || 'Kickoff pending'}
                        </span>
                        <span className="font-display font-bold gradient-text">{project.progress}%</span>
                      </div>
                      <ProgressBar value={project.progress} color="" />
                    </div>

                    {/* Stage tracker */}
                    <div className="mt-6 flex items-center justify-between">
                      {statusSteps.map((step, i) => (
                        <div key={step} className="flex-1 flex items-center">
                          <div className="flex flex-col items-center">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                                i < stepIndex
                                  ? 'bg-emerald-400/20 border-emerald-400/50 text-emerald-300'
                                  : i === stepIndex
                                    ? 'bg-cyan-400/20 border-cyan-400/60 text-cyan-300'
                                    : 'bg-white/5 border-white/10 text-slate-500'
                              }`}
                            >
                              {i < stepIndex ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                            </span>
                            <span className={`mt-1.5 text-[10px] sm:text-xs font-medium ${i <= stepIndex ? 'text-slate-300' : 'text-slate-600'}`}>
                              {statusLabels[step]}
                            </span>
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div className={`flex-1 border-t-2 mx-1 sm:mx-2 ${i < stepIndex ? 'border-emerald-400/40' : 'border-white/10'}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="mt-8 border-t border-white/5 pt-6">
                      <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-slate-300">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        Progress Updates
                      </h3>
                      {updates.length === 0 ? (
                        <p className="mt-3 text-sm text-slate-500">
                          No updates yet — your project manager will post here as work begins.
                        </p>
                      ) : (
                        <div className="mt-4 space-y-4">
                          {updates.map((u) => (
                            <div
                              key={u.id}
                              className={`rounded-xl border px-5 py-4 ${
                                u.milestone
                                  ? 'border-emerald-400/30 bg-emerald-400/5'
                                  : 'border-white/5 bg-white/[0.03]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                                  {u.milestone && <Flag className="h-3.5 w-3.5 text-emerald-400" />}
                                  {u.title}
                                </p>
                                <span className="shrink-0 text-xs text-slate-500">
                                  {new Date(u.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{u.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
