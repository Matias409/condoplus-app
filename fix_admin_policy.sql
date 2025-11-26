-- Drop the existing update policy
DROP POLICY IF EXISTS "Admins can update incidents" ON public.incidents;

-- Recreate the policy with a simpler check (or verify the role logic)
-- Ensure that the user is an admin.
CREATE POLICY "Admins can update incidents" ON public.incidents
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Also, let's verify if the user actually has the 'admin' role.
-- If you are testing with the same user for both resident and admin, that might be the issue.
-- You should have two different users, or one user with 'admin' role (who can also see resident view if logic permits).

-- Grant update permission explicitly just in case
GRANT UPDATE ON public.incidents TO authenticated;
