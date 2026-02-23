# Informe de Análisis de Diseño Arquitectónico - Módulo de Subscription

## Diagnóstico General
Tras una evaluación profunda del módulo de suscripciones (`libs/domains/subscription`), se concluye que, si bien la estructura física sigue el patrón de monorepo Nx y la división de capas propia de Clean Architecture, existe una degradación semántica y de responsabilidades en la implementación técnica. El sistema presenta síntomas claros de **acoplamiento excesivo en la capa de presentación** y una **dilución de la lógica de negocio** que ha migrado desde los Casos de Uso hacia los controladores de infraestructura (específicamente en el manejo de Webhooks). La falta de una distinción clara entre "creación" y "gestión del ciclo de vida" introduce ambigüedad que dificulta la mantenibilidad y escalabilidad del sistema de monetización.

---

## Análisis Detallado

### 1. Misnomer (Nombre inapropiado o engañoso)
*   **Evidencia:** `CreateSubscriptionUseCase.execute` (líneas 43-55).
*   **Análisis:** El nombre de la clase sugiere una operación de "solo creación" (idempotente o de alta inicial). Sin embargo, el método `execute` contiene lógica de bifurcación que decide si crear una nueva suscripción en Stripe o actualizar una existente (`subscriptionGateway.updateSubscription`).
*   **Violación:** Existe una desalineación semántica. Un desarrollador que busque la lógica de "Upgrade/Downgrade" no esperaría encontrarla dentro de un caso de uso llamado "Create".
*   **Severidad:** Media.

### 2. Violación del Principio de Responsabilidad Única (SRP)
*   **Evidencia:** `StripeWebhookController` (métodos `handleCheckoutSessionCompleted`, `handleSubscriptionUpdated`).
*   **Análisis:** El controlador no solo actúa como punto de entrada (Infrastructure/Presentation), sino que realiza orquestación de dominio: busca planes, crea entidades `Subscription`, mapea estados complejos y persiste cambios directamente en los repositorios.
*   **Violación:** El controlador tiene múltiples razones para cambiar: cambios en la API de Stripe, cambios en las reglas de negocio de activación de planes, o cambios en la persistencia.
*   **Severidad:** Alta.

### 3. God Object / God Class
*   **Evidencia:** `StripeWebhookController`.
*   **Análisis:** Esta única unidad de código concentra el control de flujo de todo el ciclo de vida post-venta: confirmación de sesión, éxito de pago, fallo de pago, actualizaciones de periodo y cancelaciones.
*   **Violación:** Concentra demasiadas responsabilidades orquestando, transformando y persistiendo dentro de la misma unidad de presentación.
*   **Severidad:** Alta.

### 4. Baja Cohesión (Low Cohesion)
*   **Evidencia:** `SubscriptionController`.
*   **Análisis:** El controlador mezcla dos estrategias de negocio distintas: la suscripción directa vía API (usando `paymentMethodId`) y la suscripción delegada vía Stripe Checkout.
*   **Violación:** Las funciones no están conceptualmente relacionadas por el mismo flujo de usuario. Uno es un flujo síncrono de backend, el otro es un flujo asíncrono basado en redirecciones y sesiones externas.
*   **Severidad:** Media.

### 5. Wrong Abstraction
*   **Evidencia:** `CreateSubscriptionUseCase` (líneas 75-79).
*   **Análisis:** El código mapea el estado de Stripe `incomplete` a `SubscriptionStatus.TRIAL`.
*   **Violación:** La abstracción modela incorrectamente el dominio. `incomplete` en Stripe significa que el primer pago falló o está pendiente (SCA), mientras que `TRIAL` es una regla de negocio de cortesía temporal. Confundir ambos estados impide una gestión correcta de la recuperación de pagos (Dunning).
*   **Severidad:** Media.

### 6. Semantic Drift (Deriva Semántica)
*   **Evidencia:** Manejo de eventos `invoice.*` dentro del módulo de `Subscription`.
*   **Análisis:** El módulo ha evolucionado para gestionar facturas (`invoices`), lo cual es una responsabilidad que pertenece conceptualmente al dominio de `Billing`.
*   **Violación:** El módulo parece haber sobrepasado su intención original de "gestionar el contrato de suscripción" para convertirse en un gestor de pagos y facturación encubierto.
*   **Severidad:** Media.

---

## Recomendaciones de Refactorización

### 1. Rediseño de la Capa de Aplicación
*   **Separación de Use Cases:** Dividir `CreateSubscriptionUseCase` en dos: `SubscribeToPlanUseCase` (para el alta inicial) y `ChangeSubscriptionPlanUseCase` (para upgrades/downgrades).
*   **Encapsulamiento:** Crear un `CustomerManagementService` en el dominio para manejar la creación y actualización de clientes en la pasarela, evitando duplicidad de lógica.

### 2. Desacoplamiento de Webhooks (Patrón Observer/Events)
*   **Implementación de Comandos:** El `StripeWebhookController` debe limitarse a recibir el evento y despacharlo a un `WebhookProcessor` o mediante un `CommandBus`.
*   **Handlers Dedicados:** Crear un "Handler" por cada tipo de evento de Stripe que invoque los casos de uso correspondientes, eliminando la lógica de persistencia del controlador.

### 3. Refinamiento del Modelo de Dominio
*   **Corrección de Estados:** Introducir `SubscriptionStatus.PAYMENT_PENDING` en la entidad `Subscription` para mapear correctamente el estado `incomplete`.
*   **Ubiquitous Language:** Asegurar que los nombres en el código reflejen los términos de negocio y no los términos técnicos de la API de Stripe.

### 4. Reubicación de Responsabilidades
*   **Integración Inter-Dominio:** Mover el manejo de eventos de facturación (`invoice.succeeded`) al módulo de `Billing`. El módulo de `Subscription` debería reaccionar a eventos internos del sistema (ej: `InvoicePaidEvent`) para actualizar el estado de la suscripción, en lugar de acoplarse directamente a los webhooks de Stripe de otro dominio.
