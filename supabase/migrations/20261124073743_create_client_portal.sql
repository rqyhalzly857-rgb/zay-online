/*
# Client portal: profiles, company intake, automation projects, progress updates

1. New Tables
- `profiles`: one row per registered user, auto-created on sign-up.
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text, not null, default '')
  - `role` (text, not null, default 'client') - 'client' or 'admin'. The FIRST user to register becomes 'admin' (site owner); everyone after is 'client'.
  - `created_at` (timestamp)
- `companies`: the detailed intake form businesses fill out (replaces the old contact form flow).
  - `id`, `user_id` (owner, defaults to authenticated user), `company_name`, `contact_name`, `email`, `phone`, `website`, `industry`, `monthly_leads`, `current_crm`, `services_needed`, `message`, `status` (new/contacted/onboarding/active), `created_at`
- `projects`: the automation engagement shown on the client dashboard.
  - `id`, `user_id` (owner), `company_id` (link to intake), `title`, `service`, `status` (planning/in_progress/testing/live), `progress` (0-100), `current_phase`, `created_at`, `updated_at`
  - Auto-created when a company intake is submitted (trigger).
- `progress_updates`: timeline entries admins post; clients see them on their dashboard.
  - `id`, `project_id`, `author_id`, `title`, `message`, `milestone` (boolean), `created_at`

2. New Functions & Triggers
- `is_admin()` SECURITY DEFINER helper: true when the caller's profile role is 'admin'.
- `handle_new_user()` trigger on auth.users: auto-creates the profile; first ever user becomes admin.
- `create_project_for_company()` trigger on companies: creates a starter project for each new intake.

3. Security (RLS)
- RLS enabled on all four tables.
- profiles: users read/update their own row (role column NOT updatable via grants); admins can read all profiles.
- companies: users insert/select their own; admins select all and can update (status pipeline).
- projects: users select their own; admins select/update/insert (only admins manage progress).
- progress_updates: project owner or admin can read; only admins can insert.
- leads: admins can now read submitted leads (was insert-only).
- All policies scoped TO authenticated (this app now requires sign-in for these tables). No anon grants on portal tables.
*/

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  contact_name text,
  email text,
  phone text,
  website text,
  industry text,
  monthly_leads text,
  current_crm text,
  services_needed text,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'onboarding', 'active')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  title text NOT NULL,
  service text,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'testing', 'live')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  current_phase text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS progress_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  author_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  title text NOT NULL,
  message text NOT NULL,
  milestone boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_companies_user ON companies(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_updates_project ON progress_updates(project_id);

-- Admin helper
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$;

REVOKE EXECUTE ON FUNCTION is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Auto-create profile on sign-up; first user becomes admin
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  admin_exists boolean;
BEGIN
  SELECT EXISTS (SELECT 1 FROM profiles WHERE role = 'admin') INTO admin_exists;
  INSERT INTO profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    CASE WHEN admin_exists THEN 'client' ELSE 'admin' END
  );
  RETURN new;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-create starter project for each new company intake
CREATE OR REPLACE FUNCTION create_project_for_company() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO projects (user_id, company_id, title, service, status, progress, current_phase)
  VALUES (
    new.user_id,
    new.id,
    'AI Automation Onboarding',
    COALESCE(NULLIF(new.services_needed, ''), 'Full Automation Suite'),
    'planning',
    0,
    'Awaiting kickoff'
  );
  RETURN new;
END $$;

DROP TRIGGER IF EXISTS on_company_created ON companies;
CREATE TRIGGER on_company_created
AFTER INSERT ON companies
FOR EACH ROW EXECUTE FUNCTION create_project_for_company();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_updates ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON profiles TO authenticated;
GRANT UPDATE (full_name) ON profiles TO authenticated;
GRANT SELECT, INSERT ON companies TO authenticated;
GRANT UPDATE ON companies TO authenticated;
GRANT SELECT, INSERT ON projects TO authenticated;
GRANT UPDATE ON projects TO authenticated;
GRANT SELECT, INSERT ON progress_updates TO authenticated;
GRANT SELECT ON leads TO authenticated;

DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;
CREATE POLICY "users_read_own_profile" ON profiles FOR SELECT
TO authenticated USING (auth.uid() = id OR is_admin());

DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
CREATE POLICY "users_update_own_profile" ON profiles FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "users_insert_own_company" ON companies;
CREATE POLICY "users_insert_own_company" ON companies FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_read_own_company" ON companies;
CREATE POLICY "users_read_own_company" ON companies FOR SELECT
TO authenticated USING (auth.uid() = user_id OR is_admin());

DROP POLICY IF EXISTS "admins_update_companies" ON companies;
CREATE POLICY "admins_update_companies" ON companies FOR UPDATE
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admins_insert_projects" ON projects;
CREATE POLICY "admins_insert_projects" ON projects FOR INSERT
TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "users_read_own_projects" ON projects;
CREATE POLICY "users_read_own_projects" ON projects FOR SELECT
TO authenticated USING (auth.uid() = user_id OR is_admin());

DROP POLICY IF EXISTS "admins_update_projects" ON projects;
CREATE POLICY "admins_update_projects" ON projects FOR UPDATE
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "owner_or_admin_read_updates" ON progress_updates;
CREATE POLICY "owner_or_admin_read_updates" ON progress_updates FOR SELECT
TO authenticated USING (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = project_id AND (p.user_id = auth.uid() OR is_admin())
  )
);

DROP POLICY IF EXISTS "admins_insert_updates" ON progress_updates;
CREATE POLICY "admins_insert_updates" ON progress_updates FOR INSERT
TO authenticated WITH CHECK (is_admin());

DROP POLICY IF EXISTS "admins_read_leads" ON leads;
CREATE POLICY "admins_read_leads" ON leads FOR SELECT
TO authenticated USING (is_admin());
