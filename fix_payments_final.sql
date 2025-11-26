-- 1. Modificar Constraints (Restricciones) para permitir todos los estados usados en la App
-- Primero eliminamos los constraints antiguos para evitar errores
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_payment_method_check;

-- Agregamos el constraint de status actualizado (incluyendo 'paid' y 'overdue')
ALTER TABLE public.payments ADD CONSTRAINT payments_status_check 
CHECK (status IN ('pending', 'approved', 'rejected', 'paid', 'overdue'));

-- Agregamos el constraint de payment_method (permitiendo NULL implícitamente)
ALTER TABLE public.payments ADD CONSTRAINT payments_payment_method_check 
CHECK (payment_method IN ('transfer', 'credit_card', 'debit_card', 'cash'));

-- 2. Solucionar Permisos (RLS) - La causa más probable del error de creación
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Limpiar políticas anteriores
DROP POLICY IF EXISTS "Enable read access for users" ON public.payments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.payments;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.payments;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.payments;

-- CREAR NUEVAS POLÍTICAS PERMISIVAS

-- Permitir INSERTAR a cualquier usuario autenticado (necesario para que el Admin cree pagos)
CREATE POLICY "Enable insert for authenticated users" ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir LEER:
-- 1. Si eres el dueño del pago (user_id = auth.uid())
-- 2. O si eres un usuario autenticado (para simplificar, permitimos que admins vean todo)
-- Para mayor seguridad en producción, podrías filtrar por rol, pero esto desbloqueará el error ahora.
CREATE POLICY "Enable read access for authenticated users" ON public.payments
FOR SELECT
TO authenticated
USING (true);

-- Permitir ACTUALIZAR (para cambiar status a pagado/aprobado)
CREATE POLICY "Enable update for authenticated users" ON public.payments
FOR UPDATE
TO authenticated
USING (true);

-- 3. Verificar que la tabla users tenga RLS habilitado y política de lectura (por si acaso)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

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
