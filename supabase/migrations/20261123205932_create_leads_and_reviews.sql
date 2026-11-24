/*
# Create leads and reviews tables

1. New Tables
- `leads`: prospect inquiries submitted through the website contact form.
  - `id` (uuid, primary key)
  - `name` (text, not null) - full name of the prospect
  - `email` (text, not null) - contact email
  - `company` (text, nullable) - business name
  - `phone` (text, nullable) - contact phone number
  - `service` (text, nullable) - which service they are interested in
  - `message` (text, nullable) - details about their business needs
  - `status` (text, not null, default 'new') - pipeline status: new / contacted / qualified / closed
  - `created_at` (timestamp, default now)
- `reviews`: client testimonials submitted through the reviews page.
  - `id` (uuid, primary key)
  - `name` (text, not null) - reviewer name
  - `role` (text, nullable) - job title / company
  - `rating` (integer, not null, default 5) - 1 to 5 stars
  - `content` (text, not null) - the review text
  - `approved` (boolean, not null, default false) - moderation flag; only approved reviews show publicly
  - `created_at` (timestamp, default now)

2. Security
- Enable RLS on both tables.
- Leads: anyone can submit (anon insert), nothing is readable publicly. Grant INSERT only to anon + authenticated.
- Reviews: anyone can submit (anon insert), only `approved = true` rows are publicly readable.
- Policies are scoped TO anon, authenticated because this site has no sign-in screen.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  content text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON leads TO anon, authenticated;
GRANT SELECT, INSERT ON reviews TO anon, authenticated;

DROP POLICY IF EXISTS "anyone_can_submit_lead" ON leads;
CREATE POLICY "anyone_can_submit_lead"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anyone_can_submit_review" ON reviews;
CREATE POLICY "anyone_can_submit_review"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anyone_can_read_approved_reviews" ON reviews;
CREATE POLICY "anyone_can_read_approved_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (approved = true);
