-- SYNC ADMIN ID SCRIPT
-- This script fixes the mismatch between the Auth User ID and the Public User ID.
-- This mismatch is why RLS fails even if the role is 'admin'.

DO $$
DECLARE
    real_auth_id UUID;
    current_public_id UUID;
BEGIN
    -- 1. Get the REAL ID from Supabase Auth (auth.users)
    SELECT id INTO real_auth_id 
    FROM auth.users 
    WHERE email = 'admin@condoplus.com';

    -- 2. Get the CURRENT ID from your Public Profile (public.users)
    SELECT id INTO current_public_id 
    FROM public.users 
    WHERE email = 'admin@condoplus.com';

    RAISE NOTICE 'Real Auth ID: %', real_auth_id;
    RAISE NOTICE 'Current Public ID: %', current_public_id;

    -- 3. Check if they are different
    IF real_auth_id IS NOT NULL AND current_public_id IS DISTINCT FROM real_auth_id THEN
        
        -- 4. Update the public.users table to match the real Auth ID
        -- We use a direct UPDATE. If this fails due to Foreign Key constraints, 
        -- it means other tables (like payments) are pointing to the WRONG id.
        -- In that case, we update them first.
        
        -- Attempt to update referencing tables (just in case they point to public.users)
        -- (If they point to auth.users, this part is irrelevant but harmless if no match)
        -- UPDATE public.payments SET user_id = real_auth_id WHERE user_id = current_public_id; 
        
        -- Update the profile
        UPDATE public.users 
        SET id = real_auth_id 
        WHERE email = 'admin@condoplus.com';
        
        RAISE NOTICE '✅ SUCCESS: Fixed ID mismatch. public.users now matches auth.users.';
    
    ELSIF real_auth_id IS NULL THEN
        RAISE NOTICE '❌ ERROR: Could not find user admin@condoplus.com in auth.users. Did you sign up?';
    ELSE
        RAISE NOTICE '✅ INFO: IDs already match. No changes needed.';
    END IF;
END $$;
