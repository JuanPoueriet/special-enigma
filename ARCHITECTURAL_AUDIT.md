# Auditoría Arquitectónica: Monorepo Virteex ERP

## 1. Resumen ejecutivo

El monorepo de Virteex ERP presenta una base arquitectónica **sólida y ambiciosa**, diseñada bajo principios de Clean Architecture y Domain-Driven Design (DDD). La estructura está claramente orientada a la escalabilidad y al aislamiento de dominios, utilizando Nx como motor de gobernanza. Se observa una intención clara de separar la lógica de negocio (domain/application) de los detalles técnicos (infrastructure/presentation).

Sin embargo, existe una **brecha notable entre la arquitectura definida en la documentación (AGENTS.md) y la implementación real**. El sistema de gobernanza automatizado (scripts de validación de boundaries) detecta múltiples violaciones de las reglas sagradas: dependencias de frameworks en la capa de dominio, excepciones de transporte (HTTP) en la capa de aplicación y duplicación de artefactos de presentación en los shells de las aplicaciones.

**Nivel general de salud:** 7/10 (Buena base, pero con deriva técnica activa).

### Principales fortalezas
- **Estructura Modular Estricta:** Organización clara por dominios y capas (Clean Architecture).
- **Gobernanza Proactiva:** Presencia de herramientas de validación de arquitectura y reglas de ESLint para límites de módulos.
- **Preparación para Multi-Tenancy:** Diseño que contempla aislamiento de datos desde la infraestructura.
- **Naming Consistente:** Convenciones de nombres altamente uniformes en todo el monorepo.

### Principales debilidades
- **Deriva Arquitectónica:** Violaciones de boundaries en dominios clave (catalog, crm, identity).
- **Acoplamiento Prematuro:** El ORM (MikroORM) ha filtrado hacia la capa de dominio en varios módulos.
- **Ruido en App Shells:** Lógica de presentación duplicada en las aplicaciones en lugar de residir exclusivamente en librerías de presentación.

---

## 2. Evaluación por dimensión

### 1. Estructura general del repositorio
**Calificación: 9/10**

**Qué está bien**
- Layout de Nx impecable: `apps/` para orquestación y `libs/` para lógica.
- Clasificación semántica de librerías: `domain/`, `kernel/`, `platform/`, `shared/`.
- Separación clara por tipo de runtime (api, web, mobile, desktop, worker).

**Qué está mal**
- La profundidad de carpetas en `libs/domain/[dominio]/[capa]` puede ser abrumadora para navegación manual.

**Riesgos**
- Complejidad cognitiva para nuevos desarrolladores debido a la alta fragmentación.

**Justificación de la nota**
- Es un estándar de oro en la comunidad Nx. La navegación es predecible una vez se entiende el patrón.

**Recomendaciones**
- Mantener la documentación de "Visualización del Grafo" actualizada para facilitar el onboarding.

---

### 2. Calidad del diseño arquitectónico
**Calificación: 7/10**

**Qué está bien**
- Arquitectura identificable: Hexagonal / Clean Architecture.
- Despliegue de capas (domain, application, infrastructure, presentation) bien definido en la estructura de carpetas.

**Qué está mal**
- **Fuga de abstracciones:** El script `validate-architecture-boundaries.mjs` revela que el dominio de `catalog`, `crm`, `fiscal`, etc., importan `@mikro-orm/core`.
- **Contaminación de capas:** Casos de uso en `application` lanzando excepciones de `@nestjs/common`.

**Riesgos**
- Dificultad para cambiar de framework o realizar pruebas unitarias puras en el dominio.
- Acoplamiento fuerte a la infraestructura de persistencia.

**Justificación de la nota**
- El diseño es excelente sobre el papel, pero la implementación actual permite violaciones que contradicen los principios de Clean Architecture.

**Recomendaciones**
- Refactorizar las entidades de dominio para usar tipos nativos o Value Objects, moviendo las decoraciones de MikroORM a la capa de infraestructura o usando configuración programática.

---

### 3. Naming y convenciones
**Calificación: 10/10**

**Qué está bien**
- Consistencia absoluta: `@virteex/domain-[dominio]-[capa]`.
- Uniformidad entre `apps/api/[dominio]` y `libs/domain/[dominio]`.
- Semántica clara que evita ambigüedades.

**Qué está mal**
- Nada destacable en el estado actual.

**Riesgos**
- Ninguno identificado.

**Justificación de la nota**
- Es uno de los monorepos con convenciones de nombres más rigurosas y consistentes observadas.

---

### 4. Organización por dominios o módulos
**Calificación: 9/10**

**Qué está bien**
- Partición clara por Bounded Contexts (accounting, billing, inventory, etc.).
- Los dominios están bien delimitados físicamente.

**Qué está mal**
- Existen algunas inconsistencias en dominios específicos (ej. `finops` tiene una estructura ligeramente diferente en `application` comparado con otros).

**Riesgos**
- Crecimiento desigual de dominios si no se usan generadores estrictos.

**Justificación de la nota**
- La estructura respalda perfectamente una organización orientada a dominios de negocio.

---

### 5. Librerías compartidas y reutilización
**Calificación: 8/10**

**Qué está bien**
- Distinción clara entre `kernel` (utilidades core del sistema), `platform` (adaptadores de infraestructura compartidos) y `shared` (DTOs/tipos transversales).
- El riesgo de "cajón de sastre" está mitigado por la categorización en sub-librerías.

**Qué está mal**
- `shared/util` tiene sub-niveles como `client/config` que podrían estar más simplificados.

**Riesgos**
- Acoplamiento transversal si `shared` crece sin control de dependencias.

**Justificación de la nota**
- Buena segregación de responsabilidades en las librerías base.

---

### 6. Relación entre runtime, testing y soporte
**Calificación: 8/10**

**Qué está bien**
- Separación clara entre aplicaciones de runtime y herramientas de soporte (`tools/`).
- Configuración de testing integrada en `nx.json` con targets específicos.

**Qué está mal**
- El script de validación de arquitectura reporta ruido estructural: "App shell must not define duplicate presentation artifacts". Las apps están asumiendo roles de presentación que deberían estar en las `libs`.

**Riesgos**
- Fragmentación de la lógica de presentación entre la aplicación y la librería.

**Justificación de la nota**
- El entorno soporta bien el ciclo de vida, pero la "limpieza" del shell de la aplicación es mejorable.

---

### 7. Escalabilidad
**Calificación: 9/10**

**Qué está bien**
- Altamente preparado para múltiples equipos y productos.
- El uso de etiquetas (tags) en `project.json` permite un control de escala granular.
- Caché de Nx y `affected` configurados para manejar el crecimiento.

**Qué está mal**
- La deriva arquitectónica detectada podría ralentizar la escalabilidad a largo plazo debido al aumento de la deuda técnica.

**Riesgos**
- El "miedo al refactor" si las violaciones de capas se vuelven sistémicas.

**Justificación de la nota**
- La base técnica es excelente para escalar; solo requiere disciplina operativa.

---

### 8. Mantenibilidad
**Calificación: 6/10**

**Qué está bien**
- Facilidad para localizar responsabilidades gracias al naming y estructura de dominios.
- Presencia de un `OWNERS` file para ownership explícito.

**Qué está mal**
- **Violaciones de boundaries:** Modificar el dominio requiere entender MikroORM o NestJS en lugares donde no deberían estar presentes.
- La complejidad de la estructura (tantas capas y librerías por dominio) aumenta el overhead de cualquier cambio simple.

**Riesgos**
- Alto costo de entrada para nuevos desarrolladores.
- Riesgo de "copiar y pegar" patrones incorrectos (como importar MikroORM en el dominio).

**Justificación de la nota**
- La mantenibilidad se ve afectada por la brecha entre la arquitectura ideal y la real, y por la verbosidad de la estructura.

---

### 9. Gobernanza arquitectónica
**Calificación: 7/10**

**Qué está bien**
- Reglas de ESLint (`@nx/enforce-module-boundaries`) configuradas en `eslint.config.mjs`.
- Presencia de scripts de validación de arquitectura personalizados.
- Uso extensivo de tags para enforcement.

**Qué está mal**
- **Falta de enforcement en CI:** El hecho de que existan tantas violaciones detectables por script sugiere que estos checks no son bloqueantes en el pipeline o son ignorados.
- Presencia de archivos como `fix_everything.py` sugiere intentos manuales de corregir problemas sistémicos.

**Riesgos**
- Degradación continua de la calidad si los controles no son coercitivos.

**Justificación de la nota**
- Las herramientas están ahí, pero no están logrando su objetivo de mantener el repositorio limpio.

---

### 10. Developer Experience (DX)
**Calificación: 7/10**

**Qué está bien**
- Documentación exhaustiva en `AGENTS.md` y `README.md`.
- Scripts de utilidad claros en `package.json`.

**Qué está mal**
- Curva de aprendizaje empinada debido a la sofisticación de la arquitectura.
- Los fallos de validación de arquitectura pueden ser frustrantes si no hay guías claras de cómo corregirlos (ej. cómo separar MikroORM de las entidades).

**Riesgos**
- Frustración del desarrollador y tendencia a buscar "shortcuts".

**Justificación de la nota**
- El entorno está muy profesionalizado, pero la fricción de la arquitectura Clean es alta.

---

### 11. Consistencia global del monorepo
**Calificación: 8/10**

**Qué está bien**
- Transmite una plantilla mental muy clara y uniforme.
- No parece un crecimiento orgánico descontrolado, sino un diseño premeditado.

**Qué está mal**
- La consistencia se rompe en el nivel de cumplimiento de reglas de capas.

**Riesgos**
- Pérdida de la integridad del diseño si no se corrigen las desviaciones actuales.

**Justificación de la nota**
- A pesar de las violaciones de código, la estructura física y la organización son sumamente consistentes.

---

## 3. Tabla resumen de puntuaciones

| Dimensión | Nota /10 | Comentario breve |
| :--- | :---: | :--- |
| Estructura general | 9 | Excelente organización y layout Nx. |
| Calidad del diseño | 7 | Clean Architecture bien definida pero violada en la práctica. |
| Naming y convenciones | 10 | Impecable y riguroso. |
| Organización por dominios | 9 | Bounded Contexts muy bien identificados. |
| Librerías compartidas | 8 | Buena segregación entre kernel, platform y shared. |
| Relación runtime/test | 8 | Buena separación de responsabilidades de ejecución. |
| Escalabilidad | 9 | Preparado para el crecimiento masivo. |
| Mantenibilidad | 6 | Afectada por la deriva técnica y la complejidad. |
| Gobernanza arquitectónica | 7 | Herramientas presentes pero enforcement insuficiente. |
| Developer Experience | 7 | Profesional pero con alta curva de aprendizaje. |
| Consistencia global | 8 | Diseño uniforme con desviaciones en la implementación. |

---

## 4. Red flags

1. **Acoplamiento de Persistencia en Dominio:** Dominios críticos como `catalog` y `crm` tienen dependencias directas de MikroORM. Esto anula uno de los beneficios principales de Clean Architecture (independencia de la infraestructura).
2. **Deriva de Gobernanza:** El script `arch:check` falla con múltiples errores. Si este script no detiene el despliegue, la arquitectura seguirá degradándose.
3. **Excepciones de Transporte en Aplicación:** El uso de `NotFoundException` (NestJS) en los Use Cases acopla la lógica de negocio al protocolo HTTP.
4. **Duplicación de Lógica de Presentación:** Los shells de las APIs están definiendo Resolvers y DTOs de GraphQL que deberían estar encapsulados en librerías de `presentation`.

---

## 5. Quick wins

1. **Hacer bloqueante el `arch:check`:** Integrar `npm run arch:check` en el hook de pre-commit (Husky) y en la pipeline de CI como paso obligatorio.
2. **Abstraer excepciones:** Crear una librería de excepciones de dominio/aplicación en `kernel-exceptions` y mapearlas a excepciones HTTP únicamente en la capa de `presentation`.
3. **Mover decoradores de MikroORM:** Utilizar `EntitySchema` de MikroORM para definir metadatos fuera de las clases de dominio, o asegurar que el dominio no importe nada de `@mikro-orm/core` (usando solo tipos de TS).

---

## 6. Recomendaciones estratégicas

1. **Refactor de Entidades:** Realizar un sprint dedicado a "limpiar" el dominio de `catalog`, `crm` e `identity`, moviendo toda referencia a MikroORM y NestJS a sus capas respectivas.
2. **Generadores de Código:** Implementar o reforzar generadores de Nx que creen la estructura de capas automáticamente con los guardrails de linting ya incluidos.
3. **Módulo de Mapeo:** Fortalecer el uso de Mappers para convertir entidades de dominio a DTOs de presentación, eliminando la duplicación detectada en los app shells.
4. **Certificación de Arquitectura:** Establecer un proceso de revisión de código donde los "Architecture Violations" tengan prioridad máxima de corrección.

---

## 7. Nota global final

**Nota global: 7.7/10**

### Justificación
El monorepo es una pieza de ingeniería de software de alto nivel. La estructura, las convenciones y la visión arquitectónica son excelentes (nivel 9-10). Sin embargo, la ejecución actual tiene "fugas" importantes hacia la infraestructura y el framework que degradan la nota final. Un 7.7 refleja un repositorio que es funcional, escalable y profesional, pero que está en un momento crítico donde debe decidir si recupera la pureza de su diseño o acepta una arquitectura más pragmática (y acoplada).

### Conclusión final
El monorepo está **saludable pero necesita mantenimiento correctivo inmediato**. Está muy cerca de ser una arquitectura ejemplar (10/10), pero la deriva detectada en los boundaries de los dominios principales es una amenaza real para su mantenibilidad a largo plazo. La base está allí; solo falta rigor en el enforcement de las reglas que el propio equipo ha definido.

---
*Auditoría realizada por Jules, Senior Software Architect.*
