import { supabase } from './supabase';

export interface Profile {
  id: string;
  full_name: string;
  role: 'client' | 'admin';
  created_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  industry: string | null;
  monthly_leads: string | null;
  current_crm: string | null;
  services_needed: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'onboarding' | 'active';
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  company_id: string | null;
  title: string;
  service: string | null;
  status: 'planning' | 'in_progress' | 'testing' | 'live';
  progress: number;
  current_phase: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProgressUpdate {
  id: string;
  project_id: string;
  title: string;
  message: string;
  milestone: boolean;
  created_at: string;
}

export async function getProfile(userId: string): Promise<{ data: Profile | null; error: string | null }> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, created_at')
    .eq('id', userId)
    .maybeSingle();
  return { data, error: error ? error.message : null };
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message, needsEmailConfirmation: false };
  return { error: null, needsEmailConfirmation: !data.session };
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error ? error.message : null };
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function submitCompanyIntake(input: {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  monthly_leads?: string;
  current_crm?: string;
  services_needed?: string;
  message?: string;
}): Promise<{ error: string | null }> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return { error: 'You must be signed in to submit this form.' };
  const { error } = await supabase.from('companies').insert(input);
  return { error: error ? error.message : null };
}

export async function fetchMyCompany(userId: string): Promise<{ data: Company | null; error: string | null }> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return { data, error: error ? error.message : null };
}

export async function fetchMyProjects(userId: string): Promise<{ data: Project[]; error: string | null }> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: data ?? [], error: error ? error.message : null };
}

export async function fetchProjectUpdates(projectId: string): Promise<{ data: ProgressUpdate[]; error: string | null }> {
  const { data, error } = await supabase
    .from('progress_updates')
    .select('id, project_id, title, message, milestone, created_at')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
  return { data: data ?? [], error: error ? error.message : null };
}

// ---- Admin ----

export async function fetchAllCompanies(): Promise<{ data: Company[]; error: string | null }> {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data ?? [], error: error ? error.message : null };
}

export async function fetchAllProjects(): Promise<{ data: Project[]; error: string | null }> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data ?? [], error: error ? error.message : null };
}

export async function updateProject(
  projectId: string,
  patch: Partial<Pick<Project, 'status' | 'progress' | 'current_phase'>>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('projects')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', projectId);
  return { error: error ? error.message : null };
}

export async function updateCompanyStatus(
  companyId: string,
  status: Company['status']
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('companies').update({ status }).eq('id', companyId);
  return { error: error ? error.message : null };
}

export async function postProgressUpdate(input: {
  project_id: string;
  title: string;
  message: string;
  milestone: boolean;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from('progress_updates').insert(input);
  return { error: error ? error.message : null };
}

export async function fetchAllLeads(): Promise<{ data: LeadInsert[] & { id: string; created_at: string }[]; error: string | null }> {
  const { data, error } = await supabase
    .from('leads')
    .select('id, name, email, company, phone, service, message, status, created_at')
    .order('created_at', { ascending: false });
  return { data: data ?? [], error: error ? error.message : null };
}
