-- =========================================================================
-- ESTIQUE DESIGNS PORTFOLIO DATABASE MIGRATION
-- Table: bookings
-- =========================================================================

-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  phone_number TEXT, -- Optional phone number field
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT,
  ip_address TEXT NOT NULL,
  status TEXT DEFAULT 'New' NOT NULL,
  CONSTRAINT status_check CHECK (status IN ('New', 'Pending', 'Contacted', 'In Progress', 'Completed', 'Closed'))
);

-- 2. Create performance and sorting indexes
CREATE INDEX IF NOT EXISTS bookings_client_email_idx ON public.bookings(client_email);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);

-- 3. Setup PostgreSQL trigger to automatically update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it already exists to prevent duplicate trigger errors
DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Configure Row Level Security (RLS)
-- We enable RLS and do NOT define public SELECT/UPDATE/DELETE policies, 
-- ensuring only the backend (using service_role admin credentials) can write or access bookings.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Explicit policy allowing service_role role full access (bypass default deny)
CREATE POLICY "Allow service role full access" ON public.bookings
  FOR ALL TO service_role USING (true) WITH CHECK (true);
