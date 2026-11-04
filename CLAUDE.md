# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Reglas obligatorias

Lee primero [AGENTS.md](AGENTS.md): exige rama nueva desde `develop` antes de tocar archivos, PR contra `develop` en vez de push directo a `main` ni a `develop`, verificar cambios visuales en el navegador integrado, y commits/PRs/comentarios en español (el código en inglés).

## Comandos

Gestor de paquetes: **pnpm** (hay `pnpm-lock.yaml`). Versión de Node en `.nvmrc`.

```bash
pnpm dev            # servidor de desarrollo en http://localhost:3000
pnpm build          # build de producción
pnpm lint           # ESLint (flat config en eslint.config.mjs)
pnpm tscheck        # tsc --noEmit
pnpm format:check   # Prettier (usa pnpm format para escribir)
pnpm test           # Vitest, una sola pasada
pnpm test:watch     # Vitest en modo watch
pnpm test:e2e       # Playwright (levanta `pnpm dev` solo si no hay servidor en :3000)
```

Un solo test:

```bash
pnpm vitest run __tests__/components/Button.test.tsx
pnpm vitest run -t "nombre del test"          # filtrar por nombre
pnpm playwright test e2e/login.spec.ts        # un spec E2E
```

Los tests unitarios viven en `__tests__/` (patrón `**/*.test.{ts,tsx}`, entorno jsdom, setup en `vitest.setup.ts`). Los E2E en `e2e/` están excluidos de Vitest.

Pre-commit (`.pre-commit-config.yaml`) ejecuta `tscheck`, `lint` y `format:check`, y valida el mensaje de commit con formato Conventional Commits (`feat:`, `fix:`, `docs:`...). El test unitario está comentado en el hook.

## Configuración de entorno

Variables en `.env` / `.env.local` (ambos ignorados por git). Las que usa el código:

- `NEXT_PUBLIC_SUPABASE_URL`, y la clave anónima de Supabase. Ojo: `utils/supabase/config.ts` lee `NEXT_PUBLIC_SUPABASE_ANON_KEY`, pero el `.env` de ejemplo usa `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`. Hay que alinear los dos nombres.
- `AI_PROVIDER` (`openai` por defecto, `gemini`, `deepseek`, `ollama`), `AI_API_KEY`, `AI_MODEL`, `AI_MODEL_VISUALIZATION` (modelo más barato para maquetación HTML).
- `DEBUG_AGENT=true` activa logs de mensajes enviados a la IA.
- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEEPSEEK_API_URL`.

`next.config.mjs` tiene `typescript.ignoreBuildErrors: true`: `pnpm build` no falla por errores de tipos. Usa `pnpm tscheck` para comprobarlos.

## Despliegues

- `main` es producción. Solo recibe merges desde `develop` ya probados en stage.
- `develop` es stage y rama de integración. Los PR se abren contra ella.
- Vercel despliega cada rama automáticamente: `main` está configurada como _Production Branch_ y el resto genera previews.
- Las variables de entorno (Supabase, proveedores de IA, `NEXT_PUBLIC_SITE_URL`) se configuran en Vercel por entorno. `.env.local` no se usa en Vercel.
- **Aviso:** stage y producción comparten hoy el proyecto de Supabase. Cualquier prueba en `develop` escribe en los datos reales. Hasta que se separen, no hagas pruebas destructivas en stage.

### Cambios en la base de datos (migraciones)

El esquema de Supabase se versiona en `supabase/migrations/`. Stage y producción son proyectos de Supabase distintos y los cambios de esquema se aplican a los dos desde el repo, **siempre primero en stage**. No hace falta Docker para estos comandos.

1. Rama desde `develop` y migración nueva: `supabase migration new descripcion_corta`. Escribe el SQL en el archivo generado.
2. Aplícala en stage y pruébala: `supabase link --project-ref <ref-stage>` y `supabase db push`.
3. Abre el PR contra `develop`. Se revisa el SQL antes de fusionar.
4. Cuando el cambio llega a `main`, aplícalo en producción: `supabase link --project-ref <ref-produccion>` y `supabase db push`.

- **Cuidado:** `supabase db push` actúa sobre el proyecto enlazado en ese momento. Comprueba a cuál apunta (`supabase projects list` marca el enlazado) antes de ejecutarlo.
- No cambies el esquema a mano desde el SQL Editor de Supabase: stage y producción se desincronizan. Si hay que hacerlo con urgencia, crea después la migración equivalente.
- Una migración debe ser idempotente cuando sea posible (`IF NOT EXISTS`, `CREATE OR REPLACE`).
- `pg_dump --schema=public` no incluye lo que vive fuera de `public`, como el trigger `on_auth_user_created` sobre `auth.users`. Si exportas el esquema, añade esas piezas a mano.
- Nunca copies datos de producción a stage: son datos de menores (RGPD).

## Arquitectura

TutorAI genera **fichas** (worksheets) imprimibles para niños, personalizadas según curso e intereses. Next.js 16 App Router + React 19, Supabase (auth y base de datos) y Vercel AI SDK (`ai`) para generar contenido.

### Flujo de generación de fichas

1. El chat de `app/dashboard/chat/` (`chat-client.tsx`, `ChatInterface.tsx`, `hooks.ts`) envía mensajes a `sendMessageToAgent` en `services/agentService.ts`. Ese servicio hace `POST /api/agent` con `mode: 'chat'` y el `childInfo` del niño seleccionado.
2. `app/api/agent/route.ts` valida sesión (`supabase.auth.getUser()`) y el cuerpo, y llama a `generateText` con el modelo de `utils/ai/models.ts`.
3. Hay dos modos que usan modelos distintos, elegidos por `getModelForMode`:
   - `chat`: generación de contenido, modelo `AI_MODEL`.
   - `visualization`: convierte el ejercicio en HTML/CSS para la ficha. Usa `AI_MODEL_VISUALIZATION` y el prompt `utils/prompts.json` (`maquetin`). Además **cobra un crédito**: lee `clients.credits`, rechaza con 402 si es menor que 1 y lo decrementa tras una respuesta correcta.
4. La ficha se guarda con `POST /api/worksheets` (`app/api/worksheets/route.ts`) en la tabla `worksheets`. El feedback de usuarios va a `POST /api/feedback` y a `worksheet_feedback`.
5. El PDF se genera en cliente con `html2pdf.js` / `jspdf`, desde `app/dashboard/chat/chat-client.tsx`.

### Proveedores de IA

Toda la selección de proveedor/modelo está en `utils/ai/models.ts`. Añadir un proveedor implica tocar ese `switch` y las variables de entorno, no las rutas.

### Autenticación y datos

- Cliente Supabase: `utils/supabase/client.ts` (navegador), `server.ts` (Server Components, route handlers y server actions) y `config.ts` (lee las variables).
- Login con Google o email: `app/auth/actions.ts` y `app/auth/callback/route.ts`.
- Las tablas en uso son `clients` (perfil y `credits`), `children` (perfiles de niños: `system_prompt`, `interests`, `observations`, `region`), `worksheets` y `worksheet_feedback`. El esquema está versionado en `supabase/migrations/` (ver "Cambios en la base de datos").
- **El refresco de sesión no está activo.** `utils/supabase/middleware.ts` existe, pero no hay `middleware.ts` en la raíz que lo invoque. Si tocas auth, ten en cuenta que la sesión solo se refresca en los puntos donde se llama a `getUser()`.

### Rutas y contexto de la UI

- `app/dashboard/layout.tsx` es un Server Component: lee el usuario y la lista de niños (`children`) y la pasa a `ChildSelector`. Los `Providers` (`app/providers.tsx`) envuelven todo con `ThemeProvider`, `AuthProvider` (`context/auth-context.tsx`), `ChildProvider` (`context/child-context.tsx`) y `Toaster`.
- El niño activo se guarda en `ChildProvider`; el chat y las fichas leen de ahí el `childInfo` que se envía al agente.
- Las páginas públicas (`app/page.tsx`, `login`, `register`, `privacidad`, `terminos`, `contacto`) están fuera de `/dashboard`.

### Puntos a revisar antes de tocarlos

- `services/agentService.ts` → `getConversationHistory` llama a `/api/andrea-agent`, que **no existe** en el repo. Es código muerto o pendiente de migrar.
- `app/api/agent/route.ts` registra `console.log` de depuración al inicio de cada petición.
- `.next/`, `tsconfig.tsbuildinfo` y `next-env.d.ts` son artefactos generados; no los edites.

## Convenciones del código

- Comentarios, mensajes de UI y de error en español; identificadores en inglés (ver AGENTS.md).
- Alias de rutas: `@/` apunta a la raíz; `@utils`, `@services` y `@hooks` están definidos en `vitest.config.ts`. Revisa `tsconfig.json` antes de usar otros.
- Estilos con Tailwind CSS 4 (`@tailwindcss/postcss`) y utilidades en `utils/cn.ts`; componentes de UI en `components/ui/`.
