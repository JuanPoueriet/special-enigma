# Auditoría Arquitectónica: Virteex ERP Monorepo

## 1. Resumen Ejecutivo

El monorepo de Virteex ERP presenta una base arquitectónica sólida basada en Nx, con una clara intención de seguir patrones de Diseño Orientado al Dominio (DDD) y Arquitectura Hexagonal. Existe una gobernanza establecida y controles técnicos (linter, scripts de validación, ADRs) que demuestran madurez en la gestión del proyecto.

Sin embargo, el repositorio muestra señales de **"erosión arquitectónica"**. A pesar de tener herramientas de validación de boundaries, existen múltiples violaciones activas (leakage de infraestructura en capas de dominio y aplicación) y inconsistencias estructurales en algunos dominios (ej. `finops`). El monorepo se encuentra en un estado de "transición no concluida" hacia una estructura ultra-estricta, donde conviven patrones limpios con deuda técnica acumulada.

**Nivel general de salud:** 7/10 (Buena, pero con riesgos de deriva si no se atienden las violaciones de límites).

### Principales Fortalezas
- **Gobernanza Proactiva:** Uso de scripts personalizados para validar taxonomía de tags y límites de arquitectura.
- **Estructura Modular Clara:** Separación consistente en `apps`, `libs/domain`, `libs/kernel`, `libs/platform` y `libs/shared`.
- **Documentación:** Presencia de ADRs y una guía de gobernanza Nx detallada.
- **Developer Experience:** Uso de generadores personalizados y scripts de automatización para tareas comunes.

### Principales Debilidades
- **Erosión de Capas:** Violaciones detectadas en múltiples dominios donde el dominio depende de frameworks (MikroORM) o la aplicación usa excepciones de transporte (NestJS HTTP).
- **Inconsistencia Estructural:** El dominio `finops` rompe el patrón de carpetas estándar del resto de los dominios.
- **Zonas de Sombra:** Presencia de carpetas redundantes o vacías y discrepancias en la configuración de `tsconfig` (referencias a `libs/domains` inexistentes).

---

## 2. Evaluación por dimensión

### 1. Estructura general del repositorio
**Calificación: 8/10**

**Qué está bien**
- Layout basado en Nx muy claro: `apps/` (api/web), `libs/` (domain/kernel/platform/shared), `tools/`, `docs/`.
- Separación física que refleja el runtime y el propósito.

**Qué está mal**
- Carpetas vacías o inconsistentes (ej. `libs/domain/accounting/ui` referenciada en tsconfig pero inexistente en disco).
- Duplicidad semántica potencial entre `platform/` (raíz) y `libs/platform/`.

**Riesgos**
- Confusión en el onboarding sobre dónde colocar utilidades de infraestructura global (raíz vs libs).

**Justificación de la nota**
- La estructura es ejemplar en términos de organización Nx, pero tiene "ruido" de archivos/carpetas fantasma que degradan la experiencia.

**Recomendaciones**
- Depurar `tsconfig.base.json` para eliminar paths a librerías inexistentes.
- Unificar la convención de `platform/` para evitar solapamientos.

---

### 2. Calidad del diseño arquitectónico
**Calificación: 7/10**

**Qué está bien**
- Arquitectura Hexagonal/DDD claramente identificable.
- Los Apps actúan como "Composition Roots" (ej. `AppModule` en `accounting`).
- Uso de Puertos y Adaptadores.

**Qué está mal**
- **Leakage de Infraestructura:** El linter y los scripts de validación reportan que `catalog`, `crm`, `fiscal`, etc., importan `@mikro-orm/core` en la capa de dominio.
- Uso de `NotFoundException` (NestJS) en capas de aplicación (casos de uso).

**Riesgos**
- Acoplamiento fuerte al framework que anula los beneficios de la arquitectura hexagonal (testabilidad, intercambiabilidad).

**Justificación de la nota**
- El diseño es excelente sobre el papel y en la mayoría de la estructura, pero las violaciones de límites son sistémicas y no incidentales.

**Recomendaciones**
- Refactorizar entidades de dominio para usar POJOs o decoradores agnósticos.
- Mapear excepciones de dominio a excepciones de transporte solo en la capa de presentación/app.

---

### 3. Naming y convenciones
**Calificación: 8/10**

**Qué está bien**
- Naming consistente en librerías: `@virteex/domain-{domain}-{layer}`.
- Uso de kebab-case uniforme.

**Qué está mal**
- Discrepancias menores en tags: `billing-contracts` y `exceptions` carecen de tags obligatorios (`platform`, `criticality`).
- Referencias en `tsconfig` a `libs/domains` (plural) mientras la carpeta es `libs/domain` (singular).

**Riesgos**
- Rotura de herramientas de automatización que dependan de convenciones estrictas de paths.

**Justificación de la nota**
- Es muy consistente, lo cual facilita la navegación, pero los errores de "plural vs singular" en configuraciones base restan puntos.

**Recomendaciones**
- Normalizar todos los paths a singular `domain`.
- Corregir tags faltantes en `project.json`.

---

### 4. Organización por dominios o módulos
**Calificación: 9/10**

**Qué está bien**
- Partición clara por Bounded Contexts bajo `libs/domain/`.
- Cada dominio tiene sus propias capas bien delimitadas.

**Qué está mal**
- El dominio `finops` tiene una estructura anidada (`domain/src/lib/infrastructure`) que rompe la horizontalidad de capas del resto de dominios.

**Riesgos**
- Inconsistencia en la navegación y dificultad para aplicar reglas de linter globales a `finops`.

**Justificación de la nota**
- La organización es casi perfecta, siendo `finops` la única excepción notable detectada.

**Recomendaciones**
- Aplanar `libs/domain/finops` para seguir el patrón de `accounting`, `catalog`, etc.

---

### 5. Librerías compartidas y reutilización
**Calificación: 7/10**

**Qué está bien**
- Clasificación funcional: `kernel` (core técnico), `platform` (drivers/adaptadores), `shared` (utilidades transversales).
- Separación clara de contratos (`shared/contracts`).

**Qué está mal**
- `libs/shared/util` tiene una profundidad excesiva (`client/auth/src/lib/...`).
- Riesgo de acoplamiento transversal en `shared-ui`.

**Riesgos**
- `libs/shared` puede convertirse en un cajón de sastre si no se vigila el crecimiento de `util`.

**Justificación de la nota**
- La intención es buena, pero la estructura de `util` es innecesariamente compleja.

**Recomendaciones**
- Simplificar la jerarquía de `shared/util`.

---

### 6. Relación entre runtime, testing y soporte
**Calificación: 9/10**

**Qué está bien**
- Separación clara entre apps de runtime y e2e (detectado en `nx.json`).
- Herramientas de soporte en `tools/` bien organizadas.
- Integración de scripts de "production readiness".

**Qué está mal**
- Nada relevante detectado, la separación parece sólida.

**Riesgos**
- Bajo riesgo.

**Justificación de la nota**
- Es uno de los puntos más fuertes del repo. La infraestructura de soporte está bien aislada del código de negocio.

**Recomendaciones**
- Mantener la disciplina actual.

---

### 7. Escalabilidad
**Calificación: 8/10**

**Qué está bien**
- Estructura basada en librerías pequeñas y cohesivas.
- Uso de Nx que permite crecimiento horizontal fácil.

**Qué está mal**
- El leakage de infraestructura detectado dificultará la escalabilidad si se decide cambiar de base de datos o framework en un subdominio específico.

**Riesgos**
- "Explosión de dependencias" si las fronteras entre dominios siguen siendo porosas.

**Justificación de la nota**
- El sistema está preparado para escalar, pero la disciplina técnica debe mejorar para que ese crecimiento sea sostenible.

**Recomendaciones**
- Automatizar la corrección de imports en el CI (no solo advertir).

---

### 8. Mantenibilidad
**Calificación: 7/10**

**Qué está bien**
- Localización de responsabilidades muy fácil gracias a la estructura de dominios.
- Documentación de cambios (ADRs).

**Qué está mal**
- Las violaciones de arquitectura (RG checks fallidos) obligan a los desarrolladores a navegar por código "contaminado" con lógica de framework en el dominio.

**Riesgos**
- Aumento de la deuda técnica y dificultad para realizar refactors mayores.

**Justificación de la nota**
- La mantenibilidad es buena debido a la modularidad, pero se ve penalizada por la falta de cumplimiento de las reglas auto-impuestas.

**Recomendaciones**
- Priorizar el "Architecture Cleanup" como un sprint técnico.

---

### 9. Gobernanza arquitectónica
**Calificación: 9/10**

**Qué está bien**
- Presencia de `validate-architecture-boundaries.mjs` y `validate-project-tags.mjs`.
- Uso de tags de criticidad y cumplimiento (`criticality`, `compliance`).
- `dependency-cruiser` configurado con reglas estrictas.

**Qué está mal**
- Los controles existen pero **no se están cumpliendo estrictamente**, como demuestran los fallos en los scripts de validación.

**Riesgos**
- La gobernanza se convierte en "teatro" si se permiten excepciones continuas.

**Justificación de la nota**
- Tener los controles es el 90% del trabajo. El repo está a un paso de la excelencia en este punto si activa el modo `error` en CI.

**Recomendaciones**
- Activar `TAG_POLICY_MODE=error` y bloquear PRs con violaciones de boundaries.

---

### 10. Developer Experience
**Calificación: 8/10**

**Qué está bien**
- Scripts de ayuda claros en `package.json`.
- Generadores de Nx disponibles.
- `README.md` con guías de readiness.

**Qué está mal**
- Inconsistencias en `tsconfig` pueden causar errores confusos en el IDE.
- Complejidad de la jerarquía de librerías para un recién llegado.

**Riesgos**
- Curva de aprendizaje inicial algo empinada debido a la cantidad de capas.

**Justificación de la nota**
- Muy buena automatización, pero penalizada por pequeños fallos de configuración.

**Recomendaciones**
- Limpiar archivos de configuración obsoletos.

---

### 11. Consistencia global del monorepo
**Calificación: 7/10**

**Qué está bien**
- Transmite una plantilla mental clara de "Monorepo DDD".
- La mayoría de los dominios siguen el mismo patrón.

**Qué está mal**
- Coexistencia de dominios "limpios" con dominios con leakage.
- La excepción de `finops` rompe la simetría del sistema.

**Riesgos**
- Degradación hacia un sistema orgánico descontrolado si no se unifican los patrones.

**Justificación de la nota**
- Hay una lucha visible entre el diseño ideal y la implementación real.

**Recomendaciones**
- Realizar una campaña de normalización estructural.

---

## 3. Tabla resumen de puntuaciones

| Dimensión | Nota /10 | Comentario breve |
| :--- | :---: | :--- |
| Estructura general | 8 | Muy organizada, pero con ruido de archivos fantasma. |
| Diseño arquitectónico | 7 | Gran diseño (Hexagonal), pero con leakage de infra grave. |
| Naming y convenciones | 8 | Consistente, salvo errores en tsconfig y algunos tags. |
| Organización por dominios| 9 | Excelente partición, exceptuando el dominio `finops`. |
| Librerías compartidas | 7 | Bien clasificadas, pero con sobre-ingeniería en `util`. |
| Runtime vs Soporte | 9 | Excelente separación y herramientas de readiness. |
| Escalabilidad | 8 | Preparado para crecer, si se controlan las dependencias. |
| Mantenibilidad | 7 | Buena modularidad empañada por violaciones de límites. |
| Gobernanza | 9 | Herramientas de control excepcionales, falta enforcement. |
| Developer Experience | 8 | Muy buena automatización y scripts. |
| Consistencia global | 7 | Señales de erosión arquitectónica y asimetría. |

---

## 4. Red flags

1. **Leakage de MikroORM en Dominio:** Múltiples entidades en `libs/domain/*/domain/src/lib/entities/` importan directamente desde `@mikro-orm/core`. Esto rompe la premisa básica de la Arquitectura Limpia/Hexagonal.
2. **NestJS Exceptions en Aplicación:** El uso de `NotFoundException` de `@nestjs/common` en los casos de uso (`application/src/lib/use-cases/`) acopla la lógica de negocio al protocolo HTTP.
3. **Inconsistencia de Finops:** La estructura de carpetas de `finops` es radicalmente distinta a la del resto de dominios, lo que indica una falta de supervisión o una desviación no controlada.
4. **Configuración Fantasma:** Referencias a carpetas como `libs/domains` o `libs/domain/accounting/ui` que no existen en el sistema de archivos actual.

---

## 5. Quick wins

1. **Corrección de Tags:** Completar los tags faltantes en `billing-contracts` y `exceptions` (Esfuerzo: Muy bajo).
2. **Limpieza de TSConfig:** Eliminar todos los paths inexistentes de `tsconfig.base.json` para evitar confusión en el IDE (Esfuerzo: Bajo).
3. **Renombrar Paths:** Cambiar cualquier referencia a `domains` (plural) por `domain` (singular) para total consistencia (Esfuerzo: Bajo).
4. **Activar Enforcement de Tags:** Pasar `TAG_POLICY_MODE` a `error` en el pipeline de CI para evitar que la taxonomía se degrade más (Esfuerzo: Bajo).

---

## 6. Recomendaciones estratégicas

1. **Desacoplamiento del Dominio (Entidades Agnosticas):** Migrar las entidades de dominio a un formato agnóstico. Si se requiere persistencia con MikroORM, usar el patrón "Data Mapper" o definir la metadata de MikroORM en archivos externos/capa de infraestructura, manteniendo las entidades como clases puras.
2. **Normalización de Finops:** Refactorizar el dominio `finops` para que su estructura de carpetas coincida al 100% con el estándar del monorepo.
3. **Capa de Excepciones de Dominio:** Implementar excepciones de dominio puras (ej. `EntityNotFoundError` que no dependa de NestJS) y crear un Global Exception Filter en la capa de presentación que las mapee a los códigos HTTP correspondientes.
4. **Enforcement de Boundaries:** Una vez corregidas las violaciones actuales, hacer que el script `validate-architecture-boundaries.mjs` sea bloqueante en el CI.

---

## 7. Nota global final

### **Nota global: 7.8/10**

**Justificación:**
El monorepo de Virteex ERP es una pieza de ingeniería de software de alta calidad. El uso de Nx está optimizado, la partición de dominios es correcta y la gobernanza técnica está años luz por delante de la mayoría de los repositorios comerciales. Sin embargo, no alcanza una nota superior debido a la **erosión arquitectónica detectable**: las reglas de diseño se han relajado en la implementación práctica (especialmente en el leakage de infraestructura).

**Conclusión final:**
El monorepo está en un estado **saludable pero vulnerable**. Tiene todos los "anticuerpos" (scripts de validación, tags, boundaries) para mantenerse sano, pero estos anticuerpos están actualmente ignorando varias infecciones activas. Si el equipo realiza una campaña de limpieza técnica para resolver los Red Flags detectados, este repositorio podría alcanzar fácilmente un **9.5/10** y convertirse en un estándar de oro para arquitecturas monorepo.
