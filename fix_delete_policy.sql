-- Habilitar permisos de ELIMINACIÓN (DELETE) en la tabla payments
-- Esto faltaba en los scripts anteriores, por eso la eliminación fallaba silenciosamente.

CREATE POLICY "Enable delete for authenticated users" ON public.payments
FOR DELETE
TO authenticated
USING (true); 
-- Nota: En un entorno real, podrías restringir esto solo a admins:
-- USING (auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));
