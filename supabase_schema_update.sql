-- 1. Agregar columnas faltantes a la tabla 'payments'
ALTER TABLE public.payments
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN due_date date NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN period varchar(50) NOT NULL DEFAULT 'N/A',
ADD COLUMN paid_at timestamp with time zone NULL,
ADD COLUMN description text NULL;

-- 2. Crear índices para optimizar búsquedas
CREATE INDEX idx_payments_user ON public.payments(user_id);
CREATE INDEX idx_payments_due_date ON public.payments(due_date);

-- 3. (Opcional) Si necesitas migrar datos existentes o limpiar la tabla antes
-- TRUNCATE TABLE public.payments;
