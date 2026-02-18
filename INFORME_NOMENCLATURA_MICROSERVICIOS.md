# INFORME DE NOMENCLATURA Y ESTÁNDARES DE MICROSERVICIOS

**Fecha:** 2025-06-15
**Alcance:** Microservicios Independientes (Catalog, Auth, Billing, CRM, Inventory) y Servicios Auxiliares.
**Calificación Global:** **B+ (Bueno con Inconsistencias Notables)**

---

## 1. Resumen Ejecutivo

La arquitectura de microservicios de Virteex demuestra un **buen nivel de madurez** en cuanto a separación física y lógica (bases de datos, repositorios, despliegue). Sin embargo, la **nomenclatura no es 100% consistente**, lo cual genera fricción cognitiva y revela deuda técnica en la evolución de los nombres de los servicios.

Mientras que los servicios más nuevos (`billing`, `catalog`, `crm`) siguen un estándar claro (`virteex-<dominio>-service`), existen excepciones críticas como `virteex-auth-server` y `virteex-jobs` que rompen la simetría.

---

## 2. Análisis Detallado de Nomenclatura

### 2.1. Estándar Identificado (El "Deber Ser")
El patrón dominante y recomendado que se observa es:
*   **Nombre del Servicio:** `virteex-<dominio>-service`
*   **Nombre de Base de Datos:** `virteex_<dominio>`
*   **Grupo de Consumo Kafka:** `<dominio>-consumer`
*   **Librería de Dominio:** `libs/domains/<dominio>`

### 2.2. Evaluación por Servicio

| Servicio Actual | Dominio (DDD) | Base de Datos | Kafka Group ID | Estado | Observaciones Críticas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **virteex-catalog-service** | Catalog | `virteex_catalog` | `catalog-consumer` | ✅ **Excelente** | Cumple con todos los estándares. Es el modelo a seguir. |
| **virteex-billing-service** | Billing | `virteex_billing` | `billing-consumer` (implícito) | ✅ **Excelente** | Consistente en todas las capas. |
| **virteex-crm-service** | CRM | `virteex_crm` | `crm-service-consumer` | ✅ **Excelente** | Consistente. |
| **virteex-inventory-service** | Inventory | `virteex_inventory` | `inventory-consumer` | ✅ **Excelente** | Consistente. |
| **virteex-auth-server** | **Identity** | `virteex_identity` | N/A | ❌ **Inconsistente** | **Error de Concepto:** El nombre `auth-server` hace referencia a un rol técnico (OAuth2 Server), pero el dominio de negocio es `Identity`. La base de datos (`virteex_identity`) y las librerías (`libs/domains/identity`) usan el nombre correcto. El servicio debería llamarse `virteex-identity-service`. |
| **virteex-jobs** | Jobs/Scheduler | N/A | N/A | ⚠️ **Mejorable** | Falta el sufijo `-service`. Debería ser `virteex-scheduler-service` o `virteex-job-service` para mantener la uniformidad. |
| **virteex-fiscal-connector** | Fiscal | N/A | `fiscal-consumer` | ⚠️ **Atípico** | Usa el sufijo `-connector` en lugar de `-service`. Esto es aceptable si su *única* función es conectar con APIs externas (PACs), pero si contiene lógica de negocio fiscal, debería ser `virteex-fiscal-service`. |

---

## 3. Análisis de Prácticas y Coherencia

### ✅ Buenas Prácticas Detectadas
1.  **Prefijo `virteex-`:** El uso del prefijo corporativo en todos los `apps/` es excelente para la gestión en un monorepo y para evitar colisiones de nombres en contenedores Docker o clusters K8s.
2.  **Kebab-case:** Se respeta estrictamente el uso de `kebab-case` para nombres de carpetas y archivos, lo cual es el estándar de facto en ecosistemas Node.js/Linux.
3.  **Consistencia Base de Datos:** Los nombres de las bases de datos (`virteex_<dominio>`) son perfectamente predecibles y consistentes.

### ❌ Malas Prácticas / Inconsistencias
1.  **Mezcla de Conceptos Técnicos y de Negocio:** Llamar a un servicio `auth-server` (rol técnico) cuando su dominio es `Identity` (rol de negocio) es una práctica heredada común pero incorrecta en DDD puro.
2.  **Sufijos Inconsistentes:** Tener servicios terminados en `-service`, `-server`, `-connector` y otros sin sufijo (`-jobs`) dificulta la automatización (ej: scripts de despliegue que busquen `*-service`).
3.  **Consumer Groups:** `crm-service-consumer` incluye la palabra `service`, mientras que `catalog-consumer` no. Deberían estandarizarse a `<dominio>-consumer` (ej: `crm-consumer`).

---

## 4. Recomendaciones para "Nivel Enterprise"

Para alcanzar un nivel de coherencia y profesionalismo "Enterprise", se recomienda realizar las siguientes refactorizaciones de nombre (Rename Refactoring):

### Prioridad Alta (Eliminar Confusión)
1.  **Renombrar:** `virteex-auth-server` ➡️ `virteex-identity-service`.
    *   *Razón:* Alinear con el Dominio (`Identity`), la Base de Datos (`virteex_identity`) y el estándar del resto de servicios.

### Prioridad Media (Estandarización)
2.  **Renombrar:** `virteex-jobs` ➡️ `virteex-scheduler-service`.
    *   *Razón:* Explicita que es un servicio y no un script suelto.
3.  **Estandarizar Kafka Groups:** Asegurar que todos sigan el patrón `<dominio>-consumer` (sin la palabra `service` redundante).
    *   `crm-service-consumer` ➡️ `crm-consumer`
    *   `api-gateway-consumer` ➡️ `gateway-consumer` (o `api-consumer`)

### Prioridad Baja (Semántica)
4.  **Evaluar:** `virteex-fiscal-connector` ➡️ `virteex-fiscal-service`.
    *   *Razón:* Si a futuro este servicio manejará reglas fiscales y no solo conexión, el nombre actual quedará chico.
