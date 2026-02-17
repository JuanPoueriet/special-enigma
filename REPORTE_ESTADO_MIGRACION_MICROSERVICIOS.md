# Reporte de Estado de Migración a Microservicios - Virteex

**Fecha:** 24 de Mayo de 2025
**Autor:** Jules (Asistente de Ingeniería de Software)

## 1. Resumen Ejecutivo (Executive Summary)

El proyecto **Virteex** se encuentra en una fase de transición avanzada conocida como **"Monolito Híbrido Modular"**.

- **El Núcleo:** La aplicación `virteex-api-gateway` actúa como un monolito modular que contiene la mayoría de los dominios de negocio (Billing, Identity, Payroll, etc.).
- **Los Satélites:** Se han extraído exitosamente servicios como `virteex-catalog-service` (GraphQL Federation) y `virteex-notification-service` (Event Driven).
- **La Infraestructura:** Está preparada para microservicios (Kafka, Redis, Apollo Gateway), pero la base de datos principal (`virteex-postgres`) sigue siendo un punto centralizado de riesgo.

---

## 2. Análisis de Arquitectura (Architecture Analysis)

### Topología Actual
El sistema opera bajo un esquema de **Supergraph** federado con Apollo Gateway (`virteex-gateway`) al frente, orquestando:
1.  **El Monolito Legacy (`virteex-api-gateway`):** Provee la API REST y gran parte de la lógica de negocio.
2.  **El Subgrafo Catálogo (`virteex-catalog-service`):** Un microservicio puro que expone su esquema vía GraphQL Federation.
3.  **Servicios de Apoyo:** `virteex-auth-server` (Identidad), `virteex-notification-service` (Async Workers).

### Estado de los Dominios

| Dominio | Estado | Ubicación Principal | Observaciones |
| :--- | :--- | :--- | :--- |
| **Catalog** | ✅ Extraído | `virteex-catalog-service` | Utiliza `CatalogInfrastructureModule` y base de datos aislable. |
| **Inventory** | 🚧 En Progreso | `virteex-inventory-service` | Existe la app, pero el gateway aún podría tener dependencias. |
| **Billing** | ❌ Monolito | `virteex-api-gateway` | Importado directamente como `BillingPresentationModule`. |
| **Identity** | ⚠️ Híbrido | `virteex-api-gateway` y `virteex-auth-server` | La lógica de presentación sigue en el gateway, aunque auth server maneja tokens. |
| **Payroll** | ❌ Monolito | `virteex-api-gateway` | Totalmente acoplado. |

---

## 3. Puntos Fuertes (Strengths)

1.  **Estructura Nx Monorepo (World-Class):**
    - La organización en `libs/domains` permite mover código de "monolito" a "microservicio" casi sin reescribir lógica. Es la base perfecta para esta migración.

2.  **Diseño Orientado a Dominio (DDD):**
    - La separación estricta de capas (`Presentation`, `Application`, `Domain`, `Infrastructure`) dentro de cada librería facilita reemplazar la capa de infraestructura (BD) sin tocar la lógica de negocio.

3.  **Configuración de Base de Datos Inteligente:**
    - En `virteex-catalog-service`, la configuración de MikroORM busca primero variables específicas (`CATALOG_DB_HOST`) antes de caer en las genéricas (`DB_HOST`). Esto permite aislamiento progresivo.

4.  **Adopción de GraphQL Federation:**
    - Usar Apollo Federation permite unificar el grafo de datos sin acoplar los backends. El cliente frontend no sabe si los datos vienen del monolito o del microservicio.

---

## 4. Puntos Débiles (Weaknesses) & Riesgos

1.  **Riesgo de Base de Datos Compartida (Shared Database):**
    - Aunque el código permite aislamiento, el `docker-compose.yml` levanta un único contenedor Postgres. Si `virteex-catalog-service` no tiene configurada `CATALOG_DB_NAME`, por defecto usará `virteex` (la BD del monolito), creando un acoplamiento de datos peligroso.

2.  **El "God Service" (`virteex-api-gateway`):**
    - `app.module.ts` importa explícitamente todos los módulos de presentación (`BillingPresentationModule`, etc.). Esto significa que un error de compilación en Payroll rompe el despliegue de Billing.
    - El tiempo de inicio y consumo de memoria del Gateway crecerá linealmente con cada nuevo módulo.

3.  **Complejidad de Desarrollo Local:**
    - Levantar todo el stack (Gateway + Kafka + Redis + Zookeeper + Postgres + N Microservicios) requiere muchos recursos.
    - No hay un perfil claro de "solo monolito" vs "full microservicios" para desarrolladores junior.

---

## 5. Buenas Prácticas Observadas

- **Uso de Librerías Compartidas (`libs/shared`):** Excelente reutilización de DTOs y utilidades (config, auth guards).
- **Middleware de Multitenancy:** `JwtTenantMiddleware` está centralizado en una librería y se reutiliza en todos los servicios, asegurando consistencia en la seguridad.
- **Inyección de Dependencias:** El uso de `CrossDomainInfrastructureModule` permite simular o desacoplar dependencias entre dominios.

## 6. Malas Prácticas / Áreas de Mejora

- **Falta de Validación Estricta de Variables de Entorno en Microservicios:**
    - Debería ser **obligatorio** definir `CATALOG_DB_NAME` en producción. El fallback a `DB_NAME` (la del monolito) debería estar prohibido o alertado en entornos productivos para evitar corrupción de datos cruzada.
- **Acoplamiento de Despliegue en el Monolito:**
    - Seguir desplegando `virteex-api-gateway` como un todo gigante ralentiza el ciclo de entrega continua (CI/CD).

---

## 7. Recomendaciones

1.  **Forzar Aislamiento de Datos:**
    - Crear bases de datos lógicas separadas en Postgres (`virteex_catalog`, `virteex_inventory`) y asegurar que los microservicios SOLO tengan credenciales para su propia BD.

2.  **Eliminar Módulos del Gateway:**
    - Una vez que `virteex-catalog-service` esté estable, **eliminar** `CatalogPresentationModule` de los imports de `virteex-api-gateway`. El tráfico debe ir directo al microservicio a través del Apollo Gateway.

3.  **Estandarizar Comunicación Asíncrona:**
    - Usar Kafka para toda comunicación entre dominios (ej. Billing escuchando eventos de Catalog) en lugar de llamadas HTTP síncronas entre microservicios, para mejorar la resiliencia.
