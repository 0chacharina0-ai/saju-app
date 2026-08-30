/*
# Cosmic Saju - Users, Payments, and Admin Dashboard Schema

1. New Tables
- `saju_records`: Stores each user's saju calculation input and result
  - id (uuid, PK)
  - name (text)
  - birth_year, birth_month, birth_day (int)
  - birth_hour (int, -1 if unknown)
  - calendar (text: 'solar' | 'lunar')
  - gender (text: 'male' | 'female')
  - city (text)
  - city_offset_min (int, longitude-based time correction in minutes)
  - biorhythm_answers (int[], 7 answers from the orbit questions)
  - time_correction_recommended (text: 'local' | 'standard')
  - concern_area (text, nullable)
  - love_status (text, nullable)
  - free_question (text, nullable)
  - saju_result (jsonb, full calculation result)
  - created_at (timestamptz)

- `payments`: Stores payment records for the cosmic report
  - id (uuid, PK)
  - saju_record_id (uuid, FK to saju_records)
  - amount (int, in won)
  - original_amount (int, original price before discount)
  - status (text: 'pending' | 'completed' | 'failed' | 'refunded')
  - payment_method (text, nullable)
  - transaction_id (text, nullable)
  - created_at (timestamptz)
  - completed_at (timestamptz, nullable)

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD on saju_records (no sign-in, single-tenant).
- Allow anon + authenticated CRUD on payments.
- All data is intentionally accessible since there's no auth flow.

3. Indexes
- Index on saju_records.created_at for admin dashboard queries.
- Index on payments.status for revenue filtering.
- Index on payments.saju_record_id for join queries.
*/

CREATE TABLE IF NOT EXISTS saju_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '무명',
  birth_year int NOT NULL,
  birth_month int NOT NULL,
  birth_day int NOT NULL,
  birth_hour int NOT NULL DEFAULT -1,
  calendar text NOT NULL DEFAULT 'solar',
  gender text NOT NULL DEFAULT 'male',
  city text NOT NULL DEFAULT '서울',
  city_offset_min int NOT NULL DEFAULT 0,
  biorhythm_answers int[] NOT NULL DEFAULT '{}',
  time_correction_recommended text NOT NULL DEFAULT 'standard',
  concern_area text,
  love_status text,
  free_question text,
  saju_result jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE saju_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_saju_records" ON saju_records;
CREATE POLICY "anon_select_saju_records" ON saju_records FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_saju_records" ON saju_records;
CREATE POLICY "anon_insert_saju_records" ON saju_records FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_saju_records" ON saju_records;
CREATE POLICY "anon_update_saju_records" ON saju_records FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_saju_records" ON saju_records;
CREATE POLICY "anon_delete_saju_records" ON saju_records FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_saju_records_created_at ON saju_records (created_at DESC);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  saju_record_id uuid REFERENCES saju_records(id) ON DELETE CASCADE,
  amount int NOT NULL DEFAULT 24900,
  original_amount int NOT NULL DEFAULT 49800,
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  transaction_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_payments" ON payments;
CREATE POLICY "anon_select_payments" ON payments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_payments" ON payments;
CREATE POLICY "anon_insert_payments" ON payments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_payments" ON payments;
CREATE POLICY "anon_update_payments" ON payments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_payments" ON payments;
CREATE POLICY "anon_delete_payments" ON payments FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_payments_status ON payments (status);
CREATE INDEX IF NOT EXISTS idx_payments_saju_record_id ON payments (saju_record_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments (created_at DESC);
