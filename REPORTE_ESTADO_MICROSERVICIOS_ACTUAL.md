# Reporte de Estado de Migración a Microservicios y Arquitectura

**Fecha:** 4 de Junio de 2025
**Proyecto:** Virteex (SaaS ERP)

## 1. Resumen Ejecutivo

El sistema se encuentra en una etapa de **Monolito Híbrido** avanzada. Si bien existe un monolito central (`virteex-api-gateway`) que agrupa la mayoría de los dominios de negocio (12+ dominios incluyendo Billing, Identity, Payroll, etc.), se ha iniciado exitosamente la extracción de dominios críticos hacia microservicios independientes (`Catalog`, `Inventory`, `Fiscal Connector`, `Notification`).

La arquitectura base es sólida, utilizando **Clean Architecture** y **Domain-Driven Design (DDD)** facilitado por un monorepo Nx, lo que permite una transición gradual (estrategia *Strangler Fig*) sin reescribir todo el código.

---

## 2. Estado Actual de la Arquitectura

### Componentes Principales

1.  **Monolito Modular (`virteex-api-gateway`):**
    *   Actúa como el núcleo legacy/principal.
    *   Contiene dominios como: Billing, Identity, Accounting, Payroll, CRM, Treasury, Projects, Purchasing, Manufacturing, BI, Admin, Fiscal.
    *   Utiliza una base de datos compartida (lógica o física) para estos dominios.

2.  **Microservicios Extraídos:**
    *   **`virteex-catalog-service`:** Servicio GraphQL (Apollo Federation Subgraph). Totalmente desacoplado del monolito a nivel de código.
    *   **`virteex-inventory-service`:** Servicio REST/Event-Driven. Utiliza repositorios remotos (`RemoteProductRepository`) para evitar acoplamiento directo con Catalog.
    *   **`virteex-notification-service`:** Servicio de infraestructura para manejo de colas (BullMQ) y eventos.
    *   **`virteex-fiscal-connector`:** Consumidor de eventos Kafka para integración fiscal externa.

3.  **Infraestructura de Comunicación:**
    *   **Síncrona:** REST (interno/externo) y GraphQL (Federation para Catalog).
    *   **Asíncrona:** Kafka (eventos de dominio) y BullMQ (trabajos en segundo plano).
    *   **Gateway:** `virteex-gateway` actúa como Supergraph Gateway para GraphQL, mientras que `virteex-api-gateway` maneja tráfico REST directo.

---

## 3. Puntos Fuertes (Fortalezas)

*   **Modularidad Estricta (Nx):** El uso de librerías segregadas por capas (`domain`, `application`, `infrastructure`, `presentation`) dentro de `libs/domains/*` impide importaciones circulares y facilita la extracción de código. Mover un dominio a un microservicio es casi "copiar y pegar" la configuración del módulo.
*   **Independencia de Base de Datos:** Los servicios están configurados para aceptar variables de entorno específicas para su conexión a BD (`CATALOG_DB_HOST`, `INVENTORY_DB_HOST`), permitiendo separación física sin cambios de código.
*   **Abstracción de Dependencias:** El uso de patrones como *Dependency Injection* para repositorios externos (ej. `RemoteProductRepository` en Inventory) permite simular o cambiar implementaciones sin afectar la lógica de negocio.
*   **Arquitectura Orientada a Eventos:** El uso de Kafka para comunicar cambios de estado (ej. facturación -> fiscal) reduce el acoplamiento temporal entre servicios.

---

## 4. Puntos Débiles y Riesgos

*   **Acoplamiento en Base de Datos (Shared Database Risk):** Aunque el código soporta separación, la configuración por defecto (`docker-compose.yml`) levanta una única instancia de Postgres (`virteex_core`). Existe el riesgo operativo de que, por conveniencia, los microservicios acaben compartiendo tablas o esquemas si no se enforcea la separación (ej. Foreign Keys entre esquemas de distintos servicios).
*   **Monolito "Gordo" (`virteex-api-gateway`):** Aún concentra demasiada responsabilidad. Un fallo en este servicio tumba 12 áreas de negocio críticas.
*   **Complejidad Operativa:** Mantener Apollo Federation + REST API Gateway + Kafka + Zookeeper + Redis + Postgres incrementa la carga cognitiva y los requisitos de infraestructura para desarrollo local y producción.
*   **Duplicidad de Configuración:** Al extraer servicios, se debe tener cuidado de no duplicar lógica de infraestructura transversal (logging, auth, filtros de excepción) de manera inconsistente. Actualmente se mitiga con librerías compartidas (`libs/shared`), pero requiere disciplina.

---

## 5. Buenas Prácticas Identificadas

*   **Clean Architecture:** Separación clara de responsabilidades. La lógica de negocio no conoce de controladores HTTP ni de Kafka.
*   **DTOs y Validación:** Uso extensivo de DTOs con `class-validator` para asegurar la integridad de datos en la entrada.
*   **Configuración Centralizada:** Uso de `@nestjs/config` y variables de entorno para todo, evitando *hardcoding*.
*   **Uso de Interfaces:** Los servicios de dominio dependen de interfaces (puertos), no de implementaciones concretas (adaptadores).

## 6. Malas Prácticas / Áreas de Mejora

*   **Coexistencia de Estilos de API:** Tener GraphQL Federation para unos servicios y REST para otros en el mismo ecosistema puede confundir a los consumidores del frontend si no se unifica tras un único Gateway o patrón (BFF).
*   **Dependencias Directas en Monolito:** El `app.module.ts` del monolito importa demasiados módulos de presentación directamente. Esto aumenta el tiempo de arranque y consumo de memoria.

---

## 7. Recomendaciones y Roadmap

1.  **Consolidar Separación de Datos:**
    *   Asegurar que en entornos de QA y Producción, `virteex-catalog-service` y `virteex-inventory-service` tengan *credenciales de base de datos distintas* que solo les permitan acceder a sus propios esquemas/DBs.

2.  **Continuar Extracción (Strangler Fig):**
    *   Siguientes candidatos a extracción: `Identity` (para centralizar autenticación fuera del monolito de negocio) y `Billing` (dado que ya emite eventos a Kafka).

3.  **Unificar Gateway:**
    *   Evaluar mover más dominios a GraphQL Federation o implementar un API Gateway unificado (ej. Kong o Nginx) que enrute transparente a REST o GraphQL según el path, ocultando la topología al frontend.

4.  **Observabilidad Distribuida:**
    *   Asegurar que el *Trace ID* se propague correctamente entre llamadas HTTP (Gateway -> Microservicio) y mensajes Kafka para poder depurar transacciones distribuidas.
