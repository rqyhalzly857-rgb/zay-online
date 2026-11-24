import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadInsert {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export async function submitLead(lead: LeadInsert): Promise<{ error: string | null }> {
  const { error } = await supabase.from('leads').insert(lead);
  return { error: error ? error.message : null };
}

export interface Review {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  content: string;
  created_at: string;
  avatar_url?: string | null;
  location?: string | null;
  verified?: boolean;
}

export async function fetchApprovedReviews(): Promise<{ data: Review[]; error: string | null }> {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, role, rating, content, created_at, avatar_url, location, verified')
    .eq('approved', true)
    .order('created_at', { ascending: false });
  if (error) return { data: [], error: error.message };
  return { data: data ?? [], error: null };
}

export async function submitReview(input: {
  name: string;
  role?: string;
  rating: number;
  content: string;
}): Promise<{ error: string | null }> {
  const { error } = await supabase.from('reviews').insert(input);
  return { error: error ? error.message : null };
}
