## Diagnóstico General
El módulo de Suscripciones de Virteex presenta una arquitectura basada en Clean Architecture que, si bien es modular y sigue patrones de diseño modernos (NestJS, DDD), adolece de fugas de responsabilidad y abstracciones incorrectas en su integración con proveedores externos. La principal preocupación reside en la dilución de las fronteras entre las capas de Aplicación e Infraestructura, la presencia de componentes "God" que centralizan lógica dispar, y una deriva semántica que ata el dominio de negocio a la implementación técnica de Stripe.

## Análisis Detallado

### 1. Misnomer (Nombre inapropiado o engañoso)
- **Evidencia:** Clase `CustomerManagementService` en `libs/domains/subscription/domain/src/lib/services/customer-management.service.ts`.
- **Análisis:** El nombre sugiere una gestión integral del ciclo de vida del cliente (CRUD, perfiles, CRM). Sin embargo, su única responsabilidad real es `getOrCreateCustomerId`, actuando como un mero mapeador de identidad entre el Tenant local y el Customer de Stripe. No "gestiona" al cliente en el sentido semántico del dominio.
- **Severidad:** Baja.

### 2. Violación del Principio de Responsabilidad Única (SRP)
- **Evidencia:** `SubscriptionLifecycleListener` en `libs/domains/subscription/application/src/lib/listeners/subscription-lifecycle.listener.ts`.
- **Análisis:** Este componente tiene múltiples razones para cambiar: cambios en la estructura de eventos de Stripe, cambios en el mapeo de estados, y cambios en la lógica de persistencia del dominio. El método `handleCheckoutSessionCompleted` contiene lógica compleja de creación de entidades y búsqueda de planes que debería residir en un Caso de Uso. Un Listener debe ser solo un adaptador de entrada.
- **Severidad:** Alta.

### 3. Baja cohesión (Low Cohesion)
- **Evidencia:** `StripeSubscriptionAdapter` en `libs/domains/subscription/infrastructure/src/lib/adapters/stripe-subscription.adapter.ts`.
- **Análisis:** Agrupa funcionalidades conceptualmente distintas: gestión de clientes (Identity), creación de suscripciones (Billing), y generación de URLs de redirección (UI/UX). Aunque todas interactúan con Stripe, su cohesión es puramente tecnológica ("todo lo que usa la SDK de Stripe va aquí") y no funcional.
- **Severidad:** Media.

### 4. God Object / God Class
- **Evidencia:** `StripeSubscriptionAdapter`.
- **Análisis:** Este adaptador se ha convertido en el punto central de toda la lógica de monetización externa. Al manejar desde la creación de un cliente hasta la orquestación de sesiones de portal, se vuelve difícil de testear aisladamente y viola la segregación de interfaces.
- **Severidad:** Media.

### 5. Wrong Abstraction
- **Evidencia:** Interfaz `SubscriptionGateway` (Port) y su implementación. Incluye métodos como `createPortalSession` que retornan strings (URLs).
- **Análisis:** Mezcla preocupaciones de estado de dominio (persistencia de suscripciones) con preocupaciones de flujo de presentación (redirecciones web). Un Gateway de dominio no debería saber nada sobre "URLs de retorno" o "URLs de éxito", que son detalles de implementación de la interfaz de usuario.
- **Severidad:** Media.

### 6. Semantic Drift (Deriva Semántica)
- **Evidencia:** Entidad `Subscription` en `libs/domains/subscription/domain/src/lib/entities/subscription.entity.ts` y `Tenant` en `libs/kernel/tenant/src/lib/entities/tenant.entity.ts`.
- **Análisis:** La entidad `Subscription` contiene campos prefijados con `stripe*`, lo que indica que el dominio ha sido "colonizado" por el proveedor. Adicionalmente, la entidad `Tenant` del Kernel está asumiendo responsabilidades de suscripción (campo `plan` y `settings.subscriptionStatus`), lo que diluye la definición de lo que es un Tenant (infraestructura) frente a lo que es una Suscripción (negocio).
- **Severidad:** Media.

## Recomendaciones de Refactorización

1. **Separación de Responsabilidades en el Listener:**
   Refactorizar `SubscriptionLifecycleListener` para que cada método `@OnEvent` actúe meramente como un *dispatcher* que invoca Casos de Uso dedicados (ej: `SyncSubscriptionUseCase`, `ProcessCheckoutSuccessUseCase`).

2. **Segregación de Interfaces (ISP) para Gateways:**
   Dividir `SubscriptionGateway` en interfaces más granulares:
   - `CustomerRegistryGateway`: Para mapeo de identidades externas.
   - `SubscriptionProviderGateway`: Para la gestión del estado de cobros recurrentes.
   - `PaymentSessionProvider`: Para la generación de flujos de UI (URLs).

3. **Abstracción del Proveedor en el Dominio:**
   Renombrar campos como `stripeCustomerId` a `externalProviderId` o similar, y utilizar un patrón *Factory* o *Strategy* en la infraestructura para manejar diferentes proveedores sin que el dominio se vea afectado.

4. **Ubicación Correcta de la Lógica de Mapeo:**
   Mover los diccionarios de mapeo de estados (ej. `statusMap`) de los Casos de Uso y Listeners hacia clases `StripeMapper` dedicadas en la capa de Infraestructura, devolviendo siempre tipos de dominio puros a la capa de Aplicación.

5. **Limpieza del Kernel:**
   Extraer la lógica de suscripción de la entidad `Tenant` del Kernel. El Kernel solo debe conocer el `tenantId` y su configuración de aislamiento; el estado de su suscripción debe ser consultado exclusivamente al dominio de `Subscription`.
