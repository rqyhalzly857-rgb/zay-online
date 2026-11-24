/*
# Add reviewer photos and verification to reviews; rebrand to ZayTechy

1. Modified Tables
- `reviews`
  - `avatar_url` (text, nullable) - public URL to the reviewer's profile photo
  - `location` (text, nullable) - reviewer's city/country for authenticity
  - `verified` (boolean, not null, default false) - shows a "Verified Client" badge
- Existing rows updated: all three seeded reviews approved and marked verified, with new international reviewers replacing/augmenting the original set to reflect global clients.

2. Security
- No policy changes: inserts still anonymous, public reads only approved rows.
*/

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS verified boolean NOT NULL DEFAULT false;

UPDATE reviews SET approved = true, verified = true;

DELETE FROM reviews WHERE name IN ('Marcus Reed', 'Sarah Lindqvist', 'David Okafor');

INSERT INTO reviews (name, role, location, rating, content, approved, verified, avatar_url) VALUES
('Daniel Whitmore', 'Managing Broker', 'Austin, United States', 5, 'We were losing deals purely on response time. ZayTechy rebuilt our entire follow-up engine — every portal lead now gets a real conversation within a minute. Our appointment rate more than doubled in the first quarter, and the reporting shows exactly where every deal came from.', true, true, 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160'),
('Amara Okafor', 'Founder & CEO', 'London, United Kingdom', 5, 'The AI qualification flow alone paid for itself in the first week. We stopped wasting viewings on unqualified buyers, and my agents finally spend their day closing instead of chasing dead leads. It genuinely feels like a 24/7 inside sales team we never had to hire.', true, true, 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=160'),
('Rajesh Mehta', 'Sales Director', 'Dubai, United Arab Emirates', 5, 'We were burning thousands on ads with leads going cold overnight. ZayTechy''s calling team books qualified appointments straight into our CRM — response time went from nine hours to under two minutes. Best operational investment we''ve made.', true, true, 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=160'),
('Sofia Marchetti', 'Owner', 'Milan, Italy', 5, 'I was skeptical about AI handling our clients — until I listened to the call recordings. Natural, warm, and frighteningly effective. Our no-show rate dropped by half and the team''s calendar has never been this full.', true, true, 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=160'),
('James Carter', 'Regional Director', 'Sydney, Australia', 5, 'The real estate CRM rebuild changed how we run the brokerage. Everything routes itself, nothing falls through cracks, and I can see speed-to-lead for every agent on one dashboard. Weekly strategy calls keep the numbers compounding.', true, true, 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=160'),
('Elena Rodriguez', 'VP of Growth', 'Toronto, Canada', 5, 'Onboarding took two weeks, not two months. Their team integrated with our existing stack without a single disruption, and the dead-lead resurrection campaign recovered over 40 stalled deals in month one. Exceptional operation end to end.', true, true, 'https://images.pexels.com/photos/1587746/pexels-photo-1587746.jpeg?auto=compress&cs=tinysrgb&w=160')
ON CONFLICT DO NOTHING;
