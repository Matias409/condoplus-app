-- Extend public.users table with resident details
-- These columns match the fields used in the Residents Directory UI

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS unit_id TEXT, -- e.g. "A-402"
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'Propietario', -- 'Propietario', 'Arrendatario'
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Activo'; -- 'Activo', 'Moroso', 'Inactivo'

-- Add comment for clarity
COMMENT ON COLUMN public.users.unit_id IS 'Apartment unit identifier (e.g., A-402)';
