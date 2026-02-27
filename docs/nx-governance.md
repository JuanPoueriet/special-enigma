# Estándar Operativo Único de Naming (Nx Governance)

## 1) Convención única obligatoria

### 1.1 Nombres de proyectos Nx (`project.json`)

#### Aplicaciones (`apps/**/project.json`)
- Formato: `virteex-<dominio>-<componente>`.
- Sufijo E2E permitido: `-e2e`.
- Regex: `^virteex-[a-z0-9-]+$`.

Ejemplos válidos:
- `virteex-api-gateway`
- `virteex-ops-web`
- `virteex-purchasing-service-e2e`

#### Librerías (`libs/**/project.json`)
- Prefijos permitidos: `api-`, `application-`, `contracts-`, `domain-`, `infra-`, `kernel-`, `shared-`.
- También se permite `<dominio>-<tipo>` cuando cumple kebab-case (ej: `identity-ui`).
- Regex base: `^(api|application|contracts|domain|infra|kernel|shared|[a-z0-9]+)-[a-z0-9-]+$`.

### 1.2 Selectors Angular
- Todos los `selector` deben usar prefijo único `virteex-`.
- Regex: `^virteex-[a-z0-9-]+$`.
- Quedan prohibidos nuevos selectors con `app-` o `lib-`.

### 1.3 Aliases de TypeScript (`tsconfig.base.json`)
- Convención canónica: `@virteex/<project-name>`.
- Regex: `^@virteex\/[a-z0-9-]+$`.
- Se permiten aliases legacy solo si están registrados en la sección de transición (2.2).

### 1.4 Tags Nx por proyecto
Cada proyecto debe tener exactamente una etiqueta por familia:
- `scope:*`
- `type:*`
- `platform:*`
- `criticality:*`

No se acepta más de un tag por familia en un mismo `project.json`.

---

## 2) Mapeo legacy y plan de migración

### 2.1 Mapeo oficial
| Legacy | Estándar actual | Estado |
|---|---|---|
| `ops-console-web` | `virteex-ops-web` | Migrado |
| `ops-console-web-e2e` | `virteex-ops-web-e2e` | Migrado |
| `billing-presentation` | `api-billing-presentation` | Migrado |
| `virteex-gateway` | `virteex-api-gateway` | Pendiente de deprecación controlada |
| `virteex-gateway-e2e` | `virteex-api-gateway-e2e` | Pendiente de deprecación controlada |

### 2.2 Aliases temporales permitidos
Mientras se completa la migración de consumidores:
- `@virteex/billing-presentation` => `@virteex/api-billing-presentation`

Regla: todo alias legacy nuevo requiere ticket + fecha de expiración.

### 2.3 Plan operativo
1. Introducir nombre canónico.
2. Mantener alias temporal solo durante ventana de transición.
3. Migrar imports y referencias CI/CD.
4. Eliminar alias legacy cuando `rg` reporte 0 consumidores.

---

## 3) Automatización de validación

### 3.1 Lint de naming
Script oficial: `tools/lint-naming-conventions.mjs`

Valida:
- nombre de proyectos (apps/libs),
- familias de tags obligatorias,
- selectors Angular (`virteex-*`),
- aliases TS (`@virteex/<kebab-case>`),
- uso de nombres legacy mapeados.

### 3.2 Ejecución local
```bash
npm run validate:naming
```

### 3.3 Gates en CI
El pipeline debe ejecutar, en este orden mínimo:
1. `npm run validate:nx-tags`
2. `npm run validate:naming`
3. `nx affected --target=lint`

---

## 4) Reglas de rechazo en PR

Un PR debe rechazarse si:
- introduce proyectos fuera del patrón de naming;
- agrega selectors `app-*` o `lib-*`;
- agrega aliases TS fuera de `@virteex/<kebab-case>` sin excepción documentada;
- agrega o mantiene nombres legacy sin plan de retiro.

La checklist obligatoria está en `.github/pull_request_template.md`.
