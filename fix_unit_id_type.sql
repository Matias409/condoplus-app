-- Fix unit_id column type
-- The error "invalid input syntax for type uuid" confirms unit_id is currently a UUID.
-- We need it to be TEXT to store values like "A-101".

-- 1. Drop any dependent constraints if necessary (usually not needed for simple type change unless FK)
-- If unit_id is a Foreign Key to another table, we might need to drop the FK first.
-- Assuming it's a simple column for now based on previous context.

ALTER TABLE public.users 
ALTER COLUMN unit_id TYPE TEXT USING unit_id::text;

-- If there was a default value that was a UUID, drop it or update it
ALTER TABLE public.users 
ALTER COLUMN unit_id DROP DEFAULT;

COMMENT ON COLUMN public.users.unit_id IS 'Apartment unit identifier (e.g., A-402). Changed to TEXT to support alphanumeric values.';
