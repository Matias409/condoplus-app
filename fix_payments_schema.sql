-- 1. Asegurar que existan todas las columnas necesarias en 'payments'
ALTER TABLE public.payments 
ADD COLUMN IF NOT EXISTS status varchar(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method varchar(50);

-- 2. Habilitar RLS en la tabla payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas de seguridad (RLS)
-- Eliminar políticas antiguas para evitar conflictos
DROP POLICY IF EXISTS "Enable read access for all users" ON public.payments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.payments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.payments;

-- Política de LECTURA:
-- Los administradores pueden ver todos los pagos.
-- Los residentes solo pueden ver SUS propios pagos (user_id).
CREATE POLICY "Enable read access for users" ON public.payments
FOR SELECT
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Política de INSERCIÓN:
-- Permitir a usuarios autenticados (idealmente solo admins) crear pagos.
CREATE POLICY "Enable insert for authenticated users" ON public.payments
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Política de ACTUALIZACIÓN:
-- Permitir actualizar (para marcar como pagado, etc)
CREATE POLICY "Enable update for authenticated users" ON public.payments
FOR UPDATE
USING (auth.role() = 'authenticated');

-- 4. Verificar estructura final
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payments';
