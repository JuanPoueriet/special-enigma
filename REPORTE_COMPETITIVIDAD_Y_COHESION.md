# Reporte de Competitividad Funcional y Cohesión Modular

**Autor:** Jules (Analista Técnico / Arquitecto de Producto)
**Fecha:** 15 de Junio de 2025
**Proyecto:** Virteex ERP (Enterprise Grade Analysis)

---

## 1. Resumen Ejecutivo

El sistema actual presenta una arquitectura moderna y bien estructurada ("Modular Hybrid Monolith") basada en NestJS, Nx y Clean Architecture (Hexagonal/Ports & Adapters). Destaca su fuerte enfoque en la localización mexicana (CFDI, SAT Catalogos) y su estrategia de desacoplamiento progresivo mediante Event Sourcing (Kafka).

Sin embargo, funcionalmente **NO cumple aún con el estándar "Enterprise Grade"** (comparable a NetSuite, SAP B1 u Odoo Enterprise) debido a la ausencia de profundidad en módulos críticos como Manufactura (Ruteo/Centros de Trabajo), Inventario (Trazabilidad Lote/Serie) y Contabilidad Analítica/Multi-moneda.

---

## 2. ¿Qué Falta? (Brechas Funcionales vs Enterprise ERPs)

Esta sección detalla las funcionalidades críticas que un ERP empresarial debe tener y que actualmente no están implementadas en el código base.

### 2.1. Núcleo Financiero (Accounting & Treasury)
El módulo contable es actualmente un "Libro Mayor" básico, no un motor financiero completo.

*   **Falta Contabilidad Multi-moneda Real:** Las líneas de póliza (`JournalEntryLine`) no tienen campos para `amount_currency` (monto en moneda original) ni `currency_id`. Esto impide llevar cuentas por pagar/cobrar en dólares y revaluar tipos de cambio automáticamente.
*   **Falta Contabilidad Analítica / Centros de Costo:** No existe el concepto de "Dimensiones Analíticas" o "Centros de Costo" en las líneas de los asientos. Imposible generar P&L por departamento o proyecto.
*   **Falta Conciliación Bancaria:** El módulo de Tesorería (`Treasury`) registra transacciones (`Transaction`), pero no tiene lógica de conciliación con estados de cuenta bancarios (importación de extractos, matching rules).
*   **Falta Libro Auxiliar de Socios (Partner Ledger):** Los asientos contables no tienen un campo `partner_id` (Cliente/Proveedor) obligatorio en las líneas de balance (CXC/CXP). La conciliación de facturas vs pagos se hace difícil de rastrear contablemente.

### 2.2. Logística y Cadena de Suministro (Inventory & Manufacturing)
Este es el punto más débil para competir en mercados de manufactura o distribución seria.

*   **CRÍTICO: Falta Trazabilidad (Lotes y Series):** La entidad `Stock` solo maneja cantidades (`quantity`). No existe soporte para Números de Serie (electrónica, maquinaria) ni Lotes/Caducidad (alimentos, farma). Esto descalifica al producto para muchas industrias reguladas.
*   **Falta Valoración de Inventario (Landed Costs):** No hay mecanismo para prorratear costos logísticos (fletes, aduanas) al valor del inventario. La valoración parece ser puramente transaccional sin recálculo de costo promedio ponderado o FIFO real.
*   **Falta Manufactura Real (MRP II):**
    *   No hay **Centros de Trabajo** (Work Centers) ni **Rutas de Producción**. Solo es una "Lista de Materiales" (BOM) plana.
    *   No hay planificación de capacidad (CRP).
    *   No hay gestión de **Desperdicios (Scrap)** ni Subproductos.
    *   La Orden de Producción (`ProductionOrder`) es solo un plan, no registra consumo real de materiales vs planeado (Backflushing).

### 2.3. Operaciones Comerciales (Purchasing & Billing)
Funcional pero básico.

*   **Faltan Workflows de Aprobación:** Las Órdenes de Compra (`PurchaseOrder`) tienen un estado, pero no hay lógica de límites por usuario, ni flujo de autorización jerárquica.
*   **Falta Gestión de Precios Compleja:** No existen **Listas de Precios** (Pricelists) con reglas avanzadas (descuentos por volumen, vigencia, moneda) ni para Compras ni para Ventas.
*   **Falta Gestión de Notas de Crédito Explícita:** La entidad `Invoice` maneja el concepto, pero no hay tipos de documento claros (`CREDIT_NOTE`, `DEBIT_NOTE`) ni lógica de asignación/aplicación de saldo a facturas originales.

---

## 3. ¿Sobra o está mal agrupado? (Evaluación de Cohesión Modular)

El sistema está en transición de Monolito a Microservicios. La arquitectura base es sólida, pero existen deudas técnicas de la migración.

### 3.1. Acoplamiento Inapropiado (Tight Coupling)
*   **Inventario -> Catálogo:** Se detectó que el módulo de Inventario (`libs/domains/inventory`) inyecta directamente el Repositorio de Productos del Catálogo (`ProductRepository`).
    *   *Problema:* Esto viola la independencia del microservicio. Si `Catalog` cambia su base de datos o esquema, `Inventory` se rompe.
    *   *Solución:* Inventario debería usar su propia réplica de datos de producto (como lo hace Billing) o consultar vía API/gRPC, nunca compartir la capa de persistencia (ORM).

### 3.2. Duplicación de Datos (Estrategia Correcta pero Riesgosa)
*   **Billing Products Replica:** El servicio de Facturación mantiene su propia tabla `billing_products`.
    *   *Evaluación:* Esto es **CORRECTO** arquitectónicamente para microservicios (asegura que una factura histórica no cambie si cambia el nombre del producto en el catálogo).
    *   *Riesgo:* Requiere una sincronización por eventos (Kafka) robusta e idempotente. Se debe asegurar que existan mecanismos de reconciliación en caso de fallo de eventos.

### 3.3. Límites de Contexto (Bounded Contexts)
*   **Kernel Compartido:** La existencia de `libs/kernel` (Auth, Tenant, FinOps) es una buena práctica para lógica transversal.
*   **Clean Architecture:** La separación en `domain`, `application`, `infrastructure` y `presentation` se respeta rigurosamente en la mayoría de los módulos. Esto facilita enormemente la mantenibilidad y las pruebas unitarias.

---

## 4. Recomendaciones Prioritarias

1.  **Implementar Trazabilidad:** Agregar `serial_number` y `lot_id` a la entidad `Stock` y `InventoryMovement`. Es un *must-have*.
2.  **Profundizar Contabilidad:** Agregar `currency_id`, `amount_currency` y `analytic_account_id` a `JournalEntryLine`.
3.  **Desacoplar Inventario:** Eliminar la dependencia directa de `ProductRepository` en Inventario y usar eventos o una interfaz de servicio remoto.
4.  **Workflows:** Implementar un motor de reglas simple para aprobaciones de Compras (ej. "Si total > $5000, requiere aprobación de Gerente").
