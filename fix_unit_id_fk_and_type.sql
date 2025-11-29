-- Fix unit_id column type by removing conflicting Foreign Key
-- The error "foreign key constraint users_unit_id_fkey cannot be implemented" 
-- means unit_id is linked to another table (likely 'units') that expects UUIDs.
-- Since we want to use free text like "A-101", we must remove this strict link.

-- 1. Drop the Foreign Key constraint
ALTER TABLE public.users 
DROP CONSTRAINT IF EXISTS users_unit_id_fkey;

-- 2. Now we can safely change the type to TEXT
ALTER TABLE public.users 
ALTER COLUMN unit_id TYPE TEXT USING unit_id::text;

-- 3. Drop default value if any
ALTER TABLE public.users 
ALTER COLUMN unit_id DROP DEFAULT;

COMMENT ON COLUMN public.users.unit_id IS 'Apartment unit identifier (e.g., A-402). FK removed to allow free text.';
