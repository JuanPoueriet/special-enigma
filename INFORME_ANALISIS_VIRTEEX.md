# Informe de Análisis de Arquitectura y Calidad de Software - Virteex ERP

## 1. Resumen Ejecutivo
Tras un análisis exhaustivo del código fuente y la estructura del proyecto Virteex ERP, se ha verificado que la arquitectura general sigue los principios de **Clean Architecture** y **Domain-Driven Design (DDD)** de manera consistente. Sin embargo, se han detectado **dependencias circulares** críticas en el dominio de inventario y cierto acoplamiento pragmático con frameworks (NestJS y MikroORM) en capas que idealmente deberían ser agnósticas.

## 2. Dependencias Circulares Detectadas
Se ha identificado una violación explícita de dependencia circular en el módulo de **Inventario**:

- **Ubicación:** `libs/domains/inventory/domain/src/lib/entities/`
- **Archivos Afectados:**
  - `stock.entity.ts` depende de `stock-batch.entity.ts`
  - `stock-batch.entity.ts` depende de `stock.entity.ts`
- **Impacto:** Esta dependencia bidireccional entre entidades (relación Stock <-> StockBatch) genera ciclos en el grafo de dependencias del módulo. Aunque MikroORM puede manejar esto en tiempo de ejecución, complica el testing unitario aislado, la refactorización y puede causar problemas con herramientas de análisis estático o bundlers estrictos.
- **Recomendación:** Utilizar `forwardRef(() => Class)` o refactorizar la relación para que sea unidireccional si es posible, o extraer interfaces comunes en un paquete compartido dentro del mismo dominio si la semántica lo permite. En DDD puro, a veces se prefiere referenciar por ID en lugar de por objeto directo para evitar esto, aunque con ORMs es un compromiso común.

## 3. Análisis de Arquitectura (Clean Architecture & DDD)

### 3.1 Capa de Dominio (Domain Layer)
- **Fortalezas:**
  - Se observa un **Modelo de Dominio Rico (Rich Domain Model)**. La entidad `Stock` contiene lógica de negocio relevante (`deductFromBatches` con estrategia FIFO), evitando el anti-patrón de "Modelo de Dominio Anémico".
  - Las excepciones son específicas del dominio (e.g., `insufficient-stock.exception.ts`).
- **Debilidades / Compromisos:**
  - **Acoplamiento con ORM:** Las entidades de dominio están decoradas con `@mikro-orm/core` y extienden funcionalidad de `BaseEntity` implícitamente o usan colecciones del ORM (`Collection<StockBatch>`). Esto viola la pureza del DDD (donde las entidades deberían ser POJOs), pero es una decisión pragmática documentada para simplificar el mapeo de datos.
  - **Dependencias Técnicas:** Uso de librerías como `decimal.js` y `uuid` dentro del dominio, lo cual es aceptable para garantizar precisión y unicidad, pero añade dependencias externas.

### 3.2 Capa de Aplicación (Application Layer)
- **Fortalezas:**
  - Los Casos de Uso (e.g., `reserve-stock.use-case.ts`) actúan correctamente como orquestadores, delegando la lógica de negocio a las entidades y repositorios.
  - Claridad en la intención de cada caso de uso (nombres expresivos como `ReserveStock`, `RegisterMovement`).
- **Debilidades:**
  - **Leaky Abstractions:** Se observó código como `await stock.batches.init()` dentro de los casos de uso. Esto filtra detalles de implementación de la persistencia (Lazy Loading del ORM) hacia la capa de aplicación. La aplicación no debería saber si una colección está cargada o no; esto debería ser responsabilidad del repositorio o del servicio de dominio al recuperar el agregado.

### 3.3 Capa de Infraestructura (Infrastructure Layer)
- **Fortalezas:**
  - Correcta separación de la implementación de repositorios (`mikro-orm-inventory.repository.ts`) de sus interfaces.
  - El código de infraestructura no contamina el dominio (salvo por los decoradores en las entidades).

### 3.4 Kernel y Shared
- **Fortalezas:**
  - El `kernel` está modularizado (`audit`, `auth`, `finops`, `messaging`), evitando el anti-patrón de "God Object" o "Utils Drawer" desorganizado. Cada módulo tiene su propio `project.json` y límites definidos.

## 4. Malas Prácticas y Anti-Patrones Evaluados

| Anti-Patrón | Estado | Observaciones |
| :--- | :--- | :--- |
| **Circular Dependencies** | **DETECTADO** | En `inventory` domain (Stock <-> StockBatch). Requiere corrección. |
| **Anemic Domain Model** | **AUSENTE** | Las entidades contienen lógica de negocio real. |
| **God Class / God Object** | **AUSENTE** | El Kernel y los módulos están bien segregados por responsabilidad. |
| **Leaky Abstractions** | **DETECTADO** | `stock.batches.init()` en Application Layer expone el mecanismo de carga diferida del ORM. |
| **Tight Coupling** | **MODERADO** | El dominio está acoplado a MikroORM. Es una decisión de diseño (Trade-off), no necesariamente un error, pero reduce la portabilidad del dominio. |

## 5. Recomendaciones

1.  **Resolver Dependencia Circular:** Romper el ciclo entre `Stock` y `StockBatch`. Una opción es usar `IdentifiedReference` o `Reference` de MikroORM para la relación inversa, o simplemente usar `forwardRef` de manera explícita si el ORM lo requiere, pero idealmente refactorizar para que `StockBatch` no necesite importar la clase `Stock` completa si solo necesita el ID.
2.  **Abstraer Lazy Loading:** Evitar llamar a `.init()` en la capa de aplicación. Modificar el repositorio para que `findStock` devuelva el agregado completo (con `batches` cargados) cuando se sepa que se necesitarán, o crear un método específico en el repositorio `findStockWithBatches`.
3.  **Reforzar Límites de Dominio:** Considerar el uso de DTOs de Dominio o interfaces puras si se desea desacoplar completamente de MikroORM en el futuro, aunque dado el estado actual, mantener el acoplamiento pragmático es aceptable si se gestiona con cuidado.
4.  **Linting de Arquitectura:** Configurar reglas de `eslint` o `dependency-cruiser` adicionales para prohibir explícitamente importaciones de `@mikro-orm/core` en archivos que no sean `.entity.ts` dentro de la capa de dominio, para evitar que la lógica de servicios se acople también.

## 6. Conclusión
Virteex ERP presenta una **arquitectura sólida y bien estructurada**, superior al promedio. Las violaciones detectadas (dependencia circular y fugas de abstracción del ORM) son problemas comunes en arquitecturas DDD pragmáticas con ORMs modernos y pueden mitigarse con refactorización menor sin necesidad de reescribir el sistema. El código es mantenible, modular y sigue buenas prácticas de nomenclatura y organización.
