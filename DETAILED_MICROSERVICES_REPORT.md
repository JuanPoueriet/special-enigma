# Informe de Estado de Microservicios - Virteex ERP

Este informe detalla el estado actual de los microservicios tras el intento de despliegue y ejecución en el entorno de desarrollo.

## Resumen Ejecutivo
Se intentó servir un total de 33 proyectos identificados con el target `serve`. Actualmente, **ningún microservicio se sirve correctamente sin errores**. Los problemas son sistémicos y están relacionados con la infraestructura de construcción, dependencias internas y configuraciones de entorno.

## Microservicios con Errores
Todos los microservicios listados a continuación presentaron fallos críticos durante el proceso de `nx serve`:

### 1. Servicios de API (NestJS)
*   **api-gateway-app**
*   **api-identity-service**
*   **api-inventory-service**
*   **api-billing-service**
*   **api-crm-service**
*   **api-fiscal-service**
*   **api-accounting-app**
*   **api-payroll-app**
*   **api-projects-app**
*   **api-manufacturing-app**
*   **api-treasury-app**
*   **api-purchasing-app**
*   **api-bi-app**
*   **api-admin-app**
*   **api-fixed-assets-app**
*   **api-catalog-service**
*   **api-gateway-legacy-app**
*   **api-plugin-host-app**

**Errores comunes:**
*   `TS2307: Cannot find module '@virteex/...'`: Fallo al localizar dependencias internas. Aunque se intentó vincular las librerías mediante symlinks a `dist/`, muchas no han sido construidas previamente.
*   `ENOENT`: Archivos de configuración como `tsconfig.app.json` no encontrados en las rutas esperadas por los ejecutores de Nx.
*   Errores de tipos de TypeScript (TS4111, TS2339) debido a configuraciones de compilador estrictas o inconsistencias en los modelos de datos.

### 2. Servicios Web (Angular)
*   **web-portal-app**
*   **web-shopfloor-app**
*   **web-support-app**
*   **web-store-app**
*   **web-site-app**
*   **web-cms-app**
*   **web-ops-app**
*   **web-pos-app**
*   **web-wms-app**

**Errores comunes:**
*   Fallo en la generación de bundles de aplicación.
*   Rutas de estilos (`styles.scss`) y puntos de entrada (`main.ts`) no resueltos debido a discrepancias entre `project.json` y la estructura real de carpetas.

### 3. Workers
*   **worker-notification-app**
*   **worker-scheduler-app**

**Errores comunes:**
*   `Error: spawn /bin/sh ENOENT`: Problemas al ejecutar comandos de construcción de webpack en el entorno actual.

## Estado de las Pruebas (Nx Test)
La ejecución global de pruebas arrojó los siguientes resultados:
*   **Total de Suites**: ~90
*   **Pasadas**: 4 (Librerías de contratos y dominios básicos)
*   **Fallidas**: 86
*   **Causas principales de fallo**:
    *   Presets de Jest (`jest.preset.js`) no encontrados por rutas relativas incorrectas.
    *   Fallo al cargar configuraciones de Vitest.
    *   Dependencias internas no resueltas durante la ejecución de los tests.

## Conclusión y Recomendaciones
El sistema requiere una fase de saneamiento de la infraestructura de construcción antes de poder servir los microservicios de forma fiable:
1.  **Construcción de Base**: Es imperativo construir todas las librerías compartidas (`libs/*`) antes de intentar servir las aplicaciones.
2.  **Alineación de Rutas**: Corregir las rutas en los archivos `project.json` que apuntan a directorios inexistentes o incorrectos.
3.  **Gestión de Dependencias**: Asegurar que el script `fix_node_modules.js` apunte a artefactos de construcción válidos o usar `paths` en `tsconfig.base.json` para desarrollo local sin necesidad de compilación previa de librerías.
