-- TEMPORARY DEBUGGING POLICY
-- Allow ANY authenticated user to update incidents (bypassing the admin role check)
-- This helps us confirm if the issue is specifically with the "admin" role check logic.

DROP POLICY IF EXISTS "Admins can update incidents" ON public.incidents;

CREATE POLICY "Debug: Allow all updates" ON public.incidents
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Also ensure RLS on public.users isn't blocking the read (if we were using the old policy)
-- But with the policy above, we aren't even reading public.users, so this isolates the issue.
