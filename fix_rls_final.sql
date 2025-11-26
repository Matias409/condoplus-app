-- 1. Create a secure function to check if a user is an admin
-- SECURITY DEFINER allows this function to run with the privileges of the creator (postgres),
-- bypassing RLS on the public.users table. This fixes the issue where RLS blocked the check.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Apply the FINAL, SECURE policies using this function

-- Drop the debug policy
DROP POLICY IF EXISTS "Debug: Allow all updates" ON public.incidents;
DROP POLICY IF EXISTS "Admins can update incidents" ON public.incidents;
DROP POLICY IF EXISTS "Admins can view all incidents" ON public.incidents;

-- Recreate Admin View Policy
CREATE POLICY "Admins can view all incidents" ON public.incidents
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Recreate Admin Update Policy
CREATE POLICY "Admins can update incidents" ON public.incidents
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Ensure Resident policies are still there (optional, just to be safe)
-- (They shouldn't have been touched by the debug script, but good to verify)
-- CREATE POLICY "Residents can view own incidents" ... (Skipping to avoid duplicates if they exist)
