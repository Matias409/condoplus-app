-- 1. Habilitar RLS en la tabla users (por seguridad)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Crear política para permitir lectura a usuarios autenticados
-- Nota: Usamos IF NOT EXISTS para evitar errores si ya existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' 
        AND policyname = 'Enable read access for authenticated users'
    ) THEN
        CREATE POLICY "Enable read access for authenticated users" ON public.users
        FOR SELECT
        TO authenticated
        USING (true);
    END IF;
END
$$;

-- 3. Verificar datos existentes (para tu referencia en el editor SQL)
SELECT id, email, role, full_name FROM public.users WHERE role = 'resident';
