-- Allow Admins to update ANY user profile (to set RUT, Unit, etc.)

-- 1. Drop existing update policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.users;

-- 2. Recreate "Users can update own profile" (Standard)
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 3. Create "Admins can update all profiles" (Admin Power)
-- Uses the secure is_admin() function we created earlier
CREATE POLICY "Admins can update all profiles" ON public.users
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. Ensure Admins can READ all profiles (if not already set)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.users;
CREATE POLICY "Admins can view all profiles" ON public.users
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 5. Ensure Users can READ their own profile (Standard)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);
