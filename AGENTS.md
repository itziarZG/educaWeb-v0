# Reglas obligatorias para el agente

## 1. GitHub Flow — SIEMPRE

Cada vez que te pida implementar algo, cambiar código o hacer cualquier modificación:

1. **Crea una rama nueva** desde `main` con un nombre descriptivo (ej: `feature/descripcion-corta`, `fix/descripcion-corta`).
2. **Haz commits claros y descriptivos** conforme avances.
3. **Abre un Pull Request** para que pueda revisar tu código antes de fusionarlo.
4. **NUNCA hagas push directo a `main`.**

> ⚠️ No empieces a modificar archivos sin haber creado la rama primero.

## 2. Navegador integrado — SIEMPRE

Antes de implementar cualquier cambio visual o funcional:

1. **Comprueba si el servidor de desarrollo está corriendo** (`npm run dev` o similar).
2. **Si no está corriendo, arráncalo.**
3. **Abre el navegador integrado** para mostrar el estado actual.
4. **Implementa los cambios.**
5. **Muestra el resultado en el navegador** después de los cambios.

> ⚠️ No des por terminada una tarea visual sin haberla verificado en el navegador.

## 3. Idioma — Español siempre, excepto el código

- **Español:** commits, comentarios en el código, PRs, issues, respuestas al usuario, documentación.
- **Inglés:** solo nombres de variables, funciones, clases, archivos y código en general.

> ⚠️ No escribas mensajes de commit, comentarios ni descripciones de PR en inglés.

## 4. Agentic Workflows — Compilar siempre

Cuando crees o modifiques un flujo agéntico (archivos `.md` en `.github/workflows/`):

1. **Crea o edita el archivo `.md`** con la definición del workflow.
2. **Ejecuta `gh aw compile`** para generar el workflow real de GitHub Actions.
3. **Incluye los archivos generados** (`.github/aw/` y `.lock.yml`) en el commit.

> ⚠️ Un flujo agéntico NO funciona hasta que se compile. No olvides este paso.

---

## 5. Comandos de desarrollo

```bash
pnpm dev         # Servidor de desarrollo (Next.js + Turbopack)
pnpm build       # Build de producción
pnpm start       # Production server
pnpm tscheck     # TypeScript check
pnpm lint        # ESLint
pnpm format      # Prettier write
pnpm format:check
pnpm test        # Vitest unit tests
pnpm test:watch  # Vitest watch mode
pnpm test:e2e    # Playwright e2e
```

## 6. Flujo de verificación local

Antes de hacer commit, ejecutar en orden:

```bash
pnpm tscheck → pnpm lint → pnpm format:check
```

(pre-commit ya lo hace automáticamente)

## 7. Path aliases

El proyecto usa TypeScript path aliases:

- `@/*` → raíz del proyecto
- `@utils/*` → `./utils/*`
- `@services/*` → `./services/*`
- `@hooks/*` → `./hooks/*`

## 8. Skills disponibles

Skills preconfigurados en `.agents/skills/`:

- **vercel-react-best-practices** — React 19 + Next.js performance
- **vercel-composition-patterns** — Compound components, evitar boolean props
- **react-hook-form** — Forms con RHF + Zod
- **zod** — Validación de esquemas
- **ai-sdk** — Vercel AI SDK (generateText, streamText, tools)
- **vitest** — Unit tests
- **playwright-best-practices** — E2E tests

## 9. Estructura del proyecto

```
app/           # Next.js App Router (pages, layouts, API routes)
components/    # Componentes UI reutilizables
context/       # React Context (Auth, Theme)
hooks/         # Custom hooks
services/      # Supabase, AI providers
utils/         # Helpers, constantes
types/         # TypeScript definitions
styles/        # CSS + Tailwind config
e2e/           # Playwright e2e tests
__tests__/     # Vitest unit tests
```

## 10. Dependencias actualizadas

Actualizado en esta sesión:

- prettier → 3.8.3
- vitest → 4.1.6
- tailwindcss → 4.3.0
- tailwind-merge → 3.6.0

⚠️ No actualizar: ESLint (incompatible con plugins), Zod 4 (incompatible con ollama-ai-provider)
