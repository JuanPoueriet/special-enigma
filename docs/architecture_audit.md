# Auditoría Arquitectónica Integral - Virteex ERP

## 🧠 Diagnóstico Ejecutivo
El proyecto Virteex ERP presenta una base arquitectónica sólida y madura, orientada a estándares enterprise. La adopción de **Nx Monorepo**, **NestJS** y **Angular** con principios de **Clean Architecture** y **DDD** es evidente y está bien estructurada en su mayoría. La segmentación por dominios (`identity`, `catalog`, `accounting`, etc.) permite un desarrollo paralelo escalable.

Sin embargo, el sistema sufre de **fugas arquitectónicas críticas** hacia la capa de dominio. El acoplamiento con MikroORM y NestJS en el núcleo del negocio compromete la portabilidad y la pureza del modelo. Existen también inconsistencias en la gestión de dependencias del monorepo y una ligera deriva semántica en las librerías compartidas.

---

## 📊 Calificación por Categoría

### 1️⃣ Coherencia Semántica: 8/10
- **Justificación:** Naming consistente y profesional en el 90% del proyecto. Se respeta la intención de los dominios definidos en `AGENTS.md`.
- **Evidencia:**
  - Estructura de carpetas coherente: `apps/backend`, `libs/domains/accounting/domain`.
  - **Falla:** `OrganizationService` en `libs/shared/ui` (Semantic Drift); es un servicio de datos e infraestructura en una lib de UI.
  - **Falla:** Redundancia en el naming de librerías (`@virteex/domain-identity-domain`).
- **Roadmap 10/10:** Mover servicios de lógica/datos fuera de `shared-ui`. Implementar una auditoría de nombres para eliminar redundancias en el mapa de librerías.

### 2️⃣ Responsabilidad y Cohesión: 9/10
- **Justificación:** Excelente aplicación del Principio de Responsabilidad Única (SRP) en la capa de aplicación. Alta cohesión en los casos de uso.
- **Evidencia:** `LoginUserUseCase` orquesta múltiples servicios (`UserRepository`, `AuthService`, `RiskEngineService`) sin mezclarlos.
- **Roadmap 10/10:** Asegurar que la lógica de estado compleja no se filtre a los Use Cases y permanezca en los Agregados de Dominio.

### 3️⃣ Arquitectura Frontend: 8/10
- **Justificación:** Clara separación entre componentes de página (contenedores) y UI compartida (presentacionales).
- **Evidencia:**
  - `LoginComponent` maneja el flujo; `ButtonComponent` es puramente visual.
  - **Falla:** `CountrySelectorComponent` contiene una lista hardcoded de países con reglas fiscales (`IVA 19%`, `CFDI 4.0`). Estos son datos de dominio/negocio que no deben vivir en la capa de presentación.
- **Roadmap 10/10:** Externalizar configuraciones de negocio de los componentes de UI. Inyectar datos de dominio mediante servicios o tokens.

### 4️⃣ Arquitectura Backend: 9/10
- **Justificación:** Modularidad de NestJS ejemplar. Controllers limpios y orientados a la orquestación.
- **Evidencia:** `AuthController` delega el 100% de la ejecución a los Use Cases.
- **Roadmap 10/10:** Eliminar decoradores de framework (`@Injectable`) de las clases de dominio puro, usando `providers` manuales en los módulos si es necesario.

### 5️⃣ Estructura de Monorepo Nx: 7/10
- **Justificación:** Uso correcto de scopes y capas. Sin embargo, hay fallas técnicas en la configuración que afectan la DX y el build.
- **Evidencia:**
  - **Falla Crítica:** `tsconfig.base.json` apunta a `dist/libs/domains/identity/contracts`. Esto rompe la integración de Nx y causa problemas de caché y compilación.
  - **Falla:** `shared-ui` se utiliza como "dumping ground" para interceptores y lógica de red.
- **Roadmap 10/10:** Corregir los mappings en `tsconfig`. Enforcear límites de dependencias estrictos vía ESLint para evitar que `shared-ui` dependa de infraestructura.

### 6️⃣ Modelado y Abstracciones: 5/10
- **Justificación:** Esta es la categoría con mayor deuda técnica. El modelo de dominio no es "Persistence Ignorant".
- **Evidencia:**
  - **Falla Mayor:** Uso de `@Entity()` y `@Property()` de MikroORM directamente en `libs/domains/*/domain/src/lib/entities/`.
  - **Falla:** Falta de abstracción entre DTOs y Entidades en algunas firmas de métodos.
- **Roadmap 10/10:** Implementar **Persistence Ignorance**. Mover decoradores a clases `OrmEntity` en la capa de `infrastructure`. Usar `Mappers` obligatorios para todas las transacciones entre capas.

---

## 🏆 Calificación Global: 7.8/10
*Promedio ponderado basado en el impacto estructural de los hallazgos.*

---

## 🔥 Recomendaciones de Acción Inmediata
1. **Sanitización de Dominio:** Extraer decoradores de MikroORM de `Product`, `Account`, etc., hacia sus respectivos adaptadores de infraestructura.
2. **Corrección de Monorepo:** Actualizar `tsconfig.base.json` para que todos los paths apunten a `/src/index.ts`.
3. **Refactor de UI:** Mover la lógica de `OrganizationService` y la data de `CountrySelector` a capas de dominio/infraestructura adecuadas.
