-- 1. Create table if it doesn't exist (basic structure)
CREATE TABLE IF NOT EXISTS public.incidents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add columns safely (idempotent) - This fixes the "column does not exist" error
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS ticket_number TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Media';
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Abierta';
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS admin_comment TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS photos TEXT[];

-- 3. Enable RLS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies to avoid conflicts when recreating
DROP POLICY IF EXISTS "Residents can view own incidents" ON public.incidents;
DROP POLICY IF EXISTS "Residents can create incidents" ON public.incidents;
DROP POLICY IF EXISTS "Admins can view all incidents" ON public.incidents;
DROP POLICY IF EXISTS "Admins can update incidents" ON public.incidents;

-- 5. Recreate Policies

-- Residents can view their own incidents
CREATE POLICY "Residents can view own incidents" ON public.incidents
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Residents can insert their own incidents
CREATE POLICY "Residents can create incidents" ON public.incidents
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all incidents
CREATE POLICY "Admins can view all incidents" ON public.incidents
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admins can update incidents
CREATE POLICY "Admins can update incidents" ON public.incidents
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 6. Create indexes (IF NOT EXISTS is not standard for CREATE INDEX in all postgres versions, but usually safe to retry or ignore error)
-- Using DO block for safer index creation
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_incidents_user_id') THEN
        CREATE INDEX idx_incidents_user_id ON public.incidents(user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_incidents_status') THEN
        CREATE INDEX idx_incidents_status ON public.incidents(status);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_incidents_priority') THEN
        CREATE INDEX idx_incidents_priority ON public.incidents(priority);
    END IF;
END $$;
