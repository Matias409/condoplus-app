-- 1. List all users to verify who is who
SELECT id, email, role, created_at FROM public.users;

-- 2. INSTRUCTIONS:
-- Look for the email address you are using to log in to the ADMIN portal.
-- Check the 'role' column. It likely says 'resident' or is null.

-- 3. UPDATE ROLE
-- Replace 'admin@condoplus.com' with YOUR actual email address.
-- Run this line to make yourself an admin.

-- UPDATE public.users SET role = 'admin' WHERE email = 'TU_EMAIL_AQUI';

-- Example:
-- UPDATE public.users SET role = 'admin' WHERE email = 'carlos@ejemplo.com';
