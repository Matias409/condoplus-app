-- Insertar el perfil del residente faltante en public.users
-- Esto es necesario para que el sistema pueda asignarle pagos y él pueda verlos.

INSERT INTO public.users (email, full_name, role, is_active)
VALUES (
    'carlos.ruiz@gmail.com', -- El email con el que haces login
    'Carlos Ruiz',           -- Nombre simulado
    'resident',              -- Rol crítico para que funcione el módulo
    true
)
ON CONFLICT (email) DO NOTHING; -- Si ya existe, no hace nada

-- Verificación opcional:
SELECT * FROM public.users WHERE email = 'carlos.ruiz@gmail.com';
