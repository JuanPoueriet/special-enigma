# Nx Governance Baseline (Progressive Hardening)

## Tag taxonomy (obligatoria)
Todos los proyectos gobernados deben declarar al menos una etiqueta por familia:

- `scope:*`
- `type:*`
- `platform:*`
- `criticality:*`

Se prohíben tags legacy (`domain:*`) en los proyectos gobernados.

## Enforce module boundaries
`@nx/enforce-module-boundaries` ya no usa fallback permisivo global (`sourceTag: '*'`).

Esto evita bypass de boundaries por proyectos sin clasificación.

## Validación automática de tags
Se agregó el guard:

```bash
npm run validate:nx-tags
```

Este guard aplica enforcement a los proyectos críticos de inventory/web/mobile/ops/shared-ui como fase inicial y puede extenderse gradualmente al resto del monorepo.

## Convenciones de naming
- Apps web deben declararse con `platform:web` y nombres explícitos de runtime.
- La consola de operaciones fue normalizada a `ops-console-web` para reflejar naturaleza frontend.
