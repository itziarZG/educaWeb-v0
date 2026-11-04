--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$BEGIN
  INSERT INTO public.clients (  -- <--- AQUÍ PONEMOS TU TABLA 'clients'
    id, 
    email,
    children, 
    full_name,  -- Asegúrate de que esta columna existe en 'clients'
    credits     -- Asegúrate de que esta columna existe en 'clients'
  )
  VALUES (
    new.id,
    new.email,
     '[]'::jsonb,
    -- Google devuelve el nombre en 'full_name' o 'name' dentro de los metadatos
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    3 -- Los 3 créditos de regalo
  );
  RETURN new;
END;$$;


--
-- Name: rls_auto_enable(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.rls_auto_enable() RETURNS event_trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: children; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.children (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    age integer,
    grade text,
    interests text,
    observations text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    system_prompt text,
    region text
);


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id uuid NOT NULL,
    full_name text,
    email text,
    children jsonb DEFAULT '[]'::jsonb,
    credits integer DEFAULT 3,
    CONSTRAINT credits_non_negative CHECK ((credits >= 0))
);


--
-- Name: worksheet_feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.worksheet_feedback (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    worksheet_id uuid NOT NULL,
    user_id uuid NOT NULL,
    rating integer NOT NULL,
    comments text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT worksheet_feedback_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


--
-- Name: worksheets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.worksheets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    child_id uuid NOT NULL,
    topic character varying(255),
    html_content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT worksheets_check_content CHECK ((html_content <> ''::text))
);


--
-- Name: children hijos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT hijos_pkey PRIMARY KEY (id);


--
-- Name: worksheet_feedback one_feedback_per_worksheet; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_feedback
    ADD CONSTRAINT one_feedback_per_worksheet UNIQUE (worksheet_id);


--
-- Name: clients perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id);


--
-- Name: worksheet_feedback worksheet_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_feedback
    ADD CONSTRAINT worksheet_feedback_pkey PRIMARY KEY (id);


--
-- Name: worksheets worksheets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheets
    ADD CONSTRAINT worksheets_pkey PRIMARY KEY (id);


--
-- Name: idx_worksheet_feedback_rating; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheet_feedback_rating ON public.worksheet_feedback USING btree (rating);


--
-- Name: idx_worksheet_feedback_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheet_feedback_user_id ON public.worksheet_feedback USING btree (user_id);


--
-- Name: idx_worksheet_feedback_worksheet_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheet_feedback_worksheet_id ON public.worksheet_feedback USING btree (worksheet_id);


--
-- Name: idx_worksheets_child_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheets_child_id ON public.worksheets USING btree (child_id);


--
-- Name: idx_worksheets_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheets_created_at ON public.worksheets USING btree (created_at DESC);


--
-- Name: idx_worksheets_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_worksheets_user_id ON public.worksheets USING btree (user_id);


--
-- Name: children children_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.clients(id) ON DELETE CASCADE;


--
-- Name: clients perfiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT perfiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);


--
-- Name: worksheet_feedback worksheet_feedback_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_feedback
    ADD CONSTRAINT worksheet_feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: worksheet_feedback worksheet_feedback_worksheet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheet_feedback
    ADD CONSTRAINT worksheet_feedback_worksheet_id_fkey FOREIGN KEY (worksheet_id) REFERENCES public.worksheets(id) ON DELETE CASCADE;


--
-- Name: worksheets worksheets_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheets
    ADD CONSTRAINT worksheets_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id) ON DELETE CASCADE;


--
-- Name: worksheets worksheets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.worksheets
    ADD CONSTRAINT worksheets_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: clients Los usuarios editan su nombre; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios editan su nombre" ON public.clients FOR UPDATE USING ((auth.uid() = id));


--
-- Name: children Los usuarios pueden gestionar sus propios hijos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios pueden gestionar sus propios hijos" ON public.children USING ((auth.uid() = user_id));


--
-- Name: clients Los usuarios ven su propio perfil; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Los usuarios ven su propio perfil" ON public.clients FOR SELECT USING ((auth.uid() = id));


--
-- Name: worksheet_feedback Users can create own feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create own feedback" ON public.worksheet_feedback FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: worksheets Users can create own worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create own worksheets" ON public.worksheets FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: worksheet_feedback Users can view own feedback; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own feedback" ON public.worksheet_feedback FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: worksheets Users can view own worksheets; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own worksheets" ON public.worksheets FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: children; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

--
-- Name: clients; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

--
-- Name: worksheet_feedback; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.worksheet_feedback ENABLE ROW LEVEL SECURITY;

--
-- Name: worksheets; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.worksheets ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




--
-- Name: ensure_rls; Type: EVENT TRIGGER
-- Activa RLS automáticamente en tablas nuevas de public.
-- No lo incluye pg_dump --schema=public; se añade a mano y es idempotente.
--

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_event_trigger WHERE evtname = 'ensure_rls') THEN
    CREATE EVENT TRIGGER ensure_rls
      ON ddl_command_end
      WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      EXECUTE FUNCTION public.rls_auto_enable();
  END IF;
END
$$;


--
-- Name: on_auth_user_created; Type: TRIGGER
-- Crea la fila en public.clients al registrarse un usuario nuevo.
-- Vive en auth.users, por eso no lo incluye pg_dump --schema=public.
--

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
