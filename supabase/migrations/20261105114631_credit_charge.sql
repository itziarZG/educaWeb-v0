-- Los créditos solo se modifican desde funciones de base de datos.
-- La app no edita `clients` desde el cliente, así que se retira el permiso.

DROP POLICY IF EXISTS "Los usuarios editan su nombre" ON public.clients;
REVOKE UPDATE ON TABLE public.clients FROM PUBLIC, anon, authenticated;

-- Descuenta un crédito en una sola operación, solo si queda saldo. Con varias
-- peticiones simultáneas no se puede gastar el mismo crédito dos veces.
CREATE OR REPLACE FUNCTION public.consume_credit()
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = ''
    AS $$
BEGIN
    UPDATE public.clients
    SET credits = credits - 1
    WHERE id = auth.uid()
      AND credits >= 1;

    RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_credit() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_credit() TO authenticated;
