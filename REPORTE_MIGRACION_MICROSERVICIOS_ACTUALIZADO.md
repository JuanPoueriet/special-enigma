# Reporte de Estado y Análisis de Migración a Microservicios (Actualizado)

**Fecha:** 24 de Mayo de 2025
**Autor:** Jules (Asistente de Ingeniería de Software)

## 1. Resumen Ejecutivo

El proyecto Virteex opera actualmente bajo una arquitectura de **Monolito Modular Híbrido**. Si bien el código fuente está excelentemente estructurado en un monorepo Nx con límites de dominio claros (DDD), el despliegue principal (`virteex-api-gateway`) sigue agrupando la gran mayoría de la lógica de negocio en un solo proceso.

Se han iniciado esfuerzos de migración con la extracción de `virteex-catalog-service` (GraphQL Federation) y `virteex-notification-service` (Async Worker), pero persisten acoplamientos críticos a nivel de infraestructura, especialmente en la base de datos.

---

## 2. Análisis de Arquitectura Actual

### Topología
- **Core (Monolito):** `virteex-api-gateway`. Importa directamente los módulos de presentación de `Billing`, `Identity`, `Inventory`, `Payroll`, `CRM`, etc.
- **Microservicios Activos:**
  - `virteex-catalog-service`: Subgrafo de Apollo Federation.
  - `virteex-fiscal-connector`: Gateway de facturación independiente.
  - `virteex-notification-service`: Consumidor de eventos (Kafka/Redis).
- **Base de Datos:** Instancia única de PostgreSQL (`virteex_core`) compartida.

### Acoplamiento
- **Código:** Bajo. Los dominios están aislados en librerías (`libs/domains/*`) y no se importan entre sí directamente (reglas ESLint).
- **Despliegue:** Alto. El 90% de la funcionalidad reside en el Gateway.
- **Datos:** Crítico. Todos los servicios comparten la misma cadena de conexión y credenciales de base de datos (según análisis de `app.module.ts`).

---

## 3. Puntos Fuertes (Fortalezas)

1.  **Estructura de Código (Nx + DDD):**
    - La separación física en `libs/domains/<domain>/<layer>` es ejemplar. Migrar un dominio a un microservicio es casi tan simple como mover la importación del módulo de la aplicación principal a una nueva aplicación NestJS.
    - El uso de **Clean Architecture** (Presentation, Application, Domain, Infrastructure) desacopla la lógica de negocio del framework.

2.  **Infraestructura de Mensajería:**
    - El stack tecnológico ya incluye **Kafka** y **Redis** configurados en `docker-compose.yml`.
    - Existe un módulo compartido `KafkaModule` que facilita la integración de eventos.

3.  **Observabilidad:**
    - La inclusión de **Jaeger** y OpenTelemetry (`@opentelemetry/*`) demuestra una preparación proactiva para el rastreo distribuido.

4.  **Federación de Grafos:**
    - La adopción de **Apollo Federation** para el API Gateway (`virteex-gateway`) permite componer APIs de múltiples subgrafos (Monolito + Catalog Service) de manera transparente al cliente.

---

## 4. Puntos Débiles (Debilidades)

1.  **Base de Datos Compartida (Shared Database Pattern):**
    - `virteex-api-gateway` y `virteex-catalog-service` leen las mismas variables de entorno (`DB_HOST`, `DB_NAME`, `DB_USER`).
    - **Riesgo:** Si un servicio altera el esquema o satura las conexiones, afecta a todos los demás. No hay aislamiento real de datos.

2.  **El "God Service" (`virteex-api-gateway`):**
    - Al importar todos los módulos de presentación, el tiempo de inicio y la huella de memoria del gateway son altos.
    - Un fallo de memoria en un módulo secundario (ej. `Treasury`) podría derribar el servicio de `Identity` o `Billing`.

3.  **Gestión de Configuración Centralizada:**
    - La dependencia de variables de entorno globales compartidas dificulta la configuración específica por servicio (ej. diferentes pools de conexiones para diferentes servicios).

---

## 5. Buenas Prácticas Observadas

- **Uso de DTOs:** Transferencia de datos tipada y validada entre capas.
- **Abstracción de Puertos:** Los casos de uso dependen de interfaces (`Repository`), no de implementaciones concretas (`MikroOrmRepository`), facilitando el testing y la sustitución de infraestructura.
- **Librerías Compartidas:** Reutilización efectiva de código común (`@virteex/shared-*`) sin violar límites de dominio.

---

## 6. Malas Prácticas / Riesgos Detectados

- **Configuración de Kafka Hardcodeada:** El `KafkaModule` compartido define un `clientId` fijo (`virteex`) y `groupId` por defecto (`virteex-consumer`). Si múltiples microservicios usan este módulo sin sobreescribir estas opciones, competirán por los mensajes o duplicarán el procesamiento incorrectamente.
- **Secretos en Variables de Entorno (Dev):** Aunque es común en desarrollo, asegurar que en producción cada microservicio tenga sus propias credenciales rotadas es vital.

---

## 7. Recomendaciones de Migración (Roadmap)

### Fase 1: Aislamiento de Datos (Prioridad Alta)
Antes de extraer más código, se deben separar los datos.
- **Acción:** Crear esquemas lógicos en Postgres (`schema: 'catalog'`, `schema: 'billing'`) o bases de datos físicas separadas.
- **Acción:** Crear usuarios de base de datos específicos por servicio (`user_catalog`, `user_billing`) con permisos restringidos a su esquema.

### Fase 2: Patrón Strangler Fig (Continuar)
Continuar "estrangulando" al monolito extrayendo dominios uno a uno.
- **Candidato:** `Inventory` o `FixedAssets` (bajo acoplamiento, alta cohesión).
- **Estrategia:**
    1. Mover tablas a nuevo esquema.
    2. Crear nueva app NestJS (`virteex-inventory-service`).
    3. Importar `InventoryPresentationModule` en la nueva app.
    4. Eliminar importación del Monolito.
    5. Enrutar tráfico vía Apollo Gateway o Reverse Proxy.

### Fase 3: Comunicación Asíncrona por Defecto
Reducir el acoplamiento temporal entre servicios.
- **Acción:** En lugar de consultas HTTP síncronas entre microservicios, preferir la replicación de datos mediante eventos de dominio (Kafka).
- **Ejemplo:** Si `Billing` necesita datos de `Customer`, debe escuchar `CustomerUpdated` y tener una copia local (o caché), en lugar de llamar a `IdentityService` en cada factura.

### Fase 4: Refinar Configuración de Kafka
- **Acción:** Actualizar `KafkaModule` para obligar a pasar `clientId` y `groupId` al importarlo, evitando valores por defecto peligrosos.

---

**Conclusión:** Virteex está en una posición envidiable para migrar a microservicios gracias a su diseño de software disciplinado. El mayor reto actual no es de código, sino de infraestructura de datos y operación.
