import { useEffect, useState } from 'react';
import {
  Loader2,
  AlertCircle,
  Users,
  FolderKanban,
  Send,
  Plus,
  X,
  ChevronDown,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  Database,
  BarChart3,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import {
  fetchAllCompanies,
  fetchAllProjects,
  fetchProjectUpdates,
  updateProject,
  postProgressUpdate,
  type Company,
  type Project,
  type ProgressUpdate,
} from '../lib/portal';

const statusOptions: Project['status'][] = ['planning', 'in_progress', 'testing', 'live'];
const statusLabels: Record<string, string> = {
  planning: 'Planning',
  in_progress: 'In Progress',
  testing: 'Testing',
  live: 'Live',
};
const intakeStatuses: Company['status'][] = ['new', 'contacted', 'onboarding', 'active'];

const selectCls =
  'rounded-lg bg-ink-800 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60';

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updatesByProject, setUpdatesByProject] = useState<Record<string, ProgressUpdate[]>>({});
  const [refreshing, setRefreshing] = useState(false);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateMilestone, setUpdateMilestone] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const load = async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true);
    const [companiesRes, projectsRes] = await Promise.all([fetchAllCompanies(), fetchAllProjects()]);
    if (companiesRes.error || projectsRes.error) {
      setError(companiesRes.error || projectsRes.error);
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setCompanies(companiesRes.data);
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
    if (user && isAdmin) load();
  }, [user?.id, isAdmin]);

  if (!user || (!isAdmin && !loading)) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
        <p className="mt-4 text-slate-300">This area is for administrators only.</p>
      </div>
    );
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
        <p className="mt-4 text-slate-300">Couldn't load admin data: {error}</p>
      </div>
    );
  }

  const handleStatusChange = async (projectId: string, status: Project['status']) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, status } : p)));
    const { error: err } = await updateProject(projectId, { status });
    if (err) setError(err);
  };

  const handleProgressChange = async (projectId: string, progress: number) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, progress } : p)));
    const { error: err } = await updateProject(projectId, { progress });
    if (err) setError(err);
  };

  const handlePhaseChange = async (projectId: string, current_phase: string) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, current_phase } : p)));
    const { error: err } = await updateProject(projectId, { current_phase });
    if (err) setError(err);
  };

  const handlePostUpdate = async (projectId: string) => {
    if (!updateTitle.trim() || !updateMessage.trim()) return;
    setPosting(true);
    setPostError(null);
    const { error: err } = await postProgressUpdate({
      project_id: projectId,
      title: updateTitle.trim(),
      message: updateMessage.trim(),
      milestone: updateMilestone,
    });
    setPosting(false);
    if (err) {
      setPostError(err);
      return;
    }
    setUpdateTitle('');
    setUpdateMessage('');
    setUpdateMilestone(false);
    await load();
  };

  const companyForUser = (userId: string) => companies.find((c) => c.user_id === userId);
  const totalLeads = companies.length;

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white">
              Client <span className="gradient-text">Command Center</span>
            </h1>
          </div>
          <button
            onClick={() => load(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 self-start"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Users, label: 'Total clients', value: String(totalLeads) },
            { icon: FolderKanban, label: 'Active projects', value: String(projects.length) },
            {
              icon: TrendingUp,
              label: 'Avg progress',
              value: projects.length
                ? `${Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)}%`
                : '0%',
            },
            {
              icon: BarChart3,
              label: 'Live projects',
              value: String(projects.filter((p) => p.status === 'live').length),
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-5">
              <Icon className="h-5 w-5 text-cyan-400" />
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Client list */}
        <div className="mt-10 space-y-5">
          {companies.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center text-slate-400">
              No company submissions yet. New clients will appear here the moment they
              fill in the form.
            </div>
          )}

          {companies.map((company) => {
            const companyProjects = projects.filter((p) => p.user_id === company.user_id);
            return (
              <div
                key={company.id}
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  expanded === company.id ? 'border-cyan-400/40' : ''
                }`}
              >
                <button
                  onClick={() => setExpanded(expanded === company.id ? null : company.id)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 border border-cyan-400/20 font-display text-sm font-bold text-cyan-300">
                    {company.company_name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display font-semibold text-white truncate">
                      {company.company_name}
                    </span>
                    <span className="block text-sm text-slate-400 truncate">
                      {company.contact_name} &middot; {company.industry || 'Industry not set'}
                    </span>
                  </span>
                  {companyProjects[0] && (
                    <span className="hidden sm:flex items-center gap-2 text-sm">
                      <div className="h-2 w-24 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                          style={{ width: `${companyProjects[0].progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-cyan-300">{companyProjects[0].progress}%</span>
                    </span>
                  )}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      expanded === company.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expanded === company.id && (
                  <div className="border-t border-white/5 px-6 py-6">
                    {/* Contact details */}
                    <div className="grid gap-3 sm:grid-cols-2 text-sm">
                      {[
                        { icon: Mail, label: 'Email', value: company.email },
                        { icon: Phone, label: 'Phone', value: company.phone },
                        { icon: Globe, label: 'Website', value: company.website },
                        { icon: Database, label: 'Current CRM', value: company.current_crm },
                        { icon: BarChart3, label: 'Monthly leads', value: company.monthly_leads },
                        { icon: FolderKanban, label: 'Services needed', value: company.services_needed },
                      ]
                        .filter((f) => f.value)
                        .map(({ icon: Icon, label, value }) => (
                          <div key={label} className="flex items-center gap-2.5 rounded-lg bg-white/[0.03] px-4 py-2.5">
                            <Icon className="h-4 w-4 text-cyan-400 shrink-0" />
                            <span className="text-slate-500 shrink-0">{label}:</span>
                            <span className="text-slate-200 truncate">{value}</span>
                          </div>
                        ))}
                    </div>
                    {company.message && (
                      <p className="mt-4 rounded-xl bg-white/[0.03] border border-white/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
                        "{company.message}"
                      </p>
                    )}

                    {/* Projects management */}
                    <div className="mt-6 space-y-6">
                      {companyProjects.map((project) => {
                        const updates = updatesByProject[project.id] ?? [];
                        return (
                          <div key={project.id} className="rounded-2xl border border-white/10 p-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <p className="font-display font-semibold text-white">{project.title}</p>
                                <p className="text-xs text-cyan-300/80 mt-0.5">{project.service}</p>
                              </div>
                              <select
                                value={project.status}
                                onChange={(e) => handleStatusChange(project.id, e.target.value as Project['status'])}
                                className={selectCls}
                              >
                                {statusOptions.map((s) => (
                                  <option key={s} value={s}>{statusLabels[s]}</option>
                                ))}
                              </select>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-xs mb-1.5">
                                <input
                                  type="text"
                                  value={project.current_phase ?? ''}
                                  onChange={(e) => handlePhaseChange(project.id, e.target.value)}
                                  placeholder="Current phase (e.g. 'Building AI voice flows')"
                                  className="flex-1 bg-transparent text-slate-300 outline-none placeholder:text-slate-600 border-b border-dashed border-white/10 focus:border-cyan-400/50"
                                />
                                <span className="ml-3 font-mono font-bold text-cyan-300">{project.progress}%</span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                step={5}
                                value={project.progress}
                                onChange={(e) => handleProgressChange(project.id, Number(e.target.value))}
                                className="w-full accent-cyan-400"
                              />
                            </div>

                            {/* Existing updates */}
                            {updates.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {updates.map((u) => (
                                  <div key={u.id} className="flex items-start gap-2 text-xs text-slate-400">
                                    {u.milestone && <TrendingUp className="h-3 w-3 mt-0.5 text-emerald-400 shrink-0" />}
                                    <span className="font-semibold text-slate-300">{u.title}</span>
                                    <span className="ml-auto shrink-0">
                                      {new Date(u.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Post update */}
                            <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/5 p-4">
                              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <Plus className="h-3.5 w-3.5 text-cyan-400" />
                                Post progress update
                              </p>
                              <input
                                type="text"
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                                placeholder="Update title (e.g. 'AI voice agent now live')"
                                className="mt-3 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60"
                              />
                              <textarea
                                rows={2}
                                value={updateMessage}
                                onChange={(e) => setUpdateMessage(e.target.value)}
                                placeholder="What's the latest the client should see?"
                                className="mt-2 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 resize-none"
                              />
                              <div className="mt-3 flex items-center justify-between">
                                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={updateMilestone}
                                    onChange={(e) => setUpdateMilestone(e.target.checked)}
                                    className="accent-cyan-400"
                                  />
                                  Mark as milestone
                                </label>
                                <button
                                  onClick={() => handlePostUpdate(project.id)}
                                  disabled={posting || !updateTitle.trim() || !updateMessage.trim()}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-2 text-xs font-semibold text-ink-950 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {posting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                                  Post to Client
                                </button>
                              </div>
                              {postError && (
                                <p className="mt-2 text-xs text-red-300">{postError}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
