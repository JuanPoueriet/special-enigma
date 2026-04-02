# ADR 0003: Arquitectura Product Core + Platform Shells

## Estado
Propuesto

## Contexto
El proyecto virtex ERP es un monorepo Nx que soporta múltiples aplicaciones (web, mobile, desktop, APIs). Actualmente, existe una aplicación web POS y una aplicación desktop genérica basada en Electron. Para escalar el desarrollo de aplicaciones multiplataforma minimizando la duplicación de código y manteniendo la coherencia del dominio, se requiere una estrategia arquitectónica estandarizada.

## Decisión
Adoptar la arquitectura **"Product Core + Platform Shells"**.

### Estructura de Capas
1.  **Product Core (Reutilizable):** Contiene la lógica de negocio pura, casos de uso y componentes de UI agnósticos a la plataforma.
    *   `libs/domain/<producto>/domain`
    *   `libs/domain/<producto>/application`
    *   `libs/domain/<producto>/ui`
2.  **Platform Adapters (Reutilizables por plataforma):** Implementaciones concretas de capacidades nativas.
    *   `libs/platform/desktop/*` (Electron APIs, hardware bridge)
    *   `libs/platform/mobile/*` (Capacitor plugins)
    *   `libs/platform/web/*` (PWA, Web APIs)
3.  **Shell Apps (Thin Shells):** Aplicaciones mínimas que orquestan el core y los adaptadores para una plataforma específica.
    *   `apps/client/web/<producto>/app`
    *   `apps/client/desktop/<producto>/app`
    *   `apps/client/mobile/<producto>/app`

### Reglas de Oro
*   Cero lógica de negocio en las shells.
*   Toda capacidad nativa debe ser accedida mediante puertos (interfaces) definidos en la capa de aplicación.
*   Las shells se encargan únicamente del bootstrap, configuración de seguridad y empaquetado.

## Consecuencias
*   **Positivas:**
    *   Máxima reutilización de código entre plataformas.
    *   Aislamiento de dependencias de plataforma.
    *   Facilidad para agregar nuevas plataformas (ej. Tauri, Flutter) sin afectar el core.
    *   Estandarización del proceso de creación de nuevas aplicaciones.
*   **Negativas:**
    *   Ligero incremento inicial en la complejidad de la estructura de carpetas.
    *   Necesidad de definir interfaces claras (puertos) para capacidades nativas.

## Implementación para POS
Se implementará `apps/client/desktop/pos/app` como un shell de Electron que consume `libs/domain/pos/*` y utiliza adaptadores de `libs/platform/desktop/*`.
