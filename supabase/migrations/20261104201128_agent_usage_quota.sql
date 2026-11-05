-- Cuota de uso de la IA por usuario. Los límites viven aquí y no se reciben por
-- parámetro, para que quien llama a la función no pueda cambiarlos.

CREATE TABLE IF NOT EXISTS public.agent_usage (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    bucket_kind text NOT NULL CHECK (bucket_kind IN ('minute', 'day')),
    bucket_start timestamp with time zone NOT NULL,
    request_count integer NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, bucket_kind, bucket_start)
);

-- Sin políticas ni permisos: solo se accede mediante consume_agent_quota().
ALTER TABLE public.agent_usage ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.agent_usage FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.consume_agent_quota()
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = ''
    AS $$
DECLARE
    v_user_id uuid := auth.uid();
    v_max_per_minute constant integer := 10;
    v_max_per_day constant integer := 100;
BEGIN
    IF v_user_id IS NULL THEN
        RETURN false;
    END IF;

    DELETE FROM public.agent_usage
    WHERE user_id = v_user_id
      AND bucket_start < now() - interval '2 days';

    -- El UPDATE condicional evita superar el límite con peticiones simultáneas.
    INSERT INTO public.agent_usage AS usage_row (user_id, bucket_kind, bucket_start)
    VALUES (v_user_id, 'minute', date_trunc('minute', now()))
    ON CONFLICT (user_id, bucket_kind, bucket_start) DO UPDATE
        SET request_count = usage_row.request_count + 1
        WHERE usage_row.request_count < v_max_per_minute;

    IF NOT FOUND THEN
        RETURN false;
    END IF;

    INSERT INTO public.agent_usage AS usage_row (user_id, bucket_kind, bucket_start)
    VALUES (v_user_id, 'day', date_trunc('day', now()))
    ON CONFLICT (user_id, bucket_kind, bucket_start) DO UPDATE
        SET request_count = usage_row.request_count + 1
        WHERE usage_row.request_count < v_max_per_day;

    RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_agent_quota() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_agent_quota() TO authenticated;
