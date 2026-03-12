# Informe de Estado de Microservicios - Virteex ERP

Este informe detalla el estado actual de los microservicios tras el intento de despliegue y ejecución en el entorno de desarrollo, con detalles específicos sobre los errores encontrados.

## Resumen Ejecutivo
Se intentó servir un total de 33 proyectos identificados con el target `serve`. Actualmente, **ningún microservicio se sirve correctamente sin errores**. Los problemas son sistémicos y están relacionados con la infraestructura de construcción, dependencias internas y configuraciones de entorno.

## Detalle de Errores por Servicio

### 1. API Gateway (`api-gateway-app`)
El servicio de Gateway es crítico para la orquestación y presenta fallos en cadena debido a dependencias del kernel.
*   **Estado:** Fallo en fase de construcción (Build).
*   **Detalle de Errores:**
    *   **kernel-auth:** 12 errores de TypeScript (TS2307). No puede encontrar `@virteex/kernel-tenant-context` ni `@virteex/kernel-telemetry-interfaces`, a pesar de que estas dependencias base se reportan como construidas.
    *   **shared-util-server-server-config:** 2 errores de TypeScript (TS2307). No puede encontrar `@virteex/kernel-auth`.
    *   **kernel-tenant:** 7 errores de TypeScript (TS2307). No puede resolver referencias al contexto de tenant.
*   **Causa Raíz:** El mecanismo de vinculación de librerías internas (`@virteex/*`) no está siendo reconocido correctamente por el compilador de TypeScript durante el proceso de orquestación de Nx, posiblemente por una discrepancia entre los artefactos en `dist/` y las declaraciones esperadas.

### 2. Microservicios de Negocio (Ejemplos representativos)
*   **api-accounting-app:** Presenta fallos en la carga de la capa de presentación (`domain-accounting-presentation`) que a su vez no encuentra la capa de infraestructura.
*   **api-catalog-service:**
    *   **Infraestructura:** Múltiples errores TS4111 (acceso a `process.env` con firma de índice) y TS2307 (falta de `@virteex/domain-catalog-domain`).
    *   **Repositorios:** Errores TS2339 indicando que propiedades como `code` o `name` no existen en los tipos cargados de MikroORM.
*   **api-bi-app:** Presenta 12 errores de Webpack relacionados con la imposibilidad de resolver módulos de presentación y configuración global.

### 3. Servicios Web (Angular)
*   **web-cms-app:**
    *   **Error Crítico:** `ENOENT: no such file or directory, lstat '.../tsconfig.app.json'`. El archivo de configuración de TypeScript no se encuentra en la ruta esperada por el plugin de Angular.
    *   **Resolución:** No puede resolver el punto de entrada `main.ts` ni los estilos globales `styles.scss`.
*   **web-support-app:** Presenta errores idénticos de resolución de archivos y configuración, lo que sugiere un patrón de desalineación en la estructura de carpetas de los proyectos web.

### 4. Workers
*   **worker-notification-app / worker-scheduler-app:**
    *   **Error:** `Error: spawn /bin/sh ENOENT`. Fallo al intentar ejecutar `webpack-cli build`. Esto indica un problema en el entorno de ejecución para estos workers específicos cuando se lanzan a través de Nx.

## Estado de las Pruebas (Nx Test)
La ejecución global de pruebas arrojó los siguientes resultados:
*   **Total de Suites**: ~90
*   **Pasadas**: 4 (Librerías de contratos y dominios básicos, ej: `domain-catalog-domain`)
*   **Fallidas**: 86
*   **Errores representativos en tests**:
    *   **Jest (24 suites):** `Preset ../../jest.preset.js not found`. Error de ruta relativa en la configuración de Jest.
    *   **Vitest (17 suites):** `Unable to load test config from config file undefined`. Fallo en la inicialización del entorno de pruebas.
    *   **Dependencias (47 fallos):** `Cannot find package '@virteex/...'`. Mismo problema de resolución de módulos internos que afecta al build.

## Recomendaciones para Saneamiento
1.  **Revisión de `tsconfig.base.json`**: En lugar de depender de enlaces simbólicos en `node_modules` que apuntan a `dist/`, se recomienda configurar `paths` en el `tsconfig` base para que apunten directamente a los fuentes de `libs/*` durante el desarrollo.
2.  **Estandarización de Estructura Web**: Verificar por qué los proyectos Angular buscan archivos `tsconfig.app.json` en rutas que no coinciden con la ubicación real en el disco.
3.  **Corrección de Presets de Test**: Ajustar las rutas de `jest.preset.js` en todos los archivos `jest.config.ts` de las librerías y aplicaciones.
