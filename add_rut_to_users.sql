-- Add RUT column to public.users table
-- We make it UNIQUE so two residents can't have the same RUT
-- We use TEXT type to allow formats like "12.345.678-9" or "12345678-9"

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS rut TEXT;

-- Create a unique index for RUT to ensure no duplicates (and faster search)
-- We use a unique index instead of a constraint for better performance and flexibility
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_rut ON public.users(rut);

-- Optional: Add a comment to the column
COMMENT ON COLUMN public.users.rut IS 'Rol Único Tributario (Chilean ID) for resident identification via WhatsApp/n8n';
