-- ==========================================================================
-- PRASHANT PORTFOLIO - SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- Use this script in your Supabase SQL Editor to set up backend database tables
-- and security policies for secure admin data management.
-- ==========================================================================

-- 1. Create Portfolio Configuration Table
CREATE TABLE IF NOT EXISTS public.portfolio_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_photo_url TEXT DEFAULT 'assets/profile.jpg',
    recruiter_intro TEXT,
    availability_status TEXT DEFAULT 'Available for AI/ML opportunities',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Case Study Overrides Table
CREATE TABLE IF NOT EXISTS public.case_study_overrides (
    project_id INT PRIMARY KEY,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    overview TEXT,
    problem TEXT,
    role TEXT,
    live_url TEXT,
    github_url TEXT,
    pdf_url TEXT,
    is_demo_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Engineering Challenges Table
CREATE TABLE IF NOT EXISTS public.engineering_challenges (
    id INT PRIMARY KEY,
    title TEXT NOT NULL,
    project TEXT,
    category TEXT,
    problem TEXT,
    debugging TEXT,
    solution TEXT,
    learned TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures public users have read-only access, and only authenticated admins
-- can update or modify portfolio data.
-- ==========================================================================

ALTER TABLE public.portfolio_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_study_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineering_challenges ENABLE ROW LEVEL SECURITY;

-- Read-Only Policy for Public / Anonymous Users
CREATE POLICY "Public Read-Only Access for Portfolio Config"
    ON public.portfolio_config FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public Read-Only Access for Case Studies"
    ON public.case_study_overrides FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public Read-Only Access for Challenges"
    ON public.engineering_challenges FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated Admin Write Access Policy
CREATE POLICY "Admin Write Access for Portfolio Config"
    ON public.portfolio_config FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin Write Access for Case Studies"
    ON public.case_study_overrides FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin Write Access for Challenges"
    ON public.engineering_challenges FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ==========================================================================
-- STORAGE BUCKET SETUP FOR PROFILE PHOTOS
-- Bucket Name: portfolio-assets
-- ==========================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Read Access
CREATE POLICY "Public Storage Read Access"
    ON storage.objects FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'portfolio-assets');

-- Authenticated Admin Storage Upload Access
CREATE POLICY "Admin Storage Upload Access"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-assets');
