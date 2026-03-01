# Virteex ERP Monorepo

Repositorio Nx para servicios backend, frontend y runtimes de plugins de Virteex ERP.

## Production Readiness Gates

- `./tools/enforce-production-readiness.sh` bloquea placeholders de secretos y regresiones de pipeline.
- En producción quedan prohibidos providers simulados para timbrado fiscal y claves efímeras para firma de plugins.
- `virteex-plugin-host` exige `PLUGIN_HOST_API_TOKEN` y claves de firma (`PLUGIN_SIGNING_PRIVATE_KEY`, `PLUGIN_SIGNING_PUBLIC_KEY`).

## CI/CD

Workflow principal: `.github/workflows/ci-cd.yml`.
Incluye jobs separados para `lint`, `typecheck`, `unit`, `integration`, `readiness-gates` y `security` en `push`/`pull_request`.

## Arquitectura y Gobernanza

El monorepo sigue una Arquitectura Hexagonal y principios de DDD. Se aplican controles estrictos:

- **Domain Purity:** La capa de Dominio (`libs/domain/*/domain`) debe ser pura y agnóstica de frameworks. Prohibido importar `@mikro-orm/*`, `@nestjs/*`, `rxjs`, etc.
  - Para persistencia, usar `EntitySchema` de MikroORM definido en la capa de `infrastructure`. Esto permite que las entidades sean clases puras (POJOs) sin decoradores del ORM.
- **Application Layer:** La capa de Aplicación (`libs/domain/*/application`) debe ser agnóstica de transporte. Prohibido usar excepciones HTTP de NestJS. Usar `DomainException` de `@virteex/kernel-exceptions`.
- **App Shells:** Las aplicaciones en `apps/*` actúan como *Composition Roots*. No deben contener lógica de presentación (controllers, resolvers, DTOs) ni adaptadores de infraestructura; estos deben residir en las librerías de dominio correspondientes.
- **Project Tags:** Todos los proyectos deben tener tags obligatorios (`scope`, `type`, `platform`, `criticality`). El enforcement en CI es bloqueante (`TAG_POLICY_MODE=error`).

Validaciones:
- `npm run validate:nx-tags`: Valida tags de proyectos.
- `npm run arch:check`: Valida boundaries arquitectónicos y fugas de capas.
